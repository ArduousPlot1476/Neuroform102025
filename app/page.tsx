import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Neuroform
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
            Transform your mental wellness journey through therapeutic journaling.
            Reimagine self-reflection with familiar social patterns and supportive guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Daily Journaling</h3>
              <p className="text-gray-600 text-sm">
                Express your thoughts, feelings, and actions with our FTD journaling system
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Visualize your emotional wellbeing with mood tracking and insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Private & Secure</h3>
              <p className="text-gray-600 text-sm">
                Your journal entries are encrypted and protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
