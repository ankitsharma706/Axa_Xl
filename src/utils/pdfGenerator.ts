/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { Idea } from '../types';

/**
 * Generates an executive-level, professional, highly styled PDF report of the
 * AXA XL Enterprise AI Architecture Board.
 * Adheres strictly to the "Professional Polish" branding guidelines.
 */
export function generatePdfReport(ideas: Idea[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

  // --------------------------------------------------------------------------
  // PAGE 1: TITLE & KEY KPIS & PORTFOLIO PIPELINE (Top 9)
  // --------------------------------------------------------------------------

  // Royal Navy Header Fill
  doc.setFillColor(0, 91, 172); // AXA Blue #005BAC
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold Horizontal Accent Line
  doc.setFillColor(212, 160, 23); // AXA Gold #D4A017
  doc.rect(0, 42, pageWidth, 2, 'F');

  // Header Typography
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('AXA XL   |   ENTERPRISE AI ARCHITECTURE BOARD', 14, 15);

  doc.setFontSize(22);
  doc.text('Project Intelligence Portfolio Report', 14, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(220, 235, 255);
  doc.text('Strategic appraisal score tracking, priority alignment, and system technical blueprints.', 14, 34);

  // Metadata Block (Right Sidebar in Header)
  doc.setFillColor(0, 159, 227, 0.2); // Light blue transparent overlay
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('REPORT METADATA', 142, 14);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated: 2026-06-04 09:01 UTC', 142, 19);
  doc.text('Status: Executive Approved', 142, 24);
  doc.text('Classification: internal restricted', 142, 29);
  doc.text('Access Class: Level 3 Enterprise', 142, 34);

  // SECTION: Executive Strategic Board Overview Metrics
  let currentY = 54;
  doc.setTextColor(15, 23, 42); // #0F172A
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PORTFOLIO EXECUTIVE METRICS SUMMARY', 14, currentY);

  // Horizontal separator rule
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.setLineWidth(0.4);
  doc.line(14, currentY + 2, pageWidth - 14, currentY + 2);

  // KPI Boxes Layout
  // Draw 4 neat boxes
  const kpiWidth = (pageWidth - 28 - 9) / 4; // Space split in 4 columns
  const kpiHeight = 18;
  const kpiY = currentY + 5;

  // Compute stats on fly
  const totalCount = ideas.length;
  const top5 = ideas.slice(0, 5);
  const top5Avg = (top5.reduce((sum, item) => sum + item.overallScore, 0) / 5).toFixed(1);
  const portfolioAvg = (ideas.reduce((sum, item) => sum + item.overallScore, 0) / totalCount).toFixed(1);

  const kpis = [
    { label: 'PROJECT PORTFOLIO', val: `${totalCount} Projects`, color: [0, 91, 172] },
    { label: 'TOP 5 INITIATIVES AVG', val: `${top5Avg}% Score`, color: [212, 160, 23] },
    { label: 'PORTFOLIO AVERAGE', val: `${portfolioAvg}% Score`, color: [0, 91, 172] },
    { label: 'AI READINESS RATING', val: 'Level 4 / Active', color: [16, 185, 129] },
  ];

  kpis.forEach((kpi, idx) => {
    const kpiX = 14 + idx * (kpiWidth + 3);
    
    // Smooth background
    doc.setFillColor(248, 250, 252);
    doc.rect(kpiX, kpiY, kpiWidth, kpiHeight, 'F');
    // Left edge vertical color indicator
    doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
    doc.rect(kpiX, kpiY, 1.5, kpiHeight, 'F');
    // Label
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(kpi.label, kpiX + 4, kpiY + 5.5);
    // Value
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(kpi.val, kpiX + 4, kpiY + 12.5);
  });

  // SECTION: Pipeline Initiatives List (Rank 1 to 9)
  currentY = kpiY + kpiHeight + 10;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ENTERPRISE AI INITIATIVES PIPELINE (PART 1 OF 2)', 14, currentY);

  doc.line(14, currentY + 2, pageWidth - 14, currentY + 2);

  const tableHeaderY = currentY + 5;
  doc.setFillColor(248, 250, 252);
  doc.rect(14, tableHeaderY, pageWidth - 28, 7, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('RANK', 16, tableHeaderY + 5);
  doc.text('PROJECT PROPOSAL', 29, tableHeaderY + 5);
  doc.text('STRATEGIC DOMAIN', 98, tableHeaderY + 5);
  doc.text('RELEVANCE', 142, tableHeaderY + 5);
  doc.text('AI TECH', 163, tableHeaderY + 5);
  doc.text('OVERALL', 181, tableHeaderY + 5);

  let itemY = tableHeaderY + 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  // Plot first 9 ideas
  const part1Ideas = ideas.slice(0, 9);
  part1Ideas.forEach((idea, idx) => {
    // Alternating rows background shade
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, itemY, pageWidth - 28, 11, 'F');
    }

    doc.setTextColor(15, 23, 42);
    // Rank Box
    doc.setFont('helvetica', 'bold');
    if (idea.rank <= 5) {
      doc.setFillColor(254, 243, 199); // Amber tint top 5
      doc.rect(16, itemY + 2.5, 7, 6, 'F');
      doc.setTextColor(146, 64, 14);
      doc.text(String(idea.rank), 19.5, itemY + 6.8);
    } else {
      doc.setFillColor(241, 245, 249);
      doc.rect(16, itemY + 2.5, 7, 6, 'F');
      doc.setTextColor(71, 85, 105);
      doc.text(String(idea.rank), 19.5, itemY + 6.8);
    }

    // Name & Brief problem teaser snippet
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.text(idea.name, 29, itemY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    
    // Trim descriptive text safely
    const problemTeaser = idea.problem.length > 72 ? idea.problem.substring(0, 68) + '...' : idea.problem;
    doc.text(problemTeaser, 29, itemY + 8.5);

    // Business domain
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(7.5);
    doc.text(idea.domain, 98, itemY + 6.8);

    // Score bars numerical indicator
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(`${idea.relScore}%`, 142, itemY + 6.8);
    doc.text(`${idea.aiScore}%`, 163, itemY + 6.8);

    // Highlight overall composite score cell
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 91, 172);
    doc.text(`${idea.overallScore}/100`, 181, itemY + 6.8);

    // Underline divider
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(14, itemY + 11, pageWidth - 14, itemY + 11);

    itemY += 11;
  });

  // Footer on Page 1
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('AXA XL Enterprise AI Architecture Board   |   Strictly Confidential', 14, pageHeight - 11);
  doc.text('Page 1 of 3', pageWidth - 26, pageHeight - 11);


  // --------------------------------------------------------------------------
  // PAGE 2: PIPELINE PART 2 (Rank 10 to 18) & DETAILED COAX-CHALLENGE HIGHLIGHTS
  // --------------------------------------------------------------------------
  doc.addPage();

  // Draw Page 2 Header (Minimalist Band)
  doc.setFillColor(0, 91, 172);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setFillColor(212, 160, 23);
  doc.rect(0, 16, pageWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('AXA XL   |   ENTERPRISE AI PORTFOLIO PIPELINE (CONTINUED)', 14, 10.5);

  currentY = 28;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ENTERPRISE AI INITIATIVES PIPELINE (PART 2 OF 2)', 14, currentY);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(14, currentY + 2, pageWidth - 14, currentY + 2);

  // Table header Part 2
  const tableHeaderY2 = currentY + 5;
  doc.setFillColor(248, 250, 252);
  doc.rect(14, tableHeaderY2, pageWidth - 28, 7, 'F');
  
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('RANK', 16, tableHeaderY2 + 5);
  doc.text('PROJECT PROPOSAL', 29, tableHeaderY2 + 5);
  doc.text('STRATEGIC DOMAIN', 98, tableHeaderY2 + 5);
  doc.text('RELEVANCE', 142, tableHeaderY2 + 5);
  doc.text('AI TECH', 163, tableHeaderY2 + 5);
  doc.text('OVERALL', 181, tableHeaderY2 + 5);

  let itemY2 = tableHeaderY2 + 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  const part2Ideas = ideas.slice(9, 18);
  part2Ideas.forEach((idea, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, itemY2, pageWidth - 28, 11, 'F');
    }

    doc.setFillColor(241, 245, 249);
    doc.rect(16, itemY2 + 2.5, 7, 6, 'F');
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.text(String(idea.rank), 19.5, itemY2 + 6.8);

    // Name & brief
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.text(idea.name, 29, itemY2 + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    
    const problemTeaser = idea.problem.length > 72 ? idea.problem.substring(0, 68) + '...' : idea.problem;
    doc.text(problemTeaser, 29, itemY2 + 8.5);

    // Domain
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(7.5);
    doc.text(idea.domain, 98, itemY2 + 6.8);

    // Scores
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(`${idea.relScore}%`, 142, itemY2 + 6.8);
    doc.text(`${idea.aiScore}%`, 163, itemY2 + 6.8);

    doc.setFont('helvetica', 'bold');
    if (idea.overallScore < 75) {
      doc.setTextColor(100, 116, 139);
    } else {
      doc.setTextColor(0, 91, 172);
    }
    doc.text(`${idea.overallScore}/100`, 181, itemY2 + 6.8);

    // Underline divider
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(14, itemY2 + 11, pageWidth - 14, itemY2 + 11);

    itemY2 += 11;
  });

  // Highlight of Core Architectural Decisions Section
  const archSectionY = itemY2 + 8;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PORTFOLIO CLOUD & SECURITY DIRECTIVES', 14, archSectionY);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(14, archSectionY + 2, pageWidth - 14, archSectionY + 2);

  const blockY = archSectionY + 5;
  const blockWidth = (pageWidth - 28 - 6) / 2;
  const blockHeight = 44;

  // Box 1: Unified Cloud Strategy
  doc.setFillColor(248, 250, 252);
  doc.rect(14, blockY, blockWidth, blockHeight, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, blockY, blockWidth, blockHeight, 'S');

  doc.setFillColor(0, 91, 172);
  doc.rect(14, blockY, blockWidth, 1.5, 'F'); // Line at top

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('A. Standardized Enterprise Tech Stack', 18, blockY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const stackLines = doc.splitTextToSize(
    'Initiatives are aligned on Azure services to minimize runtime environment drift. Default web frontend utilizes React, with high-performance FastAPI backends serving as RESTful gates. Deep orchestration makes extensive use of LangChain, vector indices hosted in custom Pinecone pools, and GPT-4o embeddings for policy text processing.',
    blockWidth - 8
  );
  doc.text(stackLines, 18, blockY + 11.5);

  // Box 2: Unified Security Directives
  doc.setFillColor(248, 250, 252);
  doc.rect(14 + blockWidth + 6, blockY, blockWidth, blockHeight, 'F');
  doc.rect(14 + blockWidth + 6, blockY, blockWidth, blockHeight, 'S');

  doc.setFillColor(212, 160, 23);
  doc.rect(14 + blockWidth + 6, blockY, blockWidth, 1.5, 'F'); // Line at top

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('B. SOC2 & GDPR Security Directives', 14 + blockWidth + 10, blockY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const secLines = doc.splitTextToSize(
    'All LLM integration endpoints require robust PII-scrubbed tokenization layers prior to Azure API gateway exposure. Audit logging is structured, permanent, and compiled directly at DB level. Role-based access controls represent a strict hierarchical tree where data is segmented securely among Claims, Underwriting, and Compliance groups.',
    blockWidth - 8
  );
  doc.text(secLines, 14 + blockWidth + 10, blockY + 11.5);

  // Footer on Page 2
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('AXA XL Enterprise AI Architecture Board   |   Strictly Confidential', 14, pageHeight - 11);
  doc.text('Page 2 of 3', pageWidth - 26, pageHeight - 11);


  // --------------------------------------------------------------------------
  // PAGE 3: №1 INITIATIVE (ClaimsSense AI) DEEP-DIVE & ADOPTION STRATEGY
  // --------------------------------------------------------------------------
  doc.addPage();

  // Draw Page 3 Header
  doc.setFillColor(0, 91, 172);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setFillColor(212, 160, 23);
  doc.rect(0, 16, pageWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('AXA XL   |   FLAGSHIP STRATEGIC LIGHTHOUSE SPOTLIGHT', 14, 10.5);

  currentY = 28;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('FLAGSHIP №1 HIGHLIGHT: CLAIMSSENSE AI', 14, currentY);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(14, currentY + 2, pageWidth - 14, currentY + 2);

  // Detailed Highlight layout (ClaimsSense)
  const lighthouse = ideas[0]; // ClaimsSense is ideas[0]

  doc.setFillColor(248, 250, 252);
  doc.rect(14, currentY + 5, pageWidth - 28, 48, 'F');
  doc.setDrawColor(0, 91, 172);
  doc.setLineWidth(0.5);
  doc.rect(14, currentY + 5, pageWidth - 28, 48, 'S');

  // Title inside card
  doc.setTextColor(0, 91, 172);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${lighthouse.name.toUpperCase()} (COMPLIANCE INDEX: ${lighthouse.overallScore}%)`, 18, currentY + 11);

  // Problem definition
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.text('CORE BUSINESS PAIN POINT:', 18, currentY + 16);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const probParaWidth = pageWidth - 40;
  const probLines = doc.splitTextToSize(lighthouse.problem, probParaWidth);
  doc.text(probLines, 18, currentY + 20);

  // Why AXA Importance
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.text('STRATEGIC VIABILITY IMPERATIVE:', 18, currentY + 28);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const impLines = doc.splitTextToSize(lighthouse.whyAXA, probParaWidth);
  doc.text(impLines, 18, currentY + 32);

  // Core Tech Architecture
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.text('BLUEPRINT INFRASTRUCTURE PATHWAY:', 18, currentY + 41);
  doc.setTextColor(0, 91, 172);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(lighthouse.arch, 18, currentY + 45);

  // Features list
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('KEY FUNCTIONAL CAPABILITIES (FNOL AUTOMATION)', 14, currentY + 61);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(14, currentY + 63, pageWidth - 14, currentY + 63);

  let featureY = currentY + 68;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  // Showcase top 6 features from ClaimsSense
  const showcaseFeatures = lighthouse.features.slice(0, 6);
  showcaseFeatures.forEach((feat, idx) => {
    // Bullet symbol
    doc.setFillColor(212, 160, 23); // gold bullet
    doc.rect(16, featureY - 2.2, 2, 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.text(feat, 21, featureY);
    featureY += 6.5;
  });

  // Enterprise Rollout Roadmaps & Deployment Instructions
  const roadmapY = featureY + 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ENTERPRISE ADOPTION & TIMELINE EXPECTATIONS', 14, roadmapY);
  doc.line(14, roadmapY + 2, pageWidth - 14, roadmapY + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  
  const roadmapText = doc.splitTextToSize(
    "To ensure pristine quality of delivery, all 18 proposed models will execute sequentially under the Sandbox Pilot Framework. Flagship initiatives (ClaimsSense AI and UnderwriteIQ) maintain immediate prioritized development timelines (estimated 6-8 weeks prototype cycle). Standard operations require parallel integration testing, model drift monitoring setups via MLflow, and continuous Azure compliance verification audits. For further architectural blueprints or database schemas, personnel may navigate directly to the interactive 'Detailed Evaluation' and 'Top 5 PRDs' views inside the live digital platform application.",
    pageWidth - 28
  );
  doc.text(roadmapText, 14, roadmapY + 7);

  // Digital Signatures box
  const signY = pageHeight - 65;
  doc.setFillColor(248, 250, 252);
  doc.rect(14, signY, pageWidth - 28, 38, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, signY, pageWidth - 28, 38, 'S');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('EXECUTIVE SYSTEM REVIEWS & COMPLIANCE SIGNOFF', 18, signY + 6);

  // Line separating columns
  doc.setLineWidth(0.25);
  doc.line(pageWidth / 2, signY + 12, pageWidth / 2, signY + 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);

  // Left Signee
  doc.text('DIGITAL INNOVATION LEAD:', 18, signY + 14);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.text('Ankit Kumar', 18, signY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('AXA XL Digital Innovation Labs', 18, signY + 23);
  doc.text('Signed digitally via enterprise token auth', 18, signY + 27);
  doc.setFont('courier', 'normal');
  doc.text('[TOKEN AUTH: ACTIVE-AK-2026-DX-990]', 18, signY + 32);

  // Right Signee
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('CHIEF ENTERPRISE ARCHITECT:', (pageWidth / 2) + 6, signY + 14);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.text('AXA XL Architecture Board Chair', (pageWidth / 2) + 6, signY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Review Committee EMEA-Central', (pageWidth / 2) + 6, signY + 23);
  doc.text('Signed via automated governance workflow', (pageWidth / 2) + 6, signY + 27);
  doc.setFont('courier', 'normal');
  doc.text('[APPROVAL CODE: COMP-2026-XL-BOARD]', (pageWidth / 2) + 6, signY + 32);

  // Footer Page 3
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('AXA XL Enterprise AI Architecture Board   |   Strictly Confidential', 14, pageHeight - 11);
  doc.text('Page 3 of 3', pageWidth - 26, pageHeight - 11);

  // Trigger browser download action
  doc.save('AXA_XL_Enterprise_AI_Portfolio_Report.pdf');
}
