"use client";

import React from "react";
import { Phone, AlertTriangle, HeartPulse } from "lucide-react";

const supports = [
  {
    label: "Emergency",
    number: "000",
    href: "tel:000",
    detail: "Ambulance / Fire / Police",
    icon: Phone,
  },
  {
    label: "Lifeline (24h)",
    number: "13 11 14",
    href: "tel:131114",
    detail: "Crisis support and suicide prevention",
    icon: Phone,
  },
  {
    label: "Mental Health Access",
    number: "1800 011 511",
    href: "tel:1800011511",
    detail: "NSW Mental Health Access Line",
    icon: HeartPulse,
  },
];

const CrisisFooter = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-8 px-6">
      <div className="bg-rose-500/5 border border-rose-500/10 rounded-[40px] p-8 md:p-12 space-y-6">
        <div className="flex items-center space-x-4 text-rose-400">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          <h3 className="text-sm font-black uppercase tracking-[0.3em]">Crisis support</h3>
        </div>
        <p className="text-xs md:text-sm text-white/40">
          If you are in immediate danger, call emergency services. These numbers are tap-to-call.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supports.map((support) => (
            <div key={support.label} className="space-y-2">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{support.label}</div>
              <a
                href={support.href}
                aria-label={`Call ${support.label}: ${support.number}`}
                className="inline-flex items-center space-x-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
              >
                <support.icon className="w-4 h-4 text-rose-500" aria-hidden="true" />
                <span className="text-xl font-black text-white underline decoration-white/20 underline-offset-4 hover:decoration-rose-400">
                  {support.number}
                </span>
              </a>
              <p className="text-[10px] text-white/40">{support.detail}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest">
            You do not have to face a crisis alone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisFooter;
