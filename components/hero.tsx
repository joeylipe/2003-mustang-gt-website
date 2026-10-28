import Image from 'next/image'

const stats = [
  { value: '4.6L', label: 'SOHC 2V V8' },
  { value: '260', label: 'Horsepower' },
  { value: '302', label: 'lb-ft Torque' },
  { value: '2', label: 'Body Styles' },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      <div className="relative">
        <Image
          src="/images/hero-torch-red.png"
          alt="Representative illustration of a Torch Red 2003 Ford Mustang GT coupe in a dark garage"
          width={1376}
          height={768}
          priority
          className="h-[62vh] min-h-[420px] w-full object-cover object-center md:h-[78vh]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <p className="absolute right-3 top-3 rounded-sm bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground opacity-75">
          AI-generated representative image
        </p>
      </div>

      <div className="relative mx-auto -mt-48 max-w-7xl px-4 pb-16 md:-mt-64 md:px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">Enthusiast Reference</p>
        <h1 id="hero-title" className="text-balance text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          2003 Ford
          <br />
          Mustang GT
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A reference for 2003 Mustang GT enthusiasts covering factory specifications, paint colors, equipment, and
          maintenance. It also includes tools for exploring the 4.6-liter SOHC 2-valve V8 and its systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#engine"
            className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore the Engine
          </a>
          <a
            href="#specs"
            className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            View Specifications
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-5 py-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-bold tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
