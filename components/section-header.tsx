import type { Confidence } from '@/lib/mustang-data'
import { cn } from '@/lib/utils'

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  id,
}: {
  index: string
  eyebrow: string
  title: string
  description?: string
  id: string
}) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span>{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-primary/60" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="text-balance text-3xl font-bold uppercase tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{description}</p> : null}
    </header>
  )
}

const badgeStyles: Record<Confidence, { label: string; className: string }> = {
  verified: { label: 'Verified', className: 'border-primary/40 bg-primary/10 text-primary' },
  check: { label: 'Check source', className: 'border-warning/40 bg-warning/10 text-warning' },
  omitted: { label: 'Not listed', className: 'border-border bg-muted text-muted-foreground' },
}

export function ConfidenceBadge({ confidence, className }: { confidence: Confidence; className?: string }) {
  const style = badgeStyles[confidence]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider',
        style.className,
        className,
      )}
    >
      {style.label}
    </span>
  )
}

export function ConfidenceLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-2">
        <ConfidenceBadge confidence="verified" /> Widely documented factory data
      </span>
      <span className="flex items-center gap-2">
        <ConfidenceBadge confidence="check" /> Commonly cited — confirm with Ford documents
      </span>
      <span className="flex items-center gap-2">
        <ConfidenceBadge confidence="omitted" /> Intentionally left out
      </span>
    </div>
  )
}
