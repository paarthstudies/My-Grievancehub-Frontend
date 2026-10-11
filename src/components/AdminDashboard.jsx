import React, { useState } from 'react';
import { 
  Zap, Search, Bell, Settings, Globe, LogOut, ChevronDown, ChevronRight, 
  Menu, X, TrendingUp, AlertTriangle, Clock, CheckCircle2, Truck, Users, 
  FileText, ShieldCheck, Activity, BarChart3, Filter, ArrowUpRight, ArrowDownRight,
  ExternalLink, PhoneCall, RefreshCw, Layers, Compass, Building2, UserPlus,
  Edit2, Check, Ban, AlertOctagon, HelpCircle, Eye, SlidersHorizontal, Plus
} from 'lucide-react';

export function AdminDashboard({ onReturnToLanding, onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('overview'); // 'overview' | 'ops' | 'staff' | 'ai' | 'users' | 'departments'
  const [timeFilter, setTimeFilter] = useState('Last Week');
  const [language, setLanguage] = useState('EN');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // ================= 1. GRIEVANCE OPS STATE =================
  const [opsSearch, setOpsSearch] = useState('');
  const [opsDeptFilter, setOpsDeptFilter] = useState('All');
  const [opsStatusFilter, setOpsStatusFilter] = useState('All');
  const [opsPriorityFilter, setOpsPriorityFilter] = useState('All');
  const [editingCategoryTicketId, setEditingCategoryTicketId] = useState(null);

  const [ticketsList, setTicketsList] = useState([
    {
      id: 'MSCEB-2026-98412',
      title: 'Transformer terminal arcing & smoke',
      consumer: 'Rajesh Sharma',
      contact: '9822019283',
      location: 'Baner Rd, Pune',
      category: 'Transformer & Hazard',
      department: 'Distribution & Maintenance',
      status: 'Van #09 En-Route',
      priority: 'Urgent',
      substation: 'Baner 33kV Substation',
      feeder: 'Feeder BN-04',
      reportedAt: '12 Oct 09:15 AM',
      slaCountdown: '14m left',
      aiConfidence: '98.4%'
    },
    {
      id: 'MSCEB-2026-98430',
      title: 'High voltage surge (310V) tripped MCB',
      consumer: 'Ananya Deshpande',
      contact: '9845019210',
      location: 'Kothrud, Pune',
      category: 'Voltage Fluctuation',
      department: 'Power Quality & SCADA',
      status: 'Technician On-Site',
      priority: 'High',
      substation: 'Kothrud 110kV Div',
      feeder: 'Feeder KT-12',
      reportedAt: '12 Oct 09:40 AM',
      slaCountdown: '42m left',
      aiConfidence: '95.1%'
    },
    {
      id: 'MSCEB-2026-98444',
      title: '11kV Feeder line snap near park',
      consumer: 'Suresh Patil',
      contact: '9820011492',
      location: 'Vashi Sec 17, Navi Mumbai',
      category: 'Emergency Line Snap',
      department: 'Distribution & Maintenance',
      status: 'Safety Cutoff Active',
      priority: 'Urgent',
      substation: 'Vashi 33kV Sub-08',
      feeder: 'Feeder VSH-02',
      reportedAt: '12 Oct 09:55 AM',
      slaCountdown: '18m left',
      aiConfidence: '99.2%'
    },
    {
      id: 'MSCEB-2026-98451',
      title: 'Smart meter communication LED error',
      consumer: 'Mahesh Joshi',
      contact: '9890123485',
      location: 'Ambad, Nashik',
      category: 'Smart Meter Reading',
      department: 'Metering & Tech',
      status: 'Remote Reset Queued',
      priority: 'Standard',
      substation: 'Ambad Ind-05',
      feeder: 'Feeder AMB-09',
      reportedAt: '12 Oct 10:10 AM',
      slaCountdown: '3h 20m left',
      aiConfidence: '92.0%'
    },
    {
      id: 'MSCEB-2026-98462',
      title: 'Irrigation pump power failure on 11kV line',
      consumer: 'Kisan Cooperative',
      contact: '9823901923',
      location: 'Karad Rural, Satara',
      category: 'Agricultural Outage',
      department: 'Rural Electrification',
      status: 'Lineman Squad #03 En-Route',
      priority: 'Urgent',
      substation: 'Karad Rural 33kV',
      feeder: 'Feeder KRD-01',
      reportedAt: '12 Oct 10:30 AM',
      slaCountdown: '26m left',
      aiConfidence: '97.5%'
    }
  ]);

  // ================= 2. STAFF MANAGEMENT STATE =================
  const [staffTab, setStaffTab] = useState('pending'); // 'pending' | 'approved' | 'all' | 'invites'
  
  const [onboardingQueue, setOnboardingQueue] = useState([
    {
      id: 'APP-8491',
      name: 'Vikas R. Shinde',
      role: 'Junior Engineer (JE)',
      division: 'Pune East Division',
      substation: 'Kharadi 33kV Substation',
      empId: 'MSEDCL-2026-JE-084',
      dateApplied: '11 Oct 2026',
      aadhaarVerified: true
    },
    {
      id: 'APP-8492',
      name: 'Santosh K. Ghadge',
      role: 'Senior Lineman Class-I',
      division: 'Mumbai MMR & Thane',
      substation: 'Wagle Estate 33kV',
      empId: 'MSEDCL-2026-LM-112',
      dateApplied: '12 Oct 2026',
      aadhaarVerified: true
    },
    {
      id: 'APP-8493',
      name: 'Pooja V. Mane',
      role: 'Assistant Engineer (AE - SCADA)',
      division: 'Nagpur Central',
      substation: 'Sitabuldi Grid Operations',
      empId: 'MSEDCL-2026-AE-041',
      dateApplied: '12 Oct 2026',
      aadhaarVerified: true
    }
  ]);

  const [approvedStaff, setApprovedStaff] = useState([
    {
      id: 'STF-101',
      name: 'Anil S. More',
      role: 'Quick Response Van Driver & Lineman',
      division: 'Pune Urban',
      substation: 'Baner 33kV',
      phone: '9822019283',
      status: 'Dispatched (QRF-09)'
    },
    {
      id: 'STF-102',
      name: 'Suresh B. Deshmukh',
      role: 'Emergency Response Squad Lead',
      division: 'Navi Mumbai',
      substation: 'Vashi 33kV Div 4B',
      phone: '9820194821',
      status: 'On Duty (QRF-14)'
    },
    {
      id: 'STF-103',
      name: 'Kavita Patil',
      role: 'Power Quality Inspector',
      division: 'Pimpri Chinchwad',
      substation: 'Chinchwad 110kV',
      phone: '9823481920',
      status: 'Inspection Unit #08'
    }
  ]);

  // ================= 3. AI REVIEW & ML STATE =================
  const [aiQueue, setAiQueue] = useState([
    {
      id: 'AI-REV-104',
      prompt: 'My lights turn yellow and then appliances start humming loudly every evening at 7 PM.',
      predictedCat: 'Power Quality & Harmonic Distortion',
      confidence: 68,
      suggestedSubstation: 'Kothrud Substation',
      timestamp: '15 mins ago',
      flag: 'Ambiguous phrase "turn yellow"'
    },
    {
      id: 'AI-REV-105',
      prompt: 'Water dripping from junction box below the post during light rain showers.',
      predictedCat: 'Streetlight & Low-Tension Safety',
      confidence: 64,
      suggestedSubstation: 'Thane Central Div',
      timestamp: '32 mins ago',
      flag: 'Multiple entities: junction box & rain'
    },
    {
      id: 'AI-REV-106',
      prompt: 'Meter showing negative reading on solar roof export display since Monday.',
      predictedCat: 'Solar Net-Metering & PM Surya',
      confidence: 69,
      suggestedSubstation: 'Ambad Grid Cell',
      timestamp: '48 mins ago',
      flag: 'Negative export discrepancy'
    }
  ]);

  // ================= 4. USER DIRECTORY STATE =================
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [userSearch, setUserSearch] = useState('');
  
  const [usersList, setUsersList] = useState([
    {
      id: 'USR-9021',
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@gmail.com',
      phone: '+91 9822019283',
      role: 'Citizen',
      substation: 'Baner Ward 04',
      status: 'Active',
      ticketsFiled: 3
    },
    {
      id: 'USR-9022',
      name: 'Eng. Santosh More',
      email: 's.more@msedcl.gov.in',
      phone: '+91 9820019284',
      role: 'Officer',
      substation: 'Baner 33kV Substation',
      status: 'Active',
      ticketsFiled: 42
    },
    {
      id: 'USR-9023',
      name: 'Eng. P. Deshmukh',
      email: 'p.deshmukh@msedcl.gov.in',
      phone: '+91 9822998877',
      role: 'Admin',
      substation: 'MSCEB Central Operations',
      status: 'Active',
      ticketsFiled: 125
    },
    {
      id: 'USR-9024',
      name: 'Priya Kulkarni',
      email: 'priya.k@outlook.com',
      phone: '+91 9890123485',
      role: 'Citizen',
      substation: 'Nagpur West Div',
      status: 'Active',
      ticketsFiled: 1
    },
    {
      id: 'USR-9025',
      name: 'Ramesh Jadhav',
      email: 'r.jadhav@msedcl.gov.in',
      phone: '+91 9823901923',
      role: 'Officer',
      substation: 'Karad Rural 33kV',
      status: 'Suspended',
      ticketsFiled: 18
    }
  ]);

  // ================= 5. DEPARTMENTS CONFIG BOARD (image_7.png) =================
  const [departmentsList, setDepartmentsList] = useState([
    {
      id: 'dept-1',
      name: 'Power Supply & Distribution Operations',
      head: 'Chief Engineer S. K. Shinde',
      slaWindow: '45 Mins',
      activeFeeders: 842,
      activeCrews: 42,
      alertChannels: ['SCADA Interlock', 'SMS Dispatch', 'Control Desk'],
      keywords: ['outage', 'blackout', 'tripping', 'phase down', 'supply cut'],
      health: 'Normal Operations (99.8%)'
    },
    {
      id: 'dept-2',
      name: 'Metering & Smart Grid MDMS Technology',
      head: 'Superintending Engineer R. Patil',
      slaWindow: '24 Hours',
      activeFeeders: 420,
      activeCrews: 18,
      alertChannels: ['MDMS Gateway', 'Automated Reset', 'Email'],
      keywords: ['meter', 'display', 'burnt', 'fast meter', 'reading error'],
      health: 'Optimal (99.4%)'
    },
    {
      id: 'dept-3',
      name: 'Billing, Tariffs & Revenue Collection',
      head: 'Finance Controller M. Joshi',
      slaWindow: '48 Hours',
      activeFeeders: 'All Divisions',
      activeCrews: 8,
      alertChannels: ['Billing Audit Engine', 'SMS Notification'],
      keywords: ['bill', 'units', 'tariff', 'overcharge', 'penalty hold'],
      health: 'Ledger Audit Active'
    },
    {
      id: 'dept-4',
      name: 'Substation & 33kV Line Maintenance',
      head: 'Executive Engineer V. Ghadge',
      slaWindow: '2 Hours',
      activeFeeders: 610,
      activeCrews: 32,
      alertChannels: ['SCADA Telemetry', 'Mobile App', 'VHF Radio'],
      keywords: ['substation', 'transformer', 'oil leak', 'tap changer', 'busbar'],
      health: 'Scheduled Patrols'
    },
    {
      id: 'dept-5',
      name: 'Emergency Safety & Hazardous Incident Command',
      head: 'Disaster Cell Lead A. More',
      slaWindow: '20 Mins',
      activeFeeders: 'Statewide Priority',
      activeCrews: 64,
      alertChannels: ['Immediate Sirens', 'QRF Automated Dispatch', 'Ward Fire Cell'],
      keywords: ['spark', 'fire', 'shock', 'smoke', 'line snap', 'blast'],
      health: 'High Alert (100% Van Uptime)'
    },
    {
      id: 'dept-6',
      name: 'Commercial & Industrial High-Tension (HT) Cell',
      head: 'Commercial Director P. Kulkarni',
      slaWindow: '4 Hours',
      activeFeeders: 280,
      activeCrews: 14,
      alertChannels: ['Priority Key Account Desk', 'Direct Hotline'],
      keywords: ['ht connection', 'factory supply', 'industrial feeder', 'transformer loss'],
      health: 'Industrial Feeder Stable'
    }
  ]);

  // Handlers for Staff Management
  const handleApproveStaff = (appId) => {
    const applicant = onboardingQueue.find(a => a.id === appId);
    if (!applicant) return;
    setOnboardingQueue(prev => prev.filter(a => a.id !== appId));
    setApprovedStaff(prev => [
      ...prev,
      {
        id: 'STF-' + Math.floor(100 + Math.random() * 900),
        name: applicant.name,
        role: applicant.role,
        division: applicant.division,
        substation: applicant.substation,
        phone: '+91 9822' + Math.floor(100000 + Math.random() * 900000),
        status: 'Active on Roster'
      }
    ]);
  };

  const handleRejectStaff = (appId) => {
    setOnboardingQueue(prev => prev.filter(a => a.id !== appId));
  };

  // Handlers for AI Review
  const handleApprovePrediction = (revId) => {
    setAiQueue(prev => prev.filter(item => item.id !== revId));
  };

  const handleOverrideCategory = (revId, newCat) => {
    setAiQueue(prev => prev.filter(item => item.id !== revId));
  };

  // Handlers for User Directory
  const handleToggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  // Handlers for Departments config
  const handleUpdateSla = (deptId, newSla) => {
    setDepartmentsList(prev => prev.map(d => {
      if (d.id === deptId) return { ...d, slaWindow: newSla };
      return d;
    }));
  };

  // Filtered tickets
  const filteredTickets = ticketsList.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(opsSearch.toLowerCase()) || 
                          t.consumer.toLowerCase().includes(opsSearch.toLowerCase()) ||
                          t.title.toLowerCase().includes(opsSearch.toLowerCase());
    const matchesDept = opsDeptFilter === 'All' || t.department === opsDeptFilter;
    const matchesStatus = opsStatusFilter === 'All' || t.status.toLowerCase().includes(opsStatusFilter.toLowerCase());
    const matchesPriority = opsPriorityFilter === 'All' || t.priority === opsPriorityFilter;
    return matchesSearch && matchesDept && matchesStatus && matchesPriority;
  });

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

          {/* Nav Items Navigation (Switch between all 6 Workspaces) */}
          <div className="py-5 px-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            
            {/* 1. Dashboard Overview */}
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

            {/* 2. Grievance Ops */}
            <button
              onClick={() => setActiveMenu('ops')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMenu === 'ops'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-neutral-800 shrink-0" />
                {!sidebarCollapsed && <span>Grievance Ops</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full">
                  {ticketsList.length}
                </span>
              )}
            </button>

            {/* 3. Staff Management */}
            <button
              onClick={() => setActiveMenu('staff')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMenu === 'staff'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                {!sidebarCollapsed && <span>Staff Management</span>}
              </div>
              {!sidebarCollapsed && onboardingQueue.length > 0 && (
                <span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                  {onboardingQueue.length}
                </span>
              )}
            </button>

            {/* 4. AI Review & ML */}
            <button
              onClick={() => setActiveMenu('ai')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMenu === 'ai'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-neutral-800 shrink-0" />
                {!sidebarCollapsed && <span>AI Review & ML</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold bg-[#10B981]/20 text-[#10B981] px-1.5 py-0.5 rounded-full">
                  99.2%
                </span>
              )}
            </button>

            {/* 5. User Directory */}
            <button
              onClick={() => setActiveMenu('users')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMenu === 'users'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4 text-neutral-800 shrink-0" />
              {!sidebarCollapsed && <span>User Directory</span>}
            </button>

            {/* 6. Departments */}
            <button
              onClick={() => setActiveMenu('departments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMenu === 'departments'
                  ? 'bg-[#D2F843]/30 text-neutral-950 border-l-4 border-neutral-950 shadow-soft-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <Building2 className="w-4 h-4 text-neutral-800 shrink-0" />
              {!sidebarCollapsed && <span>Departments</span>}
            </button>

          </div>
        </div>

        {/* Pinned Bottom Controls (Return & Sign Out) */}
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

        {/* Dynamic Workspace Canvas */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* ================= WORKSPACE 1: DASHBOARD OVERVIEW (image_8.png) ================= */}
          {activeMenu === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Title Bar */}
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

              {/* Top 4 Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
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

                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
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

                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
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

                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
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

              {/* Analytics Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Complaint Performance Trend Chart */}
                <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">Complaint Performance Trend</h3>
                      <p className="text-xs text-neutral-500">Incoming consumer tickets vs resolved field closures</p>
                    </div>

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

                        <line x1="0" y1="40" x2="600" y2="40" stroke="#F4F4F5" strokeWidth="1" />
                        <line x1="0" y1="90" x2="600" y2="90" stroke="#F4F4F5" strokeWidth="1" />
                        <line x1="0" y1="140" x2="600" y2="140" stroke="#F4F4F5" strokeWidth="1" />
                        <line x1="0" y1="185" x2="600" y2="185" stroke="#E4E4E7" strokeWidth="1" />

                        <path
                          d="M 0,140 Q 100,70 200,95 T 400,45 T 600,60 L 600,185 L 0,185 Z"
                          fill="url(#chartGradient)"
                        />

                        <path
                          d="M 0,140 Q 100,70 200,95 T 400,45 T 600,60"
                          fill="none"
                          stroke="#09090B"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        <path
                          d="M 0,165 Q 100,120 200,130 T 400,85 T 600,75"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        <circle cx="200" cy="95" r="5" fill="#09090B" stroke="#D2F843" strokeWidth="2.5" />
                        <circle cx="400" cy="45" r="5" fill="#09090B" stroke="#D2F843" strokeWidth="2.5" />
                        <circle cx="600" cy="60" r="5" fill="#09090B" stroke="#D2F843" strokeWidth="2.5" />
                      </svg>
                    </div>

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

                {/* Product-wise Complaints Progress Bar List */}
                <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-neutral-900">Product-wise Complaints</h3>
                      <span className="text-[11px] font-bold text-neutral-400">By Hazard Class</span>
                    </div>
                    <p className="text-xs text-neutral-500 mb-6">Distribution across grid equipment failures</p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-neutral-800">Transformer Hazards & Oil Leaks</span>
                          <span className="font-mono text-neutral-900">42% (525)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: '42%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-neutral-800">Cable Snaps & 11kV Feeder Line</span>
                          <span className="font-mono text-neutral-900">28% (350)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-neutral-800">Voltage Surges & Neutral Faults</span>
                          <span className="font-mono text-neutral-900">18% (225)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full bg-[#10B981] rounded-full" style={{ width: '18%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-neutral-800">Smart Meter & MDMS Sync Errors</span>
                          <span className="font-mono text-neutral-900">12% (150)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full bg-neutral-900 rounded-full" style={{ width: '12%' }} />
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

              {/* Operations Summary Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Pending Tasks Tabular Records */}
                <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">Pending Tasks / Live Dispatch</h3>
                      <p className="text-xs text-neutral-500">Autonomous priority dispatch & field crew tracking</p>
                    </div>

                    <button
                      onClick={() => setActiveMenu('ops')}
                      className="text-xs font-bold text-neutral-800 hover:text-black underline underline-offset-4"
                    >
                      View All in Grievance Ops →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="pb-3 pr-4">Grievance ID</th>
                          <th className="pb-3 pr-4">Consumer & Location</th>
                          <th className="pb-3 pr-4">Hazard Type</th>
                          <th className="pb-3 pr-4">SLA Countdown</th>
                          <th className="pb-3 pr-4">Priority</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {ticketsList.slice(0, 4).map((rec) => (
                          <tr key={rec.id} className="hover:bg-neutral-50/80 transition-colors">
                            <td className="py-3.5 pr-4 font-mono font-bold text-neutral-900">
                              {rec.id}
                            </td>
                            <td className="py-3.5 pr-4">
                              <div className="font-semibold text-neutral-900">{rec.consumer}</div>
                              <div className="text-[11px] text-neutral-400">{rec.location}</div>
                            </td>
                            <td className="py-3.5 pr-4 font-medium text-neutral-800">
                              {rec.category}
                            </td>
                            <td className="py-3.5 pr-4 font-mono font-bold text-rose-600">
                              {rec.slaCountdown}
                            </td>
                            <td className="py-3.5 pr-4">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                rec.priority === 'Urgent'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                {rec.priority}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => setSelectedTicket(rec)}
                                className="px-3 py-1 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-semibold transition-all shadow-sm"
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

                {/* Complaint Sources Doughnut Chart */}
                <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Complaint Sources</h3>
                    <p className="text-xs text-neutral-500 mb-6">Channel shares across inbound intake</p>

                    <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#F4F4F5" strokeWidth="14" />
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

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-extrabold text-neutral-900 font-mono">1,250</span>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Total Inflows</span>
                      </div>
                    </div>

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

            </div>
          )}

          {/* ================= WORKSPACE 2: GRIEVANCE OPS HUB ================= */}
          {activeMenu === 'ops' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">Grievance Operations Board</h2>
                  <p className="text-xs text-neutral-500">Live datagrid with inline AI category override and dispatch management</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-neutral-200/80 px-3 py-1.5 rounded-full text-neutral-800">
                    Showing {filteredTickets.length} of {ticketsList.length} Tickets
                  </span>
                </div>
              </div>

              {/* Multi-Filter Bar */}
              <div className="p-4 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Search Tickets</label>
                  <input
                    type="text"
                    value={opsSearch}
                    onChange={(e) => setOpsSearch(e.target.value)}
                    placeholder="Search by ID, citizen..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Department</label>
                  <select
                    value={opsDeptFilter}
                    onChange={(e) => setOpsDeptFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                  >
                    <option value="All">All Departments</option>
                    <option value="Distribution & Maintenance">Distribution & Maintenance</option>
                    <option value="Power Quality & SCADA">Power Quality & SCADA</option>
                    <option value="Metering & Tech">Metering & Tech</option>
                    <option value="Rural Electrification">Rural Electrification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={opsStatusFilter}
                    onChange={(e) => setOpsStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="En-Route">En-Route</option>
                    <option value="On-Site">On-Site</option>
                    <option value="Queued">Queued</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Priority</label>
                  <select
                    value={opsPriorityFilter}
                    onChange={(e) => setOpsPriorityFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>

              {/* DataGrid Table */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-5">Grievance ID</th>
                        <th className="py-3.5 px-4">Title & Details</th>
                        <th className="py-3.5 px-4">Category (Override)</th>
                        <th className="py-3.5 px-4">Department</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Priority</th>
                        <th className="py-3.5 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredTickets.map((t) => (
                        <tr 
                          key={t.id} 
                          onClick={() => setSelectedTicket(t)}
                          className="hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          <td className="py-4 px-5 font-mono font-bold text-neutral-900">
                            {t.id}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-neutral-900">{t.title}</div>
                            <div className="text-[11px] text-neutral-500">{t.consumer} • {t.location}</div>
                          </td>
                          <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1.5">
                              {editingCategoryTicketId === t.id ? (
                                <select
                                  defaultValue={t.category}
                                  onChange={(e) => {
                                    setTicketsList(prev => prev.map(item => item.id === t.id ? { ...item, category: e.target.value } : item));
                                    setEditingCategoryTicketId(null);
                                  }}
                                  className="px-2 py-1 rounded bg-neutral-100 border border-neutral-300 text-xs font-semibold"
                                >
                                  <option value="Transformer & Hazard">Transformer & Hazard</option>
                                  <option value="Voltage Fluctuation">Voltage Fluctuation</option>
                                  <option value="Emergency Line Snap">Emergency Line Snap</option>
                                  <option value="Smart Meter Reading">Smart Meter Reading</option>
                                  <option value="Agricultural Outage">Agricultural Outage</option>
                                </select>
                              ) : (
                                <>
                                  <span className="font-semibold text-neutral-800">{t.category}</span>
                                  <button
                                    onClick={() => setEditingCategoryTicketId(t.id)}
                                    className="p-1 text-neutral-400 hover:text-black rounded"
                                    title="Override category"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-neutral-600">
                            {t.department}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-full text-[11px]">
                              {t.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                              t.priority === 'Urgent'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : t.priority === 'High'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}>
                              {t.priority}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTicket(t);
                              }}
                              className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-bold shadow-sm"
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

          {/* ================= WORKSPACE 3: STAFF MANAGEMENT ================= */}
          {activeMenu === 'staff' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">Staff & Linemen Management</h2>
                  <p className="text-xs text-neutral-500">Onboarding validation queue, active field engineers roster, and safety certifications</p>
                </div>
              </div>

              {/* 4 Top Staff Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Pending Requests</span>
                  <p className="text-3xl font-extrabold text-rose-600 font-mono mt-1">{onboardingQueue.length}</p>
                  <span className="text-[10px] text-neutral-400">Awaiting ID verification</span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Active Officers</span>
                  <p className="text-3xl font-extrabold text-neutral-900 font-mono mt-1">128</p>
                  <span className="text-[10px] text-emerald-600 font-bold">100% on shift duty</span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Total Staff</span>
                  <p className="text-3xl font-extrabold text-neutral-900 font-mono mt-1">342</p>
                  <span className="text-[10px] text-neutral-400">Across 6 MSCEB Zones</span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Admin Invites</span>
                  <p className="text-3xl font-extrabold text-neutral-900 font-mono mt-1">6</p>
                  <span className="text-[10px] text-neutral-400">Tokens pending claim</span>
                </div>
              </div>

              {/* Staff Tabs */}
              <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
                <button
                  onClick={() => setStaffTab('pending')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    staffTab === 'pending'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span>Onboarding Queue</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                    {onboardingQueue.length}
                  </span>
                </button>

                <button
                  onClick={() => setStaffTab('approved')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    staffTab === 'approved'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  Approved Field Officers ({approvedStaff.length})
                </button>

                <button
                  onClick={() => setStaffTab('all')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    staffTab === 'all'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  All Staff Directory
                </button>
              </div>

              {/* Tab 1: Onboarding Queue */}
              {staffTab === 'pending' && (
                <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md p-6">
                  <h3 className="text-base font-bold text-neutral-900 mb-1">Staff Access Applicants Requiring Verification</h3>
                  <p className="text-xs text-neutral-500 mb-6">Review government employee credentials before granting DISCOM operational authority</p>

                  {onboardingQueue.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 text-xs">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <span>All staff registration requests have been cleared.</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {onboardingQueue.map((applicant) => (
                        <div key={applicant.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-neutral-900 text-sm">{applicant.name}</span>
                              <span className="text-[10px] font-mono bg-neutral-200 px-2 py-0.5 rounded text-neutral-800">{applicant.empId}</span>
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-2.5 h-2.5" />
                                Aadhaar KYC
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 font-medium">{applicant.role} • {applicant.division}</p>
                            <p className="text-[11px] text-neutral-400">Assigned Substation: {applicant.substation} (Applied {applicant.dateApplied})</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleApproveStaff(applicant.id)}
                              className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5 text-[#D2F843]" />
                              <span>Approve Access</span>
                            </button>

                            <button
                              onClick={() => handleRejectStaff(applicant.id)}
                              className="px-3 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-semibold transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Approved Officers */}
              {staffTab === 'approved' && (
                <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md p-6">
                  <h3 className="text-base font-bold text-neutral-900 mb-4">Active Field Linemen & Inspection Officers</h3>
                  <div className="space-y-3">
                    {approvedStaff.map((st) => (
                      <div key={st.id} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-neutral-900">{st.name}</div>
                          <div className="text-neutral-500">{st.role} • {st.substation}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {st.status}
                          </span>
                          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">{st.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: All Staff */}
              {staffTab === 'all' && (
                <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md p-6 text-xs text-neutral-500">
                  <p>All 342 staff members listed across 6 divisions. Filter by substation or designation.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= WORKSPACE 4: AI REVIEW & ML ================= */}
          {activeMenu === 'ai' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">AI Model Governance & Review Queue</h2>
                  <p className="text-xs text-neutral-500">Supervise natural language triage confidence, override misclassifications, and fine-tune routing</p>
                </div>
              </div>

              {/* AI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Low Confidence Flags (&lt;70%)</span>
                  <p className="text-3xl font-extrabold text-amber-600 font-mono mt-1">{aiQueue.length}</p>
                  <span className="text-[10px] text-neutral-400">Pending engineer audit</span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Officer Corrections</span>
                  <p className="text-3xl font-extrabold text-neutral-900 font-mono mt-1">18</p>
                  <span className="text-[10px] text-neutral-400">Re-trained in model checkpoint</span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Autonomous Precision</span>
                  <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">99.2%</p>
                  <span className="text-[10px] text-emerald-700 font-bold">Passing MERC SLA</span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Inference Latency</span>
                  <p className="text-3xl font-extrabold text-neutral-900 font-mono mt-1">320ms</p>
                  <span className="text-[10px] text-neutral-400">Real-time edge dispatch</span>
                </div>
              </div>

              {/* Low Confidence Queue */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-1">Active Low-Confidence Review Queue</h3>
                <p className="text-xs text-neutral-500 mb-6">Review ambiguous citizen prompts and confirm or override category prediction</p>

                {aiQueue.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 text-xs">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <span>All low-confidence triage cases have been validated.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aiQueue.map((item) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-mono font-bold text-neutral-700">{item.id}</span>
                          <span className="text-[11px] text-neutral-400">{item.timestamp}</span>
                        </div>

                        <p className="text-sm font-semibold text-neutral-900 italic">
                          "{item.prompt}"
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                          <div>
                            <span className="text-neutral-400 text-[11px]">AI Predicted Category:</span>
                            <div className="font-bold text-neutral-900 mt-0.5">{item.predictedCat}</div>
                          </div>

                          <div>
                            <span className="text-neutral-400 text-[11px]">Confidence Score:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 h-2 rounded-full bg-neutral-200 overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: `${item.confidence}%` }} />
                              </div>
                              <span className="font-mono font-bold text-amber-600">{item.confidence}%</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-neutral-400 text-[11px]">Ambiguity Trigger:</span>
                            <div className="font-medium text-neutral-700 mt-0.5">{item.flag}</div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center justify-end gap-2">
                          <button
                            onClick={() => handleApprovePrediction(item.id)}
                            className="px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5 text-[#D2F843]" />
                            <span>Confirm & Train Model</span>
                          </button>

                          <button
                            onClick={() => handleOverrideCategory(item.id, 'Distribution Maintenance')}
                            className="px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-800 hover:bg-white text-xs font-semibold transition-all"
                          >
                            Override Category →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= WORKSPACE 5: USER DIRECTORY ================= */}
          {activeMenu === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">User Directory</h2>
                  <p className="text-xs text-neutral-500">Master database of citizens, substation officers, and administrators</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                    <UserPlus className="w-3.5 h-3.5 text-[#D2F843]" />
                    <span>Create User</span>
                  </button>
                </div>
              </div>

              {/* Filter chips & Search */}
              <div className="p-4 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  {['All', 'Citizen', 'Officer', 'Admin'].map(r => (
                    <button
                      key={r}
                      onClick={() => setUserRoleFilter(r)}
                      className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                        userRoleFilter === r
                          ? 'bg-neutral-900 text-white shadow-sm'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search name or email..."
                    className="w-full px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-soft-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-5">User ID</th>
                        <th className="py-3.5 px-4">Name & Contact</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Substation / Division</th>
                        <th className="py-3.5 px-4">Tickets</th>
                        <th className="py-3.5 px-4">Account Status</th>
                        <th className="py-3.5 px-5 text-right">Toggle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {usersList
                        .filter(u => userRoleFilter === 'All' || u.role === userRoleFilter)
                        .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                        .map((usr) => (
                          <tr key={usr.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="py-4 px-5 font-mono font-bold text-neutral-900">
                              {usr.id}
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-neutral-900">{usr.name}</div>
                              <div className="text-[11px] text-neutral-500">{usr.email} • {usr.phone}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                usr.role === 'Admin'
                                  ? 'bg-neutral-900 text-[#D2F843]'
                                  : usr.role === 'Officer'
                                  ? 'bg-neutral-200 text-neutral-900'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}>
                                {usr.role}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-neutral-700 font-medium">
                              {usr.substation}
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-neutral-900">
                              {usr.ticketsFiled}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                usr.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {usr.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <button
                                onClick={() => handleToggleUserStatus(usr.id)}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                                  usr.status === 'Active'
                                    ? 'border border-neutral-300 hover:bg-rose-50 hover:text-rose-600 text-neutral-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                {usr.status === 'Active' ? 'Suspend' : 'Activate'}
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

          {/* ================= WORKSPACE 6: DEPARTMENTS CONFIG BOARD (image_7.png) ================= */}
          {activeMenu === 'departments' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900">Operational Departments Config Board</h2>
                  <p className="text-xs text-neutral-500">Configure SLA targets, dispatch alert channels, and autonomous keyword routing</p>
                </div>
              </div>

              {/* 6 Department Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentsList.map((dept) => (
                  <div key={dept.id} className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold">{dept.id}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {dept.health}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-neutral-900 leading-snug">
                        {dept.name}
                      </h3>

                      <p className="text-xs text-neutral-500 mt-1 mb-4">
                        Nodal Head: <strong className="text-neutral-800">{dept.head}</strong>
                      </p>

                      <div className="space-y-3 text-xs">
                        {/* SLA Window Configuration */}
                        <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-neutral-500 font-medium">Guaranteed SLA Window:</span>
                            <span className="font-mono font-bold text-neutral-900">{dept.slaWindow}</span>
                          </div>
                          <div className="flex gap-1.5 pt-1">
                            {['20 Mins', '45 Mins', '2 Hours', '24 Hours'].map(sla => (
                              <button
                                key={sla}
                                onClick={() => handleUpdateSla(dept.id, sla)}
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                                  dept.slaWindow === sla
                                    ? 'bg-neutral-900 text-white'
                                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                }`}
                              >
                                {sla}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Telemetry info */}
                        <div className="flex items-center justify-between text-[11px] text-neutral-600 py-1">
                          <span>Active Feeders: <strong>{dept.activeFeeders}</strong></span>
                          <span>Active Crews: <strong>{dept.activeCrews} Vans</strong></span>
                        </div>

                        {/* Keyword list */}
                        <div>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">Routing Keywords</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {dept.keywords.map((kw, i) => (
                              <span key={i} className="text-[10px] font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full border border-neutral-200">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">Automated Dispatch: Active</span>
                      <button className="font-bold text-neutral-900 hover:underline">
                        Configure Channels →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Slide-Over Drawer: Ticket Inspection Details */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
          <div className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto space-y-5 animate-slide-up flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-400">{selectedTicket.id}</span>
                  <h4 className="text-lg font-bold text-neutral-900">{selectedTicket.title || selectedTicket.hazard}</h4>
                </div>
                <button 
                  onClick={() => setSelectedTicket(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="text-neutral-500 font-medium">Consumer & Contact:</div>
                  <div className="text-sm font-bold text-neutral-900">{selectedTicket.consumer}</div>
                  <div className="text-neutral-600 font-mono">{selectedTicket.contact || 'Registered LT Meter'}</div>
                  <div className="text-neutral-500">{selectedTicket.location}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <div className="text-neutral-500">Substation:</div>
                    <div className="font-bold text-neutral-900 truncate">{selectedTicket.substation}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{selectedTicket.feeder || 'Feeder Primary'}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <div className="text-neutral-500">Target SLA:</div>
                    <div className="font-bold text-rose-600 font-mono">{selectedTicket.slaCountdown}</div>
                    <div className="text-[11px] text-emerald-700 font-bold">MERC Guaranteed</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900 text-white space-y-1">
                  <div className="text-neutral-400 text-[11px]">Dispatch Status & Vehicle:</div>
                  <div className="font-bold text-[#D2F843] text-sm">{selectedTicket.status}</div>
                  <div className="text-neutral-300 text-[11px]">AI Confidence: {selectedTicket.aiConfidence || '98.2%'}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-full py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
              >
                Reassign to Emergency Lineman Van
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-full py-2.5 rounded-full border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50"
              >
                Close Slide-Over
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
