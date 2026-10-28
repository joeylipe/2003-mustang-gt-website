'use client'

import type { CSSProperties, ReactNode } from 'react'
import { engineComponents, systemMeta, type EngineSystem } from '@/lib/mustang-data'

type PartState = 'selected' | 'system' | 'idle' | 'dim'

type DiagramProps = {
  selectedId: string | null
  activeSystem: EngineSystem | null
  onSelect: (id: string) => void
}

const systemById = Object.fromEntries(engineComponents.map((c) => [c.id, c.system])) as Record<string, EngineSystem>

function getState(id: string, selectedId: string | null, activeSystem: EngineSystem | null): PartState {
  if (id === selectedId) return 'selected'
  if (activeSystem) return systemById[id] === activeSystem ? 'system' : 'dim'
  return 'idle'
}

function partStyle(id: string, state: PartState): CSSProperties {
  const color = systemMeta[systemById[id]].color
  const base = { transition: 'fill 160ms, stroke 160ms, opacity 160ms' }
  switch (state) {
    case 'selected':
      return { ...base, ['--pf' as string]: color, ['--ps' as string]: '#ffffff', filter: `drop-shadow(0 0 6px ${color})` }
    case 'system':
      return { ...base, ['--pf' as string]: `color-mix(in oklab, ${color} 55%, #2a2d33)`, ['--ps' as string]: color }
    case 'dim':
      return { ...base, ['--pf' as string]: '#30333a', ['--ps' as string]: '#555a63', opacity: 0.35 }
    default:
      return { ...base, ['--pf' as string]: '#3a3e46', ['--ps' as string]: '#7d838e' }
  }
}

function Part({ id, children, props }: { id: string; children: ReactNode; props: DiagramProps }) {
  const state = getState(id, props.selectedId, props.activeSystem)
  return (
    <g
      data-part={id}
      style={partStyle(id, state)}
      className="cursor-pointer hover:brightness-125"
      onClick={() => props.onSelect(id)}
    >
      {children}
    </g>
  )
}

const shape = { fill: 'var(--pf)', stroke: 'var(--ps)', strokeWidth: 2 }

/** One cylinder bank drawn pointing straight up from the crank center (400,440), then rotated ±45° into the V. */
function Bank({ rotate, props }: { rotate: number; props: DiagramProps }) {
  return (
    <g transform={`rotate(${rotate} 400 440)`}>
      <Part id="engine-block" props={props}>
        <rect x={345} y={224} width={110} height={178} rx={6} {...shape} />
        <rect x={362} y={228} width={76} height={150} fill="#000" fillOpacity={0.28} stroke="none" />
      </Part>

      <Part id="exhaust-manifolds" props={props}>
        <rect x={298} y={194} width={44} height={26} rx={5} {...shape} />
        <rect x={298} y={216} width={20} height={46} rx={4} {...shape} />
      </Part>

      <Part id="connecting-rods" props={props}>
        <path d="M391 272 L409 272 L411 414 L389 414 Z" {...shape} />
        <circle cx={400} cy={414} r={9} {...shape} />
      </Part>

      <Part id="pistons" props={props}>
        <rect x={366} y={240} width={68} height={46} rx={4} {...shape} />
        <line x1={368} y1={250} x2={432} y2={250} stroke="var(--ps)" strokeWidth={1.5} />
        <line x1={368} y1={257} x2={432} y2={257} stroke="var(--ps)" strokeWidth={1.5} />
        <circle cx={400} cy={272} r={6} {...shape} />
      </Part>

      <Part id="cylinder-heads" props={props}>
        <rect x={338} y={160} width={124} height={66} rx={6} {...shape} />
        <rect x={344} y={140} width={112} height={24} rx={9} {...shape} />
      </Part>

      <Part id="valves" props={props}>
        <rect x={373} y={186} width={6} height={36} {...shape} strokeWidth={1.5} />
        <rect x={366} y={220} width={20} height={6} rx={1} {...shape} strokeWidth={1.5} />
        <rect x={421} y={186} width={6} height={36} {...shape} strokeWidth={1.5} />
        <rect x={414} y={220} width={20} height={6} rx={1} {...shape} strokeWidth={1.5} />
      </Part>

      <Part id="camshafts" props={props}>
        <path d="M376 162 a12 12 0 1 1 -0.1 0 Z M376 162 L382 156 L390 166 Z" {...shape} />
        <circle cx={376} cy={174} r={4} fill="var(--ps)" />
      </Part>

      <Part id="spark-plugs" props={props}>
        <rect x={396} y={150} width={8} height={70} rx={2} {...shape} strokeWidth={1.5} />
        <rect x={398} y={220} width={4} height={7} fill="var(--ps)" />
      </Part>

      <Part id="ignition-coils" props={props}>
        <rect x={389} y={100} width={22} height={52} rx={3} {...shape} />
        <rect x={383} y={92} width={34} height={12} rx={2} {...shape} />
      </Part>

      <Part id="fuel-injectors" props={props}>
        <rect x={452} y={206} width={12} height={30} rx={3} {...shape} />
        <rect x={449} y={200} width={18} height={8} rx={2} {...shape} />
      </Part>

      <Part id="timing-chains" props={props}>
        <line x1={384} y1={180} x2={384} y2={430} stroke="var(--ps)" strokeWidth={3} strokeDasharray="4 4" />
        <line x1={416} y1={232} x2={416} y2={430} stroke="var(--ps)" strokeWidth={3} strokeDasharray="4 4" />
        <rect x={378} y={300} width={44} height={10} fill="transparent" stroke="none" />
      </Part>
    </g>
  )
}

export function EngineDiagram(props: DiagramProps) {
  return (
    <svg
      viewBox="120 150 560 420"
      className="h-auto w-full"
      role="img"
      aria-label="Simplified front-view schematic of the 4.6L SOHC 2-valve V8. Select a part, or use the component list, to see details."
    >
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 L0 0 0 20" fill="none" stroke="#ffffff" strokeOpacity={0.04} strokeWidth={1} />
        </pattern>
      </defs>
      <rect x={120} y={150} width={560} height={420} fill="url(#grid)" />

      <Part id="engine-block" props={props}>
        <path d="M312 388 L488 388 L500 476 L300 476 Z" {...shape} />
      </Part>

      <Bank rotate={-45} props={props} />
      <Bank rotate={45} props={props} />

      <Part id="intake-manifold" props={props}>
        <path d="M292 252 L508 252 L486 176 L314 176 Z" {...shape} />
        <line x1={332} y1={190} x2={316} y2={248} stroke="var(--ps)" strokeWidth={1.5} />
        <line x1={468} y1={190} x2={484} y2={248} stroke="var(--ps)" strokeWidth={1.5} />
      </Part>

      <Part id="throttle-body" props={props}>
        <circle cx={400} cy={210} r={25} {...shape} />
        <circle cx={400} cy={210} r={16} fill="#000" fillOpacity={0.35} stroke="var(--ps)" strokeWidth={1.5} />
        <line x1={388} y1={222} x2={412} y2={198} stroke="var(--ps)" strokeWidth={2} />
      </Part>

      <Part id="thermostat" props={props}>
        <rect x={440} y={258} width={26} height={18} rx={4} {...shape} />
      </Part>

      <Part id="water-pump" props={props}>
        <circle cx={438} cy={326} r={25} {...shape} />
        <circle cx={438} cy={326} r={8} fill="var(--ps)" />
      </Part>

      <Part id="oil-pump" props={props}>
        <circle cx={400} cy={440} r={44} fill="none" stroke="var(--ps)" strokeWidth={6} strokeDasharray="6 5" pointerEvents="stroke" />
      </Part>

      <Part id="crankshaft" props={props}>
        <circle cx={400} cy={440} r={30} {...shape} />
        <circle cx={400} cy={440} r={9} fill="var(--ps)" />
      </Part>

      <Part id="oil-pan" props={props}>
        <path d="M305 480 L495 480 L485 540 Q485 552 473 552 L327 552 Q315 552 315 540 Z" {...shape} />
      </Part>

      <Part id="oil-filter" props={props}>
        <line x1={284} y1={470} x2={302} y2={462} stroke="var(--ps)" strokeWidth={4} />
        <rect x={246} y={452} width={40} height={58} rx={7} {...shape} />
        <line x1={250} y1={466} x2={282} y2={466} stroke="var(--ps)" strokeWidth={1.5} />
      </Part>

      <g fontFamily="var(--font-geist-mono)" fontSize={11} fill="#9aa1ab" letterSpacing={1}>
        <text x={132} y={556}>PASSENGER (RH) · CYL 1–4</text>
        <text x={668} y={556} textAnchor="end">
          DRIVER (LH) · CYL 5–8
        </text>
        <text x={400} y={168} textAnchor="middle">
          FRONT VIEW
        </text>
      </g>
    </svg>
  )
}
