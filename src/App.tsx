/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import KpiSection from './components/KpiSection';
import IdeasTab from './components/IdeasTab';
import IdeaDetailTab from './components/IdeaDetailTab';
import PrdsTab from './components/PrdsTab';
import DeepDiveTab from './components/DeepDiveTab';

import { IDEAS, TOP5_PRDS, DEEP_DIVE } from './data';
import { Idea } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { generatePdfReport } from './utils/pdfGenerator';
import { FileDown } from 'lucide-react';
import FlagModal from './components/FlagModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ideas');
  // Pre-load ClaimsSense AI as the default selected idea so the sub-tab is immediately informative
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(IDEAS[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  // local flag storage logic
  const [flaggedProjects, setFlaggedProjects] = useState<Record<string, { reason: string; notes: string; timestamp: string }>>(() => {
    try {
      const stored = localStorage.getItem('axa_xl_flagged_projects');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // local archive storage logic
  const [archivedProjects, setArchivedProjects] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('axa_xl_archived_projects');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleToggleArchive = (projectName: string) => {
    setArchivedProjects(prev => {
      const updated = prev.includes(projectName)
        ? prev.filter(name => name !== projectName)
        : [...prev, projectName];
      localStorage.setItem('axa_xl_archived_projects', JSON.stringify(updated));
      return updated;
    });
  };

  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [ideaToFlag, setIdeaToFlag] = useState<Idea | null>(null);

  const handleOpenFlagModal = (idea: Idea) => {
    setIdeaToFlag(idea);
    setFlagModalOpen(true);
  };

  const handleSaveFlag = (ideaName: string, flagData: { reason: string; notes: string; timestamp: string } | null) => {
    setFlaggedProjects(prev => {
      const updated = { ...prev };
      if (flagData === null) {
        delete updated[ideaName];
      } else {
        updated[ideaName] = flagData;
      }
      localStorage.setItem('axa_xl_flagged_projects', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setActiveTab('detail');
    // Scroll to top smoothly so that user immediately notices the transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setActiveTab('ideas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadReport = () => {
    setIsDownloading(true);
    // Use setTimeout so the UI has time to update to the downloading state before the CPU blocks on PDF generation
    setTimeout(() => {
      try {
        generatePdfReport(IDEAS);
      } catch (err) {
        console.error('Error generating PDF report:', err);
      } finally {
        setIsDownloading(false);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans pb-16">
      
      {/* Sticky Segmented Header navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedIdeaName={selectedIdea?.name} 
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        
        {/* Executive Presentation Pitch Greeting block */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#005BAC]/10 to-[#009FE3]/5 bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden select-none">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#005BAC]/5 rounded-full blur-2xl"></div>
          <div>
            <h1 className="text-xl font-extrabold text-[#01142F] tracking-tight sm:text-2xl">
              AXA XL Enterprise AI Architecture Board
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              Strategic mapping of 18 digital initiatives, product requirements, database visual structures, and complete implementation plans. Use controls below to analyze.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              id="download-report-btn"
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className={`group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-300 ${
                isDownloading 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-[#005BAC] hover:bg-[#004B8C] text-white active:scale-95 cursor-pointer'
              }`}
            >
              <FileDown className={`h-4 w-4 text-sky-200 transition-transform ${isDownloading ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              <span>{isDownloading ? 'Compiling Report PDF...' : 'Download Executive Report'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs bg-white/80 border border-slate-200/60 px-4 py-2.5 rounded-xl shrink-0 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-500">Board Status:</span>
              <span className="font-bold text-[#005BAC]">Executive Presentation</span>
            </div>
          </div>
        </section>

        {/* Global Overview KPIs */}
        <KpiSection ideas={IDEAS} />

        {/* Dynamic Route Content with Framer Motion slide transitions */}
        <section className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'ideas' && (
              <motion.div
                key="ideas-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <IdeasTab
                  ideas={IDEAS}
                  onSelectIdea={handleSelectIdea}
                  selectedIdea={selectedIdea}
                  flaggedProjects={flaggedProjects}
                  onOpenFlagModal={handleOpenFlagModal}
                  archivedProjects={archivedProjects}
                  onToggleArchive={handleToggleArchive}
                />
              </motion.div>
            )}

            {activeTab === 'detail' && (
              <motion.div
                key="detail-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <IdeaDetailTab
                  idea={selectedIdea}
                  onBackToGrid={handleBackToGrid}
                  flaggedProjects={flaggedProjects}
                  onOpenFlagModal={handleOpenFlagModal}
                  archivedProjects={archivedProjects}
                  onToggleArchive={handleToggleArchive}
                />
              </motion.div>
            )}

            {activeTab === 'top5' && (
              <motion.div
                key="top5-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <PrdsTab prds={TOP5_PRDS} />
              </motion.div>
            )}

            {activeTab === 'deep' && (
              <motion.div
                key="deep-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <DeepDiveTab deepDive={DEEP_DIVE} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* Humble Footer */}
      <footer className="mt-20 border-t border-[#E2E8F0] bg-white select-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-[#94A3B8] space-y-2">
          <p className="font-semibold text-[#475569]">AXA XL Enterprise AI Project Intelligence Platform</p>
          <p className="text-slate-500">Designed for digital transformation directors, digital underwriters, and enterprise system auditors. Deployed dynamically on secure Azure services.</p>
          <p className="text-[10px] text-slate-400 mt-2">© 2026 AXA XL Digital Innovation Labs. Authorized Enterprise Personnel Only.</p>
        </div>
        
        {/* Underwriting Status Bar */}
        <div className="border-t border-[#E2E8F0] bg-slate-50/50 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#94A3B8] gap-4">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              System Active: EMEA-Central
            </span>
            <span>Last sync: 2 minutes ago</span>
          </div>
          <div className="font-semibold text-slate-500">
            AXA XL Enterprise AI Project Intelligence Dashboard &copy; 2026
          </div>
        </div>
      </footer>

      {/* Flag Exception Modal Dialog backdrop container */}
      <AnimatePresence>
        {flagModalOpen && (
          <FlagModal
            isOpen={flagModalOpen}
            idea={ideaToFlag}
            onClose={() => {
              setFlagModalOpen(false);
              setIdeaToFlag(null);
            }}
            currentFlag={ideaToFlag ? (flaggedProjects[ideaToFlag.name] || null) : null}
            onSaveFlag={handleSaveFlag}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
