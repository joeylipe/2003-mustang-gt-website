import { specGroups } from '@/lib/mustang-data'
import { ConfidenceBadge, ConfidenceLegend, SectionHeader } from './section-header'

export function SpecsSection() {
  return (
    <section aria-labelledby="specs-title" id="specs" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeader
        id="specs-title"
        index="01"
        eyebrow="Factory Data"
        title="Factory Specifications"
        description="Specifications for the standard 2003 Mustang GT. The Mach 1 (4.6L DOHC 4V) and SVT Cobra (supercharged 4.6L DOHC 4V) used different engines and are not covered here."
      />
      <div className="mb-8">
        <ConfidenceLegend />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {specGroups.map((group) => (
          <div key={group.title} className="overflow-hidden rounded-lg border border-border bg-card">
            <h3 className="border-b border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </h3>
            <dl className="divide-y divide-border">
              {group.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="flex items-start justify-between gap-3">
                    <span>
                      <span className="font-semibold">{spec.value}</span>
                      {spec.detail ? <span className="mt-0.5 block text-xs text-muted-foreground">{spec.detail}</span> : null}
                    </span>
                    <ConfidenceBadge confidence={spec.confidence} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}
