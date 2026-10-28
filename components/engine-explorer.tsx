'use client'

import { CheckCircle2, Info, MapPin, Settings2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { engineComponents, systemMeta, type EngineSystem } from '@/lib/mustang-data'
import { cn } from '@/lib/utils'
import { EngineDiagram } from './engine-diagram'
import { SectionHeader } from './section-header'

const systems = Object.keys(systemMeta) as EngineSystem[]

const DISCLAIMER =
  'Simplified front-view schematic for orientation only — not a factory diagram. Component shapes and positions are approximate. Use the Ford workshop manual for service work.'

export function EngineExplorer() {
  const [selectedId, setSelectedId] = useState<string>('camshafts')
  const [activeSystem, setActiveSystem] = useState<EngineSystem | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLElement>(null)

  const selected = engineComponents.find((c) => c.id === selectedId) ?? engineComponents[0]
  const visibleComponents = activeSystem ? engineComponents.filter((c) => c.system === activeSystem) : engineComponents

  function selectSystem(system: EngineSystem | null) {
    setActiveSystem(system)
    if (system && selected.system !== system) {
      const first = engineComponents.find((c) => c.system === system)
      if (first) setSelectedId(first.id)
    }
  }

  // On mobile the diagram is pinned below the header, so bring the details panel
  // up just beneath it instead of leaving it far down the page.
  function selectFromList(id: string) {
    setSelectedId(id)
    if (!window.matchMedia('(max-width: 1023px)').matches) return
    const diagram = diagramRef.current
    const details = detailsRef.current
    if (!diagram || !details) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = diagram.getBoundingClientRect().bottom + 12
    window.scrollTo({
      top: details.getBoundingClientRect().top + window.scrollY - offset,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section aria-labelledby="engine-title" id="engine" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          id="engine-title"
          index="04"
          eyebrow="Interactive"
          title="4.6L SOHC 2V V8 Explorer"
          description="Select a component on the diagram or in the list to see where it is, what it does, and which facts about it are verified. Filter by system to highlight every related part."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div
            ref={diagramRef}
            className="sticky top-16 z-10 order-1 -mx-1 min-w-0 rounded-lg border border-border bg-background p-2 shadow-lg shadow-background/60 sm:mx-0 sm:p-3 md:p-5 lg:static lg:z-auto lg:order-none lg:col-start-1 lg:row-start-2 lg:shadow-none"
          >
            <EngineDiagram selectedId={selectedId} activeSystem={activeSystem} onSelect={setSelectedId} />
            <p className="mt-1.5 flex items-center justify-between gap-2 px-1 text-xs lg:hidden" aria-hidden="true">
              <span className="flex min-w-0 items-center gap-2 font-medium">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: systemMeta[selected.system].color }} />
                <span className="truncate">{selected.name}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Selected</span>
            </p>
            <p className="mt-3 hidden items-start gap-2 text-xs leading-relaxed text-muted-foreground lg:flex">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {DISCLAIMER}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter by system"
            className="order-2 flex flex-wrap gap-2 lg:order-none lg:col-span-2 lg:row-start-1"
          >
            <button
              type="button"
              aria-pressed={activeSystem === null}
              onClick={() => selectSystem(null)}
              className={cn(
                'min-h-9 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                activeSystem === null ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary',
              )}
            >
              All systems
            </button>
            {systems.map((system) => {
              const isActive = activeSystem === system
              return (
                <button
                  key={system}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectSystem(isActive ? null : system)}
                  className={cn(
                    'flex min-h-9 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                    isActive ? 'border-foreground bg-secondary' : 'border-border hover:bg-secondary',
                  )}
                >
                  <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: systemMeta[system].color }} />
                  {systemMeta[system].label}
                </button>
              )
            })}
          </div>

          <div className="order-3 lg:order-none lg:col-span-2 lg:row-start-3">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Components {activeSystem ? `· ${systemMeta[activeSystem].label}` : `· ${engineComponents.length}`}
            </h3>
            <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {visibleComponents.map((component) => {
                const isActive = component.id === selectedId
                return (
                  <li key={component.id} className="min-w-0">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => selectFromList(component.id)}
                      className={cn(
                        'flex h-full min-h-11 w-full items-center gap-2.5 rounded-md border px-3 py-2.5 text-left text-sm leading-snug transition-colors sm:gap-3',
                        isActive ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-foreground/30',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: systemMeta[component.system].color }}
                      />
                      <span className="min-w-0 break-words">{component.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <article
            ref={detailsRef}
            aria-live="polite"
            className="order-4 flex min-w-0 flex-col rounded-lg border border-border bg-card lg:order-none lg:col-start-2 lg:row-start-2"
          >
            <div className="border-b border-border p-5">
              <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: systemMeta[selected.system].color }} />
                {systemMeta[selected.system].label}
              </p>
              <h3 className="text-2xl font-bold tracking-tight">{selected.name}</h3>
            </div>
            <div className="flex flex-col gap-5 p-5">
              <div>
                <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="size-4 text-primary" aria-hidden="true" /> Location
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{selected.location}</p>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
                  <Settings2 className="size-4 text-primary" aria-hidden="true" /> What it does
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{selected.function}</p>
              </div>
              <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-primary">Verified for the 2003 GT 4.6L 2V</p>
                <ul className="space-y-1.5">
                  {selected.verified.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
              {selected.note ? (
                <p className="rounded-md border border-warning/30 bg-warning/5 p-3 text-sm leading-relaxed text-warning">{selected.note}</p>
              ) : null}
            </div>
          </article>

          <p className="order-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground lg:hidden">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  )
}
