# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned

## 2. Run the Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `schema.sql` from this directory
3. Run the SQL to create all tables, policies, and functions

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local` in the root directory
2. Get your project URL and anon key from Supabase Dashboard > Settings > API
3. Update `.env.local` with your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Enable Email Authentication

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Email provider
3. Configure email templates if desired

## Database Schema Overview

### Tables

- **profiles**: User profile information (extends auth.users)
- **journal_entries**: All journal posts including morning, evening, and regular entries
- **daily_scores**: Daily mood scores for the calendar view

### Security

All tables have Row Level Security (RLS) enabled. Users can only access their own data.
