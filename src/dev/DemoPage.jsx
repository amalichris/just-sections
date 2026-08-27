import ProductPage from '../ProductPage'

/**
 * A whole page, rendered the way a consumer renders one.
 *
 * The gallery checks sections in isolation, which is what you want while
 * building one. It cannot show what `ProductPage` does: landmark slots, section
 * order, and — most easily broken — the spacing between adjacent sections,
 * which the page contract declares on the sibling pair rather than on the
 * element.
 *
 * It also cannot show whether a section survives real content. Fixtures are
 * written to exercise a prop contract, so they run short and generic; a hero
 * looks fine with a six-word headline and a grey rectangle, and quite different
 * with a real one and a photograph. Refining a section against production-like
 * copy and imagery catches what neither the fixtures nor the build will.
 *
 * `demo/<product>/` holds that content — a snapshot of a real page config and
 * its assets, one per product currently building against this library. It is
 * dev-only: `src/dev/` is excluded from the published package, so the library
 * stays product-agnostic and ships no imagery. Nothing here is a source of
 * truth; each product's live page lives in its own `web/` department.
 *
 * @param {{ config: object }} props
 */
export default function DemoPage({ config }) {
  return <ProductPage config={config} />
}
