import { Routes, Route } from 'react-router-dom'
import DemoPage from './dev/DemoPage'
import BackdropLab from './dev/BackdropLab'
import { GalleryIndex, GallerySection } from './dev/Gallery'
import SectionFrame from './dev/SectionFrame'

export default function App() {
  return (
    <Routes>
      {/* A whole-page composition built from section fixtures. The gallery
          checks sections in isolation; this checks what `ProductPage` does
          around them.

          There is deliberately no product page here any more. JustEjari's
          landing page lives in that product's `web/` department, which consumes
          this library as a versioned package. */}
      <Route path="/" element={<DemoPage />} />

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
