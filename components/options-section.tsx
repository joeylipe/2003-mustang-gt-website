import { optionGroups, type OptionItem } from '@/lib/mustang-data'
import { ConfidenceBadge, SectionHeader } from './section-header'

function OptionList({ title, items }: { title: string; items: OptionItem[] }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-sm font-medium">{item.name}</span>
              <span className="block text-xs leading-relaxed text-muted-foreground">{item.detail}</span>
            </span>
            <ConfidenceBadge confidence={item.confidence} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function OptionsSection() {
  return (
    <section aria-labelledby="options-title" id="options" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeader
        id="options-title"
        index="03"
        eyebrow="Equipment"
        title="Factory Options & Features"
        description="Standard and optional equipment for the 2003 GT. Availability depended on trim and packages, so not every combination of body, color, wheel, interior, and transmission was offered. Items marked “check source” should be confirmed against an original brochure or the car’s window sticker."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {optionGroups.map((group) => (
          <article key={group.title} className="flex flex-col gap-6 rounded-lg border border-border bg-card p-5">
            <h3 className="text-lg font-bold uppercase tracking-tight">{group.title}</h3>
            <OptionList title="Standard" items={group.standard} />
            <div className="h-px bg-border" />
            <OptionList title="Optional / Upgrade" items={group.optional} />
          </article>
        ))}
      </div>
    </section>
  )
}
