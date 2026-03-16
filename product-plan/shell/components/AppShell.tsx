import { useState } from 'react'
import { MainNav } from './MainNav'
import { Sidebar } from './Sidebar'
import { UserMenu } from './UserMenu'
import { Menu } from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
  isActive?: boolean
}

export interface AppShellUser {
  name: string
  avatarUrl?: string
  role?: 'member' | 'lead' | 'cms_admin' | 'membership_admin' | 'super_admin'
}

interface AppShellProps {
  children: React.ReactNode
  variant: 'public' | 'portal'
  navigationItems: NavigationItem[]
  user?: AppShellUser
  pageTitle?: string
  onNavigate?: (href: string) => void
  onLogin?: () => void
  onLogout?: () => void
}

export default function AppShell({
  children,
  variant,
  navigationItems,
  user,
  pageTitle,
  onNavigate,
  onLogin,
  onLogout,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (variant === 'public') {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-[Inter]">
        <MainNav
          items={navigationItems}
          onNavigate={onNavigate}
          onLogin={onLogin}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main>{children}</main>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-stone-50 dark:bg-stone-950 font-[Inter] overflow-hidden">
      <Sidebar
        items={navigationItems}
        onNavigate={onNavigate}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Portal header bar */}
        <header className="h-14 shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-md text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
            {pageTitle && (
              <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                {pageTitle}
              </h1>
            )}
          </div>

          {user && (
            <UserMenu user={user} onLogout={onLogout} onNavigate={onNavigate} />
          )}
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
