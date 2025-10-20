'use client'

import { useState } from 'react'
import { Heart, Lightbulb, Activity, ChevronDown, ChevronUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { FTDData } from '@/types/database.types'

interface JournalEntryFormProps {
  entryType: 'regular' | 'morning' | 'evening'
  onSuccess?: () => void
}

export default function JournalEntryForm({ entryType, onSuccess }: JournalEntryFormProps) {
  const [content, setContent] = useState('')
  const [showFTD, setShowFTD] = useState(false)
  const [ftdData, setFtdData] = useState<FTDData>({
    feeling: '',
    thinking: '',
    doing: '',
    intensity: 5,
  })
  const [moodRating, setMoodRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const getPlaceholder = () => {
    switch (entryType) {
      case 'morning':
        return 'What are you grateful for today? What are your intentions?'
      case 'evening':
        return 'Reflect on your day: one win, one challenge, one gratitude...'
      default:
        return "What's on your mind?"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          entry_type: entryType,
          content: content.trim(),
          ftd_data: showFTD ? ftdData : null,
          mood_rating: moodRating,
          intensity: showFTD ? ftdData.intensity : null,
          wall_date: new Date().toISOString().split('T')[0],
        })

      if (insertError) throw insertError

      // Reset form
      setContent('')
      setFtdData({ feeling: '', thinking: '', doing: '', intensity: 5 })
      setMoodRating(5)
      setShowFTD(false)

      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to create entry')
    } finally {
      setLoading(false)
    }
  }

  const getIntensityLabel = (value: number) => {
    if (value <= 3) return 'Tolerable'
    if (value <= 6) return 'Moderate'
    if (value <= 8) return 'Difficult'
    return 'Unbearable'
  }

  const getIntensityColor = (value: number) => {
    if (value <= 3) return 'bg-green-500'
    if (value <= 6) return 'bg-yellow-500'
    if (value <= 8) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Main Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
          rows={4}
          required
        />

        {/* FTD Toggle */}
        <button
          type="button"
          onClick={() => setShowFTD(!showFTD)}
          className="mt-3 flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          {showFTD ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showFTD ? 'Hide' : 'Show'} FTD Details
        </button>

        {/* FTD Panel */}
        {showFTD && (
          <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg">
            {/* Feeling */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Heart className="w-4 h-4 text-pink-500" />
                Feeling
              </label>
              <input
                type="text"
                value={ftdData.feeling}
                onChange={(e) => setFtdData({ ...ftdData, feeling: e.target.value })}
                placeholder="How are you feeling?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-sm"
              />
            </div>

            {/* Thinking */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Thinking
              </label>
              <input
                type="text"
                value={ftdData.thinking}
                onChange={(e) => setFtdData({ ...ftdData, thinking: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-sm"
              />
            </div>

            {/* Doing */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Activity className="w-4 h-4 text-blue-500" />
                Doing
              </label>
              <input
                type="text"
                value={ftdData.doing}
                onChange={(e) => setFtdData({ ...ftdData, doing: e.target.value })}
                placeholder="What are you doing?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-sm"
              />
            </div>

            {/* Intensity Slider */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Intensity</span>
                <span className="text-xs font-normal text-gray-500">
                  {ftdData.intensity}/10 - {getIntensityLabel(ftdData.intensity || 5)}
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={ftdData.intensity}
                onChange={(e) => setFtdData({ ...ftdData, intensity: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #fbbf24 30%, #f97316 60%, #ef4444 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>
        )}

        {/* Mood Rating */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            How do you feel right now? ({moodRating}/10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={moodRating}
            onChange={(e) => setMoodRating(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #fbbf24 50%, #10b981 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Entry'}
        </button>
      </form>
    </div>
  )
}
