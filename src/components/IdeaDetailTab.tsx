/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Idea } from '../types';
import { ArrowLeft, Clock, Server, Eye, GraduationCap, Copy, Check, ChevronDown, ChevronUp, CheckCircle, ShieldAlert, Sparkles, Building, Rocket, Flag, AlertTriangle, Users, UserCheck, Mail, Send, Archive, FileDown, RefreshCw } from 'lucide-react';

interface IdeaDetailTabProps {
  idea: Idea | null;
  onBackToGrid: () => void;
  flaggedProjects: Record<string, { reason: string; notes: string; timestamp: string }>;
  onOpenFlagModal: (idea: Idea) => void;
  archivedProjects: string[];
  onToggleArchive: (projectName: string) => void;
}

export const SPECIALTY_TEAM = [
  {
    id: 'sarah_j',
    name: 'Sarah Jenkins',
    role: 'Principal AI Product Director',
    email: 'sarah.jenkins@axa-xl.com',
    initials: 'SJ',
    theme: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    colorText: 'text-indigo-600 bg-indigo-50 border-indigo-150',
    dotColor: 'bg-indigo-500',
  },
  {
    id: 'aleksei_v',
    name: 'Aleksei Volkov',
    role: 'Lead Sovereign Cloud Architect',
    email: 'aleksei.volkov@axa-xl.com',
    initials: 'AV',
    theme: 'bg-gradient-to-br from-sky-400 to-blue-600',
    colorText: 'text-blue-600 bg-blue-50 border-blue-150',
    dotColor: 'bg-blue-500',
  },
  {
    id: 'chloe_d',
    name: 'Chloe Dupont',
    role: 'Compliance & GDPR Officer',
    email: 'chloe.dupont@axa-xl.com',
    initials: 'CD',
    theme: 'bg-gradient-to-br from-rose-400 to-pink-600',
    colorText: 'text-pink-600 bg-pink-50 border-pink-150',
    dotColor: 'bg-pink-500',
  },
  {
    id: 'rajesh_p',
    name: 'Rajesh Patel',
    role: 'Senior DevOps & API Security Engineer',
    email: 'rajesh.patel@axa-xl.com',
    initials: 'RP',
    theme: 'bg-gradient-to-br from-emerald-400 to-teal-600',
    colorText: 'text-teal-600 bg-teal-50 border-teal-150',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 'emily_w',
    name: 'Emily Wong',
    role: 'Specialty Underwriting Lead',
    email: 'emily.wong@axa-xl.com',
    initials: 'EW',
    theme: 'bg-gradient-to-br from-amber-400 to-orange-500',
    colorText: 'text-amber-700 bg-amber-50 border-amber-150',
    dotColor: 'bg-amber-500',
  },
];

export default function IdeaDetailTab({ idea, onBackToGrid, flaggedProjects, onOpenFlagModal, archivedProjects, onToggleArchive }: IdeaDetailTabProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');
  
  // Interactive risk heatmap state
  const [previewCell, setPreviewCell] = useState<{ x: number; y: number } | null>(null);
  
  // Lead assignment storage keys
  const [assignedLeadId, setAssignedLeadId] = useState<string>(() => {
    if (!idea) return '';
    try {
      const saved = localStorage.getItem('axa_xl_assigned_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed[idea.name] || '';
      }
    } catch {
      return '';
    }
    return '';
  });

  const [assignmentFeedback, setAssignmentFeedback] = useState<string | null>(null);

  // Persistent team execution milestones status
  const [milestoneStatuses, setMilestoneStatuses] = useState<Record<string, ('Planned' | 'In Progress' | 'Completed')[]>>(() => {
    try {
      const saved = localStorage.getItem('axa_xl_milestone_statuses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const getMilestoneStatuses = (): ('Planned' | 'In Progress' | 'Completed')[] => {
    if (!idea) return [];
    if (milestoneStatuses[idea.name]) {
      return milestoneStatuses[idea.name];
    }
    const isTopThree = idea.rank <= 3;
    return [
      isTopThree ? 'Completed' : 'In Progress',
      isTopThree ? 'In Progress' : 'Planned',
      'Planned',
      'Planned',
    ];
  };

  const handleUpdateMilestoneStatus = (idx: number, newStatus: 'Planned' | 'In Progress' | 'Completed') => {
    if (!idea) return;
    const current = [...getMilestoneStatuses()];
    current[idx] = newStatus;
    
    setMilestoneStatuses(prev => {
      const updated = {
        ...prev,
        [idea.name]: current
      };
      try {
        localStorage.setItem('axa_xl_milestone_statuses', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving milestone status:', err);
      }
      return updated;
    });
  };

  // Sync state if active project idea changes
  useEffect(() => {
    if (!idea) return;
    setPreviewCell(null);
    try {
      const saved = localStorage.getItem('axa_xl_assigned_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAssignedLeadId(parsed[idea.name] || '');
      } else {
        setAssignedLeadId('');
      }
    } catch {
      setAssignedLeadId('');
    }
  }, [idea]);

  const handleAssignLead = (leadId: string) => {
    setAssignedLeadId(leadId);
    if (!idea) return;
    try {
      const saved = localStorage.getItem('axa_xl_assigned_leads');
      const currentMap = saved ? JSON.parse(saved) : {};
      if (leadId) {
        currentMap[idea.name] = leadId;
      } else {
        delete currentMap[idea.name];
      }
      localStorage.setItem('axa_xl_assigned_leads', JSON.stringify(currentMap));
      
      const leadObj = SPECIALTY_TEAM.find(t => t.id === leadId);
      if (leadObj) {
        setAssignmentFeedback(`Assigned: ${leadObj.name} appointed as project delivery Lead.`);
      } else {
        setAssignmentFeedback('Project delivery Lead unassigned.');
      }
      setTimeout(() => setAssignmentFeedback(null), 3000);
    } catch (err) {
      console.error('Error saving lead assignment:', err);
    }
  };

  const handleExportTeamCsv = () => {
    if (!idea) return;
    
    // Construct CSV Header layout
    let csvContent = 'Project,Team Member Name,Role,Email,Is Project Lead\n';
    
    // Construct CSV Rows
    SPECIALTY_TEAM.forEach((member) => {
      const isLead = assignedLeadId === member.id ? 'YES' : 'NO';
      // Escape for CSV consistency
      const escapedProjectName = `"${idea.name.replace(/"/g, '""')}"`;
      const escapedMemberName = `"${member.name.replace(/"/g, '""')}"`;
      const escapedRole = `"${member.role.replace(/"/g, '""')}"`;
      const escapedEmail = `"${member.email.replace(/"/g, '""')}"`;
      
      csvContent += `${escapedProjectName},${escapedMemberName},${escapedRole},${escapedEmail},${isLead}\n`;
    });
    
    // Create browser binary blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const sanitizedFilename = idea.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.setAttribute('download', `axa_xl_delivery_team_${sanitizedFilename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Provide user interface state feedback trigger
    setAssignmentFeedback('Team CSV assignment export downloaded successfully.');
    setTimeout(() => setAssignmentFeedback(null), 3500);
  };

  const getTimelineMilestones = () => {
    if (!idea) return [];
    const isTopThree = idea.rank <= 3;
    const techName = idea.stack.split(', ')[1] || 'Vector Engine Context';
    const primaryUser = idea.users[0] || 'Specialty Underwriter';
    const targetGateway = idea.stack.split(', ')[0] || 'Azure API Gateway';

    return [
      {
        phase: 'Q1 Strategy',
        title: 'Security Boundary & GDPR Assessment',
        status: isTopThree ? 'Completed' : 'In Progress',
        desc: 'Map enterprise policy alignment constraints. Implement automated PII masking layers matching strict European insurance compliance benchmarks.',
        deliverable: 'SOC2 & GDPR compliance handbook signed-off.',
        badge: isTopThree ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100',
      },
      {
        phase: 'Q2 Prototype',
        title: 'Core Architecture & Private Sandbox',
        status: isTopThree ? 'In Progress' : 'Planned',
        desc: `Deploy backend interfaces to isolated test containers. Sync custom schema indices across the ${techName} pool.`,
        deliverable: 'Active RAG scoring playground operational.',
        badge: isTopThree ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-55 text-slate-500 border-slate-200',
      },
      {
        phase: 'Q3 Active Pilot',
        title: `Parallel Specialty Underwriter Pilot`,
        status: 'Planned',
        desc: `Onboard selected expert groups representing ${primaryUser} to audit mock underwriting telemetry & track validation confidence.`,
        deliverable: 'SME quality assurance approval scorecard compiled.',
        badge: 'bg-slate-55 text-slate-500 border-slate-200',
      },
      {
        phase: 'Q4 Full Scale',
        title: 'Primary Enterprise Gateway Integration',
        status: 'Planned',
        desc: `Establish direct secure routes on ${targetGateway}. Scale request pools across EMEA & Americas region clusters safely.`,
        deliverable: 'Multi-tenant high-throughput production validation.',
        badge: 'bg-slate-55 text-slate-500 border-slate-200',
      },
    ];
  };

  const handleCopyText = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!idea) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-[#F8FAFC]/55 p-16 text-center select-none animate-in fade-in duration-300">
        <Server className="h-12 w-12 text-[#005BAC]/40 mx-auto mb-4" />
        <h3 className="font-sans font-extrabold text-[#01142F] text-lg">No Evaluation Selected</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2">
          Click any evaluation row or card index in the <span className="font-semibold text-[#005BAC]">Enterprise Ideas</span> tab to retrieve detailed architecture logs, security parameters, schemas, and interview talksheets.
        </p>
        <button
          onClick={onBackToGrid}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#005BAC] text-white text-xs font-bold px-4 py-2.5 shadow-md shadow-[#005BAC]/20 hover:bg-[#004b8e] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse 18 Ideas
        </button>
      </div>
    );
  }

  const isTop5 = idea.rank <= 5;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
      
      {/* Header back & quick title card */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToGrid}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </button>
        <div className="flex flex-wrap items-center gap-3">
          {idea && (
            <button
              id="archive-project-detail-btn"
              onClick={() => onToggleArchive(idea.name)}
              className={`group inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border transition duration-200 select-none cursor-pointer ${
                archivedProjects.includes(idea.name)
                  ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-850'
              }`}
            >
              <Archive className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${archivedProjects.includes(idea.name) ? 'fill-amber-600 text-amber-600' : 'text-slate-400'}`} />
              <span>{archivedProjects.includes(idea.name) ? 'Unarchive Project' : 'Archive Project'}</span>
            </button>
          )}

          {idea && (
            <button
              id="flag-project-detail-btn"
              onClick={() => onOpenFlagModal(idea)}
              className={`group inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border transition duration-200 select-none cursor-pointer ${
                flaggedProjects[idea.name]
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 hover:border-rose-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-850'
              }`}
            >
              <Flag className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${flaggedProjects[idea.name] ? 'fill-rose-700 text-rose-700' : 'text-slate-400'}`} />
              <span>{flaggedProjects[idea.name] ? 'Flag Exception Active' : 'Flag Project'}</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Implementation Complexity:</span>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-sky-100 uppercase tracking-wider font-mono">
              {idea.complexity}
            </span>
          </div>
        </div>
      </div>

      {/* Main card panel header block */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#005BAC]"></div>
          
          <div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                isTop5 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}>
                #{idea.rank}
              </span>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                {idea.domain}
              </span>
            </div>

            <h2 className="font-sans font-extrabold text-[#0F172A] text-2xl mt-3 tracking-tight">
              {idea.name}
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              {idea.problem}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#F8FAFC] border border-slate-200/50 p-4 rounded-xl min-w-[140px] justify-center md:self-center self-start">
            <div className="text-center font-mono">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Overall Score</div>
              <div className="text-3xl font-extrabold text-[#005BAC] mt-1.5">{idea.overallScore}</div>
              <div className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">Top Priority</div>
            </div>
          </div>
        </div>

        {/* Project Archive Alert Banner if active */}
        {idea && archivedProjects.includes(idea.name) && (
          <div className="bg-amber-55/40 border-b border-amber-200 p-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3.5 flex-1">
              <div className="p-2 bg-amber-100 border border-amber-200 text-amber-800 rounded-xl mt-0.5 shrink-0">
                <Archive className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                    THIS INITIATIVE PROFILE IS CURRENTLY ARCHIVED
                  </h4>
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                    Archived Storage
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-950">
                  This initiative has been moved into the archive hidden state. It remains fully preserved in local storage memory but is excluded from the main dashboard evaluation lists unless "Show Archived" is explicitly toggled.
                </p>
              </div>
            </div>
            <button
              id="detail-unarchive-banner-btn"
              onClick={() => onToggleArchive(idea.name)}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-white hover:bg-amber-100/40 border border-amber-200 py-2 px-3.5 rounded-xl transition cursor-pointer shrink-0 shadow-3xs hover:shadow-2xs active:scale-95 animate-pulse"
            >
              Restore & Unarchive Project
            </button>
          </div>
        )}

        {/* Flag Exception Alert Banner if active */}
        {!!flaggedProjects[idea.name] && (
          <div className="bg-rose-50 border-b border-rose-100 p-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3.5 flex-1">
              <div className="p-2 bg-rose-100 border border-rose-200 text-rose-700 rounded-xl mt-0.5 shrink-0">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-rose-800 uppercase tracking-wider">
                    FLAGGED FOR MANUAL SECURITY & COMPLIANCE REVIEW
                  </h4>
                  <span className="bg-rose-100 text-rose-700 text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                    Exception Active
                  </span>
                </div>
                <p className="text-xs font-semibold text-rose-950">
                  Reason: <span className="text-slate-700 font-sans font-normal italic">
                    {
                      flaggedProjects[idea.name].reason === 'security' ? 'Security Check: Data Privacy & PII Leak Risk' :
                      flaggedProjects[idea.name].reason === 'regulatory' ? 'Regulatory compliance: Local Insurance Guidelines Drift' :
                      flaggedProjects[idea.name].reason === 'complexity' ? 'Implementation Risk: Tech Stack / API Gateway Incompatibility' :
                      flaggedProjects[idea.name].reason === 'alignment' ? 'Strategic Challenge: Mismatched Specialty Underwriting Target' : 
                      'Auditor Call: Manual Peer-Review Required'
                    }
                  </span>
                </p>
                <p className="text-xs text-rose-700 font-sans">
                  Comments: <span className="font-medium text-slate-600 italic">"{flaggedProjects[idea.name].notes}"</span>
                </p>
              </div>
            </div>
            <button
              id="detail-update-flag-btn"
              onClick={() => onOpenFlagModal(idea)}
              className="text-xs font-bold text-rose-700 hover:text-rose-800 bg-white hover:bg-rose-100/45 border border-rose-200 py-2 px-3.5 rounded-xl transition cursor-pointer shrink-0 shadow-3xs hover:shadow-2xs active:scale-95"
            >
              Update Flag Settings
            </button>
          </div>
        )}

        {/* Evaluation Scores Breakdowns */}
        <div className="p-6 sm:p-8 bg-[#F8FAFC]/55 border-b border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Strategic & Technical Scoring Matrix</h4>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Relevance to AXA XL', score: idea.relScore, theme: 'bg-indigo-500' },
              { label: 'Model/AI Usage', score: idea.aiScore, theme: 'bg-sky-500' },
              { label: 'Cloud Architecture', score: idea.cloudScore, theme: 'bg-[#009FE3]' },
              { label: 'Platform DevOps', score: idea.devopsScore, theme: 'bg-emerald-500' },
              { label: 'Overall Index', score: idea.overallScore, theme: 'bg-amber-500' },
            ].map((s, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-xs">
                <div className="text-[10px] font-semibold text-slate-400 leading-tight uppercase font-sans">{s.label}</div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-xl font-bold text-slate-800 tracking-tight">{s.score}</span>
                  <span className="text-[10px] text-slate-400">/100</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div className={`h-full ${s.theme}`} style={{ width: `${s.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* Column 1: Core Problem & Users & Stacks */}
          <div className="p-6 sm:p-8 space-y-6 lg:col-span-2">
            
            {/* Business Case / Alignment */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#005BAC] uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Building className="h-4 w-4" />
                AXA XL Direct Business Case
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-[#005BAC]/5 p-4 rounded-xl border border-[#005BAC]/10">
                {idea.whyAXA}
              </p>
            </div>

            {/* Targeted User Personas */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider select-none">Targeted User Personas</h3>
              <div className="flex flex-wrap gap-2">
                {idea.users.map((user, idx) => (
                  <span key={idx} className="bg-slate-50 text-slate-600 border border-slate-200/70 text-xs px-3 py-1.5 rounded-lg font-medium shadow-xs">
                    {user}
                  </span>
                ))}
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <CheckCircle className="h-4 w-4 text-[#005BAC]" />
                Core Features & Capabilities
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {idea.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                    <span className="font-semibold text-[#00BAC5] mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical implementations */}
            {idea.aiDetails && idea.aiDetails.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Eye className="h-4 w-4 text-[#009FE3]" />
                  AI & LLM Blueprint Mechanisms
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {idea.aiDetails.map((aiTech, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-sky-50/20 p-2.5 rounded-lg border border-sky-100/60 leading-relaxed">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                      <span>{aiTech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risk Assessment Card with 3x3 Heatmap Grid */}
            {idea && (() => {
              const baselineX = (() => {
                if (idea.overallScore >= 80 || idea.relScore >= 80) return 2;
                if (idea.overallScore < 60 && idea.relScore < 60) return 0;
                return 1;
              })();

              const baselineY = (() => {
                const compLower = idea.complexity.toLowerCase();
                if (compLower.includes('high')) return 2;
                if (compLower.includes('low')) return 0;
                return 1;
              })();

              const activeX = previewCell ? previewCell.x : baselineX;
              const activeY = previewCell ? previewCell.y : baselineY;

              return (
                <div id="risk-assessment-card" className="p-5.5 bg-white rounded-xl border border-slate-205/90 shadow-3xs hover:shadow-2xs transition duration-300 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-extrabold text-[#005BAC] uppercase tracking-wider flex items-center gap-1.5 select-none">
                        <ShieldAlert className="h-4 w-4 text-[#005BAC]" />
                        Deployment Risk Assessment Matrix
                      </h3>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Evaluates operational, security, and integration friction
                      </p>
                    </div>
                    {previewCell !== null && (
                      <button
                        id="reset-risk-matrix-btn"
                        onClick={() => setPreviewCell(null)}
                        className="inline-flex items-center gap-1 text-[9px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 p-1 px-2.5 rounded-lg transition"
                      >
                        <RefreshCw className="h-2.5 w-2.5" />
                        Reset to Project Baseline
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Left: 3x3 Heatmap Grid visual */}
                    <div className="md:col-span-3 space-y-3">
                      <div className="flex items-stretch gap-2.5">
                        {/* Y-axis Label title vertically */}
                        <div className="flex flex-col justify-between py-5 text-[8px] font-extrabold text-slate-400 select-none text-right uppercase tracking-wider w-12 shrink-0">
                          <span className="text-rose-600 font-bold">High (3)</span>
                          <span className="text-amber-600 font-bold">Medium (2)</span>
                          <span className="text-emerald-600 font-bold">Low (1)</span>
                        </div>

                        {/* 3x3 cells container */}
                        <div className="grid grid-cols-3 gap-2 w-full aspect-video md:aspect-square bg-slate-50 p-2.5 rounded-xl border border-slate-100 relative">
                          {(() => {
                            const cells = [];
                            // Row running from top to bottom represents Y values: 2 down to 0
                            for (let yVal = 2; yVal >= 0; yVal--) {
                              for (let xVal = 0; xVal < 3; xVal++) {
                                const cellY = yVal;
                                const cellX = xVal;
                                const isBaseline = baselineX === cellX && baselineY === cellY;
                                const isActive = activeX === cellX && activeY === cellY;
                                
                                // Determine color class
                                let cellColorClass = '';
                                if (cellY === 2) {
                                  if (cellX === 2) cellColorClass = 'bg-rose-500/10 hover:bg-rose-500/15 border-rose-500/15 text-rose-700';
                                  else if (cellX === 1) cellColorClass = 'bg-orange-500/10 hover:bg-orange-500/15 border-orange-500/15 text-orange-700';
                                  else cellColorClass = 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/15 text-amber-800';
                                } else if (cellY === 1) {
                                  if (cellX === 2) cellColorClass = 'bg-orange-500/10 hover:bg-orange-500/15 border-orange-500/15 text-orange-700';
                                  else if (cellX === 1) cellColorClass = 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/15 text-amber-800';
                                  else cellColorClass = 'bg-yellow-500/10 hover:bg-yellow-500/15 border-yellow-500/15 text-yellow-800';
                                } else {
                                  if (cellX === 2) cellColorClass = 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/15 text-amber-800';
                                  else if (cellX === 1) cellColorClass = 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/15 text-emerald-800';
                                  else cellColorClass = 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500/15 text-emerald-800';
                                }

                                cells.push(
                                  <button
                                    key={`${cellX}-${cellY}`}
                                    onClick={() => setPreviewCell({ x: cellX, y: cellY })}
                                    className={`relative rounded-lg border flex flex-col items-center justify-center p-2 transition cursor-pointer select-none group/cell aspect-square ${cellColorClass} ${
                                      isActive 
                                        ? 'ring-2 ring-[#005BAC] border-transparent shadow-xs scale-102 z-10' 
                                        : 'hover:scale-[1.01]'
                                    }`}
                                  >
                                    {/* Small helper coordinate */}
                                    <span className="absolute bottom-1 right-1 text-[7px] font-mono opacity-40 select-none">
                                      {cellX + 1},{cellY + 1}
                                    </span>

                                    {/* Render standard status badges */}
                                    {isBaseline && !isActive && (
                                      <div className="absolute top-1 left-1 bg-slate-900/10 rounded px-1 text-[6px] font-extrabold text-slate-700 uppercase tracking-wide">
                                        Base
                                      </div>
                                    )}

                                    {/* If cell is current active coordinate */}
                                    {isActive ? (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center p-1 bg-slate-900/5 backdrop-blur-3xs rounded-lg select-none">
                                        <span className="text-[8px] font-black text-slate-950 uppercase tracking-wider text-center leading-none">
                                          {isBaseline ? 'PROJECT' : 'PREVIEW'}
                                        </span>
                                        <span className="text-[7px] font-extrabold text-[#005BAC] uppercase tracking-normal leading-tight text-center truncate px-1 max-w-full drop-shadow-xs bg-white/95 rounded mt-1 p-0.5 shadow-3xs">
                                          {isBaseline ? 'Sovereign' : 'Modeling'}
                                        </span>
                                        <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005BAC] opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#005BAC]"></span>
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-[8px] font-extrabold opacity-60 text-center leading-tight group-hover/cell:opacity-95 transition select-none">
                                        {cellY === 2 ? (cellX === 2 ? 'Severe' : cellX === 1 ? 'High' : 'Moderate') :
                                         cellY === 1 ? (cellX === 2 ? 'High' : cellX === 1 ? 'Established' : 'Low-Med') :
                                         (cellX === 2 ? 'Moderate' : cellX === 1 ? 'Contained' : 'Optimal')}
                                      </span>
                                    )}
                                  </button>
                                );
                              }
                            }
                            return cells;
                          })()}
                        </div>
                      </div>

                      {/* X-axis labels at bottom */}
                      <div className="flex pl-15 pr-1.5 justify-between text-[8px] font-extrabold text-slate-400 select-none uppercase tracking-wider">
                        <span className="text-emerald-600 font-bold text-left">Low Impact (1)</span>
                        <span className="text-amber-600 font-bold text-center">Medium (2)</span>
                        <span className="text-rose-600 font-bold text-right">High Impact (3)</span>
                      </div>
                    </div>

                    {/* Right: Selected Cell Explanatory Intelligence Matrix */}
                    <div className="md:col-span-2 space-y-3 bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        {/* Active Severity Indicator Header */}
                        {(() => {
                          let activeTitle = '';
                          let activeRiskScore = '';
                          let activePlan = '';
                          let riskColorTheme = '';

                          if (activeY === 2 && activeX === 2) {
                            activeTitle = 'SEVERE CRITICAL';
                            activeRiskScore = '9 / 9 Index';
                            activePlan = 'Intensive Stabilization. Require manual fail-safe approvals, real-time threat-detection triggers, and principal lead accountability.';
                            riskColorTheme = 'text-rose-700 bg-rose-50 border-rose-200';
                          } else if ((activeY === 2 && activeX === 1) || (activeY === 1 && activeX === 2)) {
                            activeTitle = 'SIGNIFICANT HIGH';
                            activeRiskScore = '6 / 9 Index';
                            activePlan = 'Managed Intervention. Implement dedicated monitoring, canary deployments, and weekly lead governance reviews.';
                            riskColorTheme = 'text-orange-700 bg-orange-50 border-orange-200';
                          } else if (activeY === 1 && activeX === 1) {
                            activeTitle = 'ESTABLISHED MEDIUM';
                            activeRiskScore = '4 / 9 Index';
                            activePlan = 'Active Risk Management. Enforce automated uptime alerting, regional redundancy, and regular compliance audits.';
                            riskColorTheme = 'text-amber-800 bg-amber-50 border-amber-200';
                          } else if ((activeY === 2 && activeX === 0) || (activeY === 0 && activeX === 2)) {
                            activeTitle = 'MODERATE';
                            activeRiskScore = '3 / 9 Index';
                            activePlan = 'Preventive Controls. Maintain hot-standby replicas. Ensure rapid incident response runbooks are active.';
                            riskColorTheme = 'text-yellow-700 bg-yellow-50 border-yellow-200';
                          } else if ((activeY === 1 && activeX === 0) || (activeY === 0 && activeX === 1)) {
                            activeTitle = 'LOW-MEDIUM';
                            activeRiskScore = '2 / 9 Index';
                            activePlan = 'Standard Safeguards. Focus on data retention policies, standard sandbox isolation testing, and single sign-on security.';
                            riskColorTheme = 'text-emerald-800 bg-emerald-50 border-emerald-200';
                          } else {
                            activeTitle = 'OPTIMAL MINIMAL';
                            activeRiskScore = '1 / 9 Index';
                            activePlan = 'Routine Monitoring. Secure deployment within the axa-xl sovereign subscription standard. Minimal oversight.';
                            riskColorTheme = 'text-emerald-700 bg-emerald-50/50 border-emerald-200';
                          }

                          return (
                            <div className="space-y-2">
                              <div className={`p-2 rounded-lg border ${riskColorTheme} flex items-center justify-between`}>
                                <div>
                                  <span className="text-[7px] font-black uppercase tracking-wider block opacity-75">Classification</span>
                                  <span className="text-[11px] font-black">{activeTitle}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[7px] font-black uppercase tracking-wider block opacity-75">Score Matrix</span>
                                  <span className="text-[11px] font-bold leading-none">{activeRiskScore}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Staging Plan:</span>
                                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                                  {activePlan}
                                </p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Operational Project-Specific Risk Drivers */}
                      <div className="pt-2.5 border-t border-slate-200/60 select-none">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Active Risk Drivers Info:
                        </span>
                        <div className="space-y-1">
                          {/* Driver 1: Complexity */}
                          <div className="flex items-center gap-2 text-[9px] text-slate-600 font-medium">
                            <span className={`w-1 h-1 rounded-full ${idea.complexity.toLowerCase().includes('high') ? 'bg-rose-500 animate-pulse' : idea.complexity.toLowerCase().includes('medium') ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                            <span className="truncate">Complexity class: {idea.complexity.split(' (')[0]}</span>
                          </div>
                          {/* Driver 2: AI Scope */}
                          {idea.aiDetails && idea.aiDetails.length > 0 && (
                            <div className="flex items-center gap-2 text-[9px] text-slate-600 font-medium">
                              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                              <span className="truncate">AI features: {idea.aiDetails.length} active models</span>
                            </div>
                          )}
                          {/* Driver 3: DevOps standard */}
                          <div className="flex items-center gap-2 text-[9px] text-slate-600 font-medium">
                            <span className={`w-1 h-1 rounded-full ${idea.devopsScore < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                            <span className="truncate">DevOps index: {idea.devopsScore}% rating</span>
                          </div>
                          {/* Driver 4: Sovereign */}
                          <div className="flex items-center gap-2 text-[9px] text-slate-400 font-medium italic">
                            <span className="w-1 h-1 rounded-full bg-slate-350"></span>
                            <span className="truncate">Sovereign regulatory checkpoint passed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Column 2: Architecture & Devop/Security specifics */}
          <div className="p-6 sm:p-8 space-y-6 bg-slate-50/30">
            
            {/* Team Assignment & Lead Module */}
            <div className="space-y-4 p-4.5 bg-white rounded-xl border border-slate-200/80 shadow-3xs hover:shadow-xs transition duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-[#005BAC] uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Users className="h-4 w-4" />
                  Project Delivery Team
                </h3>
                <span className="text-[9px] bg-slate-100 text-slate-500 font-mono font-bold px-1.5 py-0.5 rounded leading-none select-none">
                  Sourced Experts
                </span>
              </div>

              {/* Lead Assignment Option selection list selector */}
              <div className="space-y-1.5">
                <label htmlFor="lead-assignment-select" className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Assign Project Lead:
                </label>
                <div className="relative">
                  <select
                    id="lead-assignment-select"
                    value={assignedLeadId}
                    onChange={(e) => handleAssignLead(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 bg-[#F8FAFC] hover:bg-slate-100/50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005BAC]/15 focus:border-[#005BAC] transition cursor-pointer appearance-none pr-8 text-slate-800"
                  >
                    <option value="">-- Click to Assign Lead --</option>
                    {SPECIALTY_TEAM.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} — {member.role}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <UserCheck className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Action Feedback Banner Notification */}
              {assignmentFeedback && (
                <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] rounded-lg font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-semibold">{assignmentFeedback}</span>
                </div>
              )}

              {/* Team Profile list / Grid */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Click Avatar to Assign/Toggle Lead:
                </span>
                
                <div className="space-y-2">
                  {SPECIALTY_TEAM.map((member) => {
                    const isLead = assignedLeadId === member.id;
                    return (
                      <div
                        id={`team-member-row-${member.id}`}
                        key={member.id}
                        onClick={() => handleAssignLead(isLead ? '' : member.id)}
                        className={`flex items-center justify-between p-2 rounded-xl border transition duration-200 group/row cursor-pointer ${
                          isLead 
                            ? 'bg-[#005BAC]/5 border-[#005BAC]/35 ring-1 ring-[#005BAC]/10' 
                            : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Profile Pictures & Initial Gradients */}
                          <div className={`w-8 h-8 rounded-lg ${member.theme} text-white flex items-center justify-center font-extrabold text-[11px] select-none shadow-3xs relative shrink-0`}>
                            {member.initials}
                            {isLead && (
                              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold border border-white">
                                ★
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-slate-800 group-hover/row:text-[#005BAC] transition truncate">
                                {member.name}
                              </span>
                              {isLead && (
                                <span className="bg-amber-100 border border-amber-205 text-amber-800 text-[8px] font-extrabold px-1 py-0.2 rounded font-mono uppercase tracking-wide animate-pulse">
                                  Lead
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] text-slate-400 block truncate leading-tight">
                              {member.role}
                            </span>
                          </div>
                        </div>

                        {/* Email Client Launcher buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            id={`contact-email-${member.id}`}
                            title={`Ping direct mail to ${member.email}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${member.email}?subject=AXA XL Enterprise Delivery Strategy - ${idea.name}`;
                            }}
                            className="p-1 px-1.5 bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 text-slate-400 hover:text-[#005BAC] rounded-lg transition"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sync Team Members Action Button */}
              {idea && (
                <div className="pt-2.5 border-t border-slate-150 mt-1">
                  <button
                    id="btn-sync-team-members"
                    onClick={handleExportTeamCsv}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-[#005BAC]/5 hover:bg-[#005BAC] border border-[#005BAC]/25 hover:border-[#005BAC] text-[#005BAC] hover:text-white py-2 px-3 text-center rounded-xl transition duration-200 select-none cursor-pointer shadow-3xs"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    <span>Sync Team Members (CSV)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Rocket className="h-4 w-4 text-emerald-500" />
                Deployment Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.stack.split(', ').map((tech, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] px-2.5 py-1 rounded-lg font-mono font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud Details */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Server className="h-4 w-4 text-[#009FE3]" />
                Cloud Deployment Strategy
              </h3>
              <p className="text-xs text-slate-600 bg-white p-3 border border-slate-200/60 rounded-xl leading-relaxed">
                {idea.cloudDetails}
              </p>
            </div>

            {/* DevOps Parameters */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider select-none">CI/CD & DevOps Pipeline</h3>
              <p className="text-xs text-slate-600 bg-white p-3 border border-slate-200/60 rounded-xl leading-relaxed">
                {idea.devopsDetails}
              </p>
            </div>

            {/* Security controls */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <ShieldAlert className="h-4 w-4 text-[#D4A017]" />
                Data Security & Governance
              </h3>
              <p className="text-xs text-slate-600 bg-white p-3 border border-slate-200/60 rounded-xl leading-relaxed">
                {idea.security}
              </p>
            </div>

          </div>

        </div>

        {/* Dynamic Implementation Roadmap Milestones Timeline Section */}
        <div className="p-6 sm:p-8 border-t border-slate-200 bg-[#F8FAFC]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left section: Header & Context */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2.5 bg-[#005BAC]/10 text-[#005BAC] text-[10px] font-extrabold rounded-md font-mono select-none">
                  PHASED TIMELINE
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              
              <h3 className="font-sans font-extrabold text-[#01142F] text-lg sm:text-xl tracking-tight leading-snug">
                Implementation Roadmap
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                AXA XL delivery timeline mapping. Developed utilizing sequence staging models, sandbox checkpoints, and continuous governance to assure sovereign deployment quality.
              </p>

              {/* Dynamic Progress Bar Sequence */}
              {(() => {
                const statuses = getMilestoneStatuses();
                const progressPercent = Math.round(
                  (statuses.reduce((acc, status) => {
                    if (status === 'Completed') return acc + 100;
                    if (status === 'In Progress') return acc + 50;
                    return acc;
                  }, 0) / 400) * 100
                );

                return (
                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-3.5 shadow-3xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Execution Progress Tracker
                      </span>
                      <span className="text-[11px] font-black text-[#005BAC] font-mono leading-none bg-[#005BAC]/5 border border-[#005BAC]/15 px-2 py-0.5 rounded-lg select-none">
                        {progressPercent}% Complete
                      </span>
                    </div>
                    
                    {/* Visual Segmented Progress Bar Sequence */}
                    <div className="space-y-2">
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-100">
                        <div 
                          className="h-full bg-gradient-to-r from-[#005BAC] to-emerald-500 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      
                      {/* Step ticks indicators below standard bar */}
                      <div className="flex items-center justify-between text-[9px] font-bold font-mono px-0.5">
                        {statuses.map((s, sIdx) => {
                          const isDone = s === 'Completed';
                          const isCurrent = s === 'In Progress';
                          return (
                            <div key={sIdx} className="flex flex-col items-center">
                              <span className={`w-2.5 h-2.5 rounded-full border mb-1 transition-all duration-350 ${
                                isDone 
                                  ? 'bg-emerald-500 border-emerald-600 scale-110 shadow-xs' 
                                  : isCurrent 
                                    ? 'bg-[#005BAC] border-blue-600 animate-pulse scale-115 shadow-2xs' 
                                    : 'bg-slate-200 border-slate-300'
                              }`} />
                              <span className={`${isDone ? 'text-emerald-600 font-extrabold' : isCurrent ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
                                PH {sIdx + 1}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Quick batch modifier actions */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => {
                          statuses.forEach((_, sIdx) => handleUpdateMilestoneStatus(sIdx, 'Completed'));
                        }}
                        className="text-[9px] font-extrabold text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-lg transition-all duration-155 cursor-pointer flex-1 text-center"
                      >
                        Mark All Run
                      </button>
                      <button
                        onClick={() => {
                          statuses.forEach((_, sIdx) => handleUpdateMilestoneStatus(sIdx, 'Planned'));
                        }}
                        className="text-[9px] font-extrabold text-slate-500 hover:text-white bg-slate-100 hover:bg-slate-500 border border-slate-200 px-2.5 py-1 rounded-lg transition-all duration-155 cursor-pointer flex-1 text-center"
                      >
                        Reset All
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Quick Roadmap Legend */}
              <div className="p-4 bg-white border border-slate-200/60 rounded-xl space-y-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilot Milestones Legend
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold select-none">✓</span>
                    <span>Completed &amp; Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-[#005BAC] text-white flex items-center justify-center text-[9px] font-bold animate-pulse select-none">●</span>
                    <span className="font-medium text-[#005BAC]">In Progress (Active Testing)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-[9px] font-bold select-none">○</span>
                    <span>Planned Core Execution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section: Vertical Timeline Component (Modern Step-indicator Design) */}
            <div className="lg:col-span-2 relative pl-2 md:pl-4">
              {/* Central vertical line timeline background */}
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-slate-200"></div>

              <div className="space-y-6">
                {(() => {
                  const statuses = getMilestoneStatuses();
                  const milestonesWithDynamicStatus = getTimelineMilestones().map((m, idx) => {
                    const status = statuses[idx] || 'Planned';
                    let badge = 'bg-slate-50 text-slate-550 border-slate-200';
                    if (status === 'Completed') {
                      badge = 'bg-emerald-50 text-emerald-700 border-emerald-150';
                    } else if (status === 'In Progress') {
                      badge = 'bg-blue-50 text-blue-700 border-blue-150';
                    }
                    return {
                      ...m,
                      status,
                      badge
                    };
                  });

                  return milestonesWithDynamicStatus.map((milestone, idx) => {
                    const isCompleted = milestone.status === 'Completed';
                    const isInProgress = milestone.status === 'In Progress';
                    
                    return (
                      <div key={idx} className="relative pl-12 group transition-all duration-300">
                        
                        {/* Left Circle Indicator */}
                        <div className={`absolute left-0 top-0.5 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 border shadow-xs select-none cursor-pointer
                          ${isCompleted 
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/10 hover:bg-emerald-600' 
                            : isInProgress 
                              ? 'bg-[#005BAC] text-white border-[#005BAC] shadow-[#005BAC]/25 ring-4 ring-blue-500/15' 
                              : 'bg-white text-slate-400 border-slate-200 group-hover:border-slate-300'
                          }
                        `}
                        onClick={() => {
                          const nextStatusMap: Record<string, 'Planned' | 'In Progress' | 'Completed'> = {
                            'Planned': 'In Progress',
                            'In Progress': 'Completed',
                            'Completed': 'Planned'
                          };
                          handleUpdateMilestoneStatus(idx, nextStatusMap[milestone.status]);
                        }}
                        title="Click to toggle status"
                        >
                          {isCompleted ? '✓' : `0${idx + 1}`}
                        </div>

                        {/* Content block */}
                        <div className={`bg-white rounded-xl border p-4 shadow-2xs group-hover:shadow-xs transition duration-300 ${
                          isInProgress ? 'border-[#005BAC]/35 ring-1 ring-[#005BAC]/5' : 'border-slate-200 group-hover:border-slate-300'
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none font-mono">
                                {milestone.phase}
                              </span>
                              <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider border leading-none font-mono select-none ${milestone.badge}`}>
                                {milestone.status}
                              </span>
                            </div>
                            
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md select-none">
                              M{idx * 2 + 1}-M{idx * 2 + 2}
                            </div>
                          </div>

                          <h4 className="font-bold text-slate-800 text-sm mt-2">
                            {milestone.title}
                          </h4>

                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {milestone.desc}
                          </p>

                          <div className="mt-3 flex items-center gap-2 p-2 bg-[#F8FAFC] rounded-lg border border-slate-100">
                            <span className="text-[9px] font-bold text-[#005BAC] uppercase tracking-wider shrink-0 select-none">
                              Key Deliverable:
                            </span>
                            <span className="text-xs text-slate-600 italic">
                              {milestone.deliverable}
                            </span>
                          </div>

                          {/* Interactive Status Selector controls within card */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider select-none">
                              Quick Change Status:
                            </span>
                            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 select-none">
                              {(['Planned', 'In Progress', 'Completed'] as const).map((s) => {
                                const active = milestone.status === s;
                                let activeStyle = 'bg-white text-slate-700 shadow-3xs border-slate-200';
                                if (active) {
                                  if (s === 'Completed') activeStyle = 'bg-emerald-500 text-white shadow-xs';
                                  else if (s === 'In Progress') activeStyle = 'bg-[#005BAC] text-white shadow-xs';
                                  else activeStyle = 'bg-slate-400 text-white shadow-xs';
                                }
                                return (
                                  <button
                                    key={s}
                                    onClick={() => handleUpdateMilestoneStatus(idx, s)}
                                    className={`text-[9px] font-black px-2 py-0.5 rounded transition cursor-pointer border border-transparent ${
                                      active 
                                        ? activeStyle
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                  >
                                    {s}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                      </div>
                    );
                  });
                })()}
              </div>
            </div>

          </div>
        </div>

        {/* Database Design & Architecture flow charts block */}
        <div className="bg-[#0F172A] border-t border-slate-800 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Schema */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relational Database Indexing Schema</h4>
                <button
                  onClick={() => handleCopyText(idea.db, 'db')}
                  className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition"
                >
                  {copiedField === 'db' ? (
                    <>
                      <Check className="h-3 w-3" /> Copied Blueprints
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy Schema
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-xl bg-black/50 border border-slate-800 p-4 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre overflow-x-auto">
                {idea.db}
              </div>
            </div>

            {/* Flow */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise Architecture Pipeline Diagram</h4>
                <button
                  onClick={() => handleCopyText(idea.arch, 'arch')}
                  className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition"
                >
                  {copiedField === 'arch' ? (
                    <>
                      <Check className="h-3 w-3" /> Copied Architecture
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy Diagram
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-xl bg-black/50 border border-slate-800 p-4 font-mono text-[11px] text-amber-300 leading-relaxed whitespace-pre overflow-x-auto">
                {idea.arch}
              </div>
            </div>

          </div>
        </div>

        {/* Interviewing Talksheets & Future Roadmap Section */}
        <div className="p-6 sm:p-8 bg-white border-t border-slate-100 space-y-6">
          <h3 className="font-sans font-bold text-slate-800 text-sm">Enterprise Consulting Delivery Guidelines</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Executive Resume Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <GraduationCap className="h-4 w-4 text-[#005BAC]" />
                Recruitment Resume summary Statement
              </h4>
              <p className="text-xs text-slate-600 bg-slate-50 p-4 border border-slate-100 rounded-xl leading-relaxed italic">
                {idea.resumeImpact}
              </p>
            </div>

            {/* Direct Talking Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Clock className="h-4 w-4 text-[#009FE3]" />
                Stakeholder Talking Points
              </h4>
              <ul className="space-y-2">
                {idea.talkingPoints.map((pt, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-slate-600">
                    <span className="font-bold text-[#005BAC]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            
            {/* Future enhancements */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#009FE3] uppercase tracking-wider">Functional Future Enhancements</h4>
              <ul className="space-y-2">
                {idea.enhancements.map((pt, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-xs font-bold text-[#009FE3]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Multi-Tenant Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">Enterprise scaling Criteria (Multi-tenant)</h4>
              <ul className="space-y-2">
                {idea.enterprise.map((pt, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-xs font-bold text-[#D4A017]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
