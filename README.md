Neuroform Project Requirements Document (PRD) — 8.9.25
Neuroform Project Requirements …
1. Executive Summary
Neuroform is an innovative mental wellness application that reimagines therapeutic journaling through familiar social media UX patterns. The platform transforms traditional journaling into a supportive social experience where journal entries function as posts on a personal daily wall, with trusted Mentors replacing conventional followers to provide guidance and support.

2. Application Vision & Objectives
Primary Goals
Bridge the gap between personal reflection and community support


Leverage familiar social media patterns to reduce adoption friction


Create a safe, HIPAA-compliant space for mental wellness tracking


Provide data-driven insights through AI analysis of emotional patterns


Maintain daily structure while preserving historical data for reflection


Target Users
Individuals seeking mental wellness support and accountability


People comfortable with social media who want therapeutic benefits


Users requiring professional mentor guidance in their wellness journey


Premium members seeking advanced AI insights and unlimited mentor access



3. Application Structure & Flow
3.1 Landing Page
Sign-in / Sign-up


Authentication flow & password recovery


Brief application overview


Premium tier information


3.2 Main Application Layout
The main screen follows a fixed stacking order that resets daily:
Header Bar (Sticky)


Hamburger menu (left) → collapsible sidebar


Neuroform branding with Brain icon


Notification bell with indicator


User profile avatar


Mentor Circle (Your Care Team)


Prominent display at top of feed


Horizontal scrollable mentor cards showing: profile photo/initials, name with verification badge, professional role, online/away status


“Manage Team” link


Add new mentor button (+)


Morning Journal Entry


Fixed position below Mentor Circle


Gratitude prompts, intention setting, stream-of-consciousness writing


Yellow “Morning Entry” badge


Dynamic Journaling Feed (Expandable)


Create-post interface with FTD toggle


All daily posts with FTD scoring; unlimited posts


Each post includes: user avatar & name, timestamp, content with FTD data, intensity slider (1–10), comment/reply threading, mentor interactions


Evening Reflection Entry


Fixed position in stack


One win, one challenge, one gratitude


Purple “Evening Entry” badge; closure & awareness focus


Score Your Day Calendar


Bottom of daily feed


Visual heatmap grid; color-coded daily ratings


Quick access to historical data


3.3 Collapsible Sidebar
Navigation
Journal Feed (default/home)


Analytics Dashboard


Mood Calendar


Goals & Progress


Mentor Network


Summary Log (historical entries)


Settings


User Profile Summary
Avatar with initials


Display name


Subscription tier indicator


Subscription Status Card
Current plan details


Premium benefits summary


Manage subscription link



4. Core Features & Functionality
4.1 Dashboard System
Emotional Wellbeing Tracker
Weekly visualization (Sunday–Saturday) sourced from FTD entries


Emotion scale (0–10):


0–2: Poor


3–5: Fair


6–7: Good


8–10: Excellent


Daily Mood Progress Bar
Real-time average mood level & label for current day


Dynamically updates from journal entries


Analytics & Insights
Real-time emotional snapshot


Productivity metrics


Weekly AI-generated summaries


Trend identification


4.2 Journaling System (Posts)
Daily Wall Concept
Fresh wall each day (auto-reset at midnight)


Previous days archived in Summary Log


Chronological order within day; unlimited posts


FTD (Feeling, Thinking, Doing) Journal
Toggle-activated context panel with three inputs:


Feeling (pink heart icon)


Thinking (yellow lightbulb icon)


Doing (blue activity icon)


Intensity slider (1–10):


1–3: Tolerable


4–6: Moderate


7–8: Difficult


9–10: Unbearable


Visual progress bar with gradient


Post Types & Badges
Regular posts (no badge)


Morning Journal (yellow sun)


Evening Reflection (purple moon)


AI Summary (blue trending)


Follow-up replies (indented with timestamp)


Post Features
Rich text editing; tag support (#hashtags)


Privacy controls (private / mentors)


Edit/delete; timestamp display


Comment threading


4.3 Mentor Circle (Social Component)
Care Team Display
Max 8 visible mentors


Professional credentials & verification badges


Real-time status indicators: Green (Active/Online), Gray (Away/Offline)


Mentor Interactions
Comment on entries; reply threading


Professional insights; support reactions


Direct messaging (future feature)


Mentor Management
Invite via email


Permission levels: view all posts, comment privileges, historical data access


Remove/block capabilities


4.4 AI-Powered Features
Weekly AI Summaries
Automated Sunday morning generation


Key metrics: mood trend %, journal streak, completed focus sessions


Pattern recognition, correlations, actionable recommendations


AI Assist Mode
Toggle in post creation


Prompt suggestions & emotional labeling


Reflection question generation


4.5 Summary Log (Historical View)
Sidebar-accessible archive organized by date


Searchable; filters by post type, mood rating, tags, date range


Historical analytics: monthly/yearly trends, progress over time, pattern identification, export



5. Technical Architecture
5.1 Technology Stack
Frontend
Next.js 14 (App Router), TypeScript (strict)


Tailwind CSS v3.x, shadcn/ui, Lucide React


Recharts, Framer Motion


State: React Context + Local Storage


Backend
Supabase (PostgreSQL)


Supabase Auth, Realtime, Storage


Edge Functions (serverless)


Cron jobs for daily wall reset


Third-Party Integrations
OpenAI API (via Edge Functions)


Stripe (via Edge Functions)


Vercel Analytics, Sentry


SendGrid (mentor invitations)


5.2 Database Schema Design (Enhanced for Daily Wall Reset)
users
- id (UUID, pk)
- email
- created_at
- profile_data (JSONB)
- subscription_tier
- subscription_status
- last_active

profiles
- user_id (fk)
- display_name
- initials
- avatar_url
- bio
- privacy_settings (JSONB)
- onboarding_completed

journal_entries (posts)
- id (UUID)
- user_id (fk)
- entry_type (regular/morning/evening/ai_summary)
- content (encrypted)
- ftd_data (JSONB) { feeling, thinking, doing, intensity (1-10) }
- mood_rating (1-10)
- emotion_labels (array)
- visibility (private/mentors)
- tags (array)
- created_at
- updated_at
- wall_date (date)      -- daily grouping
- is_archived (boolean)
- parent_entry_id       -- for follow-ups

mentorships
- id (UUID)
- mentor_id (fk -> users)
- mentee_id (fk -> users)
- status (pending/active/archived)
- permissions (JSONB)
- verification_status (verified/unverified)
- professional_role
- invited_at
- accepted_at
- last_interaction

comments
- id (UUID)
- entry_id (fk)
- author_id (fk)
- content
- parent_comment_id
- created_at
- edited_at

daily_scores
- user_id (fk)
- date
- score (1-10)
- color_code (red/yellow/green/purple)
- summary_data (JSONB)

ai_insights
- user_id (fk)
- week_start_date
- insights (JSONB)
- metrics (JSONB) { mood_trend, journal_streak, focus_sessions }
- trends (JSONB)
- recommendations (array)
- generated_at

reactions
- id (UUID)
- entry_id (fk)
- user_id (fk)
- reaction_type (support/insightful/helpful)
- created_at

wall_archives
- user_id (fk)
- wall_date
- entries_snapshot (JSONB)
- archived_at

5.3 API Architecture
RESTful Endpoints
/api/auth/*              - Authentication flows
/api/users/*             - User management
/api/journal/*           - CRUD for journal entries
/api/journal/today       - Get today's wall
/api/journal/archive/*   - Historical entries
/api/mentors/*           - Mentor relationships
/api/comments/*          - Social interactions
/api/dashboard/*         - Analytics data
/api/ai/*                - AI processing
/api/calendar/*          - Score Your Day data

Realtime Subscriptions
New mentor invitations


Comments on journal entries


Mentor online/offline status


Live FTD updates


5.4 Daily Reset Automation
Cron Job (Midnight Local Time)
Archive current day’s entries to wall_archives


Mark journal_entries.is_archived = true


Generate daily score entry


Reset wall_date for new day


Send daily summary email (if enabled)


Trigger AI weekly summary (Sundays only)



6. UI/UX Design Specifications
6.1 Design System
Color Palette
Primary: Purple gradient #9333ea → #ec4899


Secondary: Gray scale


Semantic:


Success: #10b981


Warning: #f59e0b


Error: #ef4444


Info: #3b82f6


Typography
System UI stack


Headings: Semibold


Body: Regular


Small text: 12–14px


Components
Cards: white bg, subtle shadow


Buttons: rounded, hover states


Forms: clean borders, focus states


Avatars: circular with initials fallback


6.2 Responsive Design
Breakpoints
Mobile: < 640px


Tablet: 640–1024px


Desktop: > 1024px


Mobile Adaptations
Sidebar collapsed by default


Stacked mentor cards (vertical scroll)


Simplified post creation


Touch-optimized controls



7. Security & Privacy Requirements
7.1 HIPAA Compliance
End-to-end encryption for journal entries


Audit logging for all data access


BAAs with third-party services


Regular security assessments


Data retention policies


7.2 Privacy Controls
Per-entry visibility settings


Mentor permission levels


Data export (GDPR compliance)


Account deletion with data purge


Anonymous mode option


7.3 Authentication & Authorization
JWT-based sessions


Multi-factor authentication


Role-based access control


Session timeout (30 minutes inactive)


Strong password requirements



8. Development Roadmap
Phase 1: Foundation (Weeks 1–3)
Supabase setup with schema


Authentication system


Basic user profiles


Landing page


Phase 2: Core Journaling (Weeks 4–6)
Daily wall structure


FTD journal system


Morning/Evening entries


Post creation interface


Daily reset automation


Phase 3: Social Features (Weeks 7–9)
Mentor invitation system


Comment/reply functionality


Mentor Circle display


Notification system


Phase 4: Dashboard & Analytics (Weeks 10–12)
Emotional wellbeing tracker


Score Your Day calendar


Summary Log archive


Historical data views


Phase 5: AI Integration (Weeks 13–14)
OpenAI API integration


Weekly insights generation


AI assist for posting


Trend analysis


Phase 6: Premium Features (Weeks 15–16)
Stripe integration


Subscription management


Premium tier benefits


Usage limits for free tier


Phase 7: Polish & Launch (Weeks 17–18)
Performance optimization


Security audit


Beta testing


Production deployment



9. Subscription Tiers
Free
3 mentors maximum


7-day history


Basic mood tracking


Limited AI insights (weekly)


Premium — $9.99/month
Unlimited mentors


Full history access


Advanced analytics


Daily AI insights


Priority support


Data export tools


Professional — $19.99/month
All Premium features


API access


Team/family accounts


Clinical integration


Custom reporting



10. Success Metrics & KPIs
User Engagement
Daily active users (DAU)


Posts per user per day (target: 3–5)


Mentor interaction rate (>60%)


Daily streak maintenance (>50% 7-day streak)


Technical Performance
Page load time < 2s


Wall reset completion < 5s


99.9% uptime


Zero data loss events


Business Metrics
Free → Premium conversion (>10%)


MRR growth


Churn rate (<5% monthly)


Net Promoter Score (>50)



11. Risk Mitigation
Technical Risks
Daily reset failures → redundant cron jobs + monitoring


Data loss → regular backups, soft deletes


Performance at scale → indexing, query optimization


User Experience Risks
Overwhelming interface → progressive disclosure, onboarding tour


Mentor quality → verification system, reporting tools


Privacy concerns → clear policies, encryption emphasis


Business Risks
Low engagement → gamification, streak rewards


High AI costs → caching, batch processing, tier limits


Regulatory compliance → legal review, ongoing audits



This comprehensive PRD provides the blueprint for building Neuroform, incorporating the daily layout, reset functionality, and professional design patterns shown in the mockups and wireframes.

