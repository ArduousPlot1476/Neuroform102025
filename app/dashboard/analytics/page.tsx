'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AnalyticsPage() {
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalEntries: 0,
    avgMood: 0,
    streak: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    const loadAnalytics = async () => {
      const today = new Date()
      const weekStart = startOfWeek(today)
      const weekEnd = endOfWeek(today)
      const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

      // Load weekly mood data
      const { data: entries } = await supabase
        .from('journal_entries')
        .select('wall_date, mood_rating')
        .gte('wall_date', format(weekStart, 'yyyy-MM-dd'))
        .lte('wall_date', format(weekEnd, 'yyyy-MM-dd'))

      // Process data for chart
      const chartData = days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const dayEntries = entries?.filter((e) => e.wall_date === dateStr) || []
        const avgMood = dayEntries.length
          ? dayEntries.reduce((sum, e) => sum + (e.mood_rating || 0), 0) / dayEntries.length
          : 0

        return {
          day: format(day, 'EEE'),
          mood: Math.round(avgMood * 10) / 10,
        }
      })

      setWeeklyData(chartData)

      // Load overall stats
      const { data: allEntries, count } = await supabase
        .from('journal_entries')
        .select('mood_rating', { count: 'exact' })

      const totalMood = allEntries?.reduce((sum, e) => sum + (e.mood_rating || 0), 0) || 0
      const avgMood = allEntries?.length ? totalMood / allEntries.length : 0

      setStats({
        totalEntries: count || 0,
        avgMood: Math.round(avgMood * 10) / 10,
        streak: 0, // TODO: Calculate actual streak
      })
    }

    loadAnalytics()
  }, [supabase])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Entries</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalEntries}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Average Mood</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.avgMood}/10</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Current Streak</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.streak} days</p>
        </div>
      </div>

      {/* Weekly Mood Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Mood Tracker</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="mood" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Insights</h2>
        <p className="text-gray-600">
          AI-powered insights and pattern recognition will be available in a future update.
          Keep journaling to build your data for more personalized insights!
        </p>
      </div>
    </div>
  )
}
