/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Idea } from '../types';
import { Search, ArrowUpDown, Filter, Award, Sparkles, AlertCircle, FileText, ChevronRight, Flag, Archive, Scale, X } from 'lucide-react';

interface IdeasTabProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  selectedIdea: Idea | null;
  flaggedProjects: Record<string, { reason: string; notes: string; timestamp: string }>;
  onOpenFlagModal: (idea: Idea) => void;
  archivedProjects: string[];
  onToggleArchive: (projectName: string) => void;
}

type SortField = 'overallScore' | 'relScore' | 'aiScore' | 'cloudScore' | 'devopsScore' | 'rank';
type ViewMode = 'table' | 'matrix' | 'cards';

export default function IdeasTab({ 
  ideas, 
  onSelectIdea, 
  selectedIdea, 
  flaggedProjects, 
  onOpenFlagModal,
  archivedProjects,
  onToggleArchive
}: IdeasTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('overallScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [minScore, setMinScore] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [comparedIdeaNames, setComparedIdeaNames] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  const toggleCompare = (projectName: string) => {
    setComparedIdeaNames(prev => {
      if (prev.includes(projectName)) {
        return prev.filter(name => name !== projectName);
      } else {
        return [...prev, projectName];
      }
    });
  };

  // Extract unique domains for the filter dropdown
  const domains = useMemo(() => {
    // Only extract domains from non-archived projects when not showing archived,
    // or from all projects if showArchived is true.
    const visibleIdeas = ideas.filter(idea => showArchived || !archivedProjects.includes(idea.name));
    const list = new Set(visibleIdeas.map(i => i.domain));
    return ['All', ...Array.from(list)];
  }, [ideas, archivedProjects, showArchived]);

  // Compute number of archived projects
  const archivedCount = useMemo(() => {
    return ideas.filter(idea => archivedProjects.includes(idea.name)).length;
  }, [ideas, archivedProjects]);

  // Handle sorting/filtering
  const filteredIdeas = useMemo(() => {
    return ideas
      .filter(idea => {
        const isArchived = archivedProjects.includes(idea.name);
        // If "Show Archived" is false, we filter out any archived ideas.
        if (!showArchived && isArchived) {
          return false;
        }

        const matchesQuery = 
          idea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.problem.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDomain = selectedDomain === 'All' || idea.domain === selectedDomain;
        const matchesScore = idea.overallScore >= minScore;

        return matchesQuery && matchesDomain && matchesScore;
      })
      .sort((a, b) => {
        let valueA = a[sortField === 'overallScore' ? 'overallScore' : sortField === 'rank' ? 'rank' : sortField] as number;
        let valueB = b[sortField === 'overallScore' ? 'overallScore' : sortField === 'rank' ? 'rank' : sortField] as number;

        // Invert default sort if numeric fields
        if (sortField === 'rank') {
          return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        }
      });
  }, [ideas, searchQuery, selectedDomain, sortField, sortDirection, minScore]);

  const comparedIdeas = useMemo(() => {
    return ideas.filter(idea => comparedIdeaNames.includes(idea.name));
  }, [ideas, comparedIdeaNames]);

  const maxOverallScore = useMemo(() => {
    if (comparedIdeas.length === 0) return 0;
    return Math.max(...comparedIdeas.map(i => i.overallScore));
  }, [comparedIdeas]);

  const maxRelScore = useMemo(() => {
    if (comparedIdeas.length === 0) return 0;
    return Math.max(...comparedIdeas.map(i => i.relScore));
  }, [comparedIdeas]);

  const maxAiScore = useMemo(() => {
    if (comparedIdeas.length === 0) return 0;
    return Math.max(...comparedIdeas.map(i => i.aiScore));
  }, [comparedIdeas]);

  const maxCloudScore = useMemo(() => {
    if (comparedIdeas.length === 0) return 0;
    return Math.max(...comparedIdeas.map(i => i.cloudScore));
  }, [comparedIdeas]);

  const maxDevopsScore = useMemo(() => {
    if (comparedIdeas.length === 0) return 0;
    return Math.max(...comparedIdeas.map(i => i.devopsScore));
  }, [comparedIdeas]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const scoreGradient = (score: number) => {
    if (score >= 90) return 'from-[#005BAC] to-[#009FE3]';
    if (score >= 80) return 'from-sky-500 to-sky-400';
    if (score >= 70) return 'from-emerald-500 to-emerald-400';
    return 'from-slate-400 to-slate-300';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Search & Filter Controls Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
            <input
              id="search-ideas-input"
              type="text"
              placeholder="Search by project name, domain, problems, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/10 outline-none transition"
            />
          </div>

          {/* Filters container */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Domain Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                id="domain-filter-select"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 focus:border-[#005BAC] outline-none max-w-[200px]"
              >
                {domains.map(dom => (
                  <option key={dom} value={dom}>{dom}</option>
                ))}
              </select>
            </div>

            {/* Score Threshold Filter */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
              <span className="text-slate-500 font-medium">Min Score:</span>
              <input 
                id="min-score-slider"
                type="range" 
                min="0" 
                max="100" 
                value={minScore} 
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="h-1.5 w-20 rounded bg-slate-200 accent-[#005BAC] cursor-pointer"
              />
              <span className="font-bold text-slate-700 w-6 text-right">{minScore}</span>
            </div>

            {/* Show Archived filter toggle option */}
            <button
              id="btn-toggle-show-archived"
              onClick={() => setShowArchived(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer select-none ${
                showArchived
                  ? 'bg-amber-500/10 text-amber-700 border-amber-200 hover:bg-amber-500/15'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <Archive className={`h-3.5 w-3.5 ${showArchived ? 'fill-amber-600' : 'text-slate-400'}`} />
              <span>Show Archived ({archivedCount})</span>
            </button>

            {/* View Segments toggle selector */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              {(['table', 'cards', 'matrix'] as ViewMode[]).map((mode) => (
                <button
                  id={`btn-viewmode-${mode}`}
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                    viewMode === mode 
                      ? 'bg-white text-[#005BAC] shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* MATRIX VIEW (Consulting Standard 2D Grid) */}
      {viewMode === 'matrix' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <div className="mb-4">
            <h3 className="font-sans font-bold text-slate-800 text-sm">McKinsey / Gartner Strategic Feasibility Matrix</h3>
            <p className="text-xs text-slate-500">Mapping 18 projects on Technical Readiness (Feasibility) versus Strategic/Financial Alignment (Relevance).</p>
          </div>
          
          <div className="relative border-l-2 border-b-2 border-slate-300 w-full h-[400px] mt-8 bg-slate-50/50 rounded-tr-xl flex flex-col justify-between">
            {/* Outer Box Categories */}
            <span className="absolute -top-6 left-2 text-[10px] font-bold text-[#005BAC] uppercase tracking-wider">High Strategic Fit (Relevance) ↑</span>
            <span className="absolute -bottom-6 right-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">High Feasibility (Cloud & DevOps) →</span>

            {/* Inner quadrants grids */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-dashed border-slate-200 border">
              {/* Quadrant 1: Top-Right (Superstars/Gold) */}
              <div className="border-r border-b border-dashed border-slate-200 bg-amber-50/10 p-2 relative">
                <span className="absolute top-2 right-2 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase font-mono">Q1: Flagships / Top Priority</span>
              </div>
              {/* Quadrant 2: Top-Left (High Value, Tech Challenge) */}
              <div className="border-b border-dashed border-slate-200 bg-[#005BAC]/5 p-2 relative">
                <span className="absolute top-2 right-2 text-[9px] font-bold text-[#005BAC] bg-[#005BAC]/5 px-1.5 py-0.5 rounded uppercase font-mono">Q2: Heavy Investments</span>
              </div>
              {/* Quadrant 3: Bottom-Right (Easy Wins, Lower Value) */}
              <div className="border-r border-dashed border-slate-200 bg-emerald-50/5 p-2 relative">
                <span className="absolute top-2 right-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase font-mono">Q3: Operational Wins</span>
              </div>
              {/* Quadrant 4: Bottom-Left (Low Value/Low Tech) */}
              <div className="bg-slate-100/10 p-2 relative">
                <span className="absolute top-2 right-2 text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase font-mono">Q4: Tactical Gaps</span>
              </div>
            </div>

            {/* Plot elements */}
            {filteredIdeas.map((idea) => {
              // X: (Cloud + DevOps) / 2
              const feasibility = (idea.cloudScore + idea.devopsScore) / 2;
              const y = idea.relScore;

              // Transform into percent relative (range 50 to 100 typically)
              const transformX = ((feasibility - 60) / 40) * 100;
              const transformY = 100 - (((y - 60) / 40) * 100);

              const isTop5 = idea.rank <= 5;

              return (
                <button
                  id={`matrix-dot-${idea.rank}`}
                  key={idea.rank}
                  onClick={() => onSelectIdea(idea)}
                  className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 flex items-center justify-center rounded-full text-[10px] font-extrabold shadow-md cursor-pointer hover:scale-135 hover:z-50 transition ${
                    isTop5 
                      ? 'bg-amber-100 border-2 border-[#D4A017] text-slate-800 shadow-amber-200' 
                      : 'bg-white border-2 border-[#005BAC] text-[#005BAC] shadow-slate-200'
                  }`}
                  style={{ 
                    left: `${Math.max(5, Math.min(95, transformX))}%`, 
                    top: `${Math.max(5, Math.min(95, transformY))}%` 
                  }}
                  title={`${idea.name} (${idea.domain}) | Scores - Relevance: ${idea.relScore}, Feasibility: ${feasibility.toFixed(0)}`}
                >
                  {idea.rank}
                </button>
              );
            })}
          </div>

          <div className="mt-12 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-600">
            <AlertCircle className="h-4 w-4 text-[#005BAC]" />
            <span>Interactive Node Matrix. Bubble numbers correlate directly with the ideas list ranking. Hover or click nodes to read full technical schemas and PRD resources.</span>
          </div>
        </div>
      )}

      {/* CARD GRID VIEW (Consulting Brief format) */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea) => {
            const isTop5 = idea.rank <= 5;
            const isFlagged = !!flaggedProjects[idea.name];
            const isArchived = archivedProjects.includes(idea.name);

            return (
              <div
                id={`idea-brief-card-${idea.rank}`}
                key={idea.rank}
                onClick={() => onSelectIdea(idea)}
                className={`flex flex-col justify-between rounded-2xl border bg-white p-5 cursor-pointer shadow-xs hover:shadow-md transition duration-300 relative group overflow-hidden ${
                  isArchived
                    ? 'border-amber-200 hover:border-amber-300 bg-amber-50/10 opacity-90'
                    : isFlagged
                      ? 'border-rose-300 hover:border-rose-400 bg-rose-50/5'
                      : isTop5 
                        ? 'border-[#D4A017] hover:border-[#D4A017]/100' 
                        : 'border-slate-200 hover:border-[#005BAC]/40'
                } ${selectedIdea?.rank === idea.rank ? 'ring-2 ring-[#005BAC]/30' : ''}`}
              >
                {/* Visual Category Stripe */}
                <div className={`absolute top-0 right-0 left-0 h-1.5 ${
                  isArchived
                    ? 'bg-amber-500'
                    : isFlagged 
                      ? 'bg-rose-500' 
                      : isTop5 
                        ? 'bg-amber-400' 
                        : 'bg-[#005BAC]'
                }`}></div>
                
                <div>
                  <div className="flex items-start justify-between flex-wrap gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {idea.domain}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {isArchived && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1 select-none">
                          <Archive className="h-2.5 w-2.5 fill-amber-600 text-amber-600" />
                          Archived
                        </span>
                      )}
                      {isFlagged ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1 select-none animate-pulse">
                          <Flag className="h-2.5 w-2.5 fill-rose-600 text-rose-600" />
                          Flagged
                        </span>
                      ) : (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isTop5 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          #{idea.rank} Recommended
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-slate-900 text-base mt-2 group-hover:text-[#005BAC] transition">
                    {idea.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                    {idea.problem}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Compare Option */}
                    <label 
                      onClick={(e) => e.stopPropagation()} 
                      className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-500 hover:text-[#005BAC]"
                    >
                      <input
                        type="checkbox"
                        checked={comparedIdeaNames.includes(idea.name)}
                        onChange={() => toggleCompare(idea.name)}
                        className="rounded border-slate-300 text-[#005BAC] focus:ring-[#005BAC]/20 pointer-events-auto h-3.5 w-3.5 cursor-pointer accent-[#005BAC]"
                      />
                      <span className="text-[11px] select-none text-slate-500">Compare</span>
                    </label>

                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs text-slate-400">Compliance score:</span>
                      <span className="text-xs font-bold text-slate-700">{idea.overallScore}/100</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#005BAC] group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAILED EXECUTIVE TABLE VIEW (With modern gradients) */}
      {viewMode === 'table' && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden select-none">
          <div className="overflow-x-auto">
            <table id="ideas-evaluation-table" className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-4 text-center w-16 select-none">
                    <span className="text-[10px] font-extrabold text-slate-400">Compare</span>
                  </th>
                  <th className="py-4 px-4 text-center w-12">Rank</th>
                  <th className="py-4 px-4 min-w-[200px]">Project Proposal</th>
                  <th className="py-4 px-4 text-center">
                    <button onClick={() => toggleSort('relScore')} className="flex items-center gap-1 mx-auto hover:text-[#005BAC] transition uppercase font-bold text-[10px]">
                      Relevance <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <button onClick={() => toggleSort('aiScore')} className="flex items-center gap-1 mx-auto hover:text-[#005BAC] transition uppercase font-bold text-[10px]">
                      AI Tech <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <button onClick={() => toggleSort('cloudScore')} className="flex items-center gap-1 mx-auto hover:text-[#005BAC] transition uppercase font-bold text-[10px]">
                      Cloud <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <button onClick={() => toggleSort('devopsScore')} className="flex items-center gap-1 mx-auto hover:text-[#005BAC] transition uppercase font-bold text-[10px]">
                      DevOps <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <button onClick={() => toggleSort('overallScore')} className="flex items-center gap-1 mx-auto hover:text-[#005BAC] transition uppercase font-bold text-[10px]">
                      Overall <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-4 px-4 text-center w-16">Explore</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIdeas.map((idea, idx) => {
                  const isTop5 = idea.rank <= 5;
                  const isSelected = selectedIdea?.rank === idea.rank;
                  const isArchived = archivedProjects.includes(idea.name);

                  return (
                    <tr
                      id={`idea-row-${idea.rank}`}
                      key={idea.rank}
                      onClick={() => onSelectIdea(idea)}
                      className={`group hover:bg-slate-50/70 transition cursor-pointer select-none text-slate-700 ${
                        isArchived
                          ? 'bg-amber-50/5 opacity-85 border-l-2 border-l-amber-400'
                          : idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]/40'
                      } ${isSelected ? 'bg-sky-50/40 hover:bg-sky-50' : ''}`}
                    >
                      {/* Compare Checkbox Column */}
                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={comparedIdeaNames.includes(idea.name)}
                          onChange={() => toggleCompare(idea.name)}
                          className="rounded border-slate-300 text-[#005BAC] focus:ring-[#005BAC]/20 pointer-events-auto h-4 w-4 cursor-pointer mx-auto accent-[#005BAC]"
                        />
                      </td>

                      {/* Rank Indicator */}
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold leading-none ${
                          isTop5 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idea.rank}
                        </span>
                      </td>

                      {/* Name / Description info */}
                      <td className="py-4 px-4 font-normal">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans font-bold text-slate-900 group-hover:text-[#005BAC] text-sm transition">
                              {idea.name}
                            </span>
                            {isTop5 && (
                              <span className="bg-[#D4A017]/10 text-[#D4A017] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider select-none">
                                Top Pick
                              </span>
                            )}
                            {isArchived && (
                              <span
                                className="bg-amber-100 border border-amber-200 text-amber-800 text-[8px] sm:text-[9px] py-0.5 px-2 rounded-full font-bold flex items-center gap-1 select-none"
                                title="This project sits in Archive storage"
                              >
                                <Archive className="h-2.5 w-2.5 fill-amber-600 text-amber-600" />
                                ARCHIVED
                              </span>
                            )}
                            {flaggedProjects[idea.name] && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenFlagModal(idea);
                                }}
                                className="bg-rose-100 hover:bg-rose-200 border border-rose-205 text-rose-800 text-[8px] sm:text-[9px] py-0.5 px-2 rounded-full font-bold flex items-center gap-1 select-none cursor-pointer"
                                title={`Flag details: ${flaggedProjects[idea.name].notes}`}
                              >
                                <Flag className="h-2.5 w-2.5 fill-rose-600 text-rose-600" />
                                FLAGGED
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 mt-0.5 font-medium tracking-wide font-mono">
                            {idea.domain}
                          </span>
                        </div>
                      </td>

                      {/* Progress / Scores bar cells */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1 items-center max-w-[120px] mx-auto">
                          <span className="text-[11px] text-slate-600 font-bold">{idea.relScore}</span>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.relScore)}`} style={{ width: `${idea.relScore}%` }} />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1 items-center max-w-[120px] mx-auto">
                          <span className="text-[11px] text-slate-600 font-bold">{idea.aiScore}</span>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.aiScore)}`} style={{ width: `${idea.aiScore}%` }} />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1 items-center max-w-[120px] mx-auto">
                          <span className="text-[11px] text-slate-600 font-bold">{idea.cloudScore}</span>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.cloudScore)}`} style={{ width: `${idea.cloudScore}%` }} />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1 items-center max-w-[120px] mx-auto">
                          <span className="text-[11px] text-slate-600 font-bold">{idea.devopsScore}</span>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.devopsScore)}`} style={{ width: `${idea.devopsScore}%` }} />
                          </div>
                        </div>
                      </td>

                      {/* Overall Composite Score Pill */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center justify-center font-bold px-2.5 py-1 rounded-full text-xs font-mono select-none ${
                          isTop5 
                            ? 'bg-amber-100 text-[#D4A017] border border-amber-200' 
                            : 'bg-slate-100 text-[#005BAC] border border-slate-200'
                        }`}>
                          {idea.overallScore}
                        </span>
                      </td>

                      {/* Link shortcut icon */}
                      <td className="py-4 px-4 text-center">
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#005BAC] group-hover:translate-x-0.5 mx-auto transition" />
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredIdeas.length === 0 && (
            <div className="text-center py-12 px-4 select-none">
              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 text-sm font-semibold">No project proposals matched your filters</p>
              <p className="text-xs text-slate-400 mt-1">Try resetting the domain dropdown or lowering the score threshold.</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Tray for Selected Comparisons */}
      {comparedIdeaNames.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 border border-slate-800 text-white shadow-2xl rounded-2xl md:rounded-full px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-[92%] max-w-lg md:max-w-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl text-amber-400 select-none">
              <Scale className="h-5 w-5 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-extrabold tracking-wide text-slate-100">
                {comparedIdeaNames.length} Project{comparedIdeaNames.length > 1 ? 's' : ''} Selected for Comparison
              </p>
              <p className="text-[10px] text-slate-400 font-semibold font-mono truncate max-w-[280px]">
                {comparedIdeaNames.slice(0, 3).join(", ")}{comparedIdeaNames.length > 3 ? ` + ${comparedIdeaNames.length - 3} more` : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <button
              id="clear-compare-selections"
              onClick={() => setComparedIdeaNames([])}
              className="text-[10px] font-black text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 cursor-pointer transition select-none"
            >
              Clear All
            </button>
            <button
              id="trigger-comparison-modal"
              onClick={() => setIsCompareModalOpen(true)}
              disabled={comparedIdeaNames.length < 2}
              className={`text-[11px] font-black px-4 py-1.5 rounded-lg transition-all duration-200 cursor-pointer select-none ${
                comparedIdeaNames.length >= 2
                  ? 'bg-gradient-to-r from-[#005BAC] to-sky-500 text-white hover:brightness-110 shadow-md shadow-blue-500/10 active:scale-95'
                  : 'bg-slate-800 text-slate-500 border border-slate-750 cursor-not-allowed'
              }`}
            >
              Compare Side-by-Side
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 select-none">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#005BAC]/5 border border-[#005BAC]/15 rounded-xl text-[#005BAC]">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Project Side-by-Side Comparison</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500">Analyze scoring weights, technology stacks, and complexities</p>
                </div>
              </div>
              <button
                id="close-compare-modal-btn"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 px-2.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center gap-1 cursor-pointer transition select-none"
              >
                <X className="h-4 w-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Modal Container Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-extrabold select-none">
                      <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-r border-slate-200 w-44">
                        Project Specification
                      </th>
                      {comparedIdeas.map((idea) => (
                        <th key={idea.name} className="py-4 px-4 text-xs font-black border-b border-r border-slate-200 bg-white min-w-[200px]">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="bg-slate-100 text-[#005BAC] text-[10px] font-black px-2 py-0.5 rounded font-mono">
                                RANK #{idea.rank}
                              </span>
                              <button 
                                onClick={() => toggleCompare(idea.name)}
                                className="text-slate-400 hover:text-rose-600 transition p-0.5 cursor-pointer"
                                title="Remove from comparison"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">
                              {idea.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase">{idea.domain}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    
                    {/* Overall Score */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Overall Score
                      </td>
                      {comparedIdeas.map((idea) => {
                        const isWinner = idea.overallScore === maxOverallScore;
                        return (
                          <td key={idea.name} className="py-3 px-4 border-r border-slate-200">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center justify-center font-bold px-2.5 py-1 rounded-full text-xs font-mono select-none ${
                                isWinner 
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300 font-black ring-2 ring-amber-400/20' 
                                  : 'bg-slate-100 text-[#005BAC] border border-slate-200'
                              }`}>
                                {idea.overallScore}/100
                              </span>
                              {isWinner && (
                                <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[8px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 select-none animate-bounce">
                                  <Sparkles className="h-2.5 w-2.5 fill-amber-500 text-amber-600" />
                                  Top Score
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Relevance Score */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Relevance Index
                      </td>
                      {comparedIdeas.map((idea) => {
                        const isWinner = idea.relScore === maxRelScore;
                        return (
                          <td key={idea.name} className="py-3 px-4 border-r border-slate-200">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 justify-between max-w-[150px]">
                                <span className={`text-[11px] font-extrabold ${isWinner ? 'text-emerald-600' : 'text-slate-700'}`}>{idea.relScore}%</span>
                                {isWinner && <span className="text-[8px] tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-1.5 py-0.2 rounded leading-none select-none">Lead</span>}
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[150px]">
                                <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.relScore)}`} style={{ width: `${idea.relScore}%` }} />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* AI Score */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        AI Technology
                      </td>
                      {comparedIdeas.map((idea) => {
                        const isWinner = idea.aiScore === maxAiScore;
                        return (
                          <td key={idea.name} className="py-3 px-4 border-r border-slate-200">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 justify-between max-w-[150px]">
                                <span className={`text-[11px] font-extrabold ${isWinner ? 'text-emerald-600' : 'text-slate-700'}`}>{idea.aiScore}%</span>
                                {isWinner && <span className="text-[8px] tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-1.5 py-0.2 rounded leading-none select-none">Lead</span>}
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[150px]">
                                <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.aiScore)}`} style={{ width: `${idea.aiScore}%` }} />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Cloud Score */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Cloud Capability
                      </td>
                      {comparedIdeas.map((idea) => {
                        const isWinner = idea.cloudScore === maxCloudScore;
                        return (
                          <td key={idea.name} className="py-3 px-4 border-r border-slate-200">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 justify-between max-w-[150px]">
                                <span className={`text-[11px] font-extrabold ${isWinner ? 'text-emerald-600' : 'text-slate-700'}`}>{idea.cloudScore}%</span>
                                {isWinner && <span className="text-[8px] tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-1.5 py-0.2 rounded leading-none select-none">Lead</span>}
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[150px]">
                                <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.cloudScore)}`} style={{ width: `${idea.cloudScore}%` }} />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* DevOps Score */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        DevOps Pipeline
                      </td>
                      {comparedIdeas.map((idea) => {
                        const isWinner = idea.devopsScore === maxDevopsScore;
                        return (
                          <td key={idea.name} className="py-3 px-4 border-r border-slate-200">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 justify-between max-w-[150px]">
                                <span className={`text-[11px] font-extrabold ${isWinner ? 'text-emerald-600' : 'text-slate-700'}`}>{idea.devopsScore}%</span>
                                {isWinner && <span className="text-[8px] tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-1.5 py-0.2 rounded leading-none select-none">Lead</span>}
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[150px]">
                                <div className={`h-full bg-gradient-to-r ${scoreGradient(idea.devopsScore)}`} style={{ width: `${idea.devopsScore}%` }} />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Tech Stack Details */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3.5 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Technology Stack
                      </td>
                      {comparedIdeas.map((idea) => (
                        <td key={idea.name} className="py-3.5 px-4 border-r border-slate-200 align-top">
                          <div className="space-y-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block leading-tight">Primary Stack</span>
                              <span className="font-mono text-slate-800 text-[10px] font-bold block whitespace-pre-wrap">{idea.stack}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block leading-tight">Database</span>
                              <span className="text-xs text-[#005BAC] font-extrabold block">{idea.db}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block leading-tight">Cloud Integration</span>
                              <span className="text-[10px] text-slate-655 block line-clamp-2 leading-snug">{idea.cloudDetails}</span>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Complexity */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-3 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Complexity
                      </td>
                      {comparedIdeas.map((idea) => (
                        <td key={idea.name} className="py-3 px-4 border-r border-slate-200">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border select-none ${
                            idea.complexity.toLowerCase().includes('high') 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : idea.complexity.toLowerCase().includes('medium') 
                                ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {idea.complexity}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Problem Statement */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-4 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Enterprise Problem
                      </td>
                      {comparedIdeas.map((idea) => (
                        <td key={idea.name} className="py-4 px-4 text-xs text-slate-550 leading-relaxed font-semibold max-w-[280px] border-r border-slate-200 align-top">
                          {idea.problem}
                        </td>
                      ))}
                    </tr>

                    {/* Target Users */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-4 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Target Users
                      </td>
                      {comparedIdeas.map((idea) => (
                        <td key={idea.name} className="py-4 px-4 text-xs text-slate-705 border-r border-slate-200 align-top">
                          <div className="flex flex-wrap gap-1">
                            {idea.users.map((u) => (
                              <span key={u} className="bg-slate-100 border border-slate-200/60 rounded px-2 py-0.5 text-[9px] font-bold text-slate-600 block">
                                {u}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Core Solution Description */}
                    <tr className="hover:bg-slate-50/40">
                      <td className="py-4 px-4 text-[10px] font-black uppercase tracking-wide text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        Core Architecture
                      </td>
                      {comparedIdeas.map((idea) => (
                        <td key={idea.name} className="py-4 px-4 text-xs text-slate-605 border-r border-slate-200 align-top">
                          <div className="text-[11px] font-semibold text-slate-700 mb-2 leading-snug">{idea.whyAXA}</div>
                          <ul className="list-disc pl-3.5 space-y-1.5 leading-relaxed text-[11px]">
                            {idea.aiDetails.map((feat, fidx) => (
                              <li key={fidx} className="text-slate-500">{feat}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
