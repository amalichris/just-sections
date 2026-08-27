import { Routes, Route } from 'react-router-dom'
import DemoPage from './dev/DemoPage'
import BackdropLab from './dev/BackdropLab'
import { GalleryIndex, GallerySection } from './dev/Gallery'
import SectionFrame from './dev/SectionFrame'
import justejariDemoConfig from './dev/demo/justejari/page.config'
import justconvertDemoConfig from './dev/demo/justconvert/page.config'

export default function App() {
  return (
    <Routes>
      {/* Whole-page compositions built from each product's real page config.
          The gallery checks sections in isolation; these check what
          `ProductPage` does around them, against real copy and imagery
          instead of short generic fixtures.

          There is deliberately no product page here any more. Each product's
          landing page lives in that product's own `web/` department, which
          consumes this library as a versioned package — these are dev-only
          snapshots that will drift, which is fine; see `DemoPage.jsx`. */}
      <Route path="/" element={<DemoPage config={justejariDemoConfig} />} />
      <Route path="/demo/justconvert" element={<DemoPage config={justconvertDemoConfig} />} />

      {/* Development harness. `/gallery/frame/*` is what the gallery loads into
          its iframe, so it renders the section with no chrome around it. */}
      <Route path="/gallery" element={<GalleryIndex />} />
      <Route path="/gallery/frame/:sectionId/:fixtureId" element={<SectionFrame />} />
      <Route path="/gallery/:sectionId" element={<GallerySection />} />

      {/* Exploration surface for candidate media backdrops. Nothing here is a
          section variant yet — see `BackdropLab.jsx` for why that is deliberate. */}
      <Route path="/backdrops" element={<BackdropLab />} />
    </Routes>
  )
}
