// Mock data for Grievance Hub MSCEB portal

export const TRIAGE_PRESETS = [
  {
    id: 'transformer-spark',
    label: 'Transformer Sparking',
    location: 'Sector 4, Vashi, Navi Mumbai',
    prompt: "Heavy sparking and burning smell from transformer pole #T-42 near Sector 4 community park.",
    priority: 'Urgent',
    priorityColor: 'rose',
    department: 'Distribution & Maintenance',
    status: 'Auto-dispatched to local substation',
    substation: 'Vashi 33kV Substation (Div 4B)',
    crew: 'QRF Unit #14 (Lead: S. Deshmukh)',
    eta: '14 mins',
    actionSteps: [
      'Safety cutoff remotely triggered for Feeder V-42',
      'Dispatched Mobile Emergency Crew with safety gear',
      'Local Ward Fire & Disaster cell informed'
    ]
  },
  {
    id: 'voltage-surge',
    label: 'Voltage Surge / Fluctuation',
    location: 'Chinchwad, Pune',
    prompt: "Severe high voltage spike (310V measured) causing tripped breakers and appliance hazards in residential cluster.",
    priority: 'High',
    priorityColor: 'amber',
    department: 'Power Quality & Grid Monitoring',
    status: 'Voltage Tap Regulator calibrated',
    substation: 'Pimpri-Chinchwad 110kV Primary',
    crew: 'Inspection Crew #08 (Lead: K. Patil)',
    eta: '25 mins',
    actionSteps: [
      'Automated tap changer commanded via SCADA',
      'Field crew assigned for neutral line continuity check',
      'Affected consumers notified via SMS'
    ]
  },
  {
    id: 'billing-dispute',
    label: 'Abnormal Bill Assessment',
    location: 'Dharampeth, Nagpur',
    prompt: "Billed for 2,450 units this billing cycle; historical average is only 210 units. Suspected faulty smart meter reading.",
    priority: 'Standard',
    priorityColor: 'emerald',
    department: 'Consumer Revenue & Smart Metering',
    status: 'Digital audit queued & bill hold placed',
    substation: 'Nagpur Central Billing Operations',
    crew: 'Automated Billing Audit Engine',
    eta: 'SLA: 24 Hours',
    actionSteps: [
      'Smart meter interval reading pulled via MDMS',
      'Immediate stay on penalty & disconnection notice',
      'Provisional revised invoice generation initiated'
    ]
  },
  {
    id: 'farm-outage',
    label: 'Agri-Pump Feeder Failure',
    location: 'Karad, Satara District',
    prompt: "11kV agricultural feeder line tripped since 4:00 AM. 45 irrigation pumps without power during scheduled 8-hour supply cycle.",
    priority: 'Urgent',
    priorityColor: 'rose',
    department: 'Rural Electrification & Feeder Mgmt',
    status: 'Line patrolling unit dispatched',
    substation: 'Karad Rural 33/11kV Substation',
    crew: 'Lineman Squad #03 (Lead: R. Jadhav)',
    eta: '30 mins',
    actionSteps: [
      'Auto-recloser trip recorded on Karad feeder #2',
      'Line patrol team dispatched on all-terrain vehicle',
      'Supply window automatically extended by outage duration'
    ]
  }
];

export const MOCK_TICKETS = {
  'MSCEB-2026-98412': {
    id: 'MSCEB-2026-98412',
    consumerId: '028549102941',
    consumerName: 'Rajesh Sharma',
    address: 'Flat 402, Sai Heights, Baner Road, Pune 411045',
    category: 'Transformer & Power Outage',
    substation: 'Baner 33/11kV Substation',
    description: 'Phase failure on single-phase domestic meter resulting in partial brownout.',
    reportedAt: '12 Oct 2026, 09:15 AM',
    slaTarget: '12 Oct 2026, 12:15 PM (3 hrs)',
    status: 'In Progress',
    currentStage: 3, // 1: Logged, 2: AI Triage, 3: Crew Dispatched, 4: Repairing, 5: Resolved
    stages: [
      { title: 'Complaint Registered', time: '09:15 AM', done: true, desc: 'Logged via Web Portal' },
      { title: 'AI Triage & Categorization', time: '09:16 AM', done: true, desc: 'Assigned Priority: High | Feeder #BN-04' },
      { title: 'Field Crew Dispatched', time: '09:28 AM', done: true, desc: 'Van #09 en-route (Lineman: A. More - 9822019283)' },
      { title: 'On-Site Diagnostic & Repair', time: '10:05 AM (Est)', done: false, desc: 'Transformer terminal connector tightening' },
      { title: 'Resolution & Consumer OTP Close', time: '10:45 AM (Est)', done: false, desc: 'Digital closure with consumer sign-off' }
    ]
  },
  'MSCEB-2026-87123': {
    id: 'MSCEB-2026-87123',
    consumerId: '019482736152',
    consumerName: 'Priya Kulkarni',
    address: 'Plot 18, Pratap Nagar, Nagpur 440022',
    category: 'Smart Meter Reading',
    substation: 'Nagpur West Div-2',
    description: 'Meter display flickering and communication LED showing red error status.',
    reportedAt: '11 Oct 2026, 04:30 PM',
    slaTarget: '12 Oct 2026, 04:30 PM',
    status: 'Resolved',
    currentStage: 5,
    stages: [
      { title: 'Complaint Registered', time: '11 Oct 04:30 PM', done: true, desc: 'Logged via Portal' },
      { title: 'AI Triage & Categorization', time: '11 Oct 04:32 PM', done: true, desc: 'Hardware diagnosis flag raised' },
      { title: 'Field Crew Dispatched', time: '11 Oct 05:10 PM', done: true, desc: 'Meter Testing Squad #04' },
      { title: 'On-Site Repair', time: '11 Oct 06:15 PM', done: true, desc: 'Optical port reset & firmware patch applied' },
      { title: 'Closed with OTP Verification', time: '11 Oct 06:40 PM', done: true, desc: 'Consumer verified accurate test reading' }
    ]
  }
};

export const DISTRICT_GRID_STATUS = [
  {
    id: 'pune',
    name: 'Pune Urban & Rural',
    consumers: '3.4M',
    gridHealth: 99.2,
    activeFeeders: 842,
    substations: 114,
    activeIncidents: 12,
    avgResolution: '19m',
    status: 'Normal Operations',
    alert: null
  },
  {
    id: 'mumbai-mmr',
    name: 'Mumbai MMR & Thane',
    consumers: '4.8M',
    gridHealth: 99.8,
    activeFeeders: 1240,
    substations: 168,
    activeIncidents: 6,
    avgResolution: '14m',
    status: 'Optimal',
    alert: null
  },
  {
    id: 'nagpur',
    name: 'Nagpur & Vidarbha',
    consumers: '2.1M',
    gridHealth: 98.6,
    activeFeeders: 610,
    substations: 92,
    activeIncidents: 18,
    avgResolution: '24m',
    status: 'Pre-Monsoon Line Clearing',
    alert: 'Feeder maintenance in Hingna Zone'
  },
  {
    id: 'nashik',
    name: 'Nashik & North Maha',
    consumers: '1.9M',
    gridHealth: 99.4,
    activeFeeders: 520,
    substations: 78,
    activeIncidents: 8,
    avgResolution: '22m',
    status: 'Normal Operations',
    alert: null
  },
  {
    id: 'chhatrapati-sambhajinagar',
    name: 'Chhatrapati Sambhajinagar',
    consumers: '1.6M',
    gridHealth: 98.9,
    activeFeeders: 440,
    substations: 64,
    activeIncidents: 11,
    avgResolution: '26m',
    status: 'Agricultural Feeder Rotation',
    alert: null
  }
];

export const SERVICE_CATEGORIES = [
  {
    id: 'power-outage',
    title: 'Power Outages & Trips',
    description: 'Single-phase blackout, area-wide supply cut, or recurring breaker trips.',
    sla: '< 45 Mins',
    icon: 'ZapOff',
    popular: true,
    tag: 'Priority 1'
  },
  {
    id: 'transformer-sparks',
    title: 'Transformer & Cable Hazard',
    description: 'Oil leakage, sparking terminals, sagging 11kV lines, or pole damage.',
    sla: '< 20 Mins',
    icon: 'AlertTriangle',
    popular: true,
    tag: 'Emergency'
  },
  {
    id: 'voltage-issue',
    title: 'Voltage Fluctuations',
    description: 'Dim lights, high voltage spikes, phase unbalance, or neutral wire open.',
    sla: '< 2 Hours',
    icon: 'Activity',
    popular: false,
    tag: 'Power Quality'
  },
  {
    id: 'meter-issues',
    title: 'Smart Meter & Reading',
    description: 'Burnt meter, blank display, suspected fast meter, or failed remote sync.',
    sla: '< 24 Hours',
    icon: 'Gauge',
    popular: false,
    tag: 'Metering'
  },
  {
    id: 'billing-disputes',
    title: 'Billing & Tariff Corrections',
    description: 'Discrepancy in units, tariff slab error, provisional bill calculation hold.',
    sla: '< 48 Hours',
    icon: 'FileText',
    popular: false,
    tag: 'Revenue'
  },
  {
    id: 'solar-rooftop',
    title: 'Solar Net-Metering & PM Surya',
    description: 'Generation export meter sync, net credit settlement, or grid tie-in delays.',
    sla: '< 3 Days',
    icon: 'Sun',
    popular: false,
    tag: 'Green Energy'
  }
];

export const SUBSTATIONS_LIST = [
  'MSEDCL-PUN-EAST-SUB04 (Kharadi 33kV)',
  'MSEDCL-PUN-WEST-SUB12 (Baner 110kV)',
  'MSEDCL-MUM-THN-SUB02 (Wagle Estate 33kV)',
  'MSEDCL-MUM-VSH-SUB08 (Vashi Sector 17)',
  'MSEDCL-NAG-CTR-SUB01 (Sitabuldi Central)',
  'MSEDCL-NSK-IND-SUB05 (Ambad Industrial)',
  'MSEDCL-CSN-CID-SUB03 (CIDCO N-6 Substation)'
];
