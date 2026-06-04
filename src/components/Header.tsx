/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, Brain, Cpu, Database, Award, User, Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedIdeaName?: string;
}

export default function Header({ activeTab, setActiveTab, selectedIdeaName }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const tabs = [
    { id: 'ideas', label: 'Enterprise Ideas (18)', icon: Award },
    { id: 'detail', label: 'Detailed Evaluation', icon: Cpu, badge: selectedIdeaName ? 'Active' : undefined },
    { id: 'top5', label: 'Top 5 PRDs', icon: Database },
    { id: 'deep', label: '№1 Deep-Dive (ClaimsSense)', icon: Brain },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-[#005BAC] flex items-center justify-center text-white font-extrabold text-xs rounded-xs tracking-tight select-none shrink-0 shadow-xs">
              AXA
            </div>
            <span className="font-bold tracking-tight text-base sm:text-lg text-[#0F172A] whitespace-nowrap">
              XL <span className="text-[#475569] font-normal">| Project Intelligence</span>
            </span>
          </div>

          {/* Quick Context / Timestamp */}
          <div className="hidden md:flex items-center gap-5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>UTC: <strong>2026-06-04 08:29</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-md border border-sky-100 text-sky-700 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Platform Active</span>
            </div>
          </div>

          {/* User Account / Profile Details */}
          <div className="relative">
            <button
              id="profile-menu-trigger"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 pr-3 hover:bg-slate-100 transition duration-150"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#005BAC]/10 text-[#005BAC] font-bold text-xs uppercase">
                AK
              </div>
              <span className="text-xs font-medium text-slate-700 hidden sm:inline">Ankit Kumar</span>
              <User className="h-3 w-3 text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-slate-200 bg-white p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <div className="text-sm font-semibold text-slate-800">Ankit Kumar</div>
                  <div className="text-xs text-slate-400">ankitkumar999090@gmail.com</div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Organization:</span>
                    <span className="font-semibold text-slate-800">AXA XL Digital</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Access Role:</span>
                    <span className="font-semibold text-[#005BAC]">Innovation Lead</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Security Clearance:</span>
                    <span className="font-semibold text-emerald-600">Level 3 (Enterprise)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Tab-based segmented navigation - STICKY SUB-BAR */}
        <div className="mt-1 flex space-x-1 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full max-w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`tab-btn-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#005BAC] shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#005BAC]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.id === 'detail' && selectedIdeaName && (
                    <span className="bg-[#005BAC]/10 text-[#005BAC] text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold">
                      {selectedIdeaName.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
}
