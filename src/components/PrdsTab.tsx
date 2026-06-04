/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Prd } from '../types';
import { ChevronDown, ChevronUp, Copy, Check, FileText, Layout, Play, Milestone, Database, HelpCircle } from 'lucide-react';

interface PrdsTabProps {
  prds: Prd[];
}

export default function PrdsTab({ prds }: PrdsTabProps) {
  const [selectedPrdId, setSelectedPrdId] = useState<number>(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Executive Summary': true,
    'Business Value': true,
    'Functional Requirements': true,
    'System Architecture': true,
  });
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const activePrd = prds.find(p => p.id === selectedPrdId) || prds[0];

  const toggleSection = (header: string) => {
    setOpenSections(prev => ({
      ...prev,
      [header]: !prev[header],
    }));
  };

  const handleCopySectionBody = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(title);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const currentIconForSection = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('executive')) return FileText;
    if (t.includes('business')) return Milestone;
    if (t.includes('functional')) return Layout;
    if (t.includes('architecture')) return Database;
    if (t.includes('database')) return Database;
    return HelpCircle;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-none animate-in fade-in duration-300">
      
      {/* Sidebar Selector for Top 5 PRDs */}
      <div className="lg:col-span-1 space-y-3">
        <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/50 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 w-full">
          {prds.map((prd, idx) => (
            <button
              id={`prd-sidebar-btn-${prd.id}`}
              key={prd.id}
              onClick={() => setSelectedPrdId(prd.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-xs font-semibold whitespace-nowrap lg:whitespace-normal text-left transition ${
                prd.id === selectedPrdId
                  ? 'bg-white text-[#005BAC] shadow-sm font-bold border-l-3 border-[#005BAC] pl-3'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              <div className={`hidden sm:flex h-6 w-6 rounded-md items-center justify-center font-mono font-bold text-[10px] ${
                prd.id === selectedPrdId ? 'bg-[#005BAC]/10 text-[#005BAC]' : 'bg-slate-200 text-slate-500'
              }`}>
                0{idx + 1}
              </div>
              <div className="flex flex-col">
                <span className="leading-tight">{prd.title.split(' — ')[0]}</span>
                <span className="text-[9px] font-bold opacity-60 font-mono tracking-wider uppercase mt-0.5">Specifications</span>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Consulting Quote Box */}
        <div className="hidden lg:block bg-[#005BAC]/5 border border-[#005BAC]/10 rounded-xl p-4">
          <h5 className="text-[10px] font-bold text-[#005BAC] uppercase tracking-wider mb-2">Architect Compliance</h5>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            These Product Requirement Documents align with Gartner standards for full stack AI pipelines in regulated commercial reinsurance classes.
          </p>
        </div>
      </div>

      {/* Main PRD Content Panel with Collapsible Accordions */}
      <div id="prd-content-container" className="lg:col-span-3 space-y-4">
        
        {/* Binder Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="font-sans font-extrabold text-[#01142F] text-lg lg:text-xl tracking-tight leading-tight">
              {activePrd.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Refined product roadmap blueprint. Use accordion triggers below to expand core specifications.
            </p>
          </div>
          
          <button
            onClick={() => handleCopySectionBody(JSON.stringify(activePrd, null, 2), 'prd-schema')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#00BAC5] hover:text-[#00BAC5]/80 border border-[#00BAC5]/20 bg-[#00BAC5]/5 px-3 py-1.5 rounded-xl transition"
          >
            {copiedSection === 'prd-schema' ? (
              <>
                <Check className="h-3.5 w-3.5" /> Block Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy Entire PRD JSON
              </>
            )}
          </button>
        </div>

        {/* Sections Listing as Accordions */}
        <div className="space-y-3">
          {activePrd.sections.map((sec, idx) => {
            const isOpen = openSections[sec.h] || false;
            const SectionIcon = currentIconForSection(sec.h);

            return (
              <div
                id={`prd-section-accordion-${idx}`}
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition duration-200 hover:border-slate-300"
              >
                
                {/* Header Toggle bar */}
                <div
                  onClick={() => toggleSection(sec.h)}
                  className="flex items-center justify-between p-4 bg-[#F8FAFC]/55 cursor-pointer hover:bg-slate-50 select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#005BAC]">
                      <SectionIcon className="h-4 w-4" />
                    </div>
                    <span className="font-sans font-bold text-[#0F172A] text-xs uppercase tracking-wide">
                      {sec.h}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Clipboard copy if text is available */}
                    {sec.body && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopySectionBody(sec.body || '', sec.h);
                        }}
                        className="text-slate-400 hover:text-slate-700 transition"
                        title="Copy text of section"
                      >
                        {copiedSection === sec.h ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Collapsible content block */}
                {isOpen && (
                  <div className="p-5 border-t border-slate-100 bg-white leading-relaxed text-sm text-slate-700 space-y-3">
                    
                    {/* Standard paragraph bodies */}
                    {sec.body && (
                      <p className="whitespace-pre-wrap text-slate-600 text-xs sm:text-sm">
                        {sec.body}
                      </p>
                    )}

                    {/* Unordered bullet items format */}
                    {sec.ul && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sec.ul.map((item, keyIdx) => (
                          <li key={keyIdx} className="flex gap-2.5 items-start bg-slate-50/50 p-2 border border-slate-100 rounded-lg text-xs text-slate-600 leading-relaxed">
                            <span className="font-bold text-[#005BAC]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Week-by-Week implementation roadmaps */}
                    {sec.weeks && (
                      <div className="grid grid-cols-1 gap-3">
                        {sec.weeks.map((weekText, keyIdx) => {
                          const [weekTitle, weekDesc] = weekText.split(': ');
                          return (
                            <div key={keyIdx} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 shadow-xxs">
                              <span className="bg-[#005BAC]/10 text-[#005BAC] text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg shrink-0 font-mono tracking-wider uppercase">
                                {weekTitle}
                              </span>
                              <span className="text-xs text-slate-600 font-medium">
                                {weekDesc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
