import React, { useState } from 'react';
import { 
  Zap, Search, Bell, Settings, Globe, LogOut, ChevronDown, ChevronRight, 
  Menu, X, TrendingUp, AlertTriangle, Clock, CheckCircle2, Truck, Users, 
  FileText, ShieldCheck, Activity, BarChart3, Filter, ArrowUpRight, ArrowDownRight,
  ExternalLink, PhoneCall, RefreshCw, Layers, Compass, Building2
} from 'lucide-react';

export function AdminDashboard({ onReturnToLanding, onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('Last Week');
  const [language, setLanguage] = useState('EN');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Expanded menu states
  const [expandedGroups, setExpandedGroups] = useState({
    ops: true,
    ai: false,
    staff: false,
    departments: false,
  });

  const toggleGroup = (grp) => {
    setExpandedGroups((prev) => ({ ...prev, [grp]: !prev[grp] }));
  };

  // Sample tabular records for Pending Tasks / Live Dispatch
  const dispatchRecords = [
    {
      id: 'MSCEB-2026-98412',
      consumer: 'Rajesh Sharma',
      location: 'Baner Rd, Pune',
      hazard: 'Transformer Sparking',
      substation: 'Baner 33kV Substation',
      slaCountdown: '14m left',
      slaUrgent: true,
      priority: 'Urgent',
      priorityColor: 'rose',
      status: 'Van #09 En-Route',
      van: 'QRF-09',
      lineman: 'A. More (9822019283)'
    },
    {
      id: 'MSCEB-2026-98430',
      consumer: 'Ananya Deshpande',
      location: 'Kothrud, Pune',
      hazard: 'Voltage Spike (310V)',
      substation: 'Kothrud 110kV Div',
      slaCountdown: '42m left',
      slaUrgent: false,
      priority: 'High',
      priorityColor: 'amber',
      status: 'Technician On-Site',
      van: 'Van #04',
      lineman: 'R. Kadam'
    },
    {
      id: 'MSCEB-2026-98444',
      consumer: 'Suresh Patil',
      location: 'Vashi Sec 17, Navi Mumbai',
      hazard: '11kV Feeder Trip',
      substation: 'Vashi 33kV Sub-08',
      slaCountdown: '18m left',
      slaUrgent: true,
      priority: 'Urgent',
      priorityColor: 'rose',
      status: 'Safety Cutoff Activated',
      van: 'QRF-14',
      lineman: 'S. Deshmukh'
    },
    {
      id: 'MSCEB-2026-98451',
      consumer: 'Mahesh Joshi',
      location: 'Ambad, Nashik',
      hazard: 'Smart Meter MDMS Error',
      substation: 'Ambad Ind-05',
      slaCountdown: '3h 20m left',
      slaUrgent: false,
      priority: 'Standard',
      priorityColor: 'emerald',
      status: 'Remote Reset Queued',
      van: 'MDMS Server',
      lineman: 'Automated MDMS'
    },
    {
      id: 'MSCEB-2026-98462',
      consumer: 'Kisan Cooperative',
      location: 'Karad Rural, Satara',
      hazard: 'Agri-Pump Feeder Snapped',
      substation: 'Karad Rural 33kV',
      slaCountdown: '26m left',
      slaUrgent: true,
      priority: 'Urgent',
      priorityColor: 'rose',
      status: 'Lineman Squad #03 En-Route',
      van: 'QRF-03',
      lineman: 'R. Jadhav'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-neutral-900 flex font-sans antialiased">
      
      {/* ================= 1. ELEGANTLY STRUCTURED SIDEBAR ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-neutral-200/90 flex flex-col justify-between transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Sidebar Brand Header */}
        <div>
          <div className="h-20 px-5 flex items-center justify-between border-b border-neutral-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-[#D2F843] flex items-center justify-center shrink-0 shadow-md">
                <Zap className="w-5 h-5 fill-[#D2F843]" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-neutral-900">Grievance Hub</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">DISCOM Admin</span>
                </div>
              )}
            </div>

            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-neutral-500 hover:text-black rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items Navigation */}
          <div className="py-5 px-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            
            {/* 1. Dashboard Overview (Active soft lime pill) */}
            <button
              onClick={() => setActiveMenu('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMenu === 'overview'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <Activity className="w-4 h-4 text-neutral-900 shrink-0" />
              {!sidebarCollapsed && <span>Dashboard Overview</span>}
            </button>

            {/* 2. Grievance Ops (with dropdown arrow) */}
            <div>
              <button
                onClick={() => toggleGroup('ops')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-neutral-700 shrink-0" />
                  {!sidebarCollapsed && <span>Grievance Ops</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedGroups.ops ? 'rotate-180' : ''}`} />
                )}
              </button>

              {expandedGroups.ops && !sidebarCollapsed && (
                <div className="ml-8 pl-2 border-l border-neutral-200 space-y-1 py-1 text-[11px] font-medium text-neutral-500">
                  <a href="#active" onClick={(e) => e.preventDefault()} className="block py-1 text-neutral-900 font-semibold hover:underline">
                    Live Dispatch Board
                  </a>
                  <a href="#escalated" onClick={(e) => e.preventDefault()} className="block py-1 hover:text-black">
                    Emergency Escalations (8)
                  </a>
                  <a href="#feeders" onClick={(e) => e.preventDefault()} className="block py-1 hover:text-black">
                    Feeder Tripping Log
                  </a>
                </div>
              )}
            </div>

            {/* 3. AI Review */}
            <button
              onClick={() => setActiveMenu('ai')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                activeMenu === 'ai' ? 'bg-[#D2F843]/30 text-black font-bold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-neutral-700 shrink-0" />
                {!sidebarCollapsed && <span>AI Triage Review</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] px-1.5 py-0.5 rounded-full">
                  99.2%
                </span>
              )}
            </button>

            {/* 4. Staff & Linemen */}
            <button
              onClick={() => setActiveMenu('staff')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-neutral-700 shrink-0" />
                {!sidebarCollapsed && <span>Staff & Linemen</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-mono text-neutral-400">42 Vans</span>
              )}
            </button>

            {/* 5. User Directory */}
            <button
              onClick={() => setActiveMenu('users')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
            >
              <Users className="w-4 h-4 text-neutral-700 shrink-0" />
              {!sidebarCollapsed && <span>User Directory</span>}
            </button>

            {/* 6. Departments */}
            <button
              onClick={() => setActiveMenu('departments')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
            >
              <Building2 className="w-4 h-4 text-neutral-700 shrink-0" />
              {!sidebarCollapsed && <span>Departments</span>}
            </button>

            {/* 7. Reports */}
            <button
              onClick={() => setActiveMenu('reports')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
            >
              <FileText className="w-4 h-4 text-neutral-700 shrink-0" />
              {!sidebarCollapsed && <span>Reports & MERC Audit</span>}
            </button>

          </div>
        </div>

        {/* Pinned Bottom Controls (Settings & Logout & Return) */}
        <div className="p-3 border-t border-neutral-100 space-y-1">
          <button
            onClick={onReturnToLanding}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors"
            title="Return to Public Portal"
          >
            <ArrowUpRight className="w-4 h-4 text-neutral-600 shrink-0" />
            {!sidebarCollapsed && <span>View Public Portal</span>}
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ================= 2. MAIN ADMIN CONTENT WORKSPACE ================= */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}>
        
        {/* Compact Header Strip */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200/90 h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between shadow-soft-sm">
          
          {/* Left: Sidebar toggle + Global Search */}
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <button
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  setSidebarCollapsed(!sidebarCollapsed);
                } else {
                  setMobileSidebarOpen(true);
                }
              }}
              className="p-2 rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <div className="relative w-full hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by Grievance ID, consumer name, feeder line..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white border border-transparent focus:border-neutral-900 text-xs sm:text-sm font-medium placeholder-neutral-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Header System Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Language toggle: English / मराठी */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'मराठी' : 'EN')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>{language === 'EN' ? 'EN | मराठी' : 'मराठी | EN'}</span>
            </button>

            {/* Notification Bell with unread badge */}
            <button 
              className="relative p-2 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* Settings Icon */}
            <button 
              className="p-2 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Console Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

            {/* User Badge: Chief Administrator */}
            <div className="flex items-center gap-3 pl-1">
              <div className="w-9 h-9 rounded-full bg-neutral-900 text-[#D2F843] flex items-center justify-center font-extrabold text-xs shadow-sm">
                CA
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-neutral-900">Chief Administrator</span>
                <span className="text-[10px] text-neutral-500">MSCEB Central Operations</span>
              </div>
            </div>

          </div>
        </header>

        {/* Dashboard Main Scrollable Workspace */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* Welcome Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2F843]/30 border border-[#D2F843] text-xs font-bold text-neutral-900 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>ServiceVolt Grid Command • Live SCADA Stream</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Operations Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Real-time incident response, automated field crew telemetry, and MERC statutory compliance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={onReturnToLanding}
                className="px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 transition-all flex items-center gap-1.5 shadow-soft-sm"
              >
                <span>Landing Page</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              <button 
                className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-soft-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#D2F843]" />
                <span>Sync SCADA</span>
              </button>
            </div>
          </div>

          {/* ================= 3. TOP METRICS STRIP (4 HIGH-CONTRAST CARDS) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Total Complaints */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span>Total Complaints</span>
                  <Activity className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-mono">
                  1,250
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +12%
                </span>
                <span className="text-neutral-400">vs yesterday (1,116)</span>
              </div>
            </div>

            {/* Card 2: Pending Tasks */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span>Pending Tasks</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-mono">
                  650
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  8 critical safety hazards
                </span>
                <span className="text-neutral-400">Under triage</span>
              </div>
            </div>

            {/* Card 3: In Progress */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span>In Progress</span>
                  <Truck className="w-4 h-4 text-[#10B981]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-mono">
                  500
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-900 font-bold bg-neutral-100 px-2 py-0.5 rounded-full">
                  45 active case dispatch
                </span>
                <span className="text-neutral-400">Vans en-route</span>
              </div>
            </div>

            {/* Card 4: Completed Today */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span>Completed Today</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-mono">
                  100
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span>98.6%</span> on-time SLA
                </span>
                <span className="text-neutral-400">Closed with OTP</span>
              </div>
            </div>

          </div>

          {/* ================= 4. ANALYTICS VISUALIZATION ROW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left (2/3 width): Complaint Performance Trend Line Chart */}
            <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Complaint Performance Trend</h3>
                  <p className="text-xs text-neutral-500">Incoming consumer tickets vs resolved field closures</p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-full border border-neutral-200 text-xs font-semibold">
                  {['Today', 'This Week', 'Last Week', 'This Month'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setTimeFilter(f)}
                      className={`px-3 py-1 rounded-full transition-all ${
                        timeFilter === f ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive SVG Trend Chart */}
              <div>
                <div className="h-52 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D2F843" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#D2F843" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    <line x1="0" y1="40" x2="600" y2="40" stroke="#F4F4F5" strokeWidth="1" />
                    <line x1="0" y1="90" x2="600" y2="90" stroke="#F4F4F5" strokeWidth="1" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="#F4F4F5" strokeWidth="1" />
                    <line x1="0" y1="185" x2="600" y2="185" stroke="#E4E4E7" strokeWidth="1" />

                    {/* Area fill for incoming complaints */}
                    <path
                      d="M 0,140 Q 100,70 200,95 T 400,45 T 600,60 L 600,185 L 0,185 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Smooth Bezier line for incoming */}
                    <path
                      d="M 0,140 Q 100,70 200,95 T 400,45 T 600,60"
                      fill="none"
                      stroke="#09090B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Bezier line for resolved complaints */}
                    <path
                      d="M 0,165 Q 100,120 200,130 T 400,85 T 600,75"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />

                    {/* Data Point Dots */}
                    <circle cx="200" cy="95" r="5" fill="#09090B" stroke="#D2F843" strokeWidth="2.5" />
                    <circle cx="400" cy="45" r="5" fill="#09090B" stroke="#D2F843" strokeWidth="2.5" />
                    <circle cx="600" cy="60" r="5" fill="#09090B" stroke="#D2F843" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Days labels */}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2.5 border-t border-neutral-100">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-6 pt-3 mt-1 text-xs font-semibold text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-neutral-900 rounded-full" />
                  <span>Incoming Complaints (Avg 180/day)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-[#10B981] rounded-full border border-[#10B981]" />
                  <span>Successfully Resolved (Avg 165/day)</span>
                </div>
              </div>
            </div>

            {/* Right (1/3 width): Product-wise Complaints / Grid Hazards Progress Bar List */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-neutral-900">Product-wise Complaints</h3>
                  <span className="text-[11px] font-bold text-neutral-400">By Hazard Class</span>
                </div>
                <p className="text-xs text-neutral-500 mb-6">Distribution across grid equipment failures</p>

                {/* Progress bars list */}
                <div className="space-y-4">
                  {/* Category 1 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-neutral-800">Transformer Hazards & Oil Leaks</span>
                      <span className="font-mono text-neutral-900">42% (525)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: '42%' }} />
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-neutral-800">Cable Snaps & 11kV Feeder Line</span>
                      <span className="font-mono text-neutral-900">28% (350)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: '28%' }} />
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-neutral-800">Voltage Surges & Neutral Faults</span>
                      <span className="font-mono text-neutral-900">18% (225)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-[#10B981] rounded-full transition-all duration-500" style={{ width: '18%' }} />
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-neutral-800">Smart Meter & MDMS Sync Errors</span>
                      <span className="font-mono text-neutral-900">12% (150)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-neutral-900 rounded-full transition-all duration-500" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>SCADA Equipment Telemetry</span>
                <span className="font-semibold text-neutral-700">Audit Grade: 100%</span>
              </div>
            </div>

          </div>

          {/* ================= 5. OPERATIONS SUMMARY PANEL ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left (2/3 width): Pending Tasks / Live Dispatch Tabular Records */}
            <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Pending Tasks / Live Dispatch</h3>
                  <p className="text-xs text-neutral-500">Autonomous priority dispatch & field crew tracking</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Dispatching
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3 pr-4">Grievance ID</th>
                      <th className="pb-3 pr-4">Consumer & Location</th>
                      <th className="pb-3 pr-4">Hazard Type</th>
                      <th className="pb-3 pr-4">Substation</th>
                      <th className="pb-3 pr-4">SLA Time</th>
                      <th className="pb-3 pr-4">Priority</th>
                      <th className="pb-3 pr-4">Dispatch Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {dispatchRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-neutral-50/80 transition-colors group">
                        
                        {/* ID */}
                        <td className="py-3.5 pr-4 font-mono font-bold text-neutral-900">
                          {rec.id}
                        </td>

                        {/* Consumer */}
                        <td className="py-3.5 pr-4">
                          <div className="font-semibold text-neutral-900">{rec.consumer}</div>
                          <div className="text-[11px] text-neutral-400">{rec.location}</div>
                        </td>

                        {/* Hazard */}
                        <td className="py-3.5 pr-4 font-medium text-neutral-800">
                          {rec.hazard}
                        </td>

                        {/* Substation */}
                        <td className="py-3.5 pr-4 text-neutral-600 truncate max-w-[120px]" title={rec.substation}>
                          {rec.substation}
                        </td>

                        {/* SLA Countdown */}
                        <td className="py-3.5 pr-4">
                          <span className={`font-mono font-bold ${rec.slaUrgent ? 'text-rose-600' : 'text-neutral-700'}`}>
                            {rec.slaCountdown}
                          </span>
                        </td>

                        {/* Priority Badge */}
                        <td className="py-3.5 pr-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            rec.priority === 'Urgent'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : rec.priority === 'High'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {rec.priority}
                          </span>
                        </td>

                        {/* Dispatch Status */}
                        <td className="py-3.5 pr-4">
                          <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            <span>{rec.status}</span>
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono">{rec.lineman}</div>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => setSelectedTicket(rec)}
                            className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 font-semibold text-[11px] transition-all"
                          >
                            Inspect
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right (1/3 width): Complaint Sources Doughnut Chart */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Complaint Sources</h3>
                <p className="text-xs text-neutral-500 mb-6">Channel shares across inbound intake</p>

                {/* Simulated Doughnut Chart SVG */}
                <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Ring background */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#F4F4F5" strokeWidth="14" />
                    
                    {/* Website 48% (circumference ~238.76 -> 48% = 114.6) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#09090B"
                      strokeWidth="14"
                      strokeDasharray="114.6 238.76"
                      strokeDashoffset="0"
                    />

                    {/* Call Center 1912 34% (34% = 81.18) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#D2F843"
                      strokeWidth="14"
                      strokeDasharray="81.18 238.76"
                      strokeDashoffset="-114.6"
                    />

                    {/* Mobile App 18% (18% = 43) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="14"
                      strokeDasharray="43 238.76"
                      strokeDashoffset="-195.78"
                    />
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-neutral-900 font-mono">1,250</span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Total Inflows</span>
                  </div>
                </div>

                {/* Sources Breakdown Legend */}
                <div className="space-y-2.5 pt-4 text-xs font-semibold">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-neutral-900" />
                      <span className="text-neutral-800">Website Portal</span>
                    </div>
                    <span className="font-mono text-neutral-900">48% (600)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#D2F843] border border-neutral-300" />
                      <span className="text-neutral-800">Call Center 1912</span>
                    </div>
                    <span className="font-mono text-neutral-900">34% (425)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                      <span className="text-neutral-800">Citizen Mobile App</span>
                    </div>
                    <span className="font-mono text-neutral-900">18% (225)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
                <span className="text-[11px] text-neutral-400">
                  Real-time multichannel ingestion pipeline
                </span>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Ticket Details Inspector Drawer / Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 border border-neutral-200 shadow-2xl space-y-4 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-xs font-mono font-bold text-neutral-400">{selectedTicket.id}</span>
                <h4 className="text-lg font-bold text-neutral-900">{selectedTicket.hazard}</h4>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="text-neutral-500">Consumer:</div>
                <div className="text-sm font-bold text-neutral-900">{selectedTicket.consumer}</div>
                <div className="text-neutral-600">{selectedTicket.location}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500">Substation:</div>
                  <div className="font-bold text-neutral-900">{selectedTicket.substation}</div>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500">Target SLA:</div>
                  <div className="font-bold text-rose-600 font-mono">{selectedTicket.slaCountdown}</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900 text-white">
                <div className="text-neutral-400 text-[11px]">Field Response Unit:</div>
                <div className="font-bold text-[#D2F843] text-sm mt-0.5">{selectedTicket.status}</div>
                <div className="text-neutral-300 text-[11px] mt-1">Lead: {selectedTicket.lineman}</div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedTicket(null)}
                className="flex-1 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all"
              >
                Dispatch Emergency Escalation
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="py-2.5 px-4 rounded-full border border-neutral-200 text-xs font-semibold hover:bg-neutral-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
