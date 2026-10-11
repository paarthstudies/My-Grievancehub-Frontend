import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export function AiChatWidget({ onFileComplaint, onTrackTicket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am MSCEB AI Triage Assistant. Describe any power issue or pick a quick option below.',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: 'Wire is sparking', prompt: 'Heavy sparking on 11kV wire near residential pole.' },
    { label: 'Voltage fluctuation', prompt: 'Sudden high voltage surge (310V) tripped breakers.' },
    { label: 'Meter error', prompt: 'Smart meter display blank and flashing red error.' }
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let botResponse = '';
      let priority = 'Standard';

      if (lower.includes('spark') || lower.includes('fire') || lower.includes('hazard') || lower.includes('smoke')) {
        priority = 'Urgent';
        botResponse = '🚨 AI Triage: Priority: Urgent (Hazard). Auto-dispatched to nearest Quick Response Crew Van #14. Safety cutoff activated.';
      } else if (lower.includes('voltage') || lower.includes('surge') || lower.includes('phase')) {
        priority = 'High';
        botResponse = '⚡ AI Triage: Priority: High (Power Quality). Substation SCADA tap changer notified. Field lineman assigned.';
      } else {
        botResponse = '📋 AI Triage: Complaint categorized under Distribution Operations. Target SLA: < 45 Mins.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          priority: priority,
          time: 'Just now',
          actionPrompt: text
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 1. Small, Non-Intrusive Micro Popup (image_18.png) */}
      {isOpen && (
        <div className="mb-4 w-[330px] sm:w-[350px] bg-white rounded-3xl border border-neutral-200/90 shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[490px]">
          
          {/* Header Strip */}
          <div className="p-3.5 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#18181B] border border-neutral-700 flex items-center justify-center text-[#D2F843]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Grievance Hub Assistant</span>
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Online / AI Triage</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-neutral-50 border-b border-neutral-100">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.prompt)}
                className="px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[10px] font-semibold text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all whitespace-nowrap shadow-soft-sm"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Micro Conversation Stream */}
          <div className="p-3.5 space-y-2.5 overflow-y-auto flex-1 max-h-[260px] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-neutral-900 text-white rounded-br-none'
                      : 'bg-neutral-100 text-neutral-800 rounded-bl-none border border-neutral-200/60'
                  }`}
                >
                  <p className="text-[11px]">{m.text}</p>
                  
                  {m.actionPrompt && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onFileComplaint(m.actionPrompt);
                      }}
                      className="mt-2 text-[10px] font-bold text-[#10B981] hover:underline flex items-center gap-1"
                    >
                      <span>Proceed to official file</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-neutral-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] px-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">AI analyzing priority...</span>
              </div>
            )}
          </div>

          {/* Compact Message Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 border-t border-neutral-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type issue (e.g. spark, outage)..."
              className="flex-1 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-1.5 rounded-full bg-neutral-900 hover:bg-black text-[#D2F843] disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Tiny Circular Action Button (Floating bottom-right corner, glowing lime ring) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-neutral-900 hover:bg-black text-[#D2F843] flex items-center justify-center shadow-[0_0_22px_rgba(210,248,67,0.5)] border-2 border-[#D2F843] transition-transform duration-200 hover:scale-105 active:scale-95 group relative"
        aria-label="Open AI Assistant"
      >
        <span className="absolute -inset-1 rounded-full bg-[#D2F843]/20 animate-ping pointer-events-none" />
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 fill-[#D2F843] stroke-neutral-900" />
        )}
      </button>

    </div>
  );
}
