# Grievance Hub — Architectural & Development Phase Notes

**MSCEB DISCOM Smart Electricity Grievance & Rapid Outage Resolution System**  
*Document Version: 1.0.0 | Updated: October 2026 | Circle: Maharashtra State Electricity Distribution (MSEDCL / MSCEB)*

---

## Executive Summary

**Grievance Hub** is an intelligent, high-availability, role-based public utility and field operations platform engineered for MSCEB (Maharashtra State Electricity Board). It unifies citizen incident reporting, central administrative dispatch, SCADA outage telemetry, automated machine-learning workload routing, and rapid on-site field engineering workflows into a cohesive, high-performance web architecture.

The platform standardizes on the **ServiceVolt-inspired design system**, emphasizing:
- Crisp off-white surfaces (`#FAFAFA` / `#FFFFFF` / `#F4F4F5`)
- Subtle 1px zinc/slate borders (`#E4E4E7` / `border-neutral-200/80`)
- High-contrast obsidian typography and buttons (`#09090B`)
- Electric lime (`#D2F843`) and emerald (`#10B981`) telemetry accents
- Zero visual clutter, diffused drop shadows, and responsive layouts

---

## Phase 1: Consumer Portal & Atmospheric Landing Experience

### 1. Architectural Objectives
Deliver an accessible, modern, high-conversion public web portal enabling citizens across Maharashtra to report electrical hazards, track live grievance restoration stages, monitor feeder outages, and interact with an automated natural language triage agent without cognitive fatigue.

### 2. Design System & Atmospheric Layout
- **Cinematic Outdoor Vista:** Integrated high-resolution scenic photography of massive transmission towers and high-voltage power lines stretching across green landscapes under clear skies.
- **Left-Biased Gradient Fade:** Applied a specialized CSS radial/linear fade (`linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.1) 85%, transparent 100%)`) allowing unobstructed visibility of the electrical infrastructure on the right while ensuring AAA accessibility and contrast for text and controls on the left.
- **Glassmorphic Sticky Header:** Transparent utility navigation with quick links to live grid telemetry, 14-category grievance directory, real-time ticket tracker, and quick role-based login modal launcher.
- **Minimalist AI Assistant FAB:** Replaced boxy right-hand static cards with a floating expandable widget (`AiChatWidget.jsx`) featuring autonomous natural language intent recognition, instant ticket lookup, and pre-filled complaint generation.

### 3. Core Functional Modules
1. **Interactive Hero Section (`HeroSection.jsx`):**
   - Natural language input bar ("Describe your issue, e.g. transformer sparking, wire snap...")
   - Quick action pills: *Report Transformer Sparking*, *Low Voltage in Locality*, *Billing Discrepancy*
   - Live telemetry status pill (*Feeder Grid: 99.4% Nominal, 14 Outages Resolved in Pune Circle*)
2. **Grievance Taxonomy Directory (`ServicesSection.jsx`):**
   - Categorized into 14 standardized MSCEB incident types across 4 priority bands (Urgent Hazard, Power Supply, Metering & Bills, Grid Infrastructure).
   - Dynamic SLA estimation badge per category (e.g., 2 hours for live wire snap, 24 hours for billing dispute).
3. **Live Outage SCADA Map (`OutageMapSection.jsx`):**
   - Regional feeder status visualization (Pune Circle, Shivajinagar, Kothrud, Hinjawadi, Pimpri-Chinchwad).
   - Affected consumer count, expected restoration timestamps, and one-tap outage reporting.
4. **Three-Role Unified Authentication Modal (`AuthModal.jsx`):**
   - Seamless role switching: **Consumer** (Consumer Number / OTP), **Field Officer** (Officer ID / Circle PIN), and **Admin / Dispatcher** (System Admin credentials).
   - Pre-loaded one-click demo personas (e.g., *Sanjay Deshmukh - Assistant Engineer, Pune Circle*).

---

## Phase 2: Central Admin Command Center (`/admin`)

### 1. Architectural Objectives
Implement a centralized command center adopting the **ServiceVolt layout blueprint** to provide MSCEB system administrators, circle superintendents, and chief dispatchers with real-time grid awareness, dispatch control, staff verification, ML model tuning, and statutory regulatory compliance metrics.

### 2. Visual Blueprint & Layout Structure
- **Persistent Left Sidebar:** Collapsible SaaS navigation with grouped modules:
  - *Main:* Dashboard Overview, Grievance Operations, Staff Management
  - *AI & Automation:* AI Review & ML Routing, Circle Departments, SLA Directives
  - *Footer:* System Settings, Theme Toggle, Return to Public Portal
- **Header Operations Bar:** Global grievance search, notification center with unread count badges, operational date filters, and dispatcher profile chip.
- **Metric KPI Strip:** 4 high-contrast KPI cards featuring trend indicators, active SLA trackers, autonomous triage percentages, and pending emergency dispatches.

### 3. Integrated Admin Workspaces (`AdminDashboard.jsx`)
1. **Overview & Live Telemetry:**
   - Multi-metric cards: *Active Incidents*, *Feeder Outage Rate*, *Autonomous AI Dispatch Rate*, *Average Resolution Time*.
   - Incident Urgency Distribution chart with interactive status filters.
   - Recent Critical Dispatches stream with immediate reassignment triggers.
2. **Grievance Operations (`queue` / `grievances`):**
   - Full tabular grievance registry with keyword search, priority filter pills (Low, Medium, High, Critical Hazard), and category dropdowns.
   - Interactive slide-over inspection drawer detailing consumer identity, meter ID, geo-tagged pole coordinate, attached photo evidence, and manual dispatch overrides.
3. **Staff Management (`staff`):**
   - Field officer roster displaying assigned jurisdiction circles, active workloads, and live duty availability.
   - Pending onboarding queue with one-click credential approval, role escalation, and department assignment.
4. **AI Review & ML Routing (`ai-review`):**
   - Confidence scoring breakdown for automated classification models (NLP Complaint Categorizer, Computer Vision Hazard Detector, Priority Engine).
   - Model retraining trigger, misclassification audit log, and dispatch routing threshold adjustments.
5. **Circle Departments (`departments`):**
   - Divisional overview (Shivajinagar, Kothrud, Hadapsar, Pimpri, Hinjawadi Phase 1-3).
   - Active substation transformer counts, deployed line crews, and real-time operational capacity meters.

---

## Phase 3: MSCEB Field Officer Operations (`/officer`)

### 1. Architectural Objectives
Equip on-ground junior and assistant engineers with an optimized, lightweight operational cockpit to view assigned field grievances, manage on-site repairs, coordinate safety backups, upload resolution evidence, and dynamically publish their workload availability to the dispatch engine.

### 2. Design System Alignment
- **Strict ServiceVolt Consistency:** Replaced legacy high-density blue themes with the standardized palette:
  - High-contrast obsidian pill headers (`#09090B`)
  - Clean white cards (`#FFFFFF`) with 1px zinc borders (`#E4E4E7`)
  - Diffused drop shadows (`shadow-sm`)
  - Electric lime (`#D2F843`) and emerald (`#10B981`) active indicator badges
  - High-readability sans-serif typography (Inter / Plus Jakarta Sans)

### 3. Header & Navigation Architecture
1. **Top Header Utility Bar:**
   - **Page Identifier:** Breadcrumb-style title (*Dashboard*, *Assigned Work Queue*, *Workload & Capacity*) with mobile sidebar toggle.
   - **Platform Badge:** "DISCOM AI 1.0" system badge indicating live SCADA-connected state.
   - **Language Toggle:** One-touch language selector (`EN` | `हिन्दी` | `मराठी`) for multilingual field technicians.
   - **Notification Bell Dropdown:** Minimalist bell icon with unread notification badge. Toggles a compact popover displaying incoming dispatches, SLA warnings, and consumer photo updates.
   - **Officer Profile Chip:** User avatar chip displaying `SD` (Sanjay Deshmukh, Assistant Engineer • Pune Circle). Clicking opens a modal detailing:
     - Official Email (`sanjay.deshmukh@msedcl.gov.in`)
     - Direct Mobile (`+91 98220 44319`)
     - Assigned Jurisdictions (`Shivajinagar`, `Kothrud`, `Pimpri`)
     - Automated Routing Availability Selector (`Available`, `Busy`, `Unavailable`, `On Leave`).
2. **Streamlined Sidebar:**
   - Pure SaaS layout with zero clutter: Brand lockup with electric bolt mark.
   - Three operational views:
     - `Dashboard` (Summary, capacity meter, 5-card metric ribbon, urgent task queue)
     - `Assigned Work Queue` (Tabular registry, status tabs, search & filters, inspection drawer)
     - `Workload & Capacity` (Live utilization gauge, routing control, active roster, peer circle load)
   - Bottom-pinned utilities: *Settings* and *Logout* (with soft crimson hover states).

### 4. Officer Workspaces (`OfficerPanel.jsx`)
1. **Officer Dashboard (`/officer/dashboard`):**
   - **Summary Banner:** Soft neutral gradient hero card featuring officer credentials, assigned circle, department tag (*Power Supply & Operations Department*), real-time capacity progress bar, and immediate sync button.
   - **5-Card Metric Ribbon:**
     - *Assigned (Awaiting First Action)*
     - *On-site / In Progress (Field Repairs Underway)*
     - *Critical / Safety Hazard (Urgent Municipal Dispatch)*
     - *Restored Today (Completed Resolutions)*
     - *Reopened (Citizen Follow-up Required)*
   - **Priority Field Task Queue:** High-urgency warning cards highlighting snapping wires, sparking transformers, or waterlogged feeder boxes with direct route triggers.
2. **Assigned Work Queue (`/officer/queue`):**
   - **Filter Pills:** `All Tasks`, `Active Workload`, `Assigned`, `In Progress`, `Reopened`, `Resolved / Closed`.
   - **Search & Filter Strip:** Multi-token search by ticket ID, consumer number, or street locality; dropdowns for Priority, Category, and Sort order.
   - **Slide-Over Inspection Drawer:** 
     - Consumer contact details with one-click call trigger (`tel:`).
     - Geographic pole number and transformer tag (e.g., `Pole #BN-04`, `Substation SS-11KV-04`).
     - Citizen-submitted photo evidence preview.
     - One-tap action controls: **Mark On-Site**, **Request Safety Backup (SDRF/Fire)**, and **Resolve & Submit Photo Evidence**.
3. **Workload & Capacity Management (`/officer/workload`):**
   - **Utilization Gauge:** Circular and linear progress indicator measuring active caseload against a 15-task maximum threshold.
   - **Automated Routing Selector:** Direct control over ML dispatch engine (`Available`, `Busy`, `Unavailable`, `On Leave`).
   - **Active Roster:** Live list of tasks currently held by the logged-in engineer.
   - **Peer Officers Load Panel:** Read-only cards for fellow engineers in the Pune Circle (e.g., Rajesh Patil, Amit Kadam, Sneha Joshi, Vikram Shinde) showing live utilization percentages and availability tags to facilitate mutual aid.

---

## Technical Stack & Verification Summary

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 + Vite 8 | Ultra-fast client rendering, sub-second HMR, modern JSX runtime |
| **Styling** | Tailwind CSS + Vanilla CSS Tokens | ServiceVolt design system tokens, zero unnecessary CSS runtime overhead |
| **Icons** | Lucide React | Clean, scalable 24px/16px SVG iconography |
| **State Management** | Local & Context React Hooks | Fast, reactive, deterministic view transitions |
| **Build Artifacts** | Production Vite Bundle | Gzipped bundle size ~109 kB, zero compilation warnings |

---

*End of Development Phase Notes.*
