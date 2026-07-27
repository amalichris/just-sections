import { useParams } from 'react-router-dom'
import sectionRegistry from '../sections/registry'
import { getFixture } from './galleryData'

/**
 * Renders one section, bare, with no gallery chrome around it.
 *
 * This is what the gallery loads into its iframe. An iframe rather than a
 * width-constrained `div` because CSS media queries respond to the viewport,
 * not to a container — a narrow `div` would show the desktop layout squeezed,
 * which is worse than no preview at all.
 */
export default function SectionFrame() {
  const { sectionId, fixtureId } = useParams()
  const Section = sectionRegistry[sectionId]
  const fixture = getFixture(sectionId, fixtureId)

  if (!Section) {
    return <p className="gallery-frame__message">No section registered for “{sectionId}”.</p>
  }

  if (!fixture) {
    return (
      <p className="gallery-frame__message">
        No fixtures for “{sectionId}”. Add a <code>fixtures.js</code> to its dossier.
      </p>
    )
  }

  return <Section {...fixture.props} />
}
