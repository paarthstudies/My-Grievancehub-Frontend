import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, Truck, CheckCircle2, AlertOctagon, Zap, RefreshCw } from 'lucide-react';
import { TRIAGE_PRESETS } from '../data/mockData';

export function AiTriageDemo({ onFileWithComplaint }) {
  const [selectedPreset, setSelectedPreset] = useState(TRIAGE_PRESETS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customText, setCustomText] = useState(TRIAGE_PRESETS[0].prompt);
  const [pulseCount, setPulseCount] = useState(0);

  const handleSelectPreset = (preset) => {
    setIsAnalyzing(true);
    setSelectedPreset(preset);
    setCustomText(preset.prompt);
    setTimeout(() => {
      setIsAnalyzing(false);
      setPulseCount((c) => c + 1);
    }, 450);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      // Intelligently infer priority based on keywords
      const lower = customText.toLowerCase();
      let priority = 'Standard';
      let dept = 'Consumer Operations';
      let status = 'Assigned to Area Substation';

      if (lower.includes('spark') || lower.includes('fire') || lower.includes('smoke') || lower.includes('blast') || lower.includes('shock') || lower.includes('urgent')) {
        priority = 'Urgent';
        dept = 'Distribution & Emergency Maintenance';
        status = 'Auto-dispatched to local substation';
      } else if (lower.includes('voltage') || lower.includes('surge') || lower.includes('fluctuat') || lower.includes('phase')) {
        priority = 'High';
        dept = 'Power Quality & Grid Monitoring';
        status = 'SCADA voltage tap adjustment triggered';
      } else if (lower.includes('bill') || lower.includes('meter') || lower.includes('tariff') || lower.includes('payment')) {
        priority = 'Standard';
        dept = 'Consumer Revenue & Smart Metering';
        status = 'Queued for automated ledger verification';
      }

      setSelectedPreset({
        id: 'custom-' + Date.now(),
        label: 'Custom Citizen Report',
        location: 'Auto-detected: Maharashtra Feeder Zone',
        prompt: customText,
        priority: priority,
        priorityColor: priority === 'Urgent' ? 'rose' : priority === 'High' ? 'amber' : 'emerald',
        department: dept,
        status: status,
        substation: 'Nearest MSCEB 33kV Substation',
        crew: 'Emergency Van #07',
        eta: priority === 'Urgent' ? '12 mins' : '35 mins',
        actionSteps: [
          'Natural Language Triage model parsed context & risk level',
          'Geo-referenced nearest active feeder line and feeder breaker',
          'Automated dispatch ticket generated with unique token'
        ]
      });
      setIsAnalyzing(false);
    }, 500);
  };

  const priorityStyles = {
    rose: {
      bg: 'bg-rose-50 border-rose-200 text-rose-700',
      badge: 'bg-rose-600 text-white',
      dot: 'bg-rose-500'
    },
    amber: {
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      badge: 'bg-amber-600 text-white',
      dot: 'bg-amber-500'
    },
    emerald: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      badge: 'bg-emerald-600 text-white',
      dot: 'bg-emerald-500'
    }
  };

  const currentTheme = priorityStyles[selectedPreset.priorityColor] || priorityStyles.rose;

  return (
    <div className="relative w-full rounded-3xl bg-white border border-neutral-200/90 shadow-soft-xl p-5 sm:p-7 overflow-hidden">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#D2F843]/15 via-[#10B981]/10 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-neutral-100 rounded-full blur-2xl pointer-events-none -z-0" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-neutral-100 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-[#D2F843] flex items-center justify-center font-bold text-xs shadow-sm">
            <Sparkles className="w-4 h-4 fill-[#D2F843]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-900">Live AI Triage & Auto-Dispatch Engine</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">Autonomous classification benchmark: ~320ms</p>
          </div>
        </div>

        {/* Preset scenario switcher pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {TRIAGE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-150 ${
                selectedPreset.id === preset.id
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Input Demonstration */}
      <div className="mt-5 relative z-10">
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          Consumer Natural Language Input
        </label>
        
        <form onSubmit={handleCustomSubmit} className="relative">
          <div className="relative rounded-2xl bg-neutral-50 border border-neutral-200 focus-within:border-neutral-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-900/10 transition-all p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-neutral-200/80 flex items-center justify-center shrink-0 mt-0.5 text-neutral-700">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Try typing: 'Sparking in transformer near Sector 4'..."
                className="w-full bg-transparent text-sm sm:text-base text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all flex items-center gap-1 shadow-sm active:scale-95"
                title="Test AI classification"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D2F843]" />
                ) : (
                  <>
                    <span>Triage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D2F843]" />
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-200/60 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <MapPin className="w-3 h-3 text-neutral-400" />
                {selectedPreset.location}
              </span>
              <span className="text-neutral-400 italic">Click presets above or edit prompt</span>
            </div>
          </div>
        </form>
      </div>

      {/* AI Resolution Result Card */}
      <div className={`mt-5 rounded-2xl p-4 sm:p-5 border transition-all duration-300 relative z-10 ${
        isAnalyzing ? 'opacity-40 scale-[0.99] pointer-events-none' : 'opacity-100 scale-100 bg-white shadow-soft-sm'
      }`}>
        
        {/* The 3 Core Required AI Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-neutral-100">
          
          {/* 1. Priority Pill */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${currentTheme.bg}`}>
            <span className={`w-2 h-2 rounded-full ${currentTheme.dot} animate-pulse`} />
            <span>Priority: <strong className="font-bold">{selectedPreset.priority}</strong></span>
          </div>

          {/* 2. Department Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 border border-neutral-200 text-neutral-800">
            <span className="text-neutral-500">Dept:</span>
            <span className="font-bold">{selectedPreset.department}</span>
          </div>

          {/* 3. Status Pill */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#09090B] text-white shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#D2F843] animate-ping" />
            <span className="text-neutral-300">Status:</span>
            <span className="text-[#D2F843] font-bold">{selectedPreset.status}</span>
          </div>
          
        </div>

        {/* Operational Dispatch telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs">
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="text-neutral-500 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Assigned Substation</span>
            </div>
            <p className="font-bold text-neutral-900 truncate" title={selectedPreset.substation}>
              {selectedPreset.substation}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="text-neutral-500 flex items-center gap-1 mb-1">
              <Truck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Field Response Unit</span>
            </div>
            <p className="font-bold text-neutral-900 truncate" title={selectedPreset.crew}>
              {selectedPreset.crew}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="text-neutral-500 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Target SLA / Arrival</span>
            </div>
            <p className="font-bold text-emerald-700 flex items-center gap-1">
              <span>{selectedPreset.eta}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">Guaranteed</span>
            </p>
          </div>
        </div>

        {/* Action Steps Executed */}
        <div className="pt-2">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Automated Workflow Audit Log
          </div>
          <div className="space-y-1.5">
            {selectedPreset.actionSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick action button from live demo */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            Simulated live test against MSCEB Central SCADA & MDMS Gateway
          </span>
          <button
            onClick={() => onFileWithComplaint(selectedPreset.prompt)}
            className="text-xs font-semibold text-neutral-900 hover:text-black underline underline-offset-4 flex items-center gap-1"
          >
            <span>Proceed to file official ticket</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
}
