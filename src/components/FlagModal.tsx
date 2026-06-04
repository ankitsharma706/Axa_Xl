/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { Idea } from '../types';
import { X, AlertTriangle, ShieldCheck, CheckSquare, Trash2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface FlagModalProps {
  isOpen: boolean;
  idea: Idea | null;
  onClose: () => void;
  currentFlag: { reason: string; notes: string; timestamp: string } | null;
  onSaveFlag: (ideaName: string, flagData: { reason: string; notes: string; timestamp: string } | null) => void;
}

const FLAG_REASONS = [
  { id: 'security', label: 'Security Check: Data Privacy & PII Leak Risk', color: 'text-rose-500' },
  { id: 'regulatory', label: 'Regulatory compliance: Local Insurance Guidelines Drift', color: 'text-amber-500' },
  { id: 'complexity', label: 'Implementation Risk: Tech Stack / API Gateway Incompatibility', color: 'text-violet-500' },
  { id: 'alignment', label: 'Strategic Challenge: Mismatched Specialty Underwriting Target', color: 'text-slate-500' },
  { id: 'telemetry', label: 'Auditor Call: Manual Peer-Review Required', color: 'text-sky-500' },
];

export default function FlagModal({ isOpen, idea, onClose, currentFlag, onSaveFlag }: FlagModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('security');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (currentFlag) {
      setSelectedReason(currentFlag.reason || 'security');
      setNotes(currentFlag.notes || '');
    } else {
      setSelectedReason('security');
      setNotes('');
    }
  }, [currentFlag, idea, isOpen]);

  if (!isOpen || !idea) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      reason: selectedReason,
      notes: notes.trim(),
      timestamp: currentFlag?.timestamp || new Date().toISOString(),
    };
    onSaveFlag(idea.name, data);
    onClose();
  };

  const handleRemove = () => {
    onSaveFlag(idea.name, null);
    onClose();
  };

  const activeReasonLabel = FLAG_REASONS.find(r => r.id === selectedReason)?.label || 'Manual Review';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden z-10 flex flex-col"
      >
        {/* Top visual color belt */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-[#005BAC]"></div>

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-amber-50 border border-amber-200 ${currentFlag ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200'}`}>
              <AlertTriangle className={`h-5 w-5 ${currentFlag ? 'text-rose-600' : 'text-amber-600'}`} />
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-[#01142F] text-base sm:text-lg tracking-tight">
                {currentFlag ? 'Update Project Exception flag' : 'Flag Project for Manual Review'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase font-mono tracking-wide">
                INITIATIVE: {idea.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-grow overflow-y-auto max-h-[75vh]">
          
          {/* Quick Notice Card */}
          <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl flex items-start gap-3">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              Flagging logs a permanent warning badge over the project profile. It warns underwriting and IT teams to review codebases, databases, or API protocols for risk compliance.
            </div>
          </div>

          {/* Reason Selection Option Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Choose Exception Classification Reason:
            </label>
            <div className="space-y-2">
              {FLAG_REASONS.map((reason) => {
                const isSelected = selectedReason === reason.id;
                return (
                  <button
                    id={`flag-reason-opt-${reason.id}`}
                    type="button"
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 transition-all ${
                      isSelected 
                        ? 'bg-amber-50/45 border-amber-500 text-slate-800 ring-2 ring-amber-500/10' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                      <span>{reason.label}</span>
                    </div>
                    {isSelected && <CheckSquare className="h-4 w-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Area for Additional Comments Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="flag-comments-textarea" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Auditor Review Comments / Explanation:
              </label>
              <span className="text-[10px] text-slate-400">Required</span>
            </div>
            <textarea
              id="flag-comments-textarea"
              required
              rows={3}
              placeholder="e.g., European data privacy concerns require PII-scrubbed tokenization validation patterns. Secure endpoints must be evaluated before release."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/10 outline-none transition leading-relaxed"
            />
          </div>

          {/* Flagged Date Indicator */}
          {currentFlag && (
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <Calendar className="h-3 w-3" />
              <span>Flag logged on: {new Date(currentFlag.timestamp).toLocaleDateString()} at {new Date(currentFlag.timestamp).toLocaleTimeString()}</span>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
            {currentFlag ? (
              <button
                id="unflag-project-btn"
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 rounded-xl transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove Flag / Safe Status</span>
              </button>
            ) : (
              <div /> // Placeholder to keep layout right-aligned
            )}

            <div className="flex items-center gap-2">
              <button
                id="cancel-flag-btn"
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="confirm-flag-btn"
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition active:scale-95 cursor-pointer"
              >
                {currentFlag ? 'Save Changes' : 'Confirm Flag Exception'}
              </button>
            </div>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
