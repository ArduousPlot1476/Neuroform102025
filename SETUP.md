# Neuroform MVP - Setup Guide

This guide will help you set up and run the Neuroform mental wellness journal application.

## Features Included in MVP

### ✅ Core Features Implemented
- **User Authentication** - Sign up, sign in, and secure session management with Supabase
- **Daily Journal Wall** - Fresh daily feed that displays today's entries
- **FTD Journaling** - Feeling, Thinking, Doing entries with intensity tracking (1-10 scale)
- **Morning & Evening Entries** - Special entry types for structured daily reflection
- **Mood Tracking** - Rate your mood (1-10 scale) with each journal entry
- **Journal History** - View and filter all past journal entries
- **Mood Calendar** - Visual calendar showing daily mood scores over time
- **Analytics Dashboard** - Weekly mood trends with charts and statistics
- **User Profile & Settings** - Manage your display name and bio
- **Responsive Design** - Fully responsive UI for mobile, tablet, and desktop

### 🔜 Coming in Future Updates
- Mentor Circle (invite mentors to support your journey)
- AI-Powered Weekly Insights and pattern recognition
- Comment/Reply system for mentor interactions
- Goals & Progress Tracking
- Premium Subscription features

## Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed
- A Supabase account (free tier is fine)
- Git installed

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Neuroform102025
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Supabase

### 3.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be fully provisioned (this takes 1-2 minutes)

### 3.2 Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Open the file `supabase/schema.sql` from this project
3. Copy and paste the entire SQL content into the SQL Editor
4. Click **Run** to execute the schema

This will create:
- `profiles` table - User profile information
- `journal_entries` table - All journal posts
- `daily_scores` table - Daily mood scores for calendar
- Row Level Security (RLS) policies - Data security
- Triggers and functions - Automated profile creation

### 3.3 Configure Environment Variables

1. In your Supabase dashboard, go to **Settings > API**
2. Copy your **Project URL** and **anon public** key
3. Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3.4 Enable Email Authentication

1. In Supabase dashboard, go to **Authentication > Providers**
2. Make sure **Email** provider is enabled
3. (Optional) Customize email templates under **Authentication > Email Templates**

## Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Step 5: Create Your First Account

1. Navigate to `http://localhost:3000`
2. Click **Get Started** or **Sign Up**
3. Enter your details and create an account
4. You'll be automatically redirected to the dashboard

## Using the Application

### Dashboard Overview

The main dashboard includes:

1. **Header** - Navigation menu, notifications, and user avatar
2. **Sidebar** - Quick access to all features
   - Journal Feed (home)
   - Analytics
   - Mood Calendar
   - Goals & Progress (coming soon)
   - Mentor Network (coming soon)
   - Summary Log (history)
   - Settings

### Creating Journal Entries

#### Regular Entries
- Simply type in the text area and click "Post Entry"
- Rate your current mood (1-10)
- Optionally expand "FTD Details" to add:
  - **Feeling** - How you're feeling emotionally
  - **Thinking** - What's on your mind
  - **Doing** - What you're currently doing
  - **Intensity** - How intense the experience is (1-10)

#### Morning Entry
- Special entry type for morning reflections
- Focus on gratitude and daily intentions
- Can only create one per day

#### Evening Entry
- Special entry type for evening reflection
- Reflect on: one win, one challenge, one gratitude
- Can only create one per day

### Viewing Analytics

- **Analytics Dashboard** - See your weekly mood trends with charts
- **Mood Calendar** - Visual heatmap of your daily scores
- **Journal History** - Browse all past entries with filters

### Profile Settings

Update your profile information:
- Display name
- Bio
- (More settings coming in future updates)

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Backend**: Supabase
  - PostgreSQL database
  - Authentication
  - Realtime subscriptions
  - Row Level Security
- **Charts**: Recharts
- **Date Utilities**: date-fns

## Project Structure

```
Neuroform102025/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   │   ├── analytics/    # Analytics page
│   │   ├── calendar/     # Mood calendar
│   │   ├── history/      # Journal history
│   │   ├── settings/     # User settings
│   │   └── page.tsx      # Main dashboard (journal feed)
│   ├── login/            # Login page
│   ├── signup/           # Sign up page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── Header.tsx        # Header component
│   ├── Sidebar.tsx       # Sidebar navigation
│   ├── JournalEntryForm.tsx  # Entry creation form
│   └── JournalEntry.tsx      # Entry display
├── lib/                   # Utilities and helpers
│   └── supabase/         # Supabase client setup
├── types/                 # TypeScript types
│   └── database.types.ts # Database schema types
├── supabase/             # Supabase configuration
│   ├── schema.sql        # Database schema
│   └── README.md         # Supabase setup guide
└── public/               # Static files
```

## Database Schema

### Tables

**profiles**
- Extends auth.users with profile information
- Fields: display_name, initials, avatar_url, bio, privacy_settings

**journal_entries**
- Stores all journal posts
- Types: regular, morning, evening, ai_summary
- Includes FTD data, mood ratings, intensity levels
- Wall date for daily organization

**daily_scores**
- Stores daily mood scores for calendar visualization
- Color-coded based on score ranges

### Security

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Policies enforce user isolation at the database level

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

This app can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any platform that supports Next.js

Make sure to set your environment variables in the deployment platform.

## Troubleshooting

### Database Connection Issues
- Verify your `.env.local` file has the correct Supabase URL and key
- Check that the Supabase project is active
- Ensure the schema.sql has been run successfully

### Authentication Issues
- Confirm email provider is enabled in Supabase
- Check browser console for detailed error messages
- Verify environment variables are set correctly

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

## Support & Feedback

For issues, questions, or feature requests, please refer to the project repository.

## License

This project is part of the Neuroform mental wellness platform.

---

**Note**: This is an MVP (Minimum Viable Product). Many features from the full PRD will be added in future updates. The current version focuses on core journaling functionality to validate the concept and gather user feedback.
