import { useState, useRef, useEffect } from 'react'
import { User, LogOut, ChevronDown } from 'lucide-react'
import type { AppShellUser } from './AppShell'

interface UserMenuProps {
  user: AppShellUser
  onLogout?: () => void
  onNavigate?: (href: string) => void
}

export function UserMenu({ user, onLogout, onNavigate }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {initials}
            </span>
          </div>
        )}
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300 hidden sm:block">
          {user.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform hidden sm:block ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-lg py-1.5 z-50">
          {/* User info header */}
          <div className="px-4 py-2.5 border-b border-stone-100 dark:border-stone-800">
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
              {user.name}
            </p>
            {user.role && (
              <p className="text-xs text-stone-500 dark:text-stone-400 capitalize mt-0.5">
                {user.role}
              </p>
            )}
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                onNavigate?.('/portal/profile')
                setOpen(false)
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <User className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
              My Profile
            </button>
          </div>

          <div className="border-t border-stone-100 dark:border-stone-800 py-1">
            <button
              onClick={() => {
                onLogout?.()
                setOpen(false)
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
