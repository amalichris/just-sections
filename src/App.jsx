import { Routes, Route } from 'react-router-dom'
import JustEjariPreview from './pages/JustEjariPreview'
import { GalleryIndex, GallerySection } from './dev/Gallery'
import SectionFrame from './dev/SectionFrame'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JustEjariPreview />} />
      <Route path="/justejari" element={<JustEjariPreview />} />

      {/* Development harness. `/gallery/frame/*` is what the gallery loads into
          its iframe, so it renders the section with no chrome around it. */}
      <Route path="/gallery" element={<GalleryIndex />} />
      <Route path="/gallery/frame/:sectionId/:fixtureId" element={<SectionFrame />} />
      <Route path="/gallery/:sectionId" element={<GallerySection />} />
    </Routes>
  )
}
