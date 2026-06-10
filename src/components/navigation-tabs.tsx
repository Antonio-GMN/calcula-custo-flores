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
      <ion-icon name="rose-outline" style={{ fontSize: 14 }}></ion-icon>
    ),
  },
  {
    href: '/buques',
    label: 'Buquês',
    icon: (
      <ion-icon name="bag-check-outline" style={{ fontSize: 14 }}></ion-icon>
    ),
  },
]

export function NavigationTabs() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <div className="rounded-[1.25rem] bg-white/50 p-1 shadow-lg shadow-rose-200/40 backdrop-blur-2xl">
      <div className="grid grid-cols-3 gap-1 rounded-[1rem] bg-rose-100/50 p-0.5">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center justify-center gap-1.5 rounded-[0.85rem] px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-300/30'
                  : 'text-rose-700/80 hover:bg-white/70 hover:text-rose-800'
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
