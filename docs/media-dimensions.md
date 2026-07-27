# Landing media dimensions

Reference dimensions for the reusable `benefits-default` and
`how-it-works-default` sections.

Last measured: 2026-07-26.

## Rendered dimensions

Measurements use the current JustEjari copy at the project's canonical
viewports. Values are rounded to the nearest pixel.

| Section / media | Desktop 1440×900 | Tablet 768×1024 | Mobile 375×812 |
| --- | ---: | ---: | ---: |
| Benefits — anchor image | 695×546px | 652×407px | 295×184px |
| Benefits — secondary image | 317×198px | 296×185px | 295×184px |
| How It Works — media frame | 536×454px | 624×452px | 335×452px |
| How It Works — visible portrait | ~200×406px | 207×420px | 207×420px |

Desktop heights are content-dependent and can shift when section copy changes.
Remeasure after material copy or layout changes.

## Source assets

Use one source asset per image across all breakpoints:

| Section | Recommended source | Aspect / fit |
| --- | ---: | --- |
| Benefits | 1480×925px | 16:10, `object-fit: cover` |
| How It Works | 640×1300px | Portrait, `object-fit: contain` |

Benefits media fills its frame. The desktop anchor is taller than 16:10, so it
crops the source horizontally. Keep important interface content away from the
left and right edges.

How It Works preserves the complete portrait image. On desktop, the image sits
inside a larger panel and its visible footprint is narrower than the image
element's available box.

## Related dossiers

- [`benefits-default`](../src/sections/benefits-default/plan.md)
- [`how-it-works-default`](../src/sections/how-it-works-default/plan.md)
