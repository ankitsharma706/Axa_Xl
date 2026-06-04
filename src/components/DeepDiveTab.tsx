/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DeepDive, QaItem } from '../types';
import { 
  Building, BookOpen, Clock, FolderGit, FileCode, CheckCircle, 
  Linkedin, Award, User, HelpCircle, ArrowUpRight, Copy, Check, 
  ChevronRight, ChevronDown, Sparkles, AlertCircle, FileText
} from 'lucide-react';

interface DeepDiveTabProps {
  deepDive: DeepDive;
}

export default function DeepDiveTab({ deepDive }: DeepDiveTabProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState<'blueprint' | 'timeline' | 'folder' | 'interview' | 'deck'>('blueprint');
  const [qaSearch, setQaSearch] = useState('');
  const [expandedQaIdx, setExpandedQaIdx] = useState<number | null>(0);

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredQa = deepDive.qaItems.filter(qa => 
    qa.q.toLowerCase().includes(qaSearch.toLowerCase()) ||
    qa.a.toLowerCase().includes(qaSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      
      {/* Upper Pitch Binder Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="bg-[#005BAC]/10 text-[#005BAC] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
            №1 Recommendation
          </span>
          <h2 className="font-sans font-extrabold text-[#01142F] text-2xl tracking-tight leading-tight mt-3">
            ClaimsSense AI — Delivery Plan
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            The flagship proposal: claims lifecycle optimizer compressing triage turnaround by 60%, delivering significant leakage protection, and automating document-intensive specialty FNOL workflows on Azure.
          </p>
        </div>
        
        {/* Sub Navigation segment controls */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl gap-0.5 border border-slate-200 shrink-0 md:self-center self-start">
          {[
            { id: 'blueprint', label: 'Business Strategy' },
            { id: 'timeline', label: 'Gantt Roadmap' },
            { id: 'folder', label: 'Folder Repo Tree' },
            { id: 'interview', label: 'Interview Guide' },
            { id: 'deck', label: '10 Slide Pitch' },
          ].map((seg) => (
            <button
              id={`deepdive-tab-${seg.id}`}
              key={seg.id}
              onClick={() => setActiveSegment(seg.id as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg capitalize transition ${
                activeSegment === seg.id
                  ? 'bg-white text-[#005BAC] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEGMENT 1: BLUEPRINT */}
      {activeSegment === 'blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#01142F] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <Building className="h-4 w-4 text-[#005BAC]" />
                Executive Summary & Strategy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">{deepDive.execSummary}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#01142F] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <BookOpen className="h-4 w-4 text-[#005BAC]" />
                Specialty Market Inefficiencies
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">{deepDive.marketNeed}</p>
            </div>
          </div>

          {/* Social Proof & Deliverables Checklist */}
          <div className="space-y-6">
            
            {/* Resume Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#005BAC]"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Undergrad/Resume Statement</span>
                <button
                  onClick={() => handleCopyText(deepDive.resumeDesc, 'resume')}
                  className="text-slate-400 hover:text-slate-700 transition"
                >
                  {copiedKey === 'resume' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium">
                {deepDive.resumeDesc}
              </p>
            </div>

            {/* LinkedIn Copying Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Linkedin className="h-3.5 w-3.5 text-emerald-600" />
                  Shared Social Proof
                </span>
                <button
                  onClick={() => handleCopyText(deepDive.linkedIn, 'linkedin')}
                  className="text-slate-400 hover:text-emerald-600 transition"
                >
                  {copiedKey === 'linkedin' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 select-all whitespace-pre-line font-medium leading-relaxed max-h-48 overflow-y-auto">
                {deepDive.linkedIn}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SEGMENT 2: TIMELINE Roadmaps */}
      {activeSegment === 'timeline' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-sans font-bold text-slate-800 text-sm">6-Week Agile Delivery Roadmap</h3>
            <p className="text-xs text-slate-500">Sprint milestones required to release the ClaimsSense MVP to AXA XL adjusters.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-3.5 pl-6 space-y-8 py-2">
            {deepDive.weekPlan.map((week, idx) => (
              <div key={idx} className="relative">
                {/* Visual Dot */}
                <span className="absolute -left-[35px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-[#005BAC] ring-4 ring-[#005BAC]/5"></span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-[#005BAC] uppercase tracking-wider font-mono">
                    {week.w} — System Integration
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                    {week.task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEGMENT 3: REPO TREE (Interactive folder explorer representation) */}
      {activeSegment === 'folder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Repository Tree Outline</span>
              <button
                onClick={() => handleCopyText(deepDive.repoStructure, 'repo')}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition"
              >
                {copiedKey === 'repo' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                Copy Structure
              </button>
            </div>
            
            <div className="rounded-xl font-mono text-xs text-emerald-300 whitespace-pre overflow-x-auto leading-relaxed max-h-[450px]">
              {deepDive.repoStructure}
            </div>
          </div>

          {/* Quick Explanations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-indigo-100 pb-2 flex items-center gap-1.5 select-none text-[#005BAC]">
              <FolderGit className="h-4 w-4" />
              Directory Architecture
            </h4>
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                <strong className="text-slate-800">frontend:</strong> Unified Single Page app utilizing client router state, tailwind presets, and optimized motion layouts to map ratings accurately.
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                <strong className="text-slate-800">backend:</strong> High-performance FastAPI app connecting via LangChain directly to Azure OpenAI GPT-4o embeddings context.
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                <strong className="text-slate-800">ml/training:</strong> Severity classification pipeline executing shadow deployments, evaluation drifting monitoring, and local MLflow tracking parameters.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT 4: INTERVIEW GUIDE */}
      {activeSegment === 'interview' && (
        <div className="space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-slate-800 text-sm">Innovation Interview Q&A Preparation</h3>
                <p className="text-xs text-slate-500">Defending decision parameters and engineering choices before corporate architectural leads.</p>
              </div>
              <input
                id="qa-search-bar-input"
                type="text"
                placeholder="Search Questions..."
                value={qaSearch}
                onChange={e => setQaSearch(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-[#005BAC] outline-none w-full sm:max-w-[240px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredQa.map((qaItem, idx) => {
              const isOpen = expandedQaIdx === idx;
              return (
                <div
                  id={`deep-qa-accordion-${idx}`}
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xxs cursor-pointer hover:border-slate-300"
                  onClick={() => setExpandedQaIdx(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFC]/55">
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      Q: {qaItem.q}
                    </span>
                    {isOpen ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                  </div>
                  {isOpen && (
                    <div className="p-4 border-t border-slate-100 bg-white leading-relaxed text-xs sm:text-sm text-slate-600">
                      {qaItem.a}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredQa.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-400 bg-slate-50 border rounded-xl">
                No questions matched your search query.
              </div>
            )}
          </div>

        </div>
      )}

      {/* SEGMENT 5: 10 SLIDE PITCH METHODOLOGY */}
      {activeSegment === 'deck' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-sans font-bold text-slate-800 text-sm">CXO Pitch Presentation Deck Guide</h3>
            <p className="text-xs text-slate-500">Proposed 10 slide structural deck layout to present ClaimsSense AI directly to AXA XL Digital Innovation boards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { num: 'Slide 1', title: 'Title & Vision', desc: 'ClaimsSense AI | AXA XL Claims Intelligence Platform. Outline project vision statement.' },
              { num: 'Slide 2', title: 'The Leakage Challenge', desc: 'Detailing $80B insurance leakage inefficiencies and specialty adjusters case overload parameters.' },
              { num: 'Slide 3', title: 'Flagship Solution Overview', desc: 'Interactive live prototype thumbnail, explaining severity triage and pipeline speed optimization.' },
              { num: 'Slide 4', title: 'System Architecture', desc: 'Deep dive system architecture overview connecting FastAPI, Pinecone Vector indexes, and Azure OpenAI.' },
              { num: 'Slide 5', title: 'Technical AI Pipelines', desc: 'Embedding strategies, RAG citation compliance models, and GPT-4o prompt guardrails.' },
              { num: 'Slide 6', title: 'Audit and Database schemas', desc: 'Database relational visual mapping and strict regulatory compliance controls.' },
              { num: 'Slide 7', title: 'DevOps and Elastic Deployment', desc: 'GitHub actions setup, multi-tenant segmentation, docker containers, and blue-green releases.' },
              { num: 'Slide 8', title: 'Zero Trust Security & PII', desc: 'PII token masking before API transfers, SAML authentication, and encryption keys.' },
              { num: 'Slide 9', title: 'Adjuster Workflows Demo', desc: 'Step-by-step pipeline preview showing pdf upload, LLM severity triage, and reserve calculation.' },
              { num: 'Slide 10', title: 'Business Financial KPI Metrics', desc: 'Financial outcomes: MTTR drops, ROI evaluations, and scalable expansion roadmaps.' },
            ].map((slide, idx) => (
              <div key={idx} className="bg-[#F8FAFC]/55 border border-slate-200/60 p-4 rounded-xl flex items-start gap-4">
                <span className="bg-[#005BAC]/10 text-[#005BAC] text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 font-mono tracking-wider uppercase">
                  {slide.num}
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800">{slide.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
