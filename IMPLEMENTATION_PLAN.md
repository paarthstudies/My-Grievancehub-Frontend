# Grievance Hub V3: Implementation Plan

## Overview
This document specifies the step-by-step refactoring plan for Grievance Hub:
1. **Phase 1: Minimalist Cinematic Landing Page Overhaul (image_18.png)**
   - Spacious, unobstructed view of the industrial electricity transmission towers background (`/hero-bg.jpg`).
   - Removal of the dense right-hand overlay cards from `HeroSection.jsx`.
   - Subtle left-side white/blue gradient overlay ensuring high text readability.
   - Floating minimalist bottom-right AI Assistant toggle button with a non-intrusive micro-popup (image_18.png).
2. **Phase 2: ServiceVolt-Inspired Multi-Workspace Admin Dashboard (image_8.png / image_7.png)**
   - Fully interactive sidebar switching between 6 distinct operational workspaces on a unified canvas without page refreshes:
     1. **Dashboard Overview** (Default, image_8.png: 4 metrics cards, line chart, hazard progress bars, pending tasks table, doughnut chart)
     2. **Grievance Ops** (Operations Hub: Multi-filter bar, datagrid with inline category override, and slide-over consumer detail inspection panel)
     3. **Staff Management** (Dual Workspace: Onboarding approval queue with accept/reject actions, approved officers roster, staff directory, admin invites)
     4. **AI Review & ML** (Model Governance: Low-confidence review queue, inline category override & prediction approval)
     5. **User Directory** (Master directory: Citizens, Officers, Admins with inline Active/Suspended account toggle)
     6. **Departments** (Operational config board of 6 cards based on image_7.png with SLA windows and router keywords)

---

## File Architecture Plan
- `src/IMPLEMENTATION_PLAN.md`: This reference document.
- `src/components/HeroSection.jsx`: Minimalist hero layout with left-only gradient and unobstructed background view.
- `src/components/AiChatWidget.jsx`: Floating bottom-right action button with non-intrusive micro-popup triage assistant.
- `src/components/AdminDashboard.jsx`: Complete ServiceVolt-inspired multi-workspace admin system.
- `src/App.jsx`: State and route controller uniting the landing page, chat widget, modals, and admin console.
