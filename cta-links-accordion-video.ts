// CTA LINKS, FAQ ACCORDION, SCHEMA MARKUP & YOUTUBE VIDEO INTEGRATION
// WP Optimizer Pro v4.0.0 - Enterprise SOTA Implementation
// SOTA UI/UX Components with Modern Design System & Video Discovery

// ========================
// CTA BOX WITH LINKED TEXT
// ========================

export interface CTABoxConfig {
  heading: string;
  description: string;
  buttonText: string;
  targetLink: string;
  emoji?: string;
}

// Create SOTA CTA box with gradient, blur effects & modern styling
export function createCTABox(config: CTABoxConfig): string {
  const { emoji = '🚀', heading, description, buttonText, targetLink } = config;
  
  return `<div class="sota-cta-box" style="
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 48px;
    border-radius: 24px;
    margin: 64px 0;
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  ">
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1), transparent); pointer-events: none;"></div>
    <div style="position: relative; z-index: 1;">
      <h3 style="
        font-size: clamp(28px, 4vw, 42px);
        font-weight: 800;
        color: white;
        margin: 0 0 16px 0;
        letter-spacing: -0.02em;
      ">${emoji} ${heading}</h3>
      <p style="
        font-size: 18px;
        line-height: 1.7;
        color: rgba(255,255,255,0.9);
        margin: 0 0 32px 0;
        max-width: 600px;
      ">${description}</p>
      <a href="${targetLink}" class="sota-cta-btn" style="
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: white;
        color: #667eea;
        padding: 18px 36px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        font-size: 16px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      ">
        ${buttonText}
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>`;
}

// ========================
// ENTERPRISE FAQ ACCORDION
// ========================

export interface FAQItem {
  question: string;
  answer: string;
}

// Create SOTA FAQ accordion with smooth animations
export function createEnterpriseAccordion(items: FAQItem[], title: string = '💬 Frequently Asked Questions'): string {
  let html = `<section class="sota-faq-section" style="
    margin: 64px 0;
    background: linear-gradient(to bottom, #f9fafb, #ffffff);
    padding: 56px;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.06);
  ">
    <h2 style="
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 40px 0;
      letter-spacing: -0.03em;
    ">${title}</h2>
    <div class="faq-container" role="region" aria-label="FAQ">`;

  items.forEach((item, index) => {
    html += `<details class="faq-item-sota" style="
      margin-bottom: 16px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    ">
      <summary style="
        padding: 24px 28px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        cursor: pointer;
        font-weight: 700;
        font-size: 18px;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 16px;
      ">
        <span style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          font-weight: 800;
          flex-shrink: 0;
        ">${index + 1}</span>
        <span>${item.question}</span>
      </summary>
      <div style="
        padding: 32px;
        background: linear-gradient(to bottom, #f9fafb, white);
      ">
        <p style="
          color: #4b5563;
          line-height: 1.8;
          font-size: 16px;
          margin: 0;
        ">${item.answer}</p>
      </div>
    </details>`;
  });

  html += `</div></section>`;
  return html;
}

// ========================
// REFERENCES SECTION - SOTA
// ========================

export interface Reference {
  title: string;
  url: string;
  source?: string;
  author?: string;
}

export function createReferencesSection(references: Reference[]): string {
  if (!references || references.length === 0) return '';
  
  let html = `<section class="sota-references" style="
    margin: 64px 0;
    background: linear-gradient(to bottom, #f9fafb, #ffffff);
    padding: 48px;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.06);
  ">
    <h2 style="
      font-size: 28px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 32px 0;
    ">📚 References</h2>
    <ol style="margin: 0; padding-left: 24px;">`;
  
  references.forEach((ref) => {
    html += `<li style="margin-bottom: 16px; color: #4b5563; line-height: 1.6;">
      <a href="${ref.url}" style="color: #3b82f6; text-decoration: none; font-weight: 600;" target="_blank" rel="noopener">${ref.title}</a>
      ${ref.source ? `<span style="color: #9ca3af;"> — ${ref.source}</span>` : ''}
    </li>`;
  });
  
  html += `</ol></section>`;
  return html;
}

// ========================
// YOUTUBE VIDEO INTEGRATION - SOTA
// ========================

export interface YouTubeVideoData {
  id: string;
  title: string;
  url: string;
  channel?: string;
  thumbnail?: string;
}

// Create SOTA video embed with modern styling and schema markup
export function createVideoEmbed(videoId: string, title: string): string {
  return `
<section class="sota-video-section" style="
  margin: 48px 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 40px;
  border-radius: 20px;
">
  <h3 style="
    color: #e94560;
    font-size: 24px;
    margin: 0 0 8px 0;
    font-weight: 800;
  ">🎬 Watch & Learn</h3>
  <p style="
    color: rgba(255,255,255,0.8);
    margin: 0 0 24px 0;
    font-size: 16px;
  ">${title}</p>
  <div style="
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(233,69,96,0.3);
  ">
    <iframe 
      src="https://www.youtube.com/embed/${videoId}?rel=0" 
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      " 
      allowfullscreen 
      loading="lazy"
      title="${title}"
    ></iframe>
  </div>
</section>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"VideoObject","name":"${title}","embedUrl":"https://www.youtube.com/embed/${videoId}","thumbnailUrl":"https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"}
</script>`;
}

// Smart video insertion after first H2
export function insertVideoAfterFirstH2(htmlContent: string, videoId: string, title: string): string {
  const videoHtml = createVideoEmbed(videoId, title);
  const h2Match = htmlContent.match(/<\/h2>/i);
  
  if (h2Match && h2Match.index !== undefined) {
    const position = h2Match.index + 5;
    return htmlContent.slice(0, position) + videoHtml + htmlContent.slice(position);
  }
  
  // Fallback: append at end if no H2 found
  return htmlContent + videoHtml;
}

// Discover YouTube video via Serper API
export async function discoverYouTubeVideo(
  keyword: string,
  serperApiKey: string
): Promise<YouTubeVideoData | null> {
  try {
    const response = await fetch('https://google.serper.dev/videos', {
      method: 'POST',
      headers: {
        'X-API-KEY': serperApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: `${keyword} tutorial guide how to`,
        num: 5
      })
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const videos = data.videos || [];
    
    // Find best YouTube video
    for (const video of videos) {
      if (video.link && video.link.includes('youtube.com/watch')) {
        const videoIdMatch = video.link.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (videoIdMatch) {
          return {
            id: videoIdMatch[1],
            title: video.title || keyword,
            url: video.link,
            channel: video.channel,
            thumbnail: `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`
          };
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('YouTube discovery failed:', error);
    return null;
  }
}

// Main function: Discover and integrate YouTube video
export async function discoverAndIntegrateYouTubeVideo(
  keyword: string,
  htmlContent: string,
  serperApiKey: string
): Promise<{ content: string; videoData: YouTubeVideoData | null }> {
  const videoData = await discoverYouTubeVideo(keyword, serperApiKey);
  
  if (!videoData) {
    return { content: htmlContent, videoData: null };
  }
  
  const enrichedContent = insertVideoAfterFirstH2(
    htmlContent,
    videoData.id,
    videoData.title
  );
  
  return { content: enrichedContent, videoData };
}

// Legacy function for backward compatibility
export function integrateYouTubeVideoIntoContent(
  htmlContent: string,
  videoId: string,
  timestamp?: string,
  title?: string
): string {
  if (!videoId) return htmlContent;
  return insertVideoAfterFirstH2(htmlContent, videoId, title || 'Related Video');
}

export default {
  createCTABox,
  createEnterpriseAccordion,
  createReferencesSection,
  createVideoEmbed,
  insertVideoAfterFirstH2,
  discoverYouTubeVideo,
  discoverAndIntegrateYouTubeVideo,
  integrateYouTubeVideoIntoContent
};
