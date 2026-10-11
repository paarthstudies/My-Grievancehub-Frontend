import React from 'react';
import { Zap, Phone, Mail, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

export function Footer({ onOpenAuth, onOpenRegister, onOpenTrack }) {
  return (
    <footer id="support" className="bg-[#09090B] text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#18181B] border border-neutral-700 flex items-center justify-center text-[#D2F843]">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">Grievance Hub</span>
                <p className="text-[11px] text-neutral-400">Maharashtra State Electricity Board (MSCEB)</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Next-generation autonomous grievance redressal infrastructure powered by real-time SCADA feeds and automated smart crew dispatch. Serving 30M+ consumers across Maharashtra.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <span>System Status: <strong className="text-white">All Feeders Operational</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Consumer Services */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Citizen Services</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenRegister} className="hover:text-white transition-colors">
                  File Power Outage
                </button>
              </li>
              <li>
                <button onClick={onOpenTrack} className="hover:text-white transition-colors">
                  Track Grievance Status
                </button>
              </li>
              <li>
                <a href="#outage-map" className="hover:text-white transition-colors">
                  Live Feeder Outage Map
                </a>
              </li>
              <li>
                <button onClick={() => onOpenAuth('consumer')} className="hover:text-white transition-colors">
                  Consumer Portal Login
                </button>
              </li>
              <li>
                <a href="#solar" onClick={(e) => { e.preventDefault(); onOpenRegister(); }} className="hover:text-white transition-colors">
                  PM Surya Ghar Rooftop Net-Meter
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Staff & Administration */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">MSCEB Internal</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenAuth('officer')} className="hover:text-white transition-colors">
                  Junior / Assistant Engineer Portal
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('admin')} className="hover:text-white transition-colors">
                  Superadmin Console (2FA)
                </button>
              </li>
              <li>
                <a href="#scada" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Substation SCADA Gateway
                </a>
              </li>
              <li>
                <a href="#crew" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Mobile Lineman Dispatch Logs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts & Helplines */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Emergency 24x7</h5>
            <div className="space-y-2">
              <a href="tel:1912" className="flex items-center gap-2 text-white font-mono hover:text-[#D2F843] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#D2F843]" />
                <span className="font-bold">1912</span>
                <span className="text-[10px] text-neutral-400 font-sans">(Statewide Toll-Free)</span>
              </a>
              <a href="tel:18002123435" className="flex items-center gap-2 text-white font-mono hover:text-[#D2F843] transition-colors">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>1800-212-3435</span>
              </a>
              <div className="text-[11px] text-neutral-500 pt-1">
                Electricity Ombudsman Office:<br />
                Prakashgad, Bandra (East), Mumbai 400051
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 Maharashtra State Electricity Board (MSCEB / MSEDCL). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Globe className="w-3.5 h-3.5" />
              <span>Language: English (मराठी उपलब्ध)</span>
            </span>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white">Privacy Policy</a>
            <a href="#rti" onClick={(e) => e.preventDefault()} className="hover:text-white">RTI Act Guidelines</a>
            <a href="#merc" onClick={(e) => e.preventDefault()} className="hover:text-white">MERC Standards</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
