'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '#specs', label: 'Specs' },
  { href: '#colors', label: 'Colors' },
  { href: '#options', label: 'Options' },
  { href: '#engine', label: 'Engine Explorer' },
  { href: '#systems', label: 'Systems' },
  { href: '#maintenance', label: 'Maintenance' },
  { href: '#sources', label: 'Sources' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-baseline gap-2 font-bold uppercase tracking-tight">
          <span className="font-mono text-sm text-primary">{"'03"}</span>
          <span>Mustang GT</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>

      {open ? (
        <ul id="mobile-menu" className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  )
}
