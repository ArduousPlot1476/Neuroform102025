'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Home,
  BarChart3,
  Calendar,
  Target,
  Users,
  BookOpen,
  Settings,
  LogOut,
  X
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userProfile?: {
    display_name: string | null
    initials: string | null
  }
}

export default function Sidebar({ isOpen, onClose, userProfile }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { href: '/dashboard', label: 'Journal Feed', icon: Home },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/calendar', label: 'Mood Calendar', icon: Calendar },
    { href: '/dashboard/goals', label: 'Goals & Progress', icon: Target },
    { href: '/dashboard/mentors', label: 'Mentor Network', icon: Users },
    { href: '/dashboard/history', label: 'Summary Log', icon: BookOpen },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                {userProfile?.initials || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {userProfile?.display_name || 'User'}
                </p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Subscription Card */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-1">Upgrade to Premium</h3>
              <p className="text-xs text-gray-600 mb-3">
                Unlock unlimited mentors and advanced analytics
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
