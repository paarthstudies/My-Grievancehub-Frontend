import React, { useState } from 'react';
import { X, Sparkles, Zap, ArrowRight, CheckCircle2, MapPin, Hash, Phone, AlertTriangle, FileText } from 'lucide-react';
import { SERVICE_CATEGORIES, SUBSTATIONS_LIST } from '../data/mockData';

export function ComplaintModal({ isOpen, onClose, initialPrompt = '', initialCategory = null, onTicketCreated }) {
  const [consumerId, setConsumerId] = useState('028549102941');
  const [mobileNumber, setMobileNumber] = useState('9822019482');
  const [category, setCategory] = useState(initialCategory?.title || 'Transformer & Cable Hazard');
  const [substation, setSubstation] = useState(SUBSTATIONS_LIST[0]);
  const [address, setAddress] = useState('Flat 402, Sai Heights, Baner Road, Pune');
  const [description, setDescription] = useState(initialPrompt || 'Sparking in transformer pole terminal near our residential building.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(null);

  if (!isOpen) return null;

  // Real-time AI preview pill
  const isEmergency = description.toLowerCase().includes('spark') || 
                      description.toLowerCase().includes('fire') || 
                      description.toLowerCase().includes('shock') ||
                      description.toLowerCase().includes('urgent');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newTicketId = 'MSCEB-2026-' + Math.floor(10000 + Math.random() * 90000);
      const ticketData = {
        id: newTicketId,
        consumerId,
        consumerName: 'Rajesh Sharma',
        address,
        category,
        substation,
        description,
        reportedAt: 'Just now',
        slaTarget: isEmergency ? '< 20 Mins' : '< 45 Mins',
        status: 'In Progress',
        currentStage: 2,
        stages: [
          { title: 'Complaint Registered', time: 'Just now', done: true, desc: 'Logged via Citizen Portal' },
          { title: 'AI Triage & Categorization', time: 'Just now', done: true, desc: `Assigned Priority: ${isEmergency ? 'Urgent' : 'Standard'} | Auto-Dispatched` },
          { title: 'Field Crew Dispatched', time: 'Estimated in 8m', done: false, desc: 'Notifying nearest Quick Response Van' },
          { title: 'On-Site Diagnostic & Repair', time: 'Estimated in 25m', done: false, desc: 'Field repair and safety check' },
          { title: 'Resolution & Consumer OTP Close', time: 'Pending', done: false, desc: 'Citizen sign-off via SMS OTP' }
        ]
      };
      setCreatedTicket(ticketData);
      if (onTicketCreated) {
        onTicketCreated(ticketData);
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto bg-white rounded-3xl sm:rounded-4xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden animate-slide-up">
        {/* Glow */}
        <div className="absolute -top-24 right-0 w-72 h-36 bg-gradient-to-b from-[#D2F843]/25 via-[#10B981]/10 to-transparent blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-neutral-900 text-[#D2F843] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900">Register Electricity Grievance</h3>
              <p className="text-xs text-neutral-500">Autonomous MSCEB Dispatch & SLA Guarantee</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {createdTicket ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ticket Auto-Dispatched
              </span>
              <h4 className="text-2xl font-bold text-neutral-900 mt-2">
                Complaint Registered Successfully!
              </h4>
              <p className="text-sm text-neutral-600 mt-1">
                Your incident has been auto-triaged and assigned to the local division dispatch center.
              </p>
            </div>

            {/* Generated Ticket Box */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Official Ticket ID:</span>
                <span className="text-sm font-mono font-bold text-neutral-900 bg-neutral-200/80 px-2 py-0.5 rounded">
                  {createdTicket.id}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Consumer Account:</span>
                <span className="font-mono text-neutral-800">{createdTicket.consumerId}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">MERC Target SLA:</span>
                <span className="font-bold text-emerald-700">{createdTicket.slaTarget}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  // The parent can switch to track mode
                }}
                className="flex-1 py-3 px-5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
              >
                Track This Ticket Now
              </button>
              <button
                onClick={() => {
                  setCreatedTicket(null);
                  setDescription('');
                }}
                className="py-3 px-5 rounded-full border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50"
              >
                File Another Complaint
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Consumer ID & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  12-Digit Consumer ID (CA No)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Hash className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    maxLength={12}
                    value={consumerId}
                    onChange={(e) => setConsumerId(e.target.value.replace(/\D/g, ''))}
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-full border border-neutral-300 text-xs font-mono font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Mobile Number (For SMS OTP)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-full border border-neutral-300 text-xs font-mono font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Grievance Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-full border border-neutral-300 text-xs font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title} ({cat.sla})
                  </option>
                ))}
              </select>
            </div>

            {/* Address & Substation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Premises Address / Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-full border border-neutral-300 text-xs font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Division / Substation
                </label>
                <select
                  value={substation}
                  onChange={(e) => setSubstation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-full border border-neutral-300 text-xs font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                  {SUBSTATIONS_LIST.map((sub, i) => (
                    <option key={i} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Natural language description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-700">
                  Detailed Grievance Description
                </label>
                <span className="text-[11px] text-neutral-400">AI auto-classifies urgency</span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened, any visible pole numbers, transformer sparks, or meter readings..."
                required
                className="w-full p-3 rounded-2xl border border-neutral-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 placeholder-neutral-400 resize-none"
              />
            </div>

            {/* Real-time AI Classification Preview Chip */}
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-neutral-600">AI Triage Preview:</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${
                  isEmergency ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isEmergency ? 'Priority: Urgent / HazMat' : 'Priority: Standard LT'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                SLA: {isEmergency ? '< 20 Mins' : '< 2 Hours'}
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-[#09090B] hover:bg-black text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-soft-md active:scale-98 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Auto-Triage & Dispatching Crew...' : 'Submit Grievance to MSCEB'}</span>
              <ArrowRight className="w-4 h-4 text-[#D2F843]" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
