'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scores, setScores] = useState<Record<string, number>>({})
  const supabase = createClient()

  useEffect(() => {
    const loadScores = async () => {
      const start = startOfMonth(currentDate)
      const end = endOfMonth(currentDate)

      const { data } = await supabase
        .from('daily_scores')
        .select('date, score')
        .gte('date', format(start, 'yyyy-MM-dd'))
        .lte('date', format(end, 'yyyy-MM-dd'))

      if (data) {
        const scoresMap: Record<string, number> = {}
        data.forEach((item) => {
          scoresMap[item.date] = item.score || 0
        })
        setScores(scoresMap)
      }
    }

    loadScores()
  }, [currentDate, supabase])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getColorForScore = (score: number) => {
    if (score >= 8) return 'bg-green-500'
    if (score >= 6) return 'bg-yellow-500'
    if (score >= 3) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mood Calendar</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}

          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const score = scores[dateStr]
            const hasScore = score !== undefined

            return (
              <div
                key={dateStr}
                className={`aspect-square p-2 border rounded-lg ${
                  isToday(day) ? 'border-purple-600 border-2' : 'border-gray-200'
                } ${!isSameMonth(day, currentDate) ? 'opacity-50' : ''}`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-sm text-gray-700">{format(day, 'd')}</span>
                  {hasScore && (
                    <div className={`w-6 h-6 rounded-full ${getColorForScore(score)} mt-1`} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <span className="text-gray-600">Poor (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full" />
            <span className="text-gray-600">Fair (3-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span className="text-gray-600">Good (6-7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span className="text-gray-600">Excellent (8-10)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
