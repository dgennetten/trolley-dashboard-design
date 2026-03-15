import { TramFront, X } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface SidebarProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
  mobileMenuOpen: boolean
  onCloseMobileMenu: () => void
}

export function Sidebar({
  items,
  onNavigate,
  mobileMenuOpen,
  onCloseMobileMenu,
}: SidebarProps) {
  const navContent = (
    <>
      {/* Logo */}
      <div className="h-14 shrink-0 flex items-center gap-2.5 px-4 border-b border-stone-200 dark:border-stone-800">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center">
          <TramFront className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
        </div>
        <span className="text-base font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] lg:block hidden md:hidden">
          Fort Collins Trolley
        </span>
        {/* Mobile close button */}
        <button
          onClick={onCloseMobileMenu}
          className="ml-auto md:hidden p-1 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => {
                  onNavigate?.(item.href)
                  onCloseMobileMenu()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                  item.isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title={item.label}
              >
                {item.icon && (
                  <span
                    className={`shrink-0 ${
                      item.isActive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300'
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="lg:block hidden md:hidden truncate">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className="hidden md:flex md:w-16 lg:w-64 shrink-0 flex-col bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 transition-[width] duration-200">
        {navContent}
      </aside>

      {/* Mobile slide-out drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>
    </>
  )
}
