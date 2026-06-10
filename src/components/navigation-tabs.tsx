'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/materiais',
    label: 'Materiais',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 8L12 12L20 8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 12V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/flores',
    label: 'Flores',
    icon: (
      <ion-icon
        name="rose-outline"
        style={{ fontSize: 14 }}
        suppressHydrationWarning
      ></ion-icon>
    ),
  },
  {
    href: '/buques',
    label: 'Buquês',
    icon: (
      <ion-icon
        name="bag-check-outline"
        style={{ fontSize: 14 }}
        suppressHydrationWarning
      ></ion-icon>
    ),
  },
]

export function NavigationTabs() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <div className="rounded-[1.25rem] bg-rose-50/85 p-1 shadow-lg shadow-rose-300/45 backdrop-blur-2xl">
      <div className="grid grid-cols-3 gap-1 rounded-[1rem] bg-rose-100/65 p-0.5">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center justify-center gap-1.5 rounded-[0.85rem] px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-rose-400 text-white shadow-sm shadow-rose-300/40'
                  : 'text-rose-700/85 hover:bg-rose-50/75 hover:text-rose-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
