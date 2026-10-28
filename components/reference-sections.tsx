import { ExternalLink } from 'lucide-react'
import { maintenanceRows, sources } from '@/lib/mustang-data'
import { ConfidenceBadge, SectionHeader } from './section-header'

export function MaintenanceSection() {
  return (
    <section aria-labelledby="maintenance-title" id="maintenance" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          id="maintenance-title"
          index="06"
          eyebrow="Owner Reference"
          title="Maintenance Basics"
          description="Basic reference values only. Anything not confirmed for this guide — torque values, part numbers, and intervals — is deliberately left out rather than guessed. Always defer to the 2003 Mustang owner’s guide and Ford service information."
        />
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Maintenance reference values for the 2003 Mustang GT</caption>
            <thead className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Item</th>
                <th scope="col" className="px-5 py-3 font-medium">Value</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
                <th scope="col" className="px-5 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {maintenanceRows.map((row) => (
                <tr key={row.item} className="align-top">
                  <th scope="row" className="px-5 py-4 font-medium">{row.item}</th>
                  <td className="whitespace-nowrap px-5 py-4 font-mono">{row.value}</td>
                  <td className="px-5 py-4">
                    <ConfidenceBadge confidence={row.confidence} />
                  </td>
                  <td className="px-5 py-4 leading-relaxed text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function SourcesSection() {
  return (
    <section aria-labelledby="sources-title" id="sources">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          id="sources-title"
          index="07"
          eyebrow="References"
          title="Sources & Verification"
          description="This guide compiles widely published references. Values marked “check source” should be confirmed against these documents — especially Ford’s own owner’s guide, brochure, and workshop manual — before being relied on."
        />
        <ol className="grid gap-3 md:grid-cols-2">
          {sources.map((source, i) => (
            <li key={source.title} className="flex gap-4 rounded-lg border border-border bg-card p-5">
              <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:text-primary hover:underline"
                  >
                    {source.title}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <p className="font-semibold">{source.title}</p>
                )}
                <p className="text-xs text-muted-foreground">{source.publisher}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{source.usedFor}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
