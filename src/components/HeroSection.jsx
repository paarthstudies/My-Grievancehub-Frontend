import React from 'react';
import { ArrowRight, FileSearch, CheckCircle2, Zap } from 'lucide-react';

export function HeroSection({ onOpenRegister, onOpenTrack }) {
  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center pt-6 pb-20 lg:pt-8 lg:pb-24 overflow-hidden">
      
      {/* 1. Atmospheric Cinematic Background with Industrial Transmission Towers (image_18.png) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-right sm:bg-center bg-no-repeat scale-100 transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      />

      {/* 2. Soft, Smooth Left-Only Fade/Gradient (Preserves 100% visible unobstructed vista on the right) */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 lg:w-3/5 z-0 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 z-0 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-xl text-left space-y-7">
          
          {/* Subtle Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-neutral-200/80 text-xs font-semibold text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-neutral-900 font-bold">MSCEB Grievance 2.0</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-600">Autonomous Power Grid Resolution</span>
          </div>

          {/* Bold Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
            Smart, Transparent <br />
            <span className="relative inline-block text-neutral-950">
              Electricity Resolution
              <span className="absolute bottom-2 left-0 w-full h-3.5 bg-[#D2F843]/80 -z-10 rounded-sm"></span>
            </span> <br />
            for Maharashtra.
          </h1>

          {/* Updated Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-neutral-700 font-normal leading-relaxed">
            Instant AI triage, automated field crew dispatch, and real-time tracking for MSCEB consumers across Maharashtra.
          </p>

          {/* Call To Actions: Vivid Lime Pill + Bordered Transparent Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            
            {/* Prominent lime-green pill button */}
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 rounded-full bg-[#D2F843] hover:bg-[#c3ea2e] text-neutral-950 font-bold text-base shadow-[0_4px_22px_rgba(210,248,67,0.45)] hover:shadow-[0_6px_28px_rgba(210,248,67,0.6)] transition-all duration-200 flex items-center justify-center gap-2.5 group active:scale-95 cursor-pointer"
            >
              <span>Register a Complaint</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Bordered, transparent pill button */}
            <button
              onClick={onOpenTrack}
              className="px-8 py-4 rounded-full bg-white/50 hover:bg-white/80 text-neutral-900 font-semibold text-base border border-neutral-300/80 backdrop-blur-md shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <FileSearch className="w-4 h-4 text-neutral-700" />
              <span>Track Ticket Status</span>
            </button>

          </div>

          {/* Clean Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-neutral-950 font-bold">2.8M+</span> Resolved
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span className="text-neutral-950 font-bold">&lt;18 mins</span> Avg Dispatch
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] border border-neutral-800" />
              <span className="text-neutral-950 font-bold">99.4%</span> SLA Adherence
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
