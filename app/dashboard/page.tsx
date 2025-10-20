'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import JournalEntryForm from '@/components/JournalEntryForm'
import JournalEntry from '@/components/JournalEntry'
import { Database } from '@/types/database.types'

type JournalEntryType = Database['public']['Tables']['journal_entries']['Row']

export default function DashboardPage() {
  const [entries, setEntries] = useState<JournalEntryType[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadTodaysEntries = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('wall_date', today)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEntries(data || [])
    } catch (error) {
      console.error('Error loading entries:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodaysEntries()

    // Subscribe to new entries
    const channel = supabase
      .channel('journal_entries_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'journal_entries',
        },
        () => {
          loadTodaysEntries()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const morningEntry = entries.find(e => e.entry_type === 'morning')
  const eveningEntry = entries.find(e => e.entry_type === 'evening')
  const regularEntries = entries.filter(e => e.entry_type === 'regular')

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Morning Entry Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-yellow-500">☀️</span>
          Morning Entry
        </h2>
        {!morningEntry ? (
          <JournalEntryForm entryType="morning" onSuccess={loadTodaysEntries} />
        ) : (
          <JournalEntry entry={morningEntry} />
        )}
      </section>

      {/* Daily Journaling Feed */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Daily Journal</h2>
        <JournalEntryForm entryType="regular" onSuccess={loadTodaysEntries} />

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading entries...</div>
        ) : regularEntries.length > 0 ? (
          <div className="mt-4 space-y-4">
            {regularEntries.map((entry) => (
              <JournalEntry key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No journal entries yet today. Start writing!
          </div>
        )}
      </section>

      {/* Evening Reflection */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-purple-500">🌙</span>
          Evening Reflection
        </h2>
        {!eveningEntry ? (
          <JournalEntryForm entryType="evening" onSuccess={loadTodaysEntries} />
        ) : (
          <JournalEntry entry={eveningEntry} />
        )}
      </section>
    </div>
  )
}
