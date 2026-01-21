// SOTA SCHEMA MARKUP GENERATOR - Enterprise Grade
// Comprehensive Structured Data for Maximum AI Visibility
// WP Optimizer Pro v4.0.0

export interface ArticleSchemaData {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url?: string;
  publisher?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
  duration?: string;
}

// Generate Article Schema
export function generateArticleSchema(data: ArticleSchemaData): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "author": {
      "@type": "Person",
      "name": data.author
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || new Date().toISOString(),
    "image": data.image || "",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url || ""
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisher || "WP Optimizer Pro"
    }
  };
  
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// Generate FAQ Schema for AEO optimization
export function generateFAQSchema(faqs: FAQItem[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// Generate HowTo Schema for tutorials
export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  totalTime?: string
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime || "PT30M",
    "step": steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image || ""
    }))
  };
  
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// Generate Video Schema
export function generateVideoSchema(video: VideoData): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "embedUrl": video.embedUrl,
    "duration": video.duration || "PT10M"
  };
  
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// Generate BreadcrumbList Schema
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// Generate comprehensive schema for a complete blog post
export function generateComprehensiveSchema(data: {
  article: ArticleSchemaData;
  faqs?: FAQItem[];
  howToSteps?: HowToStep[];
  video?: VideoData;
  breadcrumbs?: { name: string; url: string }[];
}): string {
  const schemas: string[] = [];
  
  // Always include article schema
  schemas.push(generateArticleSchema(data.article));
  
  // Add FAQ schema if FAQs provided
  if (data.faqs && data.faqs.length > 0) {
    schemas.push(generateFAQSchema(data.faqs));
  }
  
  // Add HowTo schema if steps provided
  if (data.howToSteps && data.howToSteps.length > 0) {
    schemas.push(generateHowToSchema(
      data.article.title,
      data.article.description,
      data.howToSteps
    ));
  }
  
  // Add Video schema if video provided
  if (data.video) {
    schemas.push(generateVideoSchema(data.video));
  }
  
  // Add Breadcrumb schema if breadcrumbs provided
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(data.breadcrumbs));
  }
  
  return schemas.join('\n');
}

// Inject schemas into HTML content
export function injectSchemaIntoHTML(htmlContent: string, schemas: string): string {
  // Find the closing </head> tag or end of first </body> section
  const headCloseIndex = htmlContent.indexOf('</head>');
  
  if (headCloseIndex > -1) {
    return htmlContent.slice(0, headCloseIndex) + schemas + htmlContent.slice(headCloseIndex);
  }
  
  // Fallback: append at the end
  return htmlContent + schemas;
}

export default {
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateVideoSchema,
  generateBreadcrumbSchema,
  generateComprehensiveSchema,
  injectSchemaIntoHTML
};
