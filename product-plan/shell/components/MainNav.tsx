import { Menu, X, TramFront } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
  onLogin?: () => void
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

export function MainNav({
  items,
  onNavigate,
  onLogin,
  mobileMenuOpen,
  onToggleMobileMenu,
}: MainNavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate?.('/')}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center">
              <TramFront className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] hidden sm:block">
              Fort Collins Trolley
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate?.(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side: login + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white transition-colors shadow-sm"
            >
              Member Login
            </button>

            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-md text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <div className="px-4 py-3 space-y-1">
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate?.(item.href)
                  onToggleMobileMenu()
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
