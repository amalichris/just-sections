# [Section name] plan

- **Section ID:** `[kebab-case-section-id]`
- **Revision:** `0.1`
- **Status:** Draft
- **Products / variants:** `[e.g. JustEjari default; JustConvert variant]`

## Conversion goal

Describe the user action or belief this section should move. Define the primary CTA or next step, if applicable.

## Inspiration extraction

List the exact entry in `docs/inspiration/sections.md`, linked source folder, and original prompt/source files reviewed.

Record only the mechanics worth carrying forward:

- **Keep:**
- **Adapt:**
- **Exclude:**

Do not treat inspiration copy, tokens, assets, or styling as production requirements.

## Just design-system translation

Explain how this section uses the approved design-system tokens, type, spacing, elevation, button variants, iconography, and motion. List any proposed exception or extension and its approval status.

## Public configuration

Define the product-agnostic content and variant inputs the component accepts. Include defaults, required fields, and the cases that require a distinct structural section instead of another variant.

## Behavior and responsive design

Describe the desktop and mobile layout, interaction states, animation, reduced-motion behavior, loading/empty states when relevant, and any asset requirements.

## Accessibility

Record semantic structure, keyboard behavior, focus treatment, touch-target requirements, image text alternatives, and any motion accommodations.

## Acceptance checks

- [ ] Follows `docs/design-system/design.md` with no unapproved exceptions.
- [ ] Exposes only the documented configuration and variants.
- [ ] Works at the required desktop and mobile viewports.
- [ ] Meets the documented interaction, keyboard, and reduced-motion behavior.
- [ ] Uses appropriate asset text alternatives and 44×44px minimum interactive targets.
- [ ] Has been visually reviewed on its target route.
- [ ] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

Record deviations discovered during implementation. Update this plan and `prompt.md` together, incrementing the shared revision when a decision changes.
