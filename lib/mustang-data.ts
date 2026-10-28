export type Confidence = 'verified' | 'check' | 'omitted'

export type Spec = {
  label: string
  value: string
  detail?: string
  confidence: Confidence
}

export const specGroups: { title: string; specs: Spec[] }[] = [
  {
    title: 'Engine',
    specs: [
      {
        label: 'Engine',
        value: '4.6L SOHC 2-valve V8',
        detail: 'Ford Modular family, "PI" (Performance Improved) 2-valve heads, 1999–2004 GT',
        confidence: 'verified',
      },
      { label: 'Configuration', value: '90° V8, 16 valves', detail: '2 valves per cylinder', confidence: 'verified' },
      { label: 'Displacement', value: '4.6 L (281 cu in)', confidence: 'verified' },
      { label: 'Bore × stroke', value: '90.2 × 90.0 mm', detail: '3.55 × 3.54 in', confidence: 'verified' },
      { label: 'Horsepower', value: '260 hp @ 5,250 rpm', detail: 'SAE net, as rated by Ford', confidence: 'verified' },
      { label: 'Torque', value: '302 lb-ft @ 4,000 rpm', detail: 'SAE net, as rated by Ford', confidence: 'verified' },
      { label: 'Compression ratio', value: '9.4 : 1', confidence: 'verified' },
      { label: 'Firing order', value: '1-3-7-2-6-5-4-8', confidence: 'verified' },
      { label: 'Fuel system', value: 'Sequential multiport fuel injection', detail: 'Ford SEFI', confidence: 'verified' },
      { label: 'Ignition', value: 'Coil-on-plug, distributorless', confidence: 'verified' },
    ],
  },
  {
    title: 'Drivetrain & Body',
    specs: [
      { label: 'Layout', value: 'Front engine, rear-wheel drive', confidence: 'verified' },
      {
        label: 'Manual transmission',
        value: 'Tremec TR-3650 5-speed',
        detail: 'Used on 2001–2004 GT (replaced the T-45)',
        confidence: 'verified',
      },
      { label: 'Automatic transmission', value: 'Ford 4R70W 4-speed', detail: 'Electronically controlled, overdrive', confidence: 'verified' },
      {
        label: 'Rear axle',
        value: '8.8-in solid axle, limited-slip',
        detail: 'Traction-Lok limited-slip differential',
        confidence: 'verified',
      },
      { label: 'Body styles', value: '2-door coupe, 2-door convertible', confidence: 'verified' },
      {
        label: 'Platform',
        value: 'SN95 "New Edge" (Fox-derived)',
        detail: 'Restyled for 1999, produced through 2004',
        confidence: 'verified',
      },
      {
        label: 'Final drive ratio',
        value: 'Not listed',
        detail: 'Ratios varied by transmission; confirm on the axle tag or window sticker',
        confidence: 'omitted',
      },
    ],
  },
]

export type PaintColor = {
  name: string
  code: string | null
  hex: string
  finish: 'Solid' | 'Metallic'
  note?: string
}

export const paintColors: PaintColor[] = [
  { name: 'Torch Red', code: 'D3', hex: '#c4161c', finish: 'Solid' },
  { name: 'Redfire Metallic', code: 'G2', hex: '#7a1b22', finish: 'Metallic' },
  { name: 'Zinc Yellow', code: 'B7', hex: '#f0c419', finish: 'Solid' },
  { name: 'Sonic Blue Metallic', code: 'SN', hex: '#2f68b0', finish: 'Metallic' },
  { name: 'True Blue Metallic', code: 'L2', hex: '#1c2d66', finish: 'Metallic' },
  {
    name: 'Tropic Green Metallic',
    code: null,
    hex: '#1e4a3b',
    finish: 'Metallic',
    note: 'Paint code not verified for this guide — check the door-jamb certification label.',
  },
  { name: 'Silver Metallic', code: 'YN', hex: '#b5b9bd', finish: 'Metallic' },
  { name: 'Dark Shadow Grey Metallic', code: 'CX', hex: '#474a50', finish: 'Metallic' },
  { name: 'Black', code: 'UA', hex: '#0d0d0f', finish: 'Solid' },
  { name: 'Oxford White', code: 'Z1', hex: '#f1f1ec', finish: 'Solid' },
]

export const notGtColors = [
  { name: 'Azure Blue', reason: 'Offered on the 2003 Mach 1, not the GT' },
  { name: 'Mineral Grey Metallic', reason: 'Associated with the 2003 SVT Cobra' },
  { name: 'Satin Silver Metallic', reason: 'Associated with the 2003 SVT Cobra' },
]

export type OptionItem = { name: string; detail: string; confidence: Confidence }

export const optionGroups: { title: string; standard: OptionItem[]; optional: OptionItem[] }[] = [
  {
    title: 'Body & Powertrain',
    standard: [
      { name: '4.6L SOHC 2V V8', detail: 'The only engine offered in the GT', confidence: 'verified' },
      { name: '5-speed manual (TR-3650)', detail: 'Standard GT transmission', confidence: 'verified' },
      { name: 'Traction-Lok limited-slip 8.8-in axle', detail: 'Standard on GT', confidence: 'verified' },
      { name: 'Coupe body', detail: 'Choice of coupe or convertible at order', confidence: 'verified' },
    ],
    optional: [
      { name: '4-speed automatic (4R70W)', detail: 'Optional in place of the manual', confidence: 'verified' },
      { name: 'Convertible body', detail: 'Power soft top; separate model rather than an add-on', confidence: 'verified' },
    ],
  },
  {
    title: 'Exterior & Wheels',
    standard: [
      { name: '17-inch aluminum wheels', detail: 'GT-specific alloy design', confidence: 'verified' },
      { name: 'Hood scoop & side scoops', detail: 'Non-functional styling scoops on New Edge GT', confidence: 'verified' },
      { name: 'GT fog lamps', detail: 'Integrated in front fascia', confidence: 'check' },
      { name: 'Rear decklid spoiler', detail: 'Commonly fitted on GT coupes', confidence: 'check' },
    ],
    optional: [
      {
        name: 'Alternate 17-inch wheel finishes',
        detail: 'Wheel design and finish varied by trim and package — confirm against the window sticker',
        confidence: 'check',
      },
    ],
  },
  {
    title: 'Interior & Trim Levels',
    standard: [
      { name: 'GT Deluxe trim', detail: 'Entry GT trim level', confidence: 'check' },
      { name: 'Cloth bucket seats', detail: 'GT Deluxe seating', confidence: 'check' },
    ],
    optional: [
      { name: 'GT Premium trim', detail: 'Upgraded trim level over GT Deluxe', confidence: 'check' },
      { name: 'Leather seating surfaces', detail: 'Typically associated with GT Premium', confidence: 'check' },
      { name: 'Mach 460 audio system', detail: 'Premium audio commonly associated with GT Premium', confidence: 'check' },
    ],
  },
]

export type EngineSystem = 'ignition' | 'intake' | 'fuel' | 'cooling' | 'lubrication' | 'internal' | 'exhaust'

export const systemMeta: Record<EngineSystem, { label: string; color: string }> = {
  ignition: { label: 'Ignition', color: '#f5b83d' },
  intake: { label: 'Air Intake', color: '#5ab0ff' },
  fuel: { label: 'Fuel Delivery', color: '#ef6f5e' },
  cooling: { label: 'Cooling', color: '#4fd1c5' },
  lubrication: { label: 'Lubrication', color: '#c49bff' },
  internal: { label: 'Internal Engine', color: '#c7ccd4' },
  exhaust: { label: 'Exhaust', color: '#f08a3c' },
}

export type EngineComponent = {
  id: string
  name: string
  system: EngineSystem
  location: string
  function: string
  verified: string[]
  note?: string
}

export const engineComponents: EngineComponent[] = [
  {
    id: 'ignition-coils',
    name: 'Ignition Coils (Coil-on-Plug)',
    system: 'ignition',
    location: 'On top of each cylinder head, one coil seated directly over each spark plug — four per bank.',
    function:
      'Each coil steps the 12-volt supply up to the high voltage needed to fire its spark plug. The engine computer (PCM) switches each coil individually to set ignition timing.',
    verified: [
      'Eight individual coils, one per cylinder',
      '1999–2004 GT uses coil-on-plug; 1996–1998 GT used coil packs with plug wires',
      'Firing order: 1-3-7-2-6-5-4-8',
    ],
  },
  {
    id: 'spark-plugs',
    name: 'Spark Plugs',
    system: 'ignition',
    location: 'Threaded into each cylinder head, reaching into the combustion chamber beneath the coils.',
    function: 'Creates the spark that ignites the compressed air–fuel mixture at the end of the compression stroke.',
    verified: ['Eight plugs, one per cylinder'],
    note: 'Plug part number, gap, and installation torque are not listed here — use the owner’s guide or Ford service information.',
  },
  {
    id: 'throttle-body',
    name: 'Throttle Body',
    system: 'intake',
    location: 'Bolted to the front of the intake manifold, facing the front of the car.',
    function: 'A throttle plate opens with the accelerator pedal to control how much air enters the engine — and therefore power output.',
    verified: ['Mounted at the front of the intake manifold on the 2V GT'],
    note: 'Throttle bore size is not listed here because it could not be verified for this guide.',
  },
  {
    id: 'intake-manifold',
    name: 'Intake Manifold',
    system: 'intake',
    location: 'Sits in the valley between the two cylinder banks, on top of the engine.',
    function:
      'Distributes incoming air from the throttle body through individual runners to each of the eight intake ports.',
    verified: ['Composite (plastic) construction on the 4.6L 2V', 'Also carries the engine’s front coolant crossover passage'],
  },
  {
    id: 'fuel-injectors',
    name: 'Fuel Injectors & Fuel Rails',
    system: 'fuel',
    location: 'At the base of the intake runners, aimed into each intake port. Fuel rails run along each bank to feed them.',
    function: 'Electronically controlled nozzles that spray a metered amount of fuel into each port, timed to that cylinder’s intake stroke.',
    verified: ['Eight injectors, one per cylinder', 'Sequential multiport injection (Ford SEFI)'],
    note: 'Injector flow rating and fuel pressure are not listed here.',
  },
  {
    id: 'water-pump',
    name: 'Water Pump',
    system: 'cooling',
    location: 'On the front of the engine, mounted to the front cover and driven by the accessory belt.',
    function: 'Circulates coolant through the block, cylinder heads, and radiator to carry heat away from the engine.',
    verified: ['Belt-driven, front-mounted'],
    note: 'Shown at an approximate position in this schematic.',
  },
  {
    id: 'thermostat',
    name: 'Thermostat',
    system: 'cooling',
    location: 'At the front of the engine where coolant leaves the engine for the radiator.',
    function: 'A temperature-sensitive valve that stays closed while the engine warms up, then opens to let coolant flow to the radiator.',
    verified: ['Regulates coolant flow to the radiator'],
    note: 'Exact housing position and opening temperature are not specified here — refer to the Ford workshop manual.',
  },
  {
    id: 'oil-pump',
    name: 'Oil Pump',
    system: 'lubrication',
    location: 'Behind the front cover, mounted on the nose of the crankshaft.',
    function: 'Draws oil from the pan through a pickup tube and pressurizes it to feed bearings, cams, and the valvetrain.',
    verified: ['Driven directly by the crankshaft (gerotor type) on the Modular V8'],
  },
  {
    id: 'oil-filter',
    name: 'Oil Filter',
    system: 'lubrication',
    location: 'Low on the front of the engine block, spun onto a filter adapter.',
    function: 'Removes contaminants from pressurized oil before it reaches the engine’s bearings.',
    verified: ['Full-flow, spin-on cartridge'],
    note: 'Position in this schematic is approximate. Filter part number is not listed here.',
  },
  {
    id: 'oil-pan',
    name: 'Oil Pan',
    system: 'lubrication',
    location: 'Bolted to the bottom of the engine block.',
    function: 'Holds the engine’s oil supply (wet sump) and collects oil draining back from the engine.',
    verified: ['Wet-sump lubrication system'],
  },
  {
    id: 'engine-block',
    name: 'Engine Block',
    system: 'internal',
    location: 'The core structure of the engine, housing both cylinder banks and the crankshaft.',
    function: 'Contains the cylinder bores and main bearing journals, and provides passages for coolant and oil.',
    verified: [
      'Cast iron, 90° V8 layout',
      'Bore 90.2 mm, stroke 90.0 mm',
      'Cross-bolted main bearing caps (Modular design)',
    ],
  },
  {
    id: 'cylinder-heads',
    name: 'Cylinder Heads',
    system: 'internal',
    location: 'Bolted to the top of each cylinder bank — one head per bank.',
    function: 'Seal the top of the cylinders, form the combustion chambers, and house the camshaft, valves, and ports.',
    verified: ['Aluminum, 2 valves per cylinder', '"PI" (Performance Improved) design introduced on the 1999 GT'],
  },
  {
    id: 'camshafts',
    name: 'Camshafts (SOHC)',
    system: 'internal',
    location: 'One camshaft runs along the top of each cylinder head, under the valve cover.',
    function: 'Lobes on the camshaft open the intake and exhaust valves at precisely timed points in the four-stroke cycle.',
    verified: [
      'Single overhead camshaft per bank (two total)',
      'Actuates valves through roller finger followers',
      'Chain-driven from the crankshaft',
    ],
  },
  {
    id: 'timing-chains',
    name: 'Timing Chains',
    system: 'internal',
    location: 'At the front of the engine behind the front cover, linking the crankshaft to each camshaft.',
    function: 'Keeps camshaft rotation synchronized with the crankshaft — cams turn at half crankshaft speed.',
    verified: ['One chain per bank, with tensioners and guides'],
  },
  {
    id: 'valves',
    name: 'Intake & Exhaust Valves',
    system: 'internal',
    location: 'In each cylinder head above the combustion chamber — one intake and one exhaust valve per cylinder.',
    function: 'Intake valves admit the air–fuel mixture; exhaust valves release burned gases. Springs close them after the cam lobe passes.',
    verified: ['16 valves total — 1 intake, 1 exhaust per cylinder'],
  },
  {
    id: 'pistons',
    name: 'Pistons',
    system: 'internal',
    location: 'Inside each of the eight cylinder bores.',
    function: 'Move up and down to draw in, compress, and expand the air–fuel charge; combustion pressure pushes them down to make power.',
    verified: ['Aluminum pistons', 'Compression ratio 9.4:1'],
  },
  {
    id: 'connecting-rods',
    name: 'Connecting Rods',
    system: 'internal',
    location: 'Between each piston and the crankshaft.',
    function: 'Convert the piston’s up-and-down motion into rotation at the crankshaft.',
    verified: ['Powdered-metal construction with fracture-split caps'],
  },
  {
    id: 'crankshaft',
    name: 'Crankshaft',
    system: 'internal',
    location: 'At the bottom of the block, supported by the main bearings above the oil pan.',
    function: 'Turns the reciprocating motion of all eight pistons into the rotating output that drives the transmission.',
    verified: ['Five main bearings', '90.0 mm stroke'],
  },
  {
    id: 'exhaust-manifolds',
    name: 'Exhaust Manifolds',
    system: 'exhaust',
    location: 'Bolted to the outer side of each cylinder head.',
    function: 'Collect exhaust gases from the four cylinders on each bank and route them to the exhaust system.',
    verified: ['One manifold per bank'],
    note: 'Manifold material and design are not specified here.',
  },
]

export type MaintenanceRow = { item: string; value: string; confidence: Confidence; note: string }

export const maintenanceRows: MaintenanceRow[] = [
  {
    item: 'Engine oil viscosity',
    value: 'SAE 5W-20',
    confidence: 'check',
    note: 'Ford-specified grade for this era of 4.6L engines. Confirm against the oil filler cap and owner’s guide.',
  },
  {
    item: 'Engine oil capacity',
    value: 'Approx. 6 qt with filter',
    confidence: 'check',
    note: 'Commonly cited figure. Always confirm with the owner’s guide and dipstick.',
  },
  {
    item: 'Firing order',
    value: '1-3-7-2-6-5-4-8',
    confidence: 'verified',
    note: 'Cylinders 1–4 are on the passenger (right) bank; 5–8 on the driver (left) bank.',
  },
  {
    item: 'Spark plug count',
    value: '8',
    confidence: 'verified',
    note: 'Plug gap and torque intentionally not listed — see Ford service information.',
  },
  {
    item: 'Service intervals',
    value: 'Not listed',
    confidence: 'omitted',
    note: 'Ford published “normal” and “special operating conditions” schedules. Use the original Scheduled Maintenance Guide.',
  },
  {
    item: 'Torque values & part numbers',
    value: 'Not listed',
    confidence: 'omitted',
    note: 'Not reproduced here to avoid errors. Use the Ford Workshop Manual or Motorcraft Service.',
  },
]

export type GalleryImage = { src: string; alt: string; caption: string; credit: string }

export const galleryImages: GalleryImage[] = []

export const galleryPlaceholders: { caption: string; suggestion: string }[] = [
  { caption: 'Coupe — front three-quarter', suggestion: 'Exterior shot of a 2003 GT coupe' },
  { caption: 'Coupe — side profile', suggestion: 'Profile showing GT wheels and side scoops' },
  { caption: 'Convertible', suggestion: 'A 2003 GT convertible, top up or down' },
  { caption: 'Rear view', suggestion: 'Rear spoiler, badging, and dual exhaust tips' },
  { caption: 'Interior', suggestion: 'Dashboard, gauges, and seats' },
  { caption: 'Engine bay — 4.6L 2V V8', suggestion: 'Under-hood view of the SOHC V8' },
]

export type Source = { title: string; publisher: string; url?: string; usedFor: string }

export const sources: Source[] = [
  {
    title: '2003 Mustang Owner’s Guide',
    publisher: 'Ford Motor Company',
    url: 'https://www.ford.com/support/owner-manuals/',
    usedFor: 'Fluids, capacities, and maintenance — primary reference to confirm values marked “check source”.',
  },
  {
    title: '2003 Mustang Workshop Manual',
    publisher: 'Ford Motor Company / Motorcraft Service',
    url: 'https://www.motorcraftservice.com/',
    usedFor: 'Component locations, torque values, and service procedures (intentionally not reproduced).',
  },
  {
    title: '2003 Ford Mustang sales brochure',
    publisher: 'Ford Motor Company',
    usedFor: 'Trim levels, standard vs. optional equipment, and color availability.',
  },
  {
    title: 'Ford Mustang (fourth generation)',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Ford_Mustang_(fourth_generation)',
    usedFor: 'Model-year overview, GT power ratings, and transmission history.',
  },
  {
    title: 'Ford Modular engine',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Ford_Modular_engine',
    usedFor: 'SOHC 2-valve architecture, bore/stroke, and PI head background.',
  },
  {
    title: 'Automotive paint code references',
    publisher: 'PaintRef and OEM touch-up paint suppliers',
    url: 'https://www.paintref.com/',
    usedFor: 'Cross-checking 2003 Mustang color names and Ford two-character paint codes.',
  },
]
