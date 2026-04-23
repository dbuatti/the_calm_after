"use client";

import React from 'react';
import { Phone, AlertTriangle, HeartPulse } from 'lucide-react';

const CrisisFooter = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-12 px-6">
      <div className="bg-rose-500/5 border border-rose-500/10 rounded-[40px] p-8 md:p-12 space-y-8">
        <div className="flex items-center space-x-4 text-rose-400">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-sm font-black uppercase tracking-[0.3em]">Crisis Support</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Emergency</div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-rose-500" />
              <span className="text-xl font-black text-white">000</span>
            </div>
            <p className="text-[10px] text-white/40">Ambulance / Fire / Police</p>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Lifeline (24h)</div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-rose-500" />
              <span className="text-xl font-black text-white">13 11 14</span>
            </div>
            <p className="text-[10px] text-white/40">Crisis support and suicide prevention</p>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Mental Health Access</div>
            <div className="flex items-center space-x-3">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span className="text-xl font-black text-white">1800 011 511</span>
            </div>
            <p className="text-[10px] text-white/40">NSW Mental Health Access Line</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest">
            Source: University of Sydney CAPS • CRICOS 00026A
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisFooter;