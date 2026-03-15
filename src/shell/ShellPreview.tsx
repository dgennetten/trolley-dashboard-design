import { useState } from 'react'
import AppShell from './components/AppShell'
import type { NavigationItem, AppShellUser } from './components/AppShell'
import {
  Calendar,
  Landmark,
  Clock,
  PartyPopper,
  Heart,
  Info,
  User,
  MessageSquare,
  Users,
  LayoutDashboard,
  Activity,
  FileEdit,
  Bell,
} from 'lucide-react'

const publicNavItems: NavigationItem[] = [
  { label: 'Events', href: '/events', isActive: true },
  { label: 'History', href: '/history' },
  { label: 'Schedules & Fares', href: '/schedules' },
  { label: 'Charters', href: '/charters' },
  { label: 'Support Us', href: '/support' },
  { label: 'About', href: '/about' },
]

const memberNavItems: NavigationItem[] = [
  { label: 'My Profile', href: '/portal/profile', icon: <User className="w-5 h-5" strokeWidth={1.5} />, isActive: true },
  { label: 'Messages', href: '/portal/messages', icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} /> },
]

const supervisorNavItems: NavigationItem[] = [
  { label: 'My Profile', href: '/portal/profile', icon: <User className="w-5 h-5" strokeWidth={1.5} /> },
  { label: 'Messages', href: '/portal/messages', icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} /> },
  { label: 'My Team', href: '/portal/team', icon: <Users className="w-5 h-5" strokeWidth={1.5} />, isActive: true },
]

const adminNavItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />, isActive: true },
  { label: 'Members', href: '/portal/members', icon: <Users className="w-5 h-5" strokeWidth={1.5} /> },
  { label: 'Activity Log', href: '/portal/activity', icon: <Activity className="w-5 h-5" strokeWidth={1.5} /> },
  { label: 'Content Management', href: '/portal/content', icon: <FileEdit className="w-5 h-5" strokeWidth={1.5} /> },
  { label: 'Notifications', href: '/portal/notifications', icon: <Bell className="w-5 h-5" strokeWidth={1.5} /> },
]

const sampleUser: AppShellUser = {
  name: 'Alex Morgan',
  role: 'admin',
}

type PreviewMode = 'public' | 'member' | 'supervisor' | 'admin'

export default function ShellPreview() {
  const [mode, setMode] = useState<PreviewMode>('public')

  const variant = mode === 'public' ? 'public' : 'portal'
  const navItems =
    mode === 'public'
      ? publicNavItems
      : mode === 'member'
        ? memberNavItems
        : mode === 'supervisor'
          ? supervisorNavItems
          : adminNavItems

  const user =
    mode === 'public'
      ? undefined
      : { ...sampleUser, role: mode as AppShellUser['role'] }

  const pageTitle =
    mode === 'member'
      ? 'My Profile'
      : mode === 'supervisor'
        ? 'My Team'
        : mode === 'admin'
          ? 'Dashboard'
          : undefined

  return (
    <div className="h-screen flex flex-col">
      {/* Mode switcher bar */}
      <div className="shrink-0 bg-stone-900 dark:bg-stone-950 border-b border-stone-700 px-4 py-2 flex items-center gap-2">
        <span className="text-xs font-medium text-stone-400 mr-2 font-['DM_Sans']">
          Preview as:
        </span>
        {(['public', 'member', 'supervisor', 'admin'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
              mode === m
                ? 'bg-emerald-600 text-white'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Shell preview */}
      <div className="flex-1 overflow-hidden">
        <AppShell
          variant={variant}
          navigationItems={navItems}
          user={user}
          pageTitle={pageTitle}
          onNavigate={(href) => console.log('Navigate to:', href)}
          onLogin={() => console.log('Login clicked')}
          onLogout={() => console.log('Logout clicked')}
        >
          {mode === 'public' ? (
            <PublicContent />
          ) : (
            <PortalContent mode={mode} />
          )}
        </AppShell>
      </div>
    </div>
  )
}

function PublicContent() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-emerald-900 dark:bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/90 to-emerald-950/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['DM_Sans'] leading-tight">
            Fort Collins
            <br />
            <span className="text-amber-400">Trolley</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-emerald-100/80 max-w-xl">
            Ride the rails of history. Celebrating 40 years of heritage railway
            operation in Fort Collins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold rounded-lg transition-colors shadow-lg">
              View Schedule
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors backdrop-blur-sm border border-white/20">
              Support Us
            </button>
          </div>
        </div>
      </div>

      {/* Key info cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Calendar, title: 'Season Opens May 2', desc: 'Saturdays, Sundays & Holidays' },
            { icon: Clock, title: 'Noon – 5pm', desc: 'Every 30 min, City Park to Old Town' },
            { icon: Heart, title: 'Become a Member', desc: 'Starting at $20/year' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-stone-900 rounded-xl p-5 shadow-md border border-stone-200 dark:border-stone-700 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                  {title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-4">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-700"
            >
              <div className="h-32 rounded-lg bg-stone-100 dark:bg-stone-800 mb-4" />
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                May {i * 10}, 2026
              </p>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1 font-['DM_Sans']">
                Sample Event {i}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                Event description placeholder.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PortalContent({ mode }: { mode: string }) {
  return (
    <div className="p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Members', value: '347', change: '+12 this month' },
          { label: 'Active Volunteers', value: '168', change: '48% of members' },
          { label: 'Fees Due', value: '23', change: 'Reminders sent' },
        ].map(({ label, value, change }) => (
          <div
            key={label}
            className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-700"
          >
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              {label}
            </p>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1 font-['DM_Sans']">
              {value}
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
        <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-800">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
            {mode === 'admin' ? 'Recent Activity' : mode === 'supervisor' ? 'Team Members' : 'My Details'}
          </h2>
        </div>
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800" />
              <div className="flex-1 min-w-0">
                <div className="h-3.5 w-40 bg-stone-100 dark:bg-stone-800 rounded" />
                <div className="h-2.5 w-24 bg-stone-100 dark:bg-stone-800 rounded mt-1.5" />
              </div>
              <div className="h-6 w-16 bg-stone-100 dark:bg-stone-800 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
