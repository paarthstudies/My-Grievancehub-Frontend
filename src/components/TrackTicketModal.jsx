import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, MapPin, Truck, Phone, AlertCircle, Sparkles, User, ShieldCheck } from 'lucide-react';
import { MOCK_TICKETS } from '../data/mockData';

export function TrackTicketModal({ isOpen, onClose, initialTicketId = 'MSCEB-2026-98412' }) {
  const [searchQuery, setSearchQuery] = useState(initialTicketId);
  const [activeTicket, setActiveTicket] = useState(MOCK_TICKETS[initialTicketId] || MOCK_TICKETS['MSCEB-2026-98412']);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      setIsSearching(false);
      // Search by ticket id or consumer id
      let found = MOCK_TICKETS[query];
      if (!found) {
        found = Object.values(MOCK_TICKETS).find(
          t => t.consumerId === query || t.id.toLowerCase() === query.toLowerCase()
        );
      }

      if (found) {
        setActiveTicket(found);
        setNotFound(false);
      } else {
        // Fallback demo ticket
        setNotFound(true);
      }
    }, 400);
  };

  const handleLoadDemo = (id) => {
    setSearchQuery(id);
    setActiveTicket(MOCK_TICKETS[id]);
    setNotFound(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-auto bg-white rounded-3xl sm:rounded-4xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden animate-slide-up">
        {/* Glow */}
        <div className="absolute -top-20 -left-10 w-72 h-36 bg-gradient-to-r from-[#D2F843]/20 via-[#10B981]/15 to-transparent blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              MSCEB Live Consumer Redressal
            </span>
            <h3 className="text-xl font-bold text-neutral-900">Track Grievance Ticket</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Ticket ID (MSCEB-2026-...) or 12-digit Consumer ID"
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              {isSearching ? 'Locating...' : 'Track Ticket'}
            </button>
          </form>

          {/* Quick Demo links */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500">
            <span>Try sample tickets:</span>
            <button
              type="button"
              onClick={() => handleLoadDemo('MSCEB-2026-98412')}
              className="font-mono text-neutral-800 hover:text-black font-semibold underline"
            >
              MSCEB-2026-98412 (In Progress)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleLoadDemo('MSCEB-2026-87123')}
              className="font-mono text-neutral-800 hover:text-black font-semibold underline"
            >
              MSCEB-2026-87123 (Resolved)
            </button>
          </div>
        </div>

        {notFound ? (
          <div className="my-8 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="text-sm font-bold text-amber-900">Ticket Not Found</h4>
            <p className="text-xs text-amber-700">
              No active grievance found for "{searchQuery}". Please check the 12-digit consumer ID or ticket reference.
            </p>
          </div>
        ) : (
          /* Ticket Details & Timeline */
          <div className="mt-6 space-y-6">
            
            {/* Ticket Info Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-200/80">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-mono font-bold text-neutral-900">{activeTicket.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTicket.status === 'Resolved' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeTicket.status}
                  </span>
                </div>

                <div className="text-xs text-neutral-500 font-medium">
                  Logged: <strong className="text-neutral-800">{activeTicket.reportedAt}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
                <div>
                  <span className="text-neutral-500">Consumer:</span>{' '}
                  <strong className="text-neutral-900">{activeTicket.consumerName}</strong>{' '}
                  <span className="font-mono text-neutral-500">({activeTicket.consumerId})</span>
                </div>
                <div>
                  <span className="text-neutral-500">Category:</span>{' '}
                  <strong className="text-neutral-900">{activeTicket.category}</strong>
                </div>
                <div>
                  <span className="text-neutral-500">Substation:</span>{' '}
                  <strong className="text-neutral-900">{activeTicket.substation}</strong>
                </div>
                <div>
                  <span className="text-neutral-500">Target SLA:</span>{' '}
                  <strong className="text-emerald-700 font-mono">{activeTicket.slaTarget}</strong>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-200/60 text-xs text-neutral-700">
                <span className="font-semibold text-neutral-900">Incident Details: </span>
                {activeTicket.description}
              </div>
            </div>

            {/* Live Progress Stepper */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Live Resolution Timeline
                </h4>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {activeTicket.status === 'Resolved' ? '5 of 5 Stages Completed' : 'Stage 3 of 5 In Action'}
                </span>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {activeTicket.stages.map((stage, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Step Icon Indicator */}
                    <div className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                      stage.done 
                        ? 'bg-emerald-600' 
                        : idx === activeTicket.currentStage - 1 
                        ? 'bg-neutral-900 ring-4 ring-neutral-200 animate-pulse' 
                        : 'bg-neutral-300'
                    }`}>
                      {stage.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-bold ${stage.done ? 'text-neutral-900' : 'text-neutral-600'}`}>
                          {stage.title}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">{stage.time}</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
