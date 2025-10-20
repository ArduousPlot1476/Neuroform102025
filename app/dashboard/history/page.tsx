'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import JournalEntry from '@/components/JournalEntry'
import { Database } from '@/types/database.types'

type JournalEntryType = Database['public']['Tables']['journal_entries']['Row']

export default function HistoryPage() {
  const [entries, setEntries] = useState<JournalEntryType[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'morning' | 'evening' | 'regular'>('all')
  const supabase = createClient()

  useEffect(() => {
    const loadEntries = async () => {
      let query = supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (filter !== 'all') {
        query = query.eq('entry_type', filter)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error loading entries:', error)
      } else {
        setEntries(data || [])
      }
      setLoading(false)
    }

    loadEntries()
  }, [filter, supabase])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Journal History</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Entries
        </button>
        <button
          onClick={() => setFilter('morning')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'morning'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Morning
        </button>
        <button
          onClick={() => setFilter('evening')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'evening'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Evening
        </button>
        <button
          onClick={() => setFilter('regular')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'regular'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Regular
        </button>
      </div>

      {/* Entries List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading entries...</div>
      ) : entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No entries found. Start journaling to see your history here!
        </div>
      )}
    </div>
  )
}
