# Design system — moved

This path used to be a **symlink** to `skills/just-design-system/design.md`. The Just design
system is now its own repository, split into three layers:

```
~/Programming/just-design-system/
├── foundations.md          ← color, type, spacing, radius, elevation, button variants
└── surfaces/
    ├── web.md              ← THE ONE THIS REPO NEEDS
    ├── ios.md
    └── miniapp.md
```

## What to read when building a section here

| Task | Read |
| ---- | ---- |
| Any section work | `foundations.md` + `surfaces/web.md` |
| Landing section patterns — Benefits Bento, Process Story, CTA Banner, FAQ, Legal Footer, hero glass backdrop, header glass pill | `surfaces/web.md` §9 |
| Responsive breakpoints, content widths, page gutters | `surfaces/web.md` §4–5 |
| Focus, press scale, reduced motion | `surfaces/web.md` §7–8 |
| Token names and values | `foundations.md` §2 |
| Button variants | `foundations.md` §7 |

## Token naming

Web tokens use the **`--just-` prefix**: `--just-color-sienna`, `--just-font-heading`.

This repo's [`src/index.css`](../../src/index.css) still uses bare `--color-*`, which collides
with host application themes and has already drifted once — JustConvert's web department ships
the same palette as `--public-color-*`. Renaming is tracked as T1.2 in [`TODO.md`](../../TODO.md).

## Why a file and not a symlink

A symlink made this repo silently track another repo's working copy, with no version pinning
and no signal when the far side changed. A pointer file states the dependency explicitly. The
same reasoning applies to the section library itself — see [`TODO.md`](../../TODO.md).

## Proposing a change

Do not edit a copy, and do not re-add a symlink. A pattern that conflicts with, extends, or is
absent from the system must be proposed as an exception, agreed, and written into
`just-design-system` *in the same change* — before anything here relies on it. See that repo's
`README.md` and `CHANGELOG.md`.
