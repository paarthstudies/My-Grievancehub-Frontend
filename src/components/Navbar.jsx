import React, { useState } from 'react';
import { Zap, Phone, User, ChevronDown, Menu, X, LayoutDashboard, Shield } from 'lucide-react';

export function Navbar({ onOpenAuth, onOpenTrack, onOpenRegister, activeView, setActiveView, authUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-40 w-full bg-transparent transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Identity (Left): Sharp logo + glowing bolt badge + secondary label */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setActiveView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              {/* Circular glowing badge with lightning bolt */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-900 border border-neutral-700/60 flex items-center justify-center text-[#D2F843] shadow-[0_0_18px_rgba(210,248,67,0.35)] group-hover:scale-105 transition-transform duration-200 relative">
                <Zap className="w-5 h-5 fill-[#D2F843] stroke-[#D2F843]" />
                <span className="absolute -inset-0.5 rounded-full bg-[#D2F843]/20 animate-pulse-subtle pointer-events-none" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
                  Grievance Hub
                </span>
                <span className="text-[11px] font-medium text-neutral-500 tracking-wide">
                  Maharashtra State Electricity Board
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links (Center): Raw, spacious, natural typography without capsule shapes */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] font-semibold text-neutral-700">
            {/* Services with drop-down chevron */}
            <div className="relative">
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none py-2"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-neutral-500 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Minimal Services dropdown menu */}
              {servicesDropdownOpen && (
                <div 
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-xl p-2.5 z-50 animate-fade-in"
                >
                  <button 
                    onClick={() => scrollTo('services')} 
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
                  >
                    ⚡ Power Outages & Trips
                  </button>
                  <button 
                    onClick={() => scrollTo('services')} 
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
                  >
                    🔥 Transformer & Cable Hazard
                  </button>
                  <button 
                    onClick={() => scrollTo('services')} 
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
                  >
                    📊 Voltage Fluctuations & Surges
                  </button>
                  <button 
                    onClick={() => scrollTo('services')} 
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
                  >
                    ⏱️ Smart Meter & MDMS Reading
                  </button>
                  <button 
                    onClick={() => scrollTo('services')} 
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
                  >
                    ☀️ Solar Net-Metering & PM Surya
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={onOpenTrack} 
              className="hover:text-black transition-colors py-2"
            >
              Track Status
            </button>

            <button 
              onClick={() => scrollTo('outage-map')} 
              className="hover:text-black transition-colors py-2"
            >
              Outage Map
            </button>

            <button 
              onClick={() => scrollTo('support')} 
              className="hover:text-black transition-colors py-2"
            >
              Support
            </button>
          </nav>

          {/* Right Area: Minimalist Sign In + Helpline transparent outline card */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Minimalist Sign In with simple profile icon */}
            {authUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (authUser.role === 'admin') setActiveView('admin');
                  }}
                  className="flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-black py-2 px-3 rounded-full hover:bg-white/60 transition-colors"
                >
                  <User className="w-4 h-4 text-neutral-700" />
                  <span>{authUser.displayName}</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="text-xs font-medium text-neutral-500 hover:text-rose-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('consumer')}
                className="flex items-center gap-2 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors py-2 px-1 focus:outline-none"
              >
                <User className="w-4 h-4 text-neutral-700" />
                <span>Sign In</span>
              </button>
            )}

            {/* Emergency Hotline Chip: clean, rounded, transparent outline card without box shadows */}
            <a 
              href="tel:1912" 
              className="flex items-center gap-2 px-4 py-2 bg-white/40 hover:bg-white/70 backdrop-blur-sm border border-neutral-300/80 rounded-full text-xs font-semibold text-neutral-800 transition-all"
              title="Statewide MSCEB 24x7 Emergency Line"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-700" />
              <span>Helpline: <strong className="text-neutral-900 font-mono">1912 / 1800-212-3435</strong></span>
            </a>

            {/* Direct Officer & Admin Console shortcuts for evaluation */}
            <button
              onClick={() => setActiveView(activeView === 'officer' ? 'landing' : 'officer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeView === 'officer' 
                  ? 'bg-neutral-900 text-white border-neutral-900' 
                  : 'bg-white/50 hover:bg-white border-neutral-300 text-neutral-700'
              }`}
              title="Toggle MSCEB Field Officer Panel"
            >
              <Zap className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{activeView === 'officer' ? 'Exit Officer' : 'Officer Portal'}</span>
            </button>

            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'landing' : 'admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeView === 'admin' 
                  ? 'bg-neutral-900 text-white border-neutral-900' 
                  : 'bg-white/50 hover:bg-white border-neutral-300 text-neutral-700'
              }`}
              title="Toggle ServiceVolt Admin Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{activeView === 'admin' ? 'Exit Admin' : 'Admin Demo'}</span>
            </button>

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenAuth('consumer')}
              className="p-2 text-neutral-800 hover:text-black rounded-lg"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 px-5 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <a 
              href="tel:1912" 
              className="flex items-center gap-2 text-xs font-semibold text-neutral-800"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-600" />
              <span>Helpline: <strong>1912 / 1800-212-3435</strong></span>
            </a>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button 
              onClick={() => scrollTo('services')} 
              className="text-left py-2 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
            >
              Services
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenTrack(); }} 
              className="text-left py-2 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
            >
              Track Status
            </button>
            <button 
              onClick={() => scrollTo('outage-map')} 
              className="text-left py-2 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
            >
              Outage Map
            </button>
            <button 
              onClick={() => scrollTo('support')} 
              className="text-left py-2 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
            >
              Support
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
              className="w-full py-2.5 rounded-full bg-[#D2F843] text-black text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>Register a Complaint</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth('consumer'); }}
              className="w-full py-2.5 rounded-full border border-neutral-300 text-neutral-800 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setActiveView('officer'); }}
              className="w-full py-2.5 rounded-full border border-neutral-300 text-neutral-800 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50"
            >
              <Zap className="w-4 h-4 text-[#10B981]" />
              <span>Open Field Officer Panel</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setActiveView('admin'); }}
              className="w-full py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
