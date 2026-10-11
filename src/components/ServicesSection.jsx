import React from 'react';
import { 
  ZapOff, AlertTriangle, Activity, Gauge, FileText, Sun, 
  ArrowUpRight, Clock, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/mockData';

const iconMap = {
  ZapOff: ZapOff,
  AlertTriangle: AlertTriangle,
  Activity: Activity,
  Gauge: Gauge,
  FileText: FileText,
  Sun: Sun,
};

export function ServicesSection({ onSelectCategory }) {
  return (
    <section id="services" className="py-20 bg-white border-y border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>Intelligent Resolution Pathways</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
              Comprehensive Grievance Categories & SLAs
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Every complaint is auto-classified with legally binding Maharashtra Electricity Regulatory Commission (MERC) service guarantees.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <span>Standard MERC Target: </span>
              <strong className="text-neutral-900 font-bold">100% Digital Traceability</strong>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || AlertTriangle;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className="group p-6 rounded-3xl bg-[#FAFAFA] hover:bg-white border border-neutral-200/90 hover:border-neutral-900/40 shadow-soft-sm hover:shadow-soft-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top chip & icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#09090B] border border-neutral-200/90 group-hover:border-[#09090B] flex items-center justify-center text-neutral-800 group-hover:text-[#D2F843] shadow-sm transition-all duration-200">
                      <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        cat.tag === 'Emergency' 
                          ? 'bg-rose-50 text-rose-700 border-rose-200' 
                          : cat.tag === 'Priority 1' 
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}>
                        {cat.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom SLA & trigger */}
                <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Resolution SLA:</span>
                    <strong className="text-emerald-700 font-bold">{cat.sla}</strong>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-neutral-900 group-hover:text-black">
                    <span className="text-xs group-hover:underline">File Issue</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust banner */}
        <div className="mt-12 p-6 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D2F843] flex items-center justify-center text-black font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">MERC Citizen Charter Guarantee</h4>
              <p className="text-xs text-neutral-400">
                Complaints not resolved within published SLA automatically trigger senior executive escalation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-xs text-neutral-400">Escalation Ombudsman</div>
              <div className="text-xs font-mono font-bold text-[#D2F843]">Available 24x7</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
