import { ColorsSection } from '@/components/colors-section'
import { EngineExplorer } from '@/components/engine-explorer'
import { Hero } from '@/components/hero'
import { OptionsSection } from '@/components/options-section'
import { GallerySection, MaintenanceSection, SourcesSection } from '@/components/reference-sections'
import { SiteNav } from '@/components/site-nav'
import { SpecsSection } from '@/components/specs-section'
import { SystemsSection } from '@/components/systems-section'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <SpecsSection />
        <ColorsSection />
        <OptionsSection />
        <EngineExplorer />
        <SystemsSection />
        <MaintenanceSection />
        <GallerySection />
        <SourcesSection />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-xs text-muted-foreground md:flex-row md:justify-between md:px-6">
          <p>An independent enthusiast guide. Not affiliated with or endorsed by Ford Motor Company.</p>
          <p>Mustang and Ford are trademarks of Ford Motor Company.</p>
        </div>
      </footer>
    </>
  )
}
