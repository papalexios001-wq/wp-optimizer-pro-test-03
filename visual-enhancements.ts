// SOTA VISUAL ENHANCEMENTS - Enterprise Grade Blog Post Design System
// Modern, Accessible, Performance-Optimized Styling v4.0.0
// Includes: Pro Tip, Stat Highlight, Warning, Key Takeaways boxes

export interface BlogPostConfig {
  title: string;
  excerpt: string;
  featuredImage?: string;
  content: string;
  author?: string;
  publishDate?: string;
}

// ========================
// PRO TIP BOX - Hormozi Style
// ========================
export function createProTipBox(tip: string, title: string = 'Pro Tip'): string {
  return `<div class="sota-pro-tip" style="
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    padding: 24px 32px;
    border-radius: 16px;
    margin: 32px 0;
    border-left: 6px solid #047857;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);
  ">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="font-size: 28px;">💡</span>
      <strong style="color: white; font-size: 18px; font-weight: 800;">${title}</strong>
    </div>
    <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 16px; line-height: 1.7;">${tip}</p>
  </div>`;
}

// ========================
// STAT HIGHLIGHT BOX
// ========================
export function createStatBox(stat: string, label: string, source?: string): string {
  return `<div class="sota-stat-box" style="
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    padding: 32px;
    border-radius: 20px;
    text-align: center;
    margin: 40px 0;
    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25);
  ">
    <div style="font-size: clamp(48px, 8vw, 72px); font-weight: 900; color: white; line-height: 1;">${stat}</div>
    <div style="font-size: 18px; color: rgba(255,255,255,0.9); margin-top: 12px; font-weight: 600;">${label}</div>
    ${source ? `<div style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 8px;">Source: ${source}</div>` : ''}
  </div>`;
}

// ========================
// WARNING/MISTAKE BOX
// ========================
export function createWarningBox(warning: string, title: string = 'Common Mistake'): string {
  return `<div class="sota-warning-box" style="
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-left: 6px solid #f59e0b;
    padding: 24px 32px;
    border-radius: 0 16px 16px 0;
    margin: 32px 0;
    box-shadow: 0 10px 40px rgba(245, 158, 11, 0.15);
  ">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="font-size: 28px;">⚠️</span>
      <strong style="color: #92400e; font-size: 18px; font-weight: 800;">${title}</strong>
    </div>
    <p style="color: #78350f; margin: 0; font-size: 16px; line-height: 1.7;">${warning}</p>
  </div>`;
}

// ========================
// KEY TAKEAWAYS BOX (Top of article)
// ========================
export function createKeyTakeawaysBox(takeaways: string[]): string {
  const takeawayItems = takeaways.map(t => 
    `<li style="margin-bottom: 12px; line-height: 1.6; font-weight: 500;">✅ ${t}</li>`
  ).join('');
  
  return `<div class="sota-takeaways" style="
    background: linear-gradient(to right, #f0f9ff, #e0f2fe);
    border: 2px solid #0ea5e9;
    border-radius: 16px;
    padding: 32px;
    margin: 32px 0;
    box-shadow: 0 10px 40px rgba(14, 165, 233, 0.1);
  ">
    <h3 style="margin: 0 0 20px 0; color: #0369a1; font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
      <span>⚡</span> Key Takeaways (TL;DR)
    </h3>
    <ul style="margin: 0; padding-left: 0; list-style: none; color: #0c4a6e;">
      ${takeawayItems}
    </ul>
  </div>`;
}

// ========================
// COMPARISON TABLE
// ========================
export function createComparisonTable(headers: string[], rows: string[][]): string {
  const headerHtml = headers.map(h => 
    `<th style="padding: 16px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 700; text-align: left;">${h}</th>`
  ).join('');
  
  const rowsHtml = rows.map((row, i) => {
    const cells = row.map(cell => 
      `<td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">${cell}</td>`
    ).join('');
    return `<tr style="background: ${i % 2 === 0 ? 'white' : '#f9fafb'};">${cells}</tr>`;
  }).join('');
  
  return `<div style="margin: 40px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
      <thead><tr>${headerHtml}</tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
  </div>`;
}

// ========================
// CHECKLIST BOX
// ========================
export function createChecklistBox(items: string[], title: string = 'Quick Checklist'): string {
  const checklistItems = items.map(item => 
    `<li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
      <span style="color: #10b981; font-size: 20px;">☑</span>
      <span style="color: #374151; line-height: 1.6;">${item}</span>
    </li>`
  ).join('');
  
  return `<div class="sota-checklist" style="
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 16px;
    padding: 32px;
    margin: 32px 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  ">
    <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 800;">📋 ${title}</h3>
    <ul style="margin: 0; padding: 0; list-style: none;">
      ${checklistItems}
    </ul>
  </div>`;
}

// ========================
// HERO SECTION
// ========================
export function createSOTAHeroSection(config: BlogPostConfig): string {
  return `<section class="blog-hero-sota" style="
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    padding: clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px);
    text-align: center;
    overflow: hidden;
  ">
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.1), transparent); pointer-events: none;"></div>
    <div style="position: relative; z-index: 1; max-width: 900px; margin: 0 auto;">
      <h1 style="font-size: clamp(32px, 6vw, 64px); font-weight: 800; color: white; margin: 0 0 20px 0; letter-spacing: -0.03em; line-height: 1.1;">${config.title}</h1>
      <p style="font-size: clamp(16px, 2vw, 24px); color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6;">${config.excerpt}</p>
    </div>
  </section>`;
}

// ========================
// MODERN CARD COMPONENT
// ========================
export function createSOTACard(title: string, content: string, icon?: string): string {
  return `<div class="sota-card" style="
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    padding: 40px;
    margin: 24px 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  ">
    ${icon ? `<div style="font-size: 48px; margin-bottom: 20px;">${icon}</div>` : ''}
    <h3 style="font-size: 24px; font-weight: 800; color: #1f2937; margin: 0 0 16px 0;">${title}</h3>
    <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 0;">${content}</p>
  </div>`;
}

// ========================
// QUOTE/INSIGHT BOX
// ========================
export function createInsightBox(quote: string, author?: string): string {
  return `<blockquote class="sota-insight" style="
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-left: 6px solid #e94560;
    padding: 32px 40px;
    margin: 40px 0;
    border-radius: 0 20px 20px 0;
    box-shadow: 0 20px 60px rgba(233, 69, 96, 0.2);
  ">
    <p style="font-size: 20px; font-style: italic; color: white; margin: 0; line-height: 1.7;">"${quote}"</p>
    ${author ? `<cite style="display: block; margin-top: 16px; color: #e94560; font-style: normal; font-weight: 600;">— ${author}</cite>` : ''}
  </blockquote>`;
}

// ========================
// STEP-BY-STEP BOX
// ========================
export function createStepByStepBox(steps: { title: string; description: string }[]): string {
  const stepsHtml = steps.map((step, i) => `
    <div style="display: flex; gap: 20px; margin-bottom: 24px;">
      <div style="flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 20px;">${i + 1}</div>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #1f2937;">${step.title}</h4>
        <p style="margin: 0; color: #4b5563; line-height: 1.7;">${step.description}</p>
      </div>
    </div>
  `).join('');
  
  return `<div class="sota-steps" style="
    background: #f9fafb;
    border-radius: 20px;
    padding: 40px;
    margin: 40px 0;
  ">
    <h3 style="margin: 0 0 32px 0; font-size: 24px; font-weight: 800; color: #1f2937;">🎯 Step-by-Step Guide</h3>
    ${stepsHtml}
  </div>`;
}

export default {
  createProTipBox,
  createStatBox,
  createWarningBox,
  createKeyTakeawaysBox,
  createComparisonTable,
  createChecklistBox,
  createSOTAHeroSection,
  createSOTACard,
  createInsightBox,
  createStepByStepBox
};
