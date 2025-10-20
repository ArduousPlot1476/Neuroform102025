export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          initials: string | null
          avatar_url: string | null
          bio: string | null
          privacy_settings: Json
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          initials?: string | null
          avatar_url?: string | null
          bio?: string | null
          privacy_settings?: Json
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          initials?: string | null
          avatar_url?: string | null
          bio?: string | null
          privacy_settings?: Json
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          entry_type: 'regular' | 'morning' | 'evening' | 'ai_summary'
          content: string
          ftd_data: Json | null
          mood_rating: number | null
          intensity: number | null
          emotion_labels: string[] | null
          visibility: 'private' | 'mentors'
          tags: string[] | null
          wall_date: string
          is_archived: boolean
          parent_entry_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          entry_type: 'regular' | 'morning' | 'evening' | 'ai_summary'
          content: string
          ftd_data?: Json | null
          mood_rating?: number | null
          intensity?: number | null
          emotion_labels?: string[] | null
          visibility?: 'private' | 'mentors'
          tags?: string[] | null
          wall_date?: string
          is_archived?: boolean
          parent_entry_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          entry_type?: 'regular' | 'morning' | 'evening' | 'ai_summary'
          content?: string
          ftd_data?: Json | null
          mood_rating?: number | null
          intensity?: number | null
          emotion_labels?: string[] | null
          visibility?: 'private' | 'mentors'
          tags?: string[] | null
          wall_date?: string
          is_archived?: boolean
          parent_entry_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      daily_scores: {
        Row: {
          id: string
          user_id: string
          date: string
          score: number | null
          color_code: 'red' | 'yellow' | 'green' | 'purple' | null
          summary_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          score?: number | null
          color_code?: 'red' | 'yellow' | 'green' | 'purple' | null
          summary_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          score?: number | null
          color_code?: 'red' | 'yellow' | 'green' | 'purple' | null
          summary_data?: Json | null
          created_at?: string
        }
      }
    }
  }
}

export interface FTDData {
  feeling?: string
  thinking?: string
  doing?: string
  intensity?: number
}

export interface PrivacySettings {
  default_visibility: 'private' | 'mentors'
}
