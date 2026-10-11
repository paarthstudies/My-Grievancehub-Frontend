import React, { useState } from 'react';
import { 
  ArrowRight, FileSearch, Sparkles, MapPin, Truck, Clock, 
  CheckCircle2, AlertOctagon, Zap, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { TRIAGE_PRESETS } from '../data/mockData';

export function HeroSection({ onOpenRegister, onOpenTrack, onFileWithComplaint }) {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activeScenario = TRIAGE_PRESETS[activePresetIndex];

  return (
    <section className="relative min-h-[92vh] flex items-center pt-8 pb-20 lg:pt-12 lg:pb-28 overflow-hidden">
      
      {/* 1. Atmospheric Cinematic Background with Industrial Transmission Towers (image_11.png) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 transform origin-center transition-transform duration-1000"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      />

      {/* Soft, smooth luminous fade/white-and-light-blue gradient overlay for high text contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/85 to-white/50 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-transparent to-[#FAFAFA]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: CONTENT & BUTTONS ================= */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Bold Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.12]">
              Smart, Transparent <br />
              <span className="relative inline-block text-neutral-900">
                Electricity Resolution
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D2F843]/70 -z-10 rounded-sm"></span>
              </span> <br />
              for Maharashtra.
            </h1>

            {/* Updated Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-neutral-700 max-w-xl font-normal leading-relaxed">
              Instant AI triage, automated field crew dispatch, and real-time tracking for MSCEB consumers across Maharashtra.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              
              {/* Prominent lime-green pill button */}
              <button
                onClick={onOpenRegister}
                className="px-8 py-4 rounded-full bg-[#D2F843] hover:bg-[#c4ec2f] text-neutral-950 font-bold text-base shadow-[0_4px_20px_rgba(210,248,67,0.4)] hover:shadow-[0_6px_25px_rgba(210,248,67,0.55)] transition-all duration-200 flex items-center justify-center gap-2.5 group active:scale-95 cursor-pointer"
              >
                <span>Register a Complaint</span>
                <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Bordered, transparent pill button */}
              <button
                onClick={onOpenTrack}
                className="px-8 py-4 rounded-full bg-white/60 hover:bg-white/90 text-neutral-900 font-semibold text-base border border-neutral-300/90 backdrop-blur-md shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <FileSearch className="w-4 h-4 text-neutral-700" />
                <span>Track Ticket Status</span>
              </button>

            </div>

            {/* Subtle trust metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-neutral-900 font-bold">2.8M+</span> Resolved
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#09090B]" />
                <span className="text-neutral-900 font-bold">&lt;18 mins</span> Avg Dispatch
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D2F843] border border-neutral-800" />
                <span className="text-neutral-900 font-bold">99.4%</span> SLA Adherence
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: FLOATING SHOWCASE OVERLAY STACK (image_11.png) ================= */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient decorative glow */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#D2F843]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Scenario toggle chips */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {TRIAGE_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => setActivePresetIndex(idx)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all whitespace-nowrap ${
                    activePresetIndex === idx
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-white/80 hover:bg-white text-neutral-700 border border-neutral-200/80 backdrop-blur-sm'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* The Overlay Stack of soft, rounded cards */}
            <div className="space-y-3.5">
              
              {/* Card 1: Citizen Incident Card ("Sparking in transformer near Sector 4") */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-xl transition-all hover:shadow-2xl">
                
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-neutral-500">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Citizen Grievance Incident</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">Reported 2 mins ago</span>
                </div>

                <div className="mt-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 fill-amber-500 stroke-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
                      "{activeScenario.prompt}"
                    </p>
                    <p className="text-xs font-mono text-neutral-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>{activeScenario.location}</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Card 2: AI Resolution Pill Stack with Priority Status */}
              <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl">
                
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Autonomous AI Triage Resolution</span>
                </div>

                {/* The Required AI Resolution Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Priority Pill */}
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                    activeScenario.priority === 'Urgent'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : activeScenario.priority === 'High'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      activeScenario.priority === 'Urgent' ? 'bg-rose-600' : 'bg-emerald-600'
                    } animate-pulse`} />
                    <span>Priority: {activeScenario.priority}</span>
                  </span>

                  {/* Dept Pill */}
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-100 border border-neutral-200 text-neutral-800">
                    Dept: {activeScenario.department}
                  </span>

                  {/* Status Pill */}
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-900 text-white shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D2F843] animate-ping" />
                    <span className="text-[#D2F843]">Status: {activeScenario.status}</span>
                  </span>

                </div>

              </div>

              {/* Card 3: Real-Time Field Crew Dispatch Telemetry */}
              <div className="p-4 sm:p-5 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl">
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/60">
                    <div className="flex items-center gap-1 text-neutral-400 mb-1">
                      <Truck className="w-3.5 h-3.5 text-[#D2F843]" />
                      <span>Response Van</span>
                    </div>
                    <p className="font-bold text-white truncate text-xs">{activeScenario.crew}</p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/60">
                    <div className="flex items-center gap-1 text-neutral-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Target SLA / ETA</span>
                    </div>
                    <p className="font-bold text-[#D2F843] font-mono text-xs">{activeScenario.eta}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Auto-routed to {activeScenario.substation}</span>
                  </span>
                  <button
                    onClick={() => onFileWithComplaint(activeScenario.prompt)}
                    className="text-xs font-bold text-[#D2F843] hover:underline"
                  >
                    File Ticket →
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
