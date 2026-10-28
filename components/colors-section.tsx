'use client'

import { useState } from 'react'
import { notGtColors, paintColors } from '@/lib/mustang-data'
import { cn } from '@/lib/utils'
import { SectionHeader } from './section-header'

export function ColorsSection() {
  const [selectedName, setSelectedName] = useState(paintColors[0].name)
  const selected = paintColors.find((c) => c.name === selectedName) ?? paintColors[0]

  const panelBackground =
    selected.finish === 'Metallic'
      ? `linear-gradient(135deg, color-mix(in oklab, ${selected.hex} 70%, white) 0%, ${selected.hex} 38%, color-mix(in oklab, ${selected.hex} 65%, black) 100%)`
      : `linear-gradient(135deg, color-mix(in oklab, ${selected.hex} 88%, white) 0%, ${selected.hex} 45%, color-mix(in oklab, ${selected.hex} 80%, black) 100%)`

  return (
    <section aria-labelledby="colors-title" id="colors" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          id="colors-title"
          index="02"
          eyebrow="Paint"
          title="Exterior Colors"
          description="Factory exterior colors listed for the 2003 Mustang GT. Select a swatch to view it. On-screen swatches are approximations — paint codes should be confirmed on the vehicle’s door-jamb certification label."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative aspect-[16/9]">
              <div
                className="absolute inset-0 transition-[background] duration-300"
                style={{ background: panelBackground }}
                role="img"
                aria-label={`${selected.name} paint swatch`}
              >
                <p className="absolute bottom-3 left-3 rounded-sm bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Visual approximation — not an exact match for the factory finish
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-5" aria-live="polite">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="size-12 rounded-md border border-white/15"
                  style={{ background: panelBackground }}
                />
                <div>
                  <p className="text-xl font-bold">{selected.name}</p>
                  <p className="text-sm text-muted-foreground">{selected.finish} finish</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Ford paint code</p>
                <p className="font-mono text-2xl font-bold">{selected.code ?? '—'}</p>
              </div>
              {selected.note ? <p className="w-full text-sm text-warning">{selected.note}</p> : null}
            </div>
          </div>

          <div>
            <fieldset>
              <legend className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {paintColors.length} GT colors
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {paintColors.map((color) => {
                  const isActive = color.name === selected.name
                  return (
                    <button
                      key={color.name}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedName(color.name)}
                      className={cn(
                        'flex items-center gap-3 rounded-md border bg-card p-2.5 text-left transition-colors',
                        isActive ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-foreground/30',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-8 shrink-0 rounded-sm border border-white/15"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{color.name}</span>
                        <span className="block font-mono text-[11px] text-muted-foreground">{color.code ?? 'Code n/a'}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-6 rounded-md border border-border p-4">
              <p className="mb-2 text-sm font-semibold">Not GT colors in 2003</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {notGtColors.map((c) => (
                  <li key={c.name}>
                    <span className="text-foreground">{c.name}</span> — {c.reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
