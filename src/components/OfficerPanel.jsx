import React, { useState } from 'react';
import { 
  Zap, Search, Bell, Settings, Globe, LogOut, ChevronDown, ChevronRight, 
  Menu, X, AlertTriangle, Clock, CheckCircle2, Truck, Users, FileText, 
  ShieldCheck, Activity, BarChart3, Filter, ArrowUpRight, ArrowRight, Phone, MapPin, 
  Camera, Check, Radio, RefreshCw, AlertOctagon, UserCheck, Eye, Layers, 
  Send, ExternalLink, ShieldAlert, Cpu
} from 'lucide-react';

export function OfficerPanel({ onReturnToLanding, onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'queue' | 'workload'
  
  // Header Utilities states
  const [language, setLanguage] = useState('EN');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Availability status controlled by officer
  const [routingStatus, setRoutingStatus] = useState('Available'); // 'Available' | 'Busy' | 'Unavailable' | 'On Leave'
  const [isSyncing, setIsSyncing] = useState(false);

  // Notifications list
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Emergency Dispatch Auto-Assigned',
      desc: 'Grievance MSCEB-2026-98412 (Transformer Sparking) routed to your unit.',
      time: '4 mins ago',
      unread: true,
      ticketId: 'MSCEB-2026-98412'
    },
    {
      id: 'notif-2',
      title: 'SLA Warning Threshold (30m)',
      desc: 'High voltage surge at Kothrud reaching SLA warning limit.',
      time: '18 mins ago',
      unread: true,
      ticketId: 'MSCEB-2026-98430'
    },
    {
      id: 'notif-3',
      title: 'Citizen Photo Uploaded',
      desc: 'Priya Kulkarni attached secondary inspection photo for Pole #BN-04.',
      time: '45 mins ago',
      unread: false,
      ticketId: 'MSCEB-2026-98412'
    }
  ]);

  // Tasks Database for Officer
  const [tasks, setTasks] = useState([
    {
      id: 'MSCEB-2026-98412',
      title: 'Heavy sparking on transformer terminal #T-42',
      consumer: 'Rajesh Sharma',
      consumerId: '028549102941',
      phone: '+91 98220 19283',
      address: 'Near Sector 4 Community Park, Baner Rd, Pune',
      poleNo: 'POLE-BN-42A',
      category: 'Power Supply & Safety',
      status: 'In Progress', // 'Assigned' | 'In Progress' | 'Resolved' | 'Reopened'
      priority: 'Critical Hazard',
      reportedAt: '12 Oct 09:15 AM',
      slaCountdown: '14m left',
      slaUrgent: true,
      substation: 'Baner 33kV Substation',
      feeder: 'Feeder BN-04',
      citizenPhotoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
      actionNotes: 'Van #09 en-route. Safety cut-off initiated.'
    },
    {
      id: 'MSCEB-2026-98430',
      title: 'High voltage spike (310V) causing tripped breakers',
      consumer: 'Ananya Deshpande',
      consumerId: '019482736152',
      phone: '+91 98450 19210',
      address: 'Flat 302, Mayur Colony, Kothrud, Pune',
      poleNo: 'POLE-KT-12B',
      category: 'Power Supply',
      status: 'In Progress',
      priority: 'Medium',
      reportedAt: '12 Oct 09:40 AM',
      slaCountdown: '42m left',
      slaUrgent: false,
      substation: 'Kothrud 110kV Div',
      feeder: 'Feeder KT-12',
      citizenPhotoUrl: null,
      actionNotes: 'Technician on-site testing neutral line.'
    },
    {
      id: 'MSCEB-2026-98444',
      title: 'Low voltage / phase drop across commercial lane',
      consumer: 'Vikram Mehta',
      consumerId: '028194819283',
      phone: '+91 98200 11492',
      address: 'Main Market Road, Shivajinagar, Pune',
      poleNo: 'POLE-SHV-09',
      category: 'Power Supply',
      status: 'Assigned',
      priority: 'Medium',
      reportedAt: '12 Oct 10:05 AM',
      slaCountdown: '1h 10m left',
      slaUrgent: false,
      substation: 'Shivajinagar Central Substation',
      feeder: 'Feeder SH-01',
      citizenPhotoUrl: null,
      actionNotes: 'Assigned to your queue.'
    },
    {
      id: 'MSCEB-2026-98455',
      title: 'Cable sag over pedestrian walkway',
      consumer: 'Ganesh More',
      consumerId: '038192837461',
      phone: '+91 98901 23485',
      address: 'Near Pune Metro Pillar 142, Kothrud',
      poleNo: 'POLE-KT-88C',
      category: 'Safety',
      status: 'Assigned',
      priority: 'Critical Hazard',
      reportedAt: '12 Oct 10:20 AM',
      slaCountdown: '25m left',
      slaUrgent: true,
      substation: 'Kothrud 110kV Div',
      feeder: 'Feeder KT-08',
      citizenPhotoUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80',
      actionNotes: 'Pending field inspection.'
    },
    {
      id: 'MSCEB-2026-98468',
      title: 'Smart meter communication optical LED failure',
      consumer: 'Pooja Kulkarni',
      consumerId: '048291048291',
      phone: '+91 98239 01923',
      address: 'Rowhouse 12, Pimpri Colony, Pune',
      poleNo: 'POLE-PMP-19',
      category: 'Metering',
      status: 'Assigned',
      priority: 'Low',
      reportedAt: '12 Oct 10:45 AM',
      slaCountdown: '3h 40m left',
      slaUrgent: false,
      substation: 'Pimpri Substation #02',
      feeder: 'Feeder PMP-04',
      citizenPhotoUrl: null,
      actionNotes: 'Hardware sync diagnostics required.'
    },
    {
      id: 'MSCEB-2026-98380',
      title: 'Neutral line disconnected on pole terminal',
      consumer: 'Sunil Rao',
      consumerId: '028471928471',
      phone: '+91 98224 45566',
      address: 'Lane 5, Prabhat Road, Pune',
      poleNo: 'POLE-PBR-02',
      category: 'Power Supply',
      status: 'Resolved',
      priority: 'Medium',
      reportedAt: '12 Oct 07:30 AM',
      slaCountdown: 'Resolved in 28m',
      slaUrgent: false,
      substation: 'Shivajinagar Central',
      feeder: 'Feeder SH-03',
      citizenPhotoUrl: null,
      actionNotes: 'Neutral line spliced & sealed. Voltage normal (230V).'
    },
    {
      id: 'MSCEB-2026-98365',
      title: '11kV Feeder isolator trip reset',
      consumer: 'Kharadi Industrial Estate',
      consumerId: '098192837461',
      phone: '+91 98220 99887',
      address: 'Plot 4, Kharadi IT Park, Pune',
      poleNo: 'POLE-KHR-01',
      category: 'Power Supply',
      status: 'Resolved',
      priority: 'Critical Hazard',
      reportedAt: '12 Oct 06:45 AM',
      slaCountdown: 'Resolved in 18m',
      slaUrgent: false,
      substation: 'Kharadi 33kV Substation',
      feeder: 'Feeder KHR-05',
      citizenPhotoUrl: null,
      actionNotes: 'Breaker reset & thermal scan completed.'
    }
  ]);

  // Selected Task for Slide-Over Drawer
  const [selectedTask, setSelectedTask] = useState(null);

  // Queue View Filters
  const [queueTab, setQueueTab] = useState('active'); // 'all' | 'active' | 'assigned' | 'inprogress' | 'resolved' | 'reopened'
  const [queueSearch, setQueueSearch] = useState('');
  const [queuePriority, setQueuePriority] = useState('All');
  const [queueCategory, setQueueCategory] = useState('All');
  const [queueSort, setQueueSort] = useState('Newest First');

  // Peer Officers Roster (Pune Circle - Power Supply & Operations)
  const peerOfficers = [
    { name: 'Rahul Patil', role: 'AE (Distribution)', substation: 'Kothrud 110kV', currentLoad: 11, maxLoad: 15, status: 'Busy' },
    { name: 'Kavita Ghadge', role: 'JE (Power Quality)', substation: 'Pimpri Primary', currentLoad: 6, maxLoad: 15, status: 'Available' },
    { name: 'Vikas Shinde', role: 'AE (SCADA Ops)', substation: 'Kharadi 33kV', currentLoad: 4, maxLoad: 15, status: 'Available' },
    { name: 'Amol Pawar', role: 'Senior Lineman Class-I', substation: 'Shivajinagar', currentLoad: 13, maxLoad: 15, status: 'Busy' },
    { name: 'Santosh Jadhav', role: 'Emergency Squad Lead', substation: 'Viman Nagar', currentLoad: 2, maxLoad: 15, status: 'Available' },
    { name: 'Deepa Mane', role: 'AE (Metering)', substation: 'Hadapsar 33kV', currentLoad: 0, maxLoad: 15, status: 'On Leave' }
  ];

  // Calculations for Metric Ribbon
  const assignedCount = tasks.filter(t => t.status === 'Assigned').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const criticalCount = tasks.filter(t => t.priority === 'Critical Hazard' && t.status !== 'Resolved').length;
  const resolvedCount = tasks.filter(t => t.status === 'Resolved').length;
  const reopenedCount = tasks.filter(t => t.status === 'Reopened').length;
  const activeWorkloadCount = assignedCount + inProgressCount;

  // Sync handler
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 600);
  };

  // Actions in Slide-Over Drawer
  const handleMarkOnSite = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'In Progress', actionNotes: 'Officer Sanjay Deshmukh confirmed on-site diagnostic underway.' };
      }
      return t;
    }));
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => ({ ...prev, status: 'In Progress', actionNotes: 'Officer Sanjay Deshmukh confirmed on-site diagnostic underway.' }));
    }
  };

  const handleResolveTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { 
          ...t, 
          status: 'Resolved', 
          slaCountdown: 'Resolved just now', 
          actionNotes: 'Field repair completed & photo proof verified by AE S. Deshmukh.' 
        };
      }
      return t;
    }));
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => ({ 
        ...prev, 
        status: 'Resolved', 
        slaCountdown: 'Resolved just now', 
        actionNotes: 'Field repair completed & photo proof verified by AE S. Deshmukh.' 
      }));
    }
  };

  const handleRequestBackup = (taskId) => {
    alert(`Safety backup requested for ${taskId}. Dispatching auxiliary lineman squad from nearest substation.`);
  };

  // Filter tasks for Work Queue
  const filteredQueueTasks = tasks.filter(t => {
    // Tab filter
    if (queueTab === 'active' && t.status === 'Resolved') return false;
    if (queueTab === 'assigned' && t.status !== 'Assigned') return false;
    if (queueTab === 'inprogress' && t.status !== 'In Progress') return false;
    if (queueTab === 'resolved' && t.status !== 'Resolved') return false;
    if (queueTab === 'reopened' && t.status !== 'Reopened') return false;

    // Search filter
    const matchesSearch = t.id.toLowerCase().includes(queueSearch.toLowerCase()) ||
                          t.title.toLowerCase().includes(queueSearch.toLowerCase()) ||
                          t.consumer.toLowerCase().includes(queueSearch.toLowerCase()) ||
                          t.address.toLowerCase().includes(queueSearch.toLowerCase()) ||
                          t.poleNo.toLowerCase().includes(queueSearch.toLowerCase());

    // Priority filter
    const matchesPriority = queuePriority === 'All' || t.priority === queuePriority;

    // Category filter
    const matchesCategory = queueCategory === 'All' || t.category.includes(queueCategory);

    return matchesSearch && matchesPriority && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-neutral-900 flex font-sans antialiased selection:bg-[#D2F843] selection:text-black">
      
      {/* ================= 1. STREAMLINED LEFT SIDEBAR ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-neutral-200/90 flex flex-col justify-between transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Brand Header */}
        <div>
          <div className="h-20 px-5 flex items-center justify-between border-b border-neutral-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-[#D2F843] flex items-center justify-center shrink-0 shadow-md">
                <Zap className="w-5 h-5 fill-[#D2F843]" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-neutral-900">Grievance Hub</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">MSCEB Officer Portal</span>
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

          {/* Navigation Links Only (Strictly clean SaaS style) */}
          <div className="py-6 px-3 space-y-1.5">
            
            {/* 1. Dashboard (Active lime pill default) */}
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <Activity className="w-4 h-4 text-neutral-900 shrink-0" />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            {/* 2. Assigned Work Queue */}
            <button
              onClick={() => { setActiveTab('queue'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'queue'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-neutral-800 shrink-0" />
                {!sidebarCollapsed && <span>Assigned Work Queue</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full">
                  {activeWorkloadCount}
                </span>
              )}
            </button>

            {/* 3. Workload & Capacity */}
            <button
              onClick={() => { setActiveTab('workload'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'workload'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-neutral-800 shrink-0" />
              {!sidebarCollapsed && <span>Workload & Capacity</span>}
            </button>

          </div>
        </div>

        {/* Pinned Bottom Controls (Settings & Sign Out) */}
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
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Settings className="w-4 h-4 text-neutral-600 shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
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

      {/* ================= 2. MAIN OFFICER CONTENT CANVAS ================= */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}>
        
        {/* Top Header Utility Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200/90 h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between shadow-soft-sm">
          
          {/* Left: Dynamic Page Title + Sidebar Toggle + DISCOM AI 1.0 badge */}
          <div className="flex items-center gap-3 sm:gap-4">
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

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight capitalize">
                {activeTab === 'dashboard' ? 'Officer Dashboard' : activeTab === 'queue' ? 'Assigned Work Queue' : 'Workload & Capacity Management'}
              </h1>
            </div>

            {/* Platform Version Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-bold text-neutral-700">
              <Cpu className="w-3 h-3 text-neutral-500" />
              <span>DISCOM AI 1.0</span>
            </div>
          </div>

          {/* Right Utilities: Language, Notifications, Officer Profile Chip */}
          <div className="flex items-center gap-2 sm:gap-4 relative">
            
            {/* Language Toggle */}
            <div className="hidden md:flex items-center rounded-full bg-neutral-100 p-0.5 border border-neutral-200 text-xs font-semibold">
              {['EN', 'हिन्दी', 'मराठी'].map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                    language === l ? 'bg-white shadow-soft-sm text-neutral-900 font-bold' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Notification Bell Icon & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="relative p-2 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                title="Field Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-neutral-200/90 shadow-2xl p-4 z-50 animate-slide-up">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-xs">Dispatch Alerts</span>
                        <span className="text-[10px] font-bold bg-neutral-900 text-[#D2F843] px-2 py-0.5 rounded-full">
                          {notifications.filter(n => n.unread).length} New
                        </span>
                      </div>
                      <button 
                        onClick={() => setNotificationsOpen(false)}
                        className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            setActiveTab('queue');
                            const found = tasks.find(t => t.id === n.ticketId);
                            if (found) setSelectedTask(found);
                            setNotificationsOpen(false);
                          }}
                          className="py-3 px-1 hover:bg-neutral-50 transition-colors cursor-pointer text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${n.unread ? 'text-neutral-900' : 'text-neutral-600'}`}>
                              {n.title}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{n.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-center border-t border-neutral-100">
                      <button 
                        onClick={() => { setActiveTab('queue'); setNotificationsOpen(false); }}
                        className="text-[11px] font-bold text-neutral-900 hover:underline cursor-pointer"
                      >
                        View All in Work Queue →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

            {/* Officer Profile Chip & Availability Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-full hover:bg-neutral-100 transition-colors text-left cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 text-[#D2F843] flex items-center justify-center font-extrabold text-xs shadow-sm">
                  SD
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span>Sanjay Deshmukh</span>
                    <span className={`w-2 h-2 rounded-full ${
                      routingStatus === 'Available' ? 'bg-[#10B981]' : routingStatus === 'Busy' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                  </span>
                  <span className="text-[10px] text-neutral-500">AE • Pune Circle</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl border border-neutral-200/90 shadow-2xl p-5 z-50 animate-slide-up space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div>
                        <div className="font-bold text-sm text-neutral-900">Sanjay Deshmukh</div>
                        <div className="text-[11px] text-neutral-500">Assistant Engineer (AE)</div>
                      </div>
                      <button 
                        onClick={() => setProfileOpen(false)}
                        className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="text-neutral-400 text-[10px] uppercase font-bold">Official Email</div>
                      <div className="font-mono text-neutral-800">s.deshmukh@msedcl.gov.in</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="text-neutral-400 text-[10px] uppercase font-bold">Mobile Number</div>
                      <div className="font-mono text-neutral-800">+91 98220 19283</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="text-neutral-400 text-[10px] uppercase font-bold">Assigned Jurisdictions</div>
                      <div className="font-medium text-neutral-800">Shivajinagar, Kothrud, Pimpri</div>
                    </div>
                  </div>

                  {/* Automated Routing Availability Toggle */}
                  <div className="pt-2">
                    <span className="block text-[11px] font-bold text-neutral-700 mb-2">
                      Automated Routing Availability (AI Dispatch)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {['Available', 'Busy', 'Unavailable', 'On Leave'].map(st => (
                        <button
                          key={st}
                          onClick={() => setRoutingStatus(st)}
                          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                            routingStatus === st
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Shift: 08:00 - 20:00</span>
                    <button 
                      onClick={onLogout}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Content Views */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* ================= VIEW 1: OFFICER DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* 1. Officer Summary Banner */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Field Operations Profile</span>
                    <span className="text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                      Active On Duty
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      routingStatus === 'Available' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      Dispatch: {routingStatus}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                    Sanjay Deshmukh
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                    Assistant Engineer (Power Supply & Grid Operations) • MSEDCL Pune Circle
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 font-semibold border border-neutral-200">
                      <Zap className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Power Supply & Operations Department</span>
                    </span>
                  </div>
                </div>

                {/* Workload Meter & Sync */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 min-w-[260px] space-y-3 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-medium">Workload Meter:</span>
                    <span className="font-mono font-bold text-neutral-900">
                      {activeWorkloadCount} / 15 Tasks ({Math.round((activeWorkloadCount / 15) * 100)}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 rounded-full bg-neutral-200 overflow-hidden">
                    <div 
                      className="h-full bg-neutral-900 rounded-full transition-all duration-500" 
                      style={{ width: `${(activeWorkloadCount / 15) * 100}%` }} 
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-neutral-400">Available Capacity: {15 - activeWorkloadCount} slots</span>
                    <button
                      onClick={handleSync}
                      className="text-xs font-semibold text-neutral-800 hover:text-black flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-neutral-600 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>Sync</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Metric Ribbon (5-Card Row) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                
                {/* Assigned */}
                <div 
                  onClick={() => { setActiveTab('queue'); setQueueTab('assigned'); }}
                  className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Assigned</span>
                  <div className="text-3xl font-extrabold text-neutral-900 font-mono my-2">{assignedCount}</div>
                  <span className="text-[11px] text-neutral-500">Awaiting first action</span>
                </div>

                {/* On-site / In Progress */}
                <div 
                  onClick={() => { setActiveTab('queue'); setQueueTab('inprogress'); }}
                  className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">On-site / In Progress</span>
                  <div className="text-3xl font-extrabold text-neutral-900 font-mono my-2">{inProgressCount}</div>
                  <span className="text-[11px] text-neutral-500">Field repairs underway</span>
                </div>

                {/* Critical / Safety Hazard */}
                <div 
                  onClick={() => { setActiveTab('queue'); setQueuePriority('Critical Hazard'); }}
                  className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Critical Hazard</span>
                  </span>
                  <div className="text-3xl font-extrabold text-rose-600 font-mono my-2">{criticalCount}</div>
                  <span className="text-[11px] text-rose-700 font-medium">Urgent municipal dispatch</span>
                </div>

                {/* Restored Today */}
                <div 
                  onClick={() => { setActiveTab('queue'); setQueueTab('resolved'); }}
                  className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Restored Today</span>
                  <div className="text-3xl font-extrabold text-emerald-600 font-mono my-2">{resolvedCount}</div>
                  <span className="text-[11px] text-neutral-500">Completed resolutions</span>
                </div>

                {/* Reopened */}
                <div 
                  onClick={() => { setActiveTab('queue'); setQueueTab('reopened'); }}
                  className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Reopened</span>
                  <div className="text-3xl font-extrabold text-neutral-900 font-mono my-2">{reopenedCount}</div>
                  <span className="text-[11px] text-neutral-500">Citizen follow-up</span>
                </div>

              </div>

              {/* 3. Priority Field Task Queue */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Priority Field Task Queue</h3>
                    <p className="text-xs text-neutral-500">High-urgency emergency field alerts requiring direct field action</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('queue')}
                    className="text-xs font-bold text-neutral-900 hover:text-black flex items-center gap-1 underline underline-offset-4"
                  >
                    <span>View All Complaints</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Active Priority Tasks */}
                <div className="space-y-4">
                  {tasks.filter(t => t.priority === 'Critical Hazard' && t.status !== 'Resolved').map(task => (
                    <div 
                      key={task.id} 
                      className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase">
                            Emergency Priority 1
                          </span>
                          <span className="font-mono font-bold text-neutral-900 text-xs">{task.id}</span>
                          <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                            SLA: {task.slaCountdown}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                          {task.title}
                        </h4>

                        <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{task.address} ({task.poleNo})</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{task.consumer} ({task.phone})</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {task.status !== 'In Progress' && (
                          <button
                            onClick={() => handleMarkOnSite(task.id)}
                            className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5 text-[#D2F843]" />
                            <span>Mark On-Site</span>
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedTask(task)}
                          className="px-4 py-2 rounded-full bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold hover:bg-neutral-50 transition-all shadow-soft-sm"
                        >
                          Inspect Details
                        </button>
                      </div>
                    </div>
                  ))}

                  {tasks.filter(t => t.priority === 'Critical Hazard' && t.status !== 'Resolved').length === 0 && (
                    <div className="text-center py-10 text-neutral-400 text-xs">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <span>All assigned field emergency tasks are resolved!</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW 2: ASSIGNED WORK QUEUE ================= */}
          {activeTab === 'queue' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">Assigned Work Queue</h2>
                  <p className="text-xs text-neutral-500">Master field task dispatcher with live status updates and inspection drawer</p>
                </div>
              </div>

              {/* 1. Status Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', label: `All Tasks (${tasks.length})` },
                  { id: 'active', label: `Active Workload (${activeWorkloadCount})` },
                  { id: 'assigned', label: `Assigned (${assignedCount})` },
                  { id: 'inprogress', label: `In Progress (${inProgressCount})` },
                  { id: 'resolved', label: `Resolved / Closed (${resolvedCount})` },
                  { id: 'reopened', label: `Reopened (${reopenedCount})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setQueueTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      queueTab === tab.id
                        ? 'bg-neutral-900 text-white shadow-soft-sm'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 2. Search & Filter Strip */}
              <div className="p-4 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Search Queue</label>
                  <input
                    type="text"
                    value={queueSearch}
                    onChange={(e) => setQueueSearch(e.target.value)}
                    placeholder="Search by ID, title, consumer, pole..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Priority</label>
                  <select
                    value={queuePriority}
                    onChange={(e) => setQueuePriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 text-xs cursor-pointer"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Critical Hazard">Critical Hazard</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={queueCategory}
                    onChange={(e) => setQueueCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 text-xs cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Power Supply">Power Supply</option>
                    <option value="Safety">Safety</option>
                    <option value="Metering">Metering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Sort</label>
                  <select
                    value={queueSort}
                    onChange={(e) => setQueueSort(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 text-xs cursor-pointer"
                  >
                    <option value="Newest First">Newest First</option>
                    <option value="Urgent SLA First">Urgent SLA First</option>
                  </select>
                </div>
              </div>

              {/* 3. Task Grid Table */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-5">Ticket ID</th>
                        <th className="py-3.5 px-4">Title & Pole / Locality</th>
                        <th className="py-3.5 px-4">Consumer</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Priority</th>
                        <th className="py-3.5 px-4">SLA Countdown</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredQueueTasks.map(task => (
                        <tr 
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          <td className="py-4 px-5 font-mono font-bold text-neutral-900">
                            {task.id}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-neutral-900">{task.title}</div>
                            <div className="text-[11px] text-neutral-500">{task.address} • <strong className="text-neutral-700">{task.poleNo}</strong></div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-neutral-900">{task.consumer}</div>
                            <div className="text-[11px] text-neutral-400 font-mono">{task.phone}</div>
                          </td>
                          <td className="py-4 px-4 text-neutral-600 font-medium">
                            {task.category}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              task.priority === 'Critical Hazard'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-neutral-800">
                            <span className={task.slaUrgent ? 'text-rose-600' : 'text-neutral-700'}>
                              {task.slaCountdown}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              task.status === 'Resolved'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : task.status === 'In Progress'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTask(task);
                              }}
                              className="px-3 py-1 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-bold shadow-sm"
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

            </div>
          )}

          {/* ================= VIEW 3: WORKLOAD & CAPACITY MANAGEMENT ================= */}
          {activeTab === 'workload' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">Workload & Capacity Management</h2>
                  <p className="text-xs text-neutral-500">Manage your active field throughput and monitor peer circle load balancing</p>
                </div>
              </div>

              {/* 1. Active Utilization & Routing Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Gauge & Utilization */}
                <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">Your Active Caseload Utilization</h3>
                    <p className="text-xs text-neutral-500 mb-6">MSEDCL maximum assigned capacity limit: 15 simultaneous cases</p>

                    <div className="flex items-center gap-6 my-4">
                      {/* Simple Circular Gauge */}
                      <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#F4F4F5" strokeWidth="12" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#09090B"
                            strokeWidth="12"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * (activeWorkloadCount / 15))}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-extrabold font-mono text-neutral-900">{activeWorkloadCount}</span>
                          <span className="text-[9px] uppercase font-bold text-neutral-400">of 15 Max</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="font-bold text-neutral-900">Current Load: {Math.round((activeWorkloadCount / 15) * 100)}%</div>
                        <div className="text-neutral-500">Assigned Tasks: <strong>{assignedCount}</strong></div>
                        <div className="text-neutral-500">In Progress On-Site: <strong>{inProgressCount}</strong></div>
                        <div className="text-emerald-700 font-semibold">Available for new auto-dispatch: {15 - activeWorkloadCount} tasks</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                    <span>Shift Status: Optimal Execution</span>
                    <span className="font-mono text-neutral-700">Substation: Baner 33kV</span>
                  </div>
                </div>

                {/* Routing Availability Status Selector */}
                <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">ML Engine Automated Routing Status</h3>
                    <p className="text-xs text-neutral-500 mb-6">Affects autonomous dispatcher intake when new grievances arrive in your jurisdiction</p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {[
                        { id: 'Available', label: 'Available', desc: 'Accepting immediate dispatches', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
                        { id: 'Busy', label: 'Busy', desc: 'Near capacity threshold (>10 tasks)', color: 'bg-amber-50 border-amber-200 text-amber-800' },
                        { id: 'Unavailable', label: 'Unavailable', desc: 'Temporary critical field duty', color: 'bg-neutral-100 border-neutral-200 text-neutral-800' },
                        { id: 'On Leave', label: 'On Leave', desc: 'Auto-reroute tickets to peers', color: 'bg-rose-50 border-rose-200 text-rose-800' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => setRoutingStatus(s.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            routingStatus === s.id
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-soft-sm'
                              : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span>{s.label}</span>
                            {routingStatus === s.id && <Check className="w-3.5 h-3.5 text-[#D2F843]" />}
                          </div>
                          <p className={`text-[10px] mt-1 ${routingStatus === s.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {s.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
                    SCADA Automated Dispatcher updates routing table every 10 seconds.
                  </div>
                </div>

              </div>

              {/* 2. Peer Officers Workload Panel */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Pune Circle Peer Officers Workload</h3>
                    <p className="text-xs text-neutral-500">Real-time team capacity across 7 officers in Power Supply & Operations</p>
                  </div>

                  <span className="text-xs font-mono font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                    Circle Utilization: 54%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {peerOfficers.map((peer, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-neutral-900 text-xs">{peer.name}</div>
                          <div className="text-[11px] text-neutral-500">{peer.role} • {peer.substation}</div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          peer.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : peer.status === 'Busy'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {peer.status}
                        </span>
                      </div>

                      {/* Workload bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-neutral-500">Caseload:</span>
                          <span className="font-mono font-bold text-neutral-900">{peer.currentLoad} / {peer.maxLoad}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              peer.currentLoad > 10 ? 'bg-amber-500' : 'bg-neutral-900'
                            }`}
                            style={{ width: `${(peer.currentLoad / peer.maxLoad) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ================= 3. SLIDE-OVER INSPECTION DRAWER ================= */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm" onClick={() => setSelectedTask(null)} />
          <div className="relative z-10 w-full max-w-lg h-full bg-white shadow-2xl p-6 sm:p-7 overflow-y-auto space-y-6 animate-slide-up flex flex-col justify-between">
            
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-400">{selectedTask.id}</span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5">{selectedTask.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Priority Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                  selectedTask.priority === 'Critical Hazard'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                }`}>
                  {selectedTask.priority}
                </span>

                <span className="px-2.5 py-0.5 rounded-full font-bold text-xs bg-neutral-900 text-white">
                  Status: {selectedTask.status}
                </span>

                <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {selectedTask.slaCountdown}
                </span>
              </div>

              {/* Consumer & Geolocation Info */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="text-neutral-400 text-[10px] uppercase font-bold">Consumer Details</span>
                  <div className="font-bold text-neutral-900 text-sm">{selectedTask.consumer}</div>
                  <div className="font-mono text-neutral-600">Consumer ID: {selectedTask.consumerId}</div>
                  <div className="font-mono text-neutral-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{selectedTask.phone}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="text-neutral-400 text-[10px] uppercase font-bold">Premises & Asset Telemetry</span>
                  <div className="font-semibold text-neutral-900 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{selectedTask.address}</span>
                  </div>
                  <div className="flex items-center gap-4 pt-1 font-mono text-[11px] text-neutral-600">
                    <span>Pole: <strong className="text-neutral-900">{selectedTask.poleNo}</strong></span>
                    <span>Substation: <strong>{selectedTask.substation}</strong></span>
                  </div>
                </div>

                {/* Uploaded Citizen Photo Evidence (if any) */}
                {selectedTask.citizenPhotoUrl ? (
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                    <span className="text-neutral-400 text-[10px] uppercase font-bold flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Citizen Uploaded Photo Evidence</span>
                    </span>
                    <div className="relative rounded-xl overflow-hidden h-36 bg-neutral-200">
                      <img 
                        src={selectedTask.citizenPhotoUrl} 
                        alt="Citizen Incident Proof" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-400 text-center text-[11px]">
                    No citizen photo attached. Inspection team on-site photo recommended upon closure.
                  </div>
                )}

                {/* Action Notes */}
                <div className="p-3.5 rounded-2xl bg-neutral-900 text-white space-y-1">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Dispatcher Audit Log</div>
                  <div className="text-xs text-neutral-200">{selectedTask.actionNotes}</div>
                </div>
              </div>
            </div>

            {/* One-Tap Action Buttons */}
            <div className="pt-4 border-t border-neutral-100 space-y-2">
              {selectedTask.status !== 'In Progress' && selectedTask.status !== 'Resolved' && (
                <button
                  onClick={() => handleMarkOnSite(selectedTask.id)}
                  className="w-full py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#D2F843]" />
                  <span>Mark On-Site</span>
                </button>
              )}

              {selectedTask.status !== 'Resolved' ? (
                <button
                  onClick={() => handleResolveTask(selectedTask.id)}
                  className="w-full py-3 rounded-full bg-[#D2F843] hover:bg-[#c3ea2e] text-neutral-950 text-xs font-bold transition-all shadow-soft-sm flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                  <span>Resolve & Submit Photo Evidence</span>
                </button>
              ) : (
                <div className="p-2.5 rounded-full bg-emerald-50 text-emerald-800 text-center font-bold text-xs border border-emerald-200">
                  ✓ Ticket Closed & Verified
                </div>
              )}

              <button
                onClick={() => handleRequestBackup(selectedTask.id)}
                className="w-full py-2.5 rounded-full border border-neutral-300 text-neutral-800 text-xs font-semibold hover:bg-neutral-50 transition-all"
              >
                Request Safety Backup Squad
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
