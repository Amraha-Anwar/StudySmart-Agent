"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/upload", label: "Summarize a PDF", short: "Summarize" },
  { href: "/quiz", label: "Make a quiz", short: "Quiz" },
]

// Three lines of text with the middle one highlighted
function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="drop-shadow-[0_0_8px_rgba(116,214,76,0.7)]">
      <rect x="1" y="1" width="20" height="20" rx="3" className="fill-sheet stroke-sheet" strokeWidth="1.5" />
      <rect x="4.5" y="4.25" width="13" height="4.5" rx="1" className="fill-pink" />
      <rect x="4.5" y="9" width="13" height="4.5" rx="1" className="fill-highlight" />
      <path d="M5.5 6.5h11M5.5 11.25h9M5.5 16h7" className="stroke-ink" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-paper/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 rounded-sm">
          <Logo />
          <span className="text-[1.0625rem] font-bold tracking-[-0.015em]">StudySmart</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {menuItems.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-md px-2.5 py-2 text-sm font-medium transition-colors sm:px-3 sm:text-[0.9375rem]",
                    active ? "text-on-page" : "text-on-page-soft hover:text-on-page"
                  )}
                >
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                  {active && (
                    <span className="absolute inset-x-2.5 bottom-0.5 h-[3px] rounded-full bg-parrot shadow-[0_0_10px_rgba(116,214,76,0.9)] sm:inset-x-3" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
