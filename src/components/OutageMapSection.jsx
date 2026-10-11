import React, { useState } from 'react';
import { MapPin, Activity, Zap, AlertTriangle, ShieldCheck, RefreshCw, Radio, CheckCircle, ArrowRight } from 'lucide-react';
import { DISTRICT_GRID_STATUS } from '../data/mockData';

export function OutageMapSection({ onReportOutage }) {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_GRID_STATUS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <section id="outage-map" className="py-20 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-3">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Real-Time SCADA Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
              Maharashtra Grid Health & Live Outage Map
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Live power grid status across 36 district operations centers and 2,400+ primary substations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-800 shadow-soft-sm transition-all active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-neutral-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync SCADA Feeds</span>
            </button>
          </div>
        </div>

        {/* District Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {DISTRICT_GRID_STATUS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrict(d)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedDistrict.id === d.id
                  ? 'bg-neutral-900 text-white shadow-soft-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${d.gridHealth > 99 ? 'bg-[#10B981]' : 'bg-[#D2F843]'}`} />
              <span>{d.name}</span>
            </button>
          ))}
        </div>

        {/* Telemetry Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Visual Map Card (2 cols) */}
          <div className="lg:col-span-2 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-lg p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Map Background Grid graphic */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Selected Zone</span>
                  <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-neutral-800" />
                    <span>{selectedDistrict.name}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                    <span>Grid Status: {selectedDistrict.status}</span>
                  </div>
                </div>
              </div>

              {/* Schematic grid visual representation */}
              <div className="my-8 p-6 rounded-2xl bg-neutral-900 text-white relative overflow-hidden shadow-inner">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#D2F843]/10 rounded-full blur-2xl" />
                
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D2F843]"></span>
                    SCADA 33kV Substation Radar
                  </span>
                  <span className="font-mono text-neutral-400">LAT: 18.5204° N, LONG: 73.8567° E</span>
                </div>

                {/* Substation Feeder Matrix simulation */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                    <span className="text-[11px] text-neutral-400">Total Feeders</span>
                    <p className="text-xl font-mono font-bold text-white mt-0.5">{selectedDistrict.activeFeeders}</p>
                    <span className="text-[10px] text-emerald-400 font-medium">99.8% Online</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                    <span className="text-[11px] text-neutral-400">Substations</span>
                    <p className="text-xl font-mono font-bold text-white mt-0.5">{selectedDistrict.substations}</p>
                    <span className="text-[10px] text-neutral-300 font-medium">All Linked</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                    <span className="text-[11px] text-neutral-400">Active Incidents</span>
                    <p className="text-xl font-mono font-bold text-[#D2F843] mt-0.5">{selectedDistrict.activeIncidents}</p>
                    <span className="text-[10px] text-emerald-400 font-medium">Under Repair</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                    <span className="text-[11px] text-neutral-400">Avg Restoration</span>
                    <p className="text-xl font-mono font-bold text-white mt-0.5">{selectedDistrict.avgResolution}</p>
                    <span className="text-[10px] text-neutral-300 font-medium">Within SLA</span>
                  </div>
                </div>

                {/* Live Feeder status note */}
                <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">
                    {selectedDistrict.alert || 'No active critical emergency alerts across main 33kV lines.'}
                  </span>
                  <span className="text-[#D2F843] font-mono text-[11px]">Sync Rate: 1000ms</span>
                </div>
              </div>
            </div>

            {/* Bottom action trigger */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100">
              <span className="text-xs text-neutral-500">
                Experiencing an unlisted outage in {selectedDistrict.name}?
              </span>
              <button
                onClick={() => onReportOutage(selectedDistrict.name)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <span>Report Outage in {selectedDistrict.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D2F843]" />
              </button>
            </div>
          </div>

          {/* District Summary & Consumer Reach Card (1 col) */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-soft-lg p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Regional Reliability
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {selectedDistrict.gridHealth}%
                </span>
              </div>

              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Supply Coverage: {selectedDistrict.consumers} Citizens
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Monitored by MSCEB Regional Control Center with automated fault location, isolation, and service restoration (FLISR).
              </p>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 mb-1 font-medium">Automated Restoration Index</div>
                  <div className="flex items-center justify-between font-bold text-neutral-900">
                    <span>FLISR Automated Cutover</span>
                    <span className="text-emerald-700">&lt; 3.2 seconds</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 mb-1 font-medium">Quick Response Teams on Duty</div>
                  <div className="flex items-center justify-between font-bold text-neutral-900">
                    <span>Mobile Vans Active</span>
                    <span className="text-neutral-900">42 Vans on Standby</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 mb-1 font-medium">Emergency Feeder Hotline</div>
                  <div className="flex items-center justify-between font-bold text-neutral-900">
                    <span>Priority Dispatch Desk</span>
                    <span className="font-mono text-black">1912 (Ext 1)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
              <span className="text-[11px] text-neutral-400">
                Official MSCEB Telemetry • Updated continuously
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
