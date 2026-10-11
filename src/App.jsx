import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { OutageMapSection } from './components/OutageMapSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ComplaintModal } from './components/ComplaintModal';
import { TrackTicketModal } from './components/TrackTicketModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AiChatWidget } from './components/AiChatWidget';
import { CheckCircle2, Sparkles, LayoutDashboard } from 'lucide-react';

export default function App() {
  // Navigation / View state: 'landing' | 'admin' | 'auth-dedicated'
  const [activeView, setActiveView] = useState('landing');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState('consumer');
  
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [complaintPrompt, setComplaintPrompt] = useState('');
  const [complaintCategory, setComplaintCategory] = useState(null);

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackTicketId, setTrackTicketId] = useState('MSCEB-2026-98412');

  // Authenticated user state
  const [authUser, setAuthUser] = useState(null);
  const [bannerToast, setBannerToast] = useState(null);

  // Sync with URL hash if user navigates to #signin or #admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#signin' || window.location.hash === '#auth') {
        setIsAuthModalOpen(true);
      } else if (window.location.hash === '#admin') {
        setActiveView('admin');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (message, type = 'success') => {
    setBannerToast({ message, type });
    setTimeout(() => {
      setBannerToast(null);
    }, 4500);
  };

  const handleOpenAuth = (role = 'consumer', dedicated = false) => {
    setAuthRole(role);
    if (dedicated) {
      setActiveView('auth-dedicated');
      setIsAuthModalOpen(false);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginSuccess = (userObj) => {
    setAuthUser(userObj);
    showToast(`Signed in as ${userObj.displayName} (${userObj.role.toUpperCase()})`);
    
    // If logged in as admin, transition straight to the Admin Dashboard
    if (userObj.role === 'admin') {
      setActiveView('admin');
    } else if (activeView === 'auth-dedicated') {
      setActiveView('landing');
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    setActiveView('landing');
    showToast('Signed out of Grievance Hub portal.');
  };

  const handleOpenFileComplaint = (promptText = '', categoryObj = null) => {
    setComplaintPrompt(promptText);
    setComplaintCategory(categoryObj);
    setIsComplaintModalOpen(true);
  };

  const handleOpenTrackTicket = (ticketId = 'MSCEB-2026-98412') => {
    setTrackTicketId(ticketId);
    setIsTrackModalOpen(true);
  };

  const handleTicketCreated = (newTicket) => {
    showToast(`Grievance ${newTicket.id} registered! Auto-dispatched to ${newTicket.substation}.`);
  };

  // If in Admin Dashboard view, render the multi-workspace ServiceVolt dashboard
  if (activeView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F4F4F5] text-neutral-900 font-sans antialiased selection:bg-[#D2F843] selection:text-black">
        {bannerToast && (
          <div className="fixed top-6 right-6 z-50 max-w-md bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-slide-up">
            <div className="w-6 h-6 rounded-full bg-[#D2F843] text-black flex items-center justify-center font-bold text-xs shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-neutral-200">{bannerToast.message}</p>
          </div>
        )}

        <AdminDashboard
          onReturnToLanding={() => setActiveView('landing')}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] font-sans antialiased flex flex-col selection:bg-[#D2F843] selection:text-black">
      
      {/* Toast Notification */}
      {bannerToast && (
        <div className="fixed top-24 right-5 z-50 max-w-md bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-slide-up">
          <div className="w-6 h-6 rounded-full bg-[#D2F843] text-black flex items-center justify-center font-bold text-xs shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-medium text-neutral-200">{bannerToast.message}</p>
        </div>
      )}

      {/* Primary Navigation Bar (Transparent Header) */}
      <Navbar
        onOpenAuth={(role) => handleOpenAuth(role, false)}
        onOpenTrack={() => handleOpenTrackTicket()}
        onOpenRegister={() => handleOpenFileComplaint()}
        activeView={activeView}
        setActiveView={setActiveView}
        authUser={authUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'auth-dedicated' ? (
          /* Page 2 as Dedicated View */
          <div className="relative py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveView('landing')}
                  className="text-xs font-semibold text-neutral-600 hover:text-black underline underline-offset-4"
                >
                  ← Return to Grievance Hub Home
                </button>

                <button
                  onClick={() => {
                    setActiveView('landing');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs font-semibold text-neutral-500 hover:text-black"
                >
                  Switch to Modal View
                </button>
              </div>
            </div>

            <AuthModal
              isOpen={true}
              isDedicatedView={true}
              onClose={() => setActiveView('landing')}
              defaultRole={authRole}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        ) : (
          /* Page 1: Minimalist Cinematic Landing Page (image_18.png) */
          <>
            {/* Hero Section with Unobstructed Transmission Towers Vista & Left-only Gradient */}
            <HeroSection
              onOpenRegister={() => handleOpenFileComplaint()}
              onOpenTrack={() => handleOpenTrackTicket()}
            />

            {/* Comprehensive Grievance Categories & SLAs */}
            <ServicesSection
              onSelectCategory={(categoryObj) => handleOpenFileComplaint('', categoryObj)}
            />

            {/* Live Outage Map & District SCADA Telemetry */}
            <OutageMapSection
              onReportOutage={(districtName) => handleOpenFileComplaint(`Unscheduled power outage in ${districtName} residential sector`)}
            />

            {/* Quick Experience Switcher Bar */}
            <section className="py-12 bg-white border-t border-neutral-200/80">
              <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-800">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Dual Experience Showcase</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  Switch between Public Portal & Admin Console
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
                  Experience both the citizen-facing grievance portal and the ServiceVolt-inspired MSCEB DISCOM Operations Dashboard.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveView('admin')}
                    className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#D2F843]" />
                    <span>Open Admin Dashboard (ServiceVolt Blueprint)</span>
                  </button>

                  <button
                    onClick={() => handleOpenAuth('consumer', false)}
                    className="px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>Open 3-Role Sign In Card</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Official MSCEB Footer */}
      <Footer
        onOpenAuth={(role) => handleOpenAuth(role, false)}
        onOpenRegister={() => handleOpenFileComplaint()}
        onOpenTrack={() => handleOpenTrackTicket()}
      />

      {/* Floating Minimalist AI Assistant FAB & Micro-Popup (image_18.png) */}
      {activeView === 'landing' && (
        <AiChatWidget
          onFileComplaint={(prompt) => handleOpenFileComplaint(prompt)}
          onTrackTicket={() => handleOpenTrackTicket()}
        />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultRole={authRole}
        onLoginSuccess={handleLoginSuccess}
        isDedicatedView={false}
      />

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        initialPrompt={complaintPrompt}
        initialCategory={complaintCategory}
        onTicketCreated={handleTicketCreated}
      />

      <TrackTicketModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        initialTicketId={trackTicketId}
      />

    </div>
  );
}
