'use client'

import { format } from 'date-fns'
import { Heart, Lightbulb, Activity } from 'lucide-react'
import { Database } from '@/types/database.types'

type JournalEntryType = Database['public']['Tables']['journal_entries']['Row']

interface JournalEntryProps {
  entry: JournalEntryType
}

export default function JournalEntry({ entry }: JournalEntryProps) {
  const getBadgeStyle = () => {
    switch (entry.entry_type) {
      case 'morning':
        return 'bg-yellow-100 text-yellow-800'
      case 'evening':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getBadgeLabel = () => {
    switch (entry.entry_type) {
      case 'morning':
        return '☀️ Morning Entry'
      case 'evening':
        return '🌙 Evening Entry'
      default:
        return 'Journal Entry'
    }
  }

  const getIntensityLabel = (value: number) => {
    if (value <= 3) return 'Tolerable'
    if (value <= 6) return 'Moderate'
    if (value <= 8) return 'Difficult'
    return 'Unbearable'
  }

  const ftdData = entry.ftd_data as any

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {entry.entry_type !== 'regular' && (
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getBadgeStyle()} mb-2`}>
              {getBadgeLabel()}
            </span>
          )}
          <p className="text-sm text-gray-500">
            {format(new Date(entry.created_at), 'MMM d, yyyy • h:mm a')}
          </p>
        </div>
        {entry.mood_rating && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Mood:</span>
            <span className="font-semibold text-purple-600">{entry.mood_rating}/10</span>
          </div>
        )}
      </div>

      {/* Content */}
      <p className="text-gray-800 whitespace-pre-wrap mb-4">{entry.content}</p>

      {/* FTD Data */}
      {ftdData && (ftdData.feeling || ftdData.thinking || ftdData.doing) && (
        <div className="border-t border-gray-200 pt-4 space-y-2">
          {ftdData.feeling && (
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-0.5">Feeling</p>
                <p className="text-sm text-gray-800">{ftdData.feeling}</p>
              </div>
            </div>
          )}

          {ftdData.thinking && (
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-0.5">Thinking</p>
                <p className="text-sm text-gray-800">{ftdData.thinking}</p>
              </div>
            </div>
          )}

          {ftdData.doing && (
            <div className="flex items-start gap-2">
              <Activity className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-0.5">Doing</p>
                <p className="text-sm text-gray-800">{ftdData.doing}</p>
              </div>
            </div>
          )}

          {ftdData.intensity && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Intensity</span>
                <span className="font-semibold">
                  {ftdData.intensity}/10 - {getIntensityLabel(ftdData.intensity)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    ftdData.intensity <= 3
                      ? 'bg-green-500'
                      : ftdData.intensity <= 6
                      ? 'bg-yellow-500'
                      : ftdData.intensity <= 8
                      ? 'bg-orange-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(ftdData.intensity / 10) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
