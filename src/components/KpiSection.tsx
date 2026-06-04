/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Idea } from '../types';
import { Award, Layers, TrendingUp, Cpu, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface KpiSectionProps {
  ideas: Idea[];
}

export default function KpiSection({ ideas }: KpiSectionProps) {
  // Total Ideas
  const totalIdeas = ideas.length;

  // Top 5 Projects (sorted by overall score)
  const topFive = [...ideas].sort((a, b) => b.overallScore - a.overallScore).slice(0, 5);
  const topFiveAvg = topFive.length > 0 
    ? (topFive.reduce((sum, item) => sum + item.overallScore, 0) / topFive.length).toFixed(1)
    : '0.0';

  // Average Overall Score
  const entireAvg = ideas.length > 0
    ? (ideas.reduce((sum, item) => sum + item.overallScore, 0) / ideas.length).toFixed(1)
    : '0.0';

  // AI Readiness (Average AI score)
  const aiReadiness = ideas.length > 0
    ? (ideas.reduce((sum, item) => sum + item.aiScore, 0) / ideas.length).toFixed(1)
    : '0.0';

  // Dynamic 6-month historical data where the final month is the live portfolio average
  const currentAvgNum = parseFloat(entireAvg) || 80.6;
  const trendData = [
    { month: 'Jan', score: 68.5 },
    { month: 'Feb', score: 71.2 },
    { month: 'Mar', score: 73.8 },
    { month: 'Apr', score: 75.0 },
    { month: 'May', score: 78.4 },
    { month: 'Jun', score: currentAvgNum }
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 select-none animate-in fade-in duration-500">
      
      {/* Total Ideas KPI Card */}
      <div 
        id="kpi-total-ideas"
        className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#005BAC]/40"
      >
        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Total Portfolio Ideas</span>
        <div className="flex items-end justify-between mt-4">
          <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{totalIdeas}</span>
          <span className="text-[#10B981] text-xs font-semibold bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
            +18 Active
          </span>
        </div>
      </div>

      {/* Top 5 Projects Average KPI Card */}
      <div 
        id="kpi-top5-avg"
        className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#D4A017]/40"
      >
        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Top 5 Projects Avg</span>
        <div className="flex items-end justify-between mt-4">
          <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{topFiveAvg}</span>
          <span className="text-[#475569] text-xs font-mono font-medium">/ 100 max</span>
        </div>
      </div>

      {/* Average Score of all KPI Card */}
      <div 
        id="kpi-average-score"
        className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#005BAC]/40"
      >
        <div>
          <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Average Compliance Score</span>
          <div className="flex items-end justify-between mt-4">
            <span className="text-3xl font-extrabold text-[#005BAC] tracking-tight">{entireAvg}%</span>
            <div className="w-16 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mb-1">
              <div className="bg-[#005BAC] h-full" style={{ width: `${entireAvg}%` }}></div>
            </div>
          </div>
        </div>

        {/* 6-Month Historical Trend Sparkline */}
        <div className="h-14 w-full mt-4" id="kpi-trend-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <defs>
                <linearGradient id="colorAvgScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#005BAC" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#005BAC" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 8, fontFamily: 'monospace', fontWeight: 600 }}
              />
              <Tooltip 
                cursor={{ stroke: '#005BAC', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0F172A] border border-slate-800 px-2 py-1 rounded text-[9px] font-mono text-white shadow-md">
                        <span className="font-bold">{payload[0].payload.month}: </span>
                        <span className="text-sky-305 font-bold">{payload[0].value}%</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#005BAC" 
                strokeWidth={1.5} 
                fillOpacity={1} 
                fill="url(#colorAvgScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Readiness KPI Card */}
      <div 
        id="kpi-ai-readiness"
        className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-emerald-500/40"
      >
        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">AI readiness Rating</span>
        <div className="flex items-end justify-between mt-4">
          <span className="text-3xl font-extrabold text-[#D4A017] tracking-tight">Level 4</span>
          <span className="text-[#475569] text-xs font-medium">Index: {aiReadiness}</span>
        </div>
      </div>

    </section>
  );
}
