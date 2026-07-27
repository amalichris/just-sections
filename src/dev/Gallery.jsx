import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { VIEWPORTS, getFixture, getSection, sections } from './galleryData'
import './gallery.css'

/**
 * Index of every registered section.
 *
 * Reads `registry.js`, so a section that is implemented but not registered is
 * absent here too — which is the correct signal, since an unregistered section
 * cannot appear in a page config either.
 */
export function GalleryIndex() {
  const missingFixtures = sections.filter((section) => section.fixtures.length === 0)

  return (
    <div className="gallery">
      <header className="gallery__masthead">
        <h1 className="gallery__title">Section gallery</h1>
        <p className="gallery__lede">
          Every section in <code>registry.js</code>, rendered against its dossier fixtures at real
          viewport widths. Development only — this harness is excluded from the published package.
        </p>
      </header>

      {missingFixtures.length > 0 && (
        <p className="gallery__warning">
          {missingFixtures.length} registered{' '}
          {missingFixtures.length === 1 ? 'section has' : 'sections have'} no{' '}
          <code>fixtures.js</code>: {missingFixtures.map((section) => section.id).join(', ')}
        </p>
      )}

      <ul className="gallery__list">
        {sections.map((section) => (
          <li key={section.id} className="gallery__item">
            <Link className="gallery__item-link" to={`/gallery/${section.id}`}>
              {section.id}
            </Link>
            <span className="gallery__item-meta">
              {section.fixtures.length === 0
                ? 'no fixtures'
                : `${section.fixtures.length} ${section.fixtures.length === 1 ? 'fixture' : 'fixtures'}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * One section, previewed in an iframe at a selectable width.
 */
export function GallerySection() {
  const { sectionId } = useParams()
  const section = getSection(sectionId)
  const [fixtureId, setFixtureId] = useState(null)
  const [width, setWidth] = useState(1024)
  const [measured, setMeasured] = useState(null)

  // Read the iframe's real viewport width rather than trusting the width we
  // asked for. A border, a classic scrollbar, or page zoom can all shave pixels
  // off, and a preview that is 2px narrow silently renders the breakpoint below
  // the one you selected.
  function measureFrame(event) {
    try {
      setMeasured(event.currentTarget.contentWindow?.innerWidth ?? null)
    } catch {
      setMeasured(null)
    }
  }

  if (!section) {
    return (
      <div className="gallery">
        <p className="gallery__warning">
          No section registered for “{sectionId}”. <Link to="/gallery">Back to the index.</Link>
        </p>
      </div>
    )
  }

  const fixture = getFixture(sectionId, fixtureId)
  const activeFixtureId = fixture?.id ?? null

  return (
    <div className="gallery">
      <header className="gallery__masthead">
        <Link className="gallery__back" to="/gallery">
          ← All sections
        </Link>
        <h1 className="gallery__title">{section.id}</h1>
      </header>

      {section.fixtures.length === 0 ? (
        <p className="gallery__warning">
          This section has no <code>fixtures.js</code>. Add one to its dossier so it can be built
          and reviewed without a full page config.
        </p>
      ) : (
        <>
          <div className="gallery__controls">
            <div className="gallery__control-group" role="group" aria-label="Fixture">
              {section.fixtures.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="gallery__chip"
                  aria-pressed={entry.id === activeFixtureId}
                  onClick={() => setFixtureId(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
            </div>

            <div className="gallery__control-group" role="group" aria-label="Viewport width">
              {VIEWPORTS.map((viewport) => (
                <button
                  key={viewport.width}
                  type="button"
                  className="gallery__chip"
                  aria-pressed={viewport.width === width}
                  onClick={() => setWidth(viewport.width)}
                  title={viewport.note}
                >
                  {viewport.label}
                </button>
              ))}
            </div>

            <span
              className={`gallery__measure${measured !== null && measured !== width ? ' gallery__measure--mismatch' : ''}`}
            >
              {measured === null ? '—' : `actual ${measured}px`}
            </span>
          </div>

          {fixture?.note && <p className="gallery__note">{fixture.note}</p>}

          {fixture?.expectsNothing && (
            <p className="gallery__expectation">
              Expected: renders nothing, and reports the omission in the browser console.
            </p>
          )}

          <div className="gallery__stage">
            <iframe
              key={`${sectionId}-${activeFixtureId}-${width}`}
              className="gallery__viewport"
              style={{ width: `${width}px` }}
              title={`${sectionId} — ${fixture?.label ?? ''} at ${width}px`}
              src={`/gallery/frame/${sectionId}/${activeFixtureId}`}
              onLoad={measureFrame}
            />
          </div>
        </>
      )}
    </div>
  )
}
