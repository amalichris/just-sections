# Verification — 24 November 2026

## Verified locally

Acquisition fixtures cover all three social sources, readable dated CV labels over 64 characters, duplicate rejection, explicit campaign replacement, retained navigation context, exact owned hosts, private/legal/OAuth exclusions, functional query/hash preservation and fresh calculator sharing. Real SDK browser captures are intercepted with a synthetic campaign and fake key: page and intent/outcome payloads retain the campaign/via without raw query values, calculator amounts, storage or cookies.

Production-build Chromium checks cover the personal CV → studio → product/calculator journey, native/new-tab hrefs, original campaign/latest via, restored estimate values and actual clipboard output. Personal/studio browser suites cover their routes and keyboard/fonts/reflow. Product public routes are checked at 320/375/768/1280. Repository-specific builds and available tests are recorded in the release report; JustEjari additionally has a root combined app/web build. No live provider request is used for QA.

## Limitations

Firefox could not launch in this macOS execution environment (sandbox extension/framebuffer failure); cross-browser confirmation remains pending. A passing build is not provider receipt or a production release. Existing provider configuration/enable gates remain unchanged. Develop only; main is not promoted.

Library lint, build, query-merge tests and npm pack dry-run passed. Published immutable v1.27.2 (a763975) on develop; JustEjari consumes the exact tag/SHA. JustConvert stays on v1.15.1 because it does not use the calculator; an unrelated major section upgrade is deferred.

The JustEjari landing page has an existing reflow failure in the benefits-carousel/statement-reveal sections when resizing. A comparison build from unchanged origin/develop reproduces overflow at 320/375 px (scroll width 1457 px) and other resize states. Those section sources/styles are unchanged by this release; it is recorded rather than folded into acquisition work. Calculator reflow and the other checked public routes pass. This is not a blanket landing-page accessibility sign-off.
