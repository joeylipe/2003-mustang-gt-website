'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeader } from './section-header'

const strokes = [
  {
    name: 'Intake',
    pistonDown: true,
    intakeOpen: true,
    exhaustOpen: false,
    spark: false,
    text: 'The piston moves down while the intake valve is open, drawing in air metered by the throttle body. A port injector sprays fuel into the incoming air.',
  },
  {
    name: 'Compression',
    pistonDown: false,
    intakeOpen: false,
    exhaustOpen: false,
    spark: false,
    text: 'Both valves close and the piston rises, squeezing the air–fuel mixture. On the 2003 GT 4.6L the compression ratio is 9.4:1.',
  },
  {
    name: 'Power',
    pistonDown: true,
    intakeOpen: false,
    exhaustOpen: false,
    spark: true,
    text: 'Near the top of the stroke the coil-on-plug fires the spark plug. The burning mixture expands and drives the piston down, turning the crankshaft.',
  },
  {
    name: 'Exhaust',
    pistonDown: false,
    intakeOpen: false,
    exhaustOpen: true,
    spark: false,
    text: 'The exhaust valve opens and the rising piston pushes burned gases out into the exhaust manifold. Then the cycle repeats.',
  },
]

const systemCards = [
  {
    title: 'Valvetrain — SOHC 2-valve',
    body: 'Each cylinder head carries one chain-driven overhead camshaft. Its lobes push roller finger followers that open one intake and one exhaust valve per cylinder. The cams turn at half crankshaft speed because each valve opens once every two revolutions.',
  },
  {
    title: 'Ignition & engine management',
    body: 'A powertrain control module (PCM) reads sensors such as crankshaft and camshaft position, airflow, and oxygen sensors, then fires each of the eight coil-on-plug coils individually. There is no distributor or plug wires. Firing order is 1-3-7-2-6-5-4-8.',
  },
  {
    title: 'Fuel delivery',
    body: 'Sequential multiport injection (Ford SEFI) times each injector to its own cylinder’s intake stroke. Fuel rails along each bank supply the eight injectors, which spray into the intake ports just upstream of the intake valves.',
  },
  {
    title: 'Cooling',
    body: 'A belt-driven water pump circulates coolant through passages in the block and heads. The thermostat holds coolant in the engine until it warms up, then opens to send it through the radiator, where airflow removes the heat.',
  },
  {
    title: 'Lubrication',
    body: 'A crank-driven oil pump pulls oil from the wet-sump pan, pushes it through the spin-on filter, and feeds it under pressure to the crankshaft bearings, rods, camshafts, and valvetrain before it drains back to the pan.',
  },
  {
    title: 'Drivetrain',
    body: 'Power flows from the crankshaft through either the TR-3650 5-speed manual or 4R70W 4-speed automatic, down a driveshaft, and into the 8.8-inch solid rear axle. Its Traction-Lok limited-slip differential helps split torque between the rear wheels.',
  },
]

function StrokeDiagram({ stroke }: { stroke: (typeof strokes)[number] }) {
  const pistonY = stroke.pistonDown ? 150 : 82
  return (
    <svg viewBox="0 0 200 240" className="mx-auto h-64 w-auto" role="img" aria-label={`${stroke.name} stroke diagram`}>
      <rect x={50} y={48} width={100} height={170} rx={4} fill="#2b2e34" stroke="#7d838e" strokeWidth={2} />
      <rect x={40} y={28} width={120} height={24} rx={4} fill="#3a3e46" stroke="#7d838e" strokeWidth={2} />
      <g style={{ transition: 'transform 400ms ease' }} transform={`translate(0 ${stroke.intakeOpen ? 10 : 0})`}>
        <rect x={67} y={6} width={6} height={44} fill="#5ab0ff" />
        <rect x={60} y={48} width={20} height={5} fill="#5ab0ff" />
      </g>
      <g style={{ transition: 'transform 400ms ease' }} transform={`translate(0 ${stroke.exhaustOpen ? 10 : 0})`}>
        <rect x={127} y={6} width={6} height={44} fill="#f08a3c" />
        <rect x={120} y={48} width={20} height={5} fill="#f08a3c" />
      </g>
      <rect x={97} y={14} width={6} height={40} fill="#f5b83d" />
      {stroke.spark ? <circle cx={100} cy={64} r={10} fill="#f5b83d" fillOpacity={0.7} /> : null}
      {stroke.spark ? <rect x={52} y={56} width={96} height={pistonY - 56} fill="#ef6f5e" fillOpacity={0.25} /> : null}
      <g style={{ transition: 'transform 400ms ease' }} transform={`translate(0 ${pistonY - 82})`}>
        <rect x={54} y={82} width={92} height={40} rx={3} fill="#c7ccd4" />
        <rect x={94} y={100} width={12} height={90} fill="#8d939c" />
      </g>
      <text x={60} y={236} fontSize={10} fill="#9aa1ab" fontFamily="var(--font-geist-mono)">
        INTAKE
      </text>
      <text x={140} y={236} fontSize={10} fill="#9aa1ab" textAnchor="end" fontFamily="var(--font-geist-mono)">
        EXHAUST
      </text>
    </svg>
  )
}

export function SystemsSection() {
  const [active, setActive] = useState(0)
  const stroke = strokes[active]

  return (
    <section aria-labelledby="systems-title" id="systems" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeader
        id="systems-title"
        index="05"
        eyebrow="How It Works"
        title="Engine Systems Explained"
        description="Plain-language explanations of how the 4.6L V8 and drivetrain work together. These are general explanations of the design, not service instructions."
      />

      <div className="mb-10 grid gap-6 rounded-lg border border-border bg-card p-5 md:grid-cols-[auto_1fr] md:p-8">
        <StrokeDiagram stroke={stroke} />
        <div className="flex flex-col justify-center">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">The four-stroke cycle</h3>
          <div role="tablist" aria-label="Four-stroke cycle" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {strokes.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="stroke-panel"
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                  i === active ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary',
                )}
              >
                <span className="font-mono text-xs opacity-70">{i + 1}.</span> {s.name}
              </button>
            ))}
          </div>
          <div id="stroke-panel" role="tabpanel" className="mt-5">
            <p className="text-2xl font-bold">{stroke.name} stroke</p>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">{stroke.text}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              Four strokes take two crankshaft revolutions. In a V8, a cylinder fires every 90° of crank rotation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {systemCards.map((card) => (
          <article key={card.title} className="rounded-lg border border-border bg-card p-5">
            <h3 className="font-bold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
