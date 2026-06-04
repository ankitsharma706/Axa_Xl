/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Idea {
  rank: number;
  name: string;
  domain: string;
  // Scores
  relScore: number;      // Relevance
  aiScore: number;       // AI Usage
  cloudScore: number;    // Cloud Usage
  devopsScore: number;   // DevOps Usage
  overallScore: number;  // Overall Score
  
  // Details
  problem: string;
  whyAXA: string;
  users: string[];
  features: string[];
  aiDetails: string[];
  arch: string;
  db: string;
  cloudDetails: string;
  devopsDetails: string;
  security: string;
  stack: string;
  complexity: string;
  resumeImpact: string;
  talkingPoints: string[];
  enhancements: string[];
  enterprise: string[];
}

export interface PrdSection {
  h: string;
  body?: string;
  ul?: string[];
  weeks?: string[];
}

export interface Prd {
  id: number;
  title: string;
  sections: PrdSection[];
}

export interface QaItem {
  q: string;
  a: string;
}

export interface DeepDive {
  execSummary: string;
  marketNeed: string;
  repoStructure: string;
  weekPlan: { w: string; task: string }[];
  resumeDesc: string;
  linkedIn: string;
  qaItems: QaItem[];
}
