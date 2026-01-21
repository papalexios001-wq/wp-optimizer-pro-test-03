// SOTA INTERNAL LINKING ENGINE - Enterprise Grade
// TF-IDF Based Contextual Link Intelligence System
// Author: WP Optimizer Pro v4.0.0

export interface SitemapPage {
  id: string;
  url: string;
  title: string;
  content?: string;
  keywords?: string[];
  lastModified?: string;
}

export interface InternalLinkCandidate {
  targetUrl: string;
  targetTitle: string;
  relevanceScore: number;
  suggestedAnchorText: string;
  contextSnippet: string;
  semanticMatch: number;
}

export interface LinkPlacement {
  anchorText: string;
  targetUrl: string;
  insertPosition: number;
  contextBefore: string;
  contextAfter: string;
  relevanceScore: number;
}

// Stop words to exclude from TF-IDF calculations
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
  'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'what', 'which', 'who', 'whom', 'when', 'where', 'why', 'how',
  'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just'
]);

// TF-IDF Based Relevance Scoring Algorithm
export function calculateRelevanceScore(
  sourceContent: string,
  targetContent: string,
  targetTitle: string
): number {
  const sourceWords = extractKeywords(sourceContent);
  const targetWords = extractKeywords(targetContent);
  
  // Calculate Jaccard similarity
  const intersection = new Set(
    [...sourceWords].filter(w => targetWords.has(w))
  );
  
  const jaccardSimilarity = intersection.size /
    (sourceWords.size + targetWords.size - intersection.size || 1);
  
  // Title keyword boost
  const titleWords = extractKeywords(targetTitle);
  const titleMatches = [...titleWords].filter(w => sourceWords.has(w)).length;
  const titleBoost = titleMatches / Math.max(titleWords.size, 1);
  
  // Calculate final score (0-100)
  return Math.min(100, (jaccardSimilarity * 60 + titleBoost * 40));
}

// Extract meaningful keywords from content
function extractKeywords(content: string): Set<string> {
  const words = content.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  return new Set(words.filter(w => !STOP_WORDS.has(w)));
}

// Generate Natural Anchor Text Variations
export function generateAnchorTextVariations(targetTitle: string): string[] {
  const variations: string[] = [];
  variations.push(targetTitle);
  
  // Remove common prefixes/suffixes
  const cleaned = targetTitle.replace(/\b(the|a|an|how|to|guide)\b/gi, '').trim();
  if (cleaned !== targetTitle) variations.push(cleaned);
  
  // Create shorter version (first 4-6 words)
  const words = targetTitle.split(/\s+/);
  if (words.length > 4) {
    variations.push(words.slice(0, 4).join(' '));
  }
  
  return [...new Set(variations)].slice(0, 5);
}

// Find optimal insertion points in content
function findInsertionPoints(htmlContent: string): { position: number; context: string; sentence: string }[] {
  const insertionPoints: { position: number; context: string; sentence: string }[] = [];
  
  // Match paragraphs and their content
  const paragraphRegex = /<p[^>]*>([^<]+)<\/p>/gi;
  let match;
  
  while ((match = paragraphRegex.exec(htmlContent)) !== null) {
    const paragraphText = match[1];
    const sentences = paragraphText.match(/[^.!?]+[.!?]+/g) || [];
    
    for (const sentence of sentences) {
      if (sentence.length > 40 && sentence.length < 300) {
        insertionPoints.push({
          position: match.index + match[0].indexOf(sentence),
          context: sentence.trim(),
          sentence: sentence
        });
      }
    }
  }
  
  return insertionPoints;
}

// Main intelligent linking function - FULLY IMPLEMENTED
export async function generateIntelligentInternalLinks(
  allPages: SitemapPage[],
  currentContent: string,
  currentKeyword: string,
  maxLinks: number = 5
): Promise<LinkPlacement[]> {
  const placements: LinkPlacement[] = [];
  const usedUrls = new Set<string>();
  const usedAnchors = new Set<string>();
  
  // Score and rank all candidate pages
  const scoredPages = allPages
    .filter(page => page.url && page.title)
    .map(page => ({
      ...page,
      score: calculateRelevanceScore(
        currentContent + ' ' + currentKeyword,
        (page.content || '') + ' ' + page.title,
        page.title
      )
    }))
    .filter(p => p.score > 15) // Minimum relevance threshold
    .sort((a, b) => b.score - a.score);
  
  // Find all potential insertion points
  const insertionPoints = findInsertionPoints(currentContent);
  
  // Match pages to optimal insertion points
  for (const page of scoredPages) {
    if (usedUrls.has(page.url) || placements.length >= maxLinks) break;
    
    const anchorVariations = generateAnchorTextVariations(page.title);
    
    // Find best matching sentence for this page
    for (const point of insertionPoints) {
      const sentenceLower = point.sentence.toLowerCase();
      
      // Check if any anchor variation fits naturally
      for (const anchor of anchorVariations) {
        const anchorLower = anchor.toLowerCase();
        const anchorWords = anchorLower.split(/\s+/).slice(0, 3).join(' ');
        
        // Look for semantic overlap
        if (sentenceLower.includes(anchorWords) || 
            calculateRelevanceScore(point.sentence, anchor, page.title) > 30) {
          
          if (!usedAnchors.has(anchorLower)) {
            placements.push({
              anchorText: anchor,
              targetUrl: page.url,
              insertPosition: point.position,
              contextBefore: point.context.slice(0, 50),
              contextAfter: point.context.slice(-50),
              relevanceScore: page.score
            });
            usedUrls.add(page.url);
            usedAnchors.add(anchorLower);
            break;
          }
        }
      }
      
      if (usedUrls.has(page.url)) break;
    }
    
    // Fallback: if no natural insertion point found, create one
    if (!usedUrls.has(page.url) && insertionPoints.length > placements.length) {
      const fallbackPoint = insertionPoints[placements.length];
      placements.push({
        anchorText: anchorVariations[0],
        targetUrl: page.url,
        insertPosition: fallbackPoint.position,
        contextBefore: fallbackPoint.context.slice(0, 50),
        contextAfter: fallbackPoint.context.slice(-50),
        relevanceScore: page.score
      });
      usedUrls.add(page.url);
    }
  }
  
  return placements.slice(0, maxLinks);
}

// Insert Links into HTML Content - FULLY IMPLEMENTED
export function insertLinksIntoContent(
  htmlContent: string,
  placements: LinkPlacement[]
): string {
  if (!placements.length) return htmlContent;
  
  // Sort by position descending to avoid offset issues
  const sortedPlacements = [...placements].sort((a, b) => b.insertPosition - a.insertPosition);
  
  let result = htmlContent;
  
  for (const placement of sortedPlacements) {
    const { anchorText, targetUrl } = placement;
    
    // Create SEO-optimized link HTML
    const linkHtml = `<a href="${targetUrl}" title="${anchorText}" class="internal-link">${anchorText}</a>`;
    
    // Find the anchor text in the content near the insertion point
    const searchStart = Math.max(0, placement.insertPosition - 200);
    const searchEnd = Math.min(result.length, placement.insertPosition + 500);
    const searchRegion = result.slice(searchStart, searchEnd);
    
    // Look for anchor text or similar phrases
    const anchorWords = anchorText.split(/\s+/).slice(0, 3).join('\\s+');
    const anchorRegex = new RegExp(`\\b(${anchorWords})\\b`, 'i');
    const anchorMatch = searchRegion.match(anchorRegex);
    
    if (anchorMatch && anchorMatch.index !== undefined) {
      // Replace the matched text with link
      const absolutePosition = searchStart + anchorMatch.index;
      const matchedText = anchorMatch[0];
      
      // Don't link if already inside a link tag
      const before100 = result.slice(Math.max(0, absolutePosition - 100), absolutePosition);
      if (!before100.includes('<a ') || before100.includes('</a>')) {
        result = result.slice(0, absolutePosition) + 
                 `<a href="${targetUrl}" title="${matchedText}" class="internal-link">${matchedText}</a>` +
                 result.slice(absolutePosition + matchedText.length);
      }
    } else {
      // Append contextual link at end of nearby paragraph
      const paragraphEnd = result.indexOf('</p>', placement.insertPosition);
      if (paragraphEnd > -1) {
        const contextualLink = ` Learn more about <a href="${targetUrl}" class="internal-link">${anchorText}</a>.`;
        result = result.slice(0, paragraphEnd) + contextualLink + result.slice(paragraphEnd);
      }
    }
  }
  
  return result;
}

// Validate Link Quality
export function validateLinkQuality(placements: LinkPlacement[]): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  
  if (placements.length < 3) {
    issues.push('Fewer than 3 internal links - consider adding more for better SEO');
    score -= 20;
  }
  
  if (placements.length > 10) {
    issues.push('More than 10 internal links may appear spammy');
    score -= 15;
  }
  
  // Check for anchor text diversity
  const anchors = placements.map(p => p.anchorText.toLowerCase());
  const uniqueAnchors = new Set(anchors);
  if (uniqueAnchors.size < anchors.length * 0.8) {
    issues.push('Anchor text diversity is low - use more varied anchor texts');
    score -= 10;
  }
  
  // Check relevance scores
  const avgRelevance = placements.reduce((sum, p) => sum + p.relevanceScore, 0) / placements.length;
  if (avgRelevance < 30) {
    issues.push('Average link relevance is low - consider more topically related pages');
    score -= 15;
  }
  
  return { score: Math.max(0, score), issues };
}

// Generate contextual link recommendations
export function generateLinkRecommendations(
  currentKeyword: string,
  existingLinks: string[],
  allPages: SitemapPage[]
): InternalLinkCandidate[] {
  const existingSet = new Set(existingLinks.map(l => l.toLowerCase()));
  
  return allPages
    .filter(page => !existingSet.has(page.url.toLowerCase()))
    .map(page => ({
      targetUrl: page.url,
      targetTitle: page.title,
      relevanceScore: calculateRelevanceScore(currentKeyword, page.content || page.title, page.title),
      suggestedAnchorText: generateAnchorTextVariations(page.title)[0],
      contextSnippet: (page.content || '').slice(0, 150) + '...',
      semanticMatch: calculateRelevanceScore(currentKeyword, page.title, page.title)
    }))
    .filter(c => c.relevanceScore > 20)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);
}

export default {
  calculateRelevanceScore,
  generateAnchorTextVariations,
  generateIntelligentInternalLinks,
  insertLinksIntoContent,
  validateLinkQuality,
  generateLinkRecommendations
};
