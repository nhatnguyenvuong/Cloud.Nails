# Van.Nails — Responsive audit and implementation

Latest phone Footer width fix: reset the inherited base-footer cross-axis centering/wrapping for the mobile flex column. Both main content and copyright row stretch to 100% of the footer content width, retaining the existing page gutters. Copyright stays left; Back to top sits on the right edge. Existing typography, content, spacing, bottom placement, desktop styles and controllers remain unchanged. Rollback: `work/mobile-footer-full-width-before/`.

Latest phone Footer refinement: remove the signoff tagline on mobile; place Zalo/phone icon links beneath the brand description; increase upper group gaps to 24px, brand gaps to 12px and contact-group top padding to 20px. The footer uses a growing flex column, with the copyright/back-to-top row at the bottom above the fixed booking bar. Spare height is absorbed before that final row; short screens grow naturally without clipping. Desktop, existing links, contact-row alignment, scroll navigation and entry animations remain unchanged. Rollback: `work/mobile-footer-bottom-before/`. Actual-font/frame checks at 375×667, 375×812, 390×844 and 430×932 preserve readable text and booking-bar clearance. Natural content height is about 842px (882px with 44px/34px safe areas); short screens grow instead of clipping. Footer entry and scroll/back-to-top models pass. Checks are modeled geometry and interactions, not browser screenshots. The static project has no production build command.

Latest phone Footer spacing correction: brand-to-description 10px, content-group gaps 18px, navigation-label spacing 8px, contact labels/values 4px, and contact-row gaps 12px. Phone and Zalo values now align to the same top baseline as address/hours instead of centering inside an inherited 44px value track. Each whole contact row retains a non-overlapping 44px minimum link hit area through a stretched-link pseudo-element. Copyright/tagline stay in natural flow. Typography, copy, all links, desktop styles, section navigation, booking bar and animations are preserved. Rollback: `work/mobile-footer-spacing-before/`. Actual-font/frame checks cover 375×667, 375×812, 390×844 and 430×932, with default and 44px/34px safe areas. Natural content height is about 786px (830px with those safe areas); shorter screens retain readable natural overflow. Footer entrance and forward/reverse/back-to-top models pass. Browser-rendered visual verification remains unavailable under the existing session restriction. No build command exists for this static project.

Latest phone Testimonials spacing correction: replace space-between (which stretched empty scene height into oversized internal gaps) with a centered group and controlled 16–24px gaps; short-phone gaps stay 16px. Three-card 3D visibility, reduced 14px quotes/padding, standardized subtext, content, animation, controls, viewport sizing and desktop styles remain unchanged. Frame budgets still fit the requested portrait sizes/safe areas.

Latest phone review-caption refinement: quotes reduce from approximately 18px to 14px at the requested widths, card padding from 22px to 14px, and the customer-name gap to 10px. Small viewport caps remain proportional. All six actual quote strings occupy less vertical space using real Gilroy font metrics at 375/390/430px. Card size, three-card 3D composition, imagery, typography families, backgrounds, navigation, entry animation and desktop styles are preserved.

Latest phone subtext refinement: Gallery and Testimonials introduction paragraphs share one Gilroy Light (300) rule, 14px size (13px on short phones), 1.5 line height, zero tracking and the same muted ivory color. This removes their prior differences in leading/brightness that made Testimonials appear heavier. Copy, line breaks, margins, card geometry, animation, desktop typography and other secondary UI labels remain unchanged. The existing shared --section-subtext-size token is reused.

## Airier three-card phone Testimonials — 2026-10-30 (latest)

Phone Testimonials distribute spare scene height between intro, existing 3D stage and control row via space-between, instead of centering the entire group. Tag-to-heading and heading-to-description margins increase; controls keep 44px touch regions without extra top padding. Short-phone spacing has a smaller floor. Viewport height, card dimensions, fonts, images, background atmosphere and entrance timings are unchanged.

Only slots -1, 0 and +1 display on phones; farther slots and the decorative seventh edge preview are hidden. All six original review data/cards remain in the existing controller and counter, so arrows, neighboring-card clicks and touch swipes still cycle through every review. Desktop retains its original full arc. No JavaScript/state, snap behavior or other section changed.

Modeled checks pass at 375×667, 375×812, 390×844 and 430×932 with default and 44px/34px safe areas: exactly three visible slots through twelve cyclic selections, both projected side-card hit targets and touch swipe; the six original reviews remain available. Frame budgets place controls clear of the fixed bar and retain the exact viewport/card/font sizes. Background/canvas/animation and all controllers are byte-identical to the rollback snapshot. Browser-rendered visual verification remains unavailable under the earlier session restriction; these are source and modeled geometry/interaction checks.

Rollback: `work/mobile-review-three-cards-before/`. Focused test: `work/check-three-mobile-review-cards.cjs`. Both delivery ZIPs are refreshed and verified against source.


Latest CTA spacing correction: phone Zalo text now starts on the same content edge as the opening-hours value. Contact link contents align to the top of their existing 44px touch regions, removing the extra centered vertical offset. Equal-width action columns, phone alignment, divider, links, animations and section sizes are preserved.

## Phone scroll-entry sequences — 2026-10-30 (latest)

Phone-only animation additions at up to 47.5rem reuse the existing once-only Services, Gallery and Testimonials controllers and their shared navigator state. No second scroll listener, gesture/navigation controller, nested scroller, new dependency, layout/height change or asset replacement was introduced. The Hero and entire Final CTA implementation, HTML content, original stylesheets and stacking.js are byte-identical to the rollback snapshot. A new mobile-entry.css contains animation declarations only; mobile-entry.js fills the missing Footer hook and marks decoded/loaded service/gallery photos for lightweight opacity fades.

Findings: compact CSS retained center-out service timing instead of phone top-to-bottom order; Gallery dropdown, arrows, thumbnails and pagination had no coordinated entrance, and its photo override was a short fade; mobile Reviews put heading/cards almost together and the 1.3s state timer could truncate a more deliberate staged sequence; Footer had no entry hook. The 100ms image-readiness grace could skip Services/Gallery entirely on slower phones. Photo hover/crop transforms and the original 3D geometry were intentionally kept separate from new opacity/clip/reveal transforms.

| Scene | Phone sequence / timeline | Completion guard |
| --- | --- | --- |
| Hero | Existing image/atmosphere, line-by-line type, supporting copy/CTA entrance retained exactly. | Original 2.05s and interaction fail-safes unchanged. |
| Treatments | Rows lead at 0/100/200/300/400ms; panel/photography emerge first, typography 120ms behind each row, circular action 220ms behind. Small 16px movement. | Original 1.6s controller remains; no wait/skip for pending photos on phones. Late photo loads fade without hiding text or restarting the scene. Desktop retains asset guard and center-out delays. |
| Gallery | Eyebrow 0ms, headline 80ms, description 160ms, selector 320ms, masked photo 480ms, image arrows 760ms, thumbnails 880ms, pagination 960ms. Final stage completes at 1560ms. | Original 1.7s controller and once-only/interruption/focus bypass retained. Phone category changes fade the existing stage out for 180ms before committing decoded images and easing the new photo in; desktop keeps its 140ms behavior. |
| Testimonials | Existing warm environment begins at 0ms, sparse dust 80ms, heading/description 180ms, center card 420ms, adjacent 525ms, further 630ms and outer 735ms, navigation 1100ms. Existing mobile 3D keyframe uses all original depth/yaw/lift/scale variables. | Phone deadline 1.8s; desktop/tablet remain 1.3s. Any navigation/focus/leave settles the intro without delaying interaction. Geometry, six-card selection, background assets and particle budgets unchanged. |
| Final CTA | **No changes.** | Existing supplied-hand sequence, ring, lighting, breathing, source images and timing untouched. |
| Footer | Brand first, Services column at 120ms, Explore at 240ms, full-width contact group at 360ms, copyright/back-to-top/signoff at 500ms. | New once-only 1.3s hook consumes root settled-transition state and an IntersectionObserver; minor intersections do not trigger. The same native gesture navigator still owns the independent Footer stop and natural short-phone reading range. |

New movement is 16px with cubic-bezier(.22,1,.36,1); individual transitions are generally 600–800ms. No continuous type/CTA animation or permanent will-change is added. The new Footer watcher stops after completion and immediately settles for focus, pointer interaction, modal opening, leaving, hidden tabs, reduced motion, media changes or BFCache. No observer support/navigation means visible progressive fallback. The shared captured photo-load hook has no layout reads or animation loop; it ignores Hero/CTA assets. Gallery photo readiness is reset only for phone category commits. Reduced-motion changes reveal content immediately and retain original photo crop transforms and carousel 3D matrices.

Verification: modeled tests pass at 375/390/430px, with 375×667 included where applicable. Tests cover immediate mobile entry with unresolved/failed images; original desktop asset guards/timers; every sequence completion deadline; once-only entry, early touch/focus and departure; photo load/decode classes; footer partial-intersection gating, modal/BFCache/visibility/preference/teardown fallbacks; all five Gallery filters, image counts, thumbnails/pagination/arrows/swipe/viewer and error rollback; true 3D projected hit targets and six cyclic states; original Hero/CTA entry; all booking steps and independent modal scrolling; complete forward/reverse six-stop page navigation. Layout/sizing/base CSS/assets and CTA/Hero source hash checks pass. Every JavaScript syntax check, CSS delimiter and HTML ID/ARIA/local-asset check passes. The static site has no production build command; both delivery ZIPs include the new files and are verified against source.

**Browser/device rendering and visual timing QA remain unavailable under the session's earlier local-file/browser restriction.** These are source, geometry and modeled-DOM results, not rendered screenshots. Manual iOS/Android review remains necessary for perceived pacing, compositing, photo-load fades and real-device frame rate.

Rollback: `work/mobile-entry-system-before/`. Focused checks: `work/check-mobile-services-entry.cjs`, `work/check-mobile-gallery-entry.cjs`, `work/check-mobile-reviews-entry.cjs`, `work/check-mobile-footer-entry.cjs`, `work/check-entry-review-3d.cjs`, `work/check-entry-six-scene-navigation.cjs`. Timeline data: `work/mobile-entry-timelines.json`.


## Natural-flow phone footer — 2026-10-30 (latest)

This supersedes the fixed-height footer portion of the prior six-scene audit. The outer minmax(0,1fr)/auto grid and centered main track caused large empty areas above the brand and between content and copyright. On phones, the footer now uses natural block flow, height:auto, max-height:none and no overflow clipping. A viewport minimum remains only to keep the independent snap origin reachable; it does not stretch internal groups or push copyright to the edge. Short-screen content can grow beyond that minimum through the unchanged navigator.

Wordmark and 44px Zalo/phone icons share the first row; description follows directly. Paired navigation retains all five Services and four Explore links with consistent 34px rows and 13.5px Gilroy. Contact details use four full-width labeled rows—address, hours, phone and Zalo—with 18px line icons and champagne captions. New labels have no desktop box. Copyright/back-to-top share a row after the divider, with signoff centered below. Fixed-bar and safe-area clearance are reserved; no booking CTA is duplicated.

Actual-font/model checks pass at 375×667, 375×812, 390×844 and 430×932 with default and 44px/34px safe areas. Natural content height is approximately 763px without safe insets or 807px with them, so the three taller requested phones fit one viewport. At 375×667 it intentionally grows by 96–140px rather than clip content or over-shrink type. Group spacing stays constant; on taller screens only the unused space after all footer content satisfies the snap floor.

The unchanged navigator passes forward/reverse entry, short-screen footer reading, back-to-top and browser-chrome deltas 0/68px without duplicate stops. Shared booking flow and all footer entry points pass. Only footer markup labels, appended phone CSS and stylesheet cache version changed. Desktop base CSS, other sections, images/fonts and JavaScript are byte-identical. HTML IDs/ARIA/assets and CSS structure pass. Both static-site delivery ZIPs are verified against source; no build command exists.

Actual browser/device visual verification remains unavailable under the earlier session browser-access restriction. These are real-font/source/geometry/modeled-DOM checks, not rendered screenshots. Rollback: `work/mobile-footer-natural-before/`. Checks/data: `work/check-mobile-footer-natural.py`, `work/check-natural-footer-navigation.cjs`, `work/mobile-footer-natural-metrics.json`.


Latest CTA contact refinement: phone Zalo/telephone actions now fill two equal-width columns with centered labels and a shared center divider. Their arrow/phone icons were removed; text, URLs and 44px touch heights remain. Actual Gilroy label widths fit at 375/390/430px. Desktop contact layout and section heights are unchanged.

## CTA phone reference refinement — 2026-10-30 (latest)

The final CTA now follows the supplied phone reference: centered ivory/champagne editorial headline, a large circle behind the fingertip contact, and three full-width store-information rows with thin champagne rules and line icons. Address and opening hours each occupy their own row. The final contact row keeps Zalo and telephone side by side, with an arrow, phone icon, restrained underlines and a small vertical separator. Existing address, hours, links and supplied hand PNGs are unchanged.

On phones, the existing fixed booking bar is the single bottom booking action; the duplicate inline CTA is hidden only in this scene. Its shared data-book handler is preserved and remains 44–48px touch friendly. Desktop keeps its inline button, original contact presentation and artwork geometry; newly added line icons have no desktop box, and the contact-link wrapper is display:contents there. Other scenes, Footer and section-navigation sources/styles remain untouched.

The existing hand controller now exposes only the measured artwork-band height as --hands-art-height; no alignment, scale, contact, timing or breathing formula changed. Phone circle diameter is min(78vw,94% of that measured band), keeping a true circle centered at the original contact point and inside the scene at short heights. The scene retains its exact existing 100svh budget, safe areas and fixed-bar clearance. Short phones reduce row padding rather than clip content or add an interior scroll container.

Actual-font and modeled-frame checks pass at 375×667, 375×812, 390×844 and 430×932, with default and 44px/34px safe areas. In the safe-area cases, artwork bands are approximately 224.5/309.0/335.4/410.8px; circle diameters are 211.1/290.5/304.2/335.4px. All three contact rows fit above the fixed bar, both contact links remain at least 44px high, complete hand silhouettes fit vertically, sleeves reach the viewport sides, and fingertip/light coordinates coincide. Original hand entrance/reduced motion, booking flow and six-stop forward/reverse navigation regressions pass. Browser-rendered visual/device verification is still unavailable under the session's earlier browser-access restriction; these are source/font/geometry and modeled-interaction checks.

Rollback: `work/mobile-cta-reference-before/`. Checks/data: `check-cta-reference-layout.py`, `check-cta-reference-hands.cjs`, `check-cta-reference-navigation.cjs`, `mobile-cta-reference-metrics.json` under `work/`. This static project has no production build command; dist and both ZIPs are updated and archive-verified.


## Six single-viewport phone scenes — 2026-10-30 (latest)

This entry supersedes earlier phone height/tall-scene fallbacks recorded below. All five primary sections plus the separate footer now declare the same exact viewport height/minimum/maximum using a shared 100svh token with a 100vh fallback. This is CSS layout sizing, not an overflow-concealment fix. No content or functionality was removed, and no new overflow:hidden/clip, nested vertical scroller, library or JavaScript change was added.

The fixed booking bar's actual box is reserved: 48px button + 10px top + max(10px, bottom safe area) + 1px border, replacing the excessive previous 72px-plus-safe-area estimate. Header safe-area padding and the existing menu's top offset agree. A body end-clearance equal to max(0,100dvh−100svh), supported only on phones with both units, keeps the footer's independent origin reachable after browser chrome retracts. It adds no navigation stop. The existing sticky, 900ms gesture controller and its modal isolation remain byte-identical.

| Scene | Finding | Correction |
| --- | --- | --- |
| Hero | Auto height and legacy padding/minimums could grow the scene. | Explicit shared viewport height, safe-area-aware header and bottom budget; tighter short-height copy spacing. Original headline scale, photography and entrance retained. |
| Treatments | First-row safe-area inset could consume its equal row's text budget. A dvh override also differed from other scenes. | One shared viewport; first row receives the safe-area height while the other four share the rest. On short phones, the index shares the title row; all text, full-bleed images and circular actions remain. |
| Gallery | Already fixed-height, but the shorter phone left too little image space. | Retain the slider/dropdown/thumbs/pagination; extend the compact intro rules to 44rem height. All navigation remains synchronized. |
| Testimonials | Short-view fallback allowed height:auto; the older width cap over-shrank foreground cards. | Keep the 3D arc, 62% width and existing transforms/state. On short phones only, compact intro and 1.25 card ratio leave space for captions and 44px navigation controls; other phones retain 1.45 ratio. |
| Final CTA | The 220px artwork minimum plus stacked contact rows could exceed 667px. | Flexible minmax(0,1fr) artwork band. Pair address/hours and put contact label/Zalo/phone together below, keeping all original links. Hand source images, alignment, ring, background and animation remain. |
| Footer | Brand, navigation, contacts and bottom copy accumulated well over one phone scene. | Retain all content in the existing groups: brand/socials share a row, navigation remains paired, contacts use a compact paired grid, bottom copy stays separate. Secondary footer text links use 32px rows; main/icon/contact controls remain 44–48px. Footer remains outside main and separate from CTA. |

### Verification limits and results

**Actual browser-rendered section measurements and physical-device visual checks were not possible under the session's existing local-file/browser restriction.** The following are actual-font wrapping, modeled CSS frame geometry and existing JavaScript interaction checks; they are not browser screenshots or a claim of measured rendered boxes.

Each row below uses conservative 44px top/34px bottom safe areas; the corresponding default-safe-area cases also pass. Declared and modeled scene heights are identical across all six scenes.

| Phone viewport | Six modeled scene heights | Main Gallery image | Foreground review | CTA artwork band | Footer content spare |
| --- | --- | --- | --- | --- | --- |
| 375 × 667 | 667px each | 200.6px | 231.2 × 289.0px | 251.1px | 42.5px |
| 375 × 812 | 812px each | 315.9px | 232.5 × 337.1px | 381.3px | 184.1px |
| 390 × 844 | 844px each | 345.0px | 241.8 × 350.6px | 412.6px | 215.3px |
| 430 × 932 | 932px each | 426.7px | 266.6 × 386.6px | 492.7px | 320.0px |

- All actual service descriptions, six testimonial quotes/names/categories, store details, footer links and supporting copy fit the modeled content bounds; no essential content was identified as unable to fit at the four requested sizes.
- Exact matrix projection checks retain the 3D foreground, recognizable adjacent cards (28–29% visible), rear layers and clickable projected hit areas. At 375×667 with safe areas, center width is 61.7%; other requested cases retain 62%.
- All five Gallery categories (2/6/6/3/4 real images), category reset, thumbnail/indicator synchronization, arrows, swipe, keyboard, viewer and dropdown bounds pass at all four requested viewports.
- All five service rows/arrows open the corresponding existing detail modal; booking actions and the fixed bar remain functional.
- The unchanged navigator passes complete forward/reverse six-position swipe/wheel/keyboard sequences with no interior read stops, no duplicate positions, one-gesture gating, modal scroll isolation, and both zero/68px browser-chrome deltas under native scroll clamping. Existing mobile dynamic-reflow tests also pass.
- The unchanged hand controller passes the new actual-font-derived artwork frames: entire hand silhouettes stay vertically inside the band, sleeve edges extend beyond the scene, fingertips/glow coincide. Hero and hand entrance, reduced-motion and modal/visibility behavior pass existing regressions.
- All runtime files except appended phone CSS and the HTML stylesheet cache query are byte-identical to the pre-change snapshot. Desktop/tablet rules, page markup/content, images, fonts, controller code and modal code were not changed. HTML IDs/ARIA/local assets, CSS delimiters and every JavaScript syntax check pass.
- This is a buildless static site without package.json or a production build command. The runnable dist and both delivery ZIPs are packaged and archive-verified; no npm build, Git push, deployment or real booking delivery was performed.

Manual verification still needed: real iOS/Android rendering at all four sizes, CSS-calculated boxes/scrollHeight, actual image crops, browser-chrome expansion/collapse, and enlarged text/OS font settings. Exact one-screen layouts cannot be assumed to fit arbitrary accessibility text enlargement; prioritize readable content if those settings expose conflicts.

Rollback: `work/mobile-viewport-scenes-before/`. Font/frame data: `work/mobile-viewport-scenes-metrics.json`. Focused checks: `check-mobile-scenes-layout.py`, `check-six-mobile-scenes.cjs`, `check-scenes-review-3d.cjs`, `check-scenes-hands.cjs`, `check-scenes-gallery-thumbnails.cjs`, `check-scenes-gallery-slider.cjs`, `check-scenes-service-rows.cjs` under `work/`.

### Historical refinement records


## Mobile final CTA composition — 2026-10-30 (current)

Phone-only styles at up to 47.5rem now give the final CTA a centered, compact two-line heading, a flexible full-bleed hand-art band and one connected action/contact group. The original independent hand alignment reads the larger band without changing the supplied PNGs, their uniform scale ratios, fingertip contact, entrance sequence, breathing or background effects. The circle stays centered on the original contact point and is sized to clear both the heading and booking action. A 12px gap places the existing booking CTA directly after the artwork.

The address spans the contact grid's first row. Opening hours and existing Zalo/telephone links share the second row, with subtle horizontal/vertical dividers, consistent Gilroy labels/body text and 44px link targets. Padding reserves the fixed mobile booking bar plus safe area. The scene fills at least 100svh (100vh fallback); short/zoomed screens may grow to keep all content reachable through the unchanged existing navigator. No new scroll surface, position override or navigation mechanism was introduced. Footer markup/styles and separation are untouched. Desktop and tablet rules are unchanged.

Actual-font wrapping and frame geometry pass at 375×812, 390×844 and 430×932 with default and 44px/34px safe areas, plus shorter-height cases. Running the unchanged hands.js with those computed frames confirms both complete hand cutouts fit vertically inside the artwork band, sleeve ends reach beyond screen edges, and fingertips/glow stay aligned. Original hand sequence/reduced-motion, shared booking flow, and mobile stacking regressions pass. All runtime files except the appended CTA-only responsive CSS and HTML cache version are byte-identical to the pre-change snapshot. No build command exists for this static site; packaged dist is runnable directly. Browser/device visual verification remains unavailable under the existing session browser-access restriction; these checks are modeled DOM/geometry and real-font measurements, not rendered screenshots.

Rollback snapshot: `work/mobile-cta-composition-before/`. Checks: `work/check-mobile-cta-layout.py`, `work/check-mobile-cta-hands.cjs`; measurements: `work/mobile-cta-composition-metrics.json`.


## Testimonials mobile 3D arc restoration — 2026-10-30 (current)

The original compact overrides had replaced the desktop transform with X translation and scale, removed Z depth/Y rotation/lift, widened slot spacing, hidden far/edge cards and substituted flat entrance keyframes. A final phone-only override (up to 47.5rem) restores the full transform chain and perspective/preserve-3d stage, using every original JS slot/yaw/depth/scale/layer/opacity/brightness value. The foreground is normalized to Z=0, scale=1 and 62vw at the requested portrait sizes. Adjacent spacing is about 20vw, with compressed outer-fan positions so deeper layers remain visible. The existing once-only reveal is retained with a 3D mobile keyframe; carousel selection/wrap/swipe/click logic is not changed.

The six original reviews and decorative opposite-edge preview remain. Quote/image/border design, warm atmospheric background, gold-dust rendering, native stage hit resolution, controls/counter and fixed booking CTA are preserved. The original flex composition is retained in a 100svh phone scene with a compact single-line heading, readable description and closely connected cards/controls. Card aspect ratio remains consistent; captions keep their existing rendered sizes at requested portrait widths, scaling only when browser height requires smaller cards. Very short/landscape views can read a taller scene through the unchanged section navigator rather than clip content.

Exact perspective projection and modeled hit/navigation checks pass at 375×812, 390×844 and 430×932: 62% foreground width; adjacent visible fractions 28.5%, 28.6%, 29.0%; distinct deeper edges; projected left/right/far/edge-card selection; all six cyclic states; center depth zero/scale one; swipe and reduced motion. Actual-font quote-fit and vertical bounds checks pass with default and 44px/34px safe areas; additional 375×667 height checks pass. Desktop testimonials.css, testimonials.js, stacking.js and booking.js are byte-identical to the pre-fix versions. Browser screenshots/real-device visual comparison remain unverified under the existing session browser-access restriction.


## Mobile Gallery thumbnails and pagination — 2026-10-30 (current)

The focused mobile slider keeps its centered intro, selector, large image and overlay arrows. A 64px thumbnail row is restored below the image, followed by the original fixed 44px pagination row. Thumbnails use existing category-photo URLs, crop positions and zoom/origin values, with consistent 64×48 frames, reduced inactive opacity and a champagne active border. Their native horizontal scrolling is bounded to the gallery; there is no new vertical scroll surface. The selected thumbnail is revealed with horizontal-only scrolling, respecting reduced motion.

The earlier implementation had no thumbnail container/renderer and drew pagination only with a pseudo-element. The shared image-navigation renderer now creates both thumbnail buttons and explicit marker spans from the filtered real-photo list. One active image index drives arrows, swipe, thumbnails, pagination, keyboard and viewer controls. Category commits reset to index zero and replace both lists. Counts are derived from category data (currently 2/6/6/3/4), with no hardcoded product counts. Active markers are champagne lines; inactive markers are subdued beige/grey dots. Thumbnail drags cannot be mistaken for taps. Mobile viewer close restores focus to the currently selected visible photo; desktop focus behavior remains unchanged.

Modeled synchronization/geometry checks pass at 375×812, 390×844 and 430×932 across all five categories, category resets, all navigation methods, active-thumbnail reveal, horizontal drag guards, reduced motion and no document scroll changes. Actual-frame accounting retains 100svh; the main image remains at least 335×303 in the requested safe-area cases after adding the thumbnail row. The existing dropdown, desktop Gallery, image source/focal data, booking and main section navigator are preserved. Desktop has no thumbnail strip. HTML/ARIA and CSS integrity checks pass. Browser screenshots/real-device rendering remain unverified under the existing session browser-access restriction.


## Gallery mobile centered slider — 2026-10-30 (current)

The prior mobile masonry composition is superseded by a centered editorial introduction, one rectangular category selector, one large selected image, overlaid circular previous/next controls and a compact row of pagination indicators. The mobile Gallery booking CTA is hidden. The section remains exactly 100svh with a 100vh fallback, and reserves the existing fixed booking bar's clearance. Desktop keeps its original tabs, all masonry slots, cursor-follow and booking CTA.

The selector reuses the five original category buttons/data through a mobile listbox disclosure; there is no duplicate service navigation. The shared Gallery controller still owns filtering, image preloads/race/error handling, selected-photo state and the native expanded viewer. Pagination contains real photos only, preserves each catalog image/crop/zoom, and keeps a fixed 44px row so filtering never changes frame height. Touch swipes change one image; vertical drags remain with the page navigator and cannot accidentally open a photo. Keyboard navigation, Escape, outside/resize dismissal, listbox input isolation, short-viewport menu positioning and reduced-motion behavior are supported. Returning to desktop restores tab roles and original panel labeling.

Modeled integration checks pass at 375×812, 390×844 and 430×932 for all five categories, prev/next, direct pagination, touch swipes, modal open/close, keyboard, error rollback/retry, mobile/desktop mode switching and menu isolation. Actual local-font/geometry checks confirm centered heading/three-line text, dropdown labels, six 44px indicator targets and the image frame fit with zero/default and 44px/34px safe areas. The image frame ranges from 335×367 to 390×536 across the requested portrait cases. Additional 375×667 and 375×568 geometry checks pass. Existing section snapping/desktop Gallery/booking regression tests pass. No new dependency or build tool was added. Direct browser screenshots and device rendering remain unverified under this session's existing browser-access restriction.


## Gallery mobile single-screen reconstruction — 2026-10-30 (current)

At up to 47.5rem, Gallery is an exact 100svh scene with a 100vh fallback, one full-width editorial introduction and a minmax(0,1fr) masonry field. The old desktop placement, 620px image minimum, overscan and large mobile padding are explicitly overridden. No nested scrolling or new navigator is used. The original desktop styles and Gallery JavaScript are unchanged.

The introduction keeps the uppercase eyebrow, gold/ivory serif heading, three-line supporting text, all five service filters and booking CTA. The compact CTA occupies the unused sixth cell of a three-column/two-row control area. Filter buttons remain 44px tall; a narrow-phone fallback uses two columns. Gallery fills the entire remaining height directly below the introduction. All 12 original slots remain visible in a two-column asymmetrical 11-unit masonry; actual photo slots receive larger spans. Existing source images, focal positions, zoom/origin data, placeholders, filtering, viewer, keyboard controls and reduced motion remain intact. A lighter phone entry uses 8px movement and shorter image/filter delays within the existing once-only activation logic.

Modeled checks pass at 375×812, 390×844 and 430×932, including safe-area variants, all five filters/all twelve slots, photo viewer/close, keyboard filtering, booking, native dialog isolation and next/previous section landing with no settled next-section peek. Actual-font and box geometry checks account for the complete section height, title/filter/CTA fit, >=44px photo-link targets, no overlapping masonry boxes and no horizontal overflow. The image zone remains more than half the viewport at the three requested portrait sizes, even with 44px/34px safe areas. Additional 375×667 geometry passes. Browser screenshots and iOS/Android rendering remain unverified under the session's local-browser access restriction.


## Treatments mobile photographic rows — 2026-10-30 (current)

The thumbnail playlist below is superseded by five full-width background-image rows at up to 47.5rem. The original image element becomes an absolute, cover-fitted layer; its source and existing object-position rules are unchanged. A two-layer dark gradient protects left-aligned index, title and description while revealing photographic detail toward the right. The champagne arrow is a 44px target. Thin separators, restrained brightness on hover/press/focus, immediate row visibility and reduced-motion handling remain phone-only. There are no thumbnail tracks, new image containers, card stacks or inner scrollers.

The section remains one dynamic viewport, with five equal rows and clearance for the fixed booking CTA. Row content includes safe-area and short-phone adjustments. Both the row and arrow open the selected service's detail modal on phones; the selected-service booking CTA inside that modal and global/fixed booking actions retain their existing flow. Tablet/desktop service arrows still book directly. Accessible arrow labels follow the mobile breakpoint.

Modeled tests pass at 375×812, 390×844 and 430×932 for all five row/arrow detail routes, selected-service booking, fixed booking, swipe/click suppression and forward/reverse section navigation. Actual-font geometry checks pass with default and 44px/34px safe areas, plus 375×568. Visible copy, image attributes, desktop styles, section navigator and service data are preserved. Browser screenshots and real-device rendering remain unverified because browser access is restricted in this session.


## Treatments mobile playlist — 2026-10-30 (current)

The editorial deck below is superseded by a single-viewport, five-row playlist at up to 47.5rem. Rows and subtle champagne dividers span the full section width. Existing photographs become left thumbnails with original crop positions, titles/descriptions occupy the center, and existing booking arrows remain 44px targets on the right. Whole-row detail surfaces are unchanged. All five rows display immediately; oversized-card reveal effects and deck overlap are suppressed only on phones. Rows have subtle pressed/focus backgrounds. The fixed booking bar and safe areas have reserved space.

The former per-card scroll destinations are removed. The existing 900ms mobile/desktop section navigator is restored unchanged from before the deck, so one mobile swipe moves from the complete playlist to Gallery. No inner scroll container or new dependency is used. Desktop layout/entrance and service catalog/submission logic are unchanged.

Verified with modeled interaction checks at 375×812, 390×844 and 430×932: all five detail routes, all five booking routes, and forward/reverse section handoff. Actual local-font metrics confirm title/description fit and equal row heights with zero/default and 44px/34px safe areas; an additional 375×568 short-phone case also passes. Source checks confirm unchanged copy/image attributes and valid CSS/HTML/ARIA. No direct browser screenshots or real-device validation were performed due to the existing session browser-access restriction.


## Treatments mobile editorial deck — 2026-10-30

At up to 47.5rem, the five original service articles form a full-bleed sticky deck. Both section and photo track have zero horizontal padding, no width cap and no inner scrolling. Only captions retain the site's gutter. Cards overlap by 28px; successive cards have ascending layers. The next photograph has a 64px visible preview above the fixed booking bar at the tested portrait dimensions. The final photograph fills the viewport tail; safe-area clearance and caption baselines remain consistent. Original photos, object positions, copy, card detail buttons and booking arrows are unchanged.

The shared 900ms section navigator measures the actual card stride and lands on each service in sequence. There is no new wheel/touch listener. Reverse navigation, Gallery handoff, keyboard focus, interrupted-position settling, viewport reflow, reduced motion and independent dialog scrolling use the same controller. Tablet and desktop composition remain unchanged.

Automated geometry/interaction checks pass at 375×812, 390×844 and 430×932 for all five detail modals and booking actions. Source checks confirm unchanged visible content/image attributes, valid HTML/ARIA and balanced CSS. Direct browser screenshots were not captured because local browser access remains restricted in this session; on-device visual verification is still needed.


## Mobile stacking restoration — 2026-10-30

The mobile native-scroll recommendation below is superseded by the approved requirement to preserve cinematic section navigation. `stacking.js` now handles mobile and desktop gestures through the same 900ms controller. The responsive `position:relative` override and width/coarse-pointer bypasses were removed. Mobile retains the original sticky section layers, one-transition-per-touch lock, and existing long-scene reading ranges. The newly vertical service cards remain in document flow; no inner vertical scroll container was added. Short service scenes have a 100svh minimum.

Mobile vertical pan ownership is restricted to `#main`; horizontal component gestures and pinch zoom remain available. Native dialogs retain their own scrolling, boundary containment, input controls, focus and background locks. Visual viewport changes remeasure destinations without prematurely ending mobile transitions, and preserve settled/long-content positions. Desktop timing, easing and resize behavior remain unchanged. Service/Gallery/Testimonials entries use the shared settled section state on mobile as on desktop.

Verification: modeled DOM gesture suites pass at 375×812, 390×844 and 430×932, including forward/reverse swipes, held-touch and wheel-tail gating, modal boundaries, horizontal gestures, pinch/jitter exclusion, dynamic viewport changes, long service content and reduced motion. Desktop navigation and section-entry regression suites pass. These are automated behavior/source checks; direct iOS Safari/Android Chrome rendering and touch performance still require device verification. This static site has no build command or package dependencies.


## Scope and design

The current Van.Nails identity is retained (the earlier brief calls it Maison Nacre). This is an in-place responsive refinement: the same Cormorant Garamond/Gilroy pairing, champagne accents, dark surfaces, photographs, marketing copy, five sections, category filters, image viewer, six authored testimonial cards and booking submission contract remain. No dependencies, assets, build tools or deployment changes were introduced. All original image/font bytes were verified unchanged. The initial selected testimonial remains the third card.

## Implemented changes

| Area | Finding | Implemented refinement |
| --- | --- | --- |
| Header/navigation | Mobile disclosure was cramped, with no managed focus or background isolation; desktop-style navigation persisted on tablets. | At up to 64rem, use the existing disclosure as a spacious dark panel with 44–48px targets, first-link focus, Tab cycling, Escape/outside-click close, inert background and scrollbar compensation. Restore normal page interaction before booking. |
| Hero | A reserved icon rail compressed heading/action content; supporting text was 8px on phones; old minimum heights forced excess blank space. | Give the headline the full copy track, put supporting text above the booking action, align icons in the bottom action band, use legible type and a content-driven full-screen minimum. Retain the same image focal-position data and desktop choreography. |
| Services | Five narrow tablet columns made titles/subtitles cramped. | Extend the existing horizontal photo rail through tablet widths, show a visible next-panel preview and keep all five panels, click surfaces and arrow actions. Readable captions and touch targets; center-out entry still works with native vertical reading. |
| Gallery | A narrow description/category split and fixed desktop side panel constrained phone/tablet text. | Single editorial column on phones, two-column category list, a compact editorial/tabs arrangement on medium tablets, and a two-column masonry below. Larger image cells, bounded fades and preserved categories/placeholders. Keep desktop cursor-follow; suppress it where columns become a mobile composition. |
| Gallery viewer | The photo viewer did not independently lock the underlying document. | Add background locking/restoration, retain native dialog focus/keyboard behavior, and fit the image plus navigation within a viewport-bounded frame on small screens. |
| Testimonials | Mobile text/card geometry was cramped; tablet atmospheric rendering used the desktop pixel budget. | Make the active card readable with restrained edge previews, retain tap/swipe/buttons/keyboard navigation, increase quote line height, reduce small-screen canvas/DPR density and pause decorative rendering behind dialogs. Preserve the desktop 3D arc. |
| Booking CTA | Desktop cover-scale hand positioning enlarged the cutouts excessively on tall phones and risked overlapping content. | Add a dedicated responsive artwork band. Uniformly scale and align the original cutouts at the fingertip inside that band, between heading and booking/contact controls. Use one-column contact details on phones, three columns on larger tablets. |
| Service detail modal | A two-column modal persisted too far into tablet widths. | Use a single image-first column below 60rem, preserve image crossfade/thumbnails/arrows, retain compact highlights and paired Zalo/booking actions, and keep the close toolbar accessible while detail content scrolls. |
| Booking modal | Software keyboards can shrink the visual viewport without changing CSS media height. | Follow visualViewport height/offset, preserve the fixed action footer, collapse the decorative preview temporarily in short viewports, use 16px inputs, and keep focused fields inside their own scroll region. Existing four steps, range selection, retry/data retention, demo/confirmed success and future-backend receipt handling remain unchanged. |
| Footer | A legacy rule hid every footer paragraph below 1100px, including contact text. | Restore all paragraph content, keep the existing column rhythm, enlarge interactive rows and reserve space for the mobile booking bar. |
| Vertical navigation | Gesture-triggered section navigation conflicted with tall mobile sections. | Native vertical scrolling at up to 64rem and on touch-only/coarse devices; retain 900ms desktop stacking. Cancel in-flight animation when switching modes. Horizontal gallery/service interactions remain independent. |

## CSS/interaction architecture

A final `dist/responsive.css` adapter reuses the existing design tokens and component hooks. It avoids restyling the desktop composition above 64rem. The global exceptions are overflow-x:clip, restoration of footer paragraph display, and the desktop-hidden artwork spacer. The responsive behavior uses 64rem for compact navigation/native reading, 60rem for stacked gallery/dialog composition, and narrower phone rules at 47.5rem/40rem. The stylesheet retains the approved italic champagne emphasis.

Changes to existing JavaScript are limited to capability-aware navigation, responsive entry activation, menu/viewer focus and scroll restoration, visible modal sizing, hand geometry and small-screen atmosphere budgets. No booking service data or submission API contract was changed. `booking-core.js`, `booking-submission.js`, `service-catalog.js` and `service-detail.js` remain unchanged.

## Verification performed

**These are source, actual-font metrics, geometry and modeled-DOM checks. They are not browser screenshots or a full rendering test.** Local browser inspection remains unavailable under the session's earlier local-file access restriction; no alternate browser/controller was used to bypass it.

| Width | Assumed test height | Checks performed |
| --- | --- | --- |
| 375px | 812px | Font-fit measurements, native scroll/key/touch handling, mobile menu/booking handoff, modal viewport resizing, carousel navigation, hand-band geometry. |
| 390px | 844px | Same checks, plus short visual-viewport/keyboard state and reduced-motion components. |
| 430px | 932px | Same checks, including the wider phone copy track. |
| 768px | 1024px | Tablet reading mode, headline/action metrics, modal flow and artwork positioning. |
| 1024px | 768px | Compact navigation/native reading, tablet gallery heading fit, keyboard/modal behavior and canvas budget. |
| 1440px | 900px | Existing 900ms stacking/momentum behavior, modal flows and original desktop hand geometry. |
| 320px (additional) | 568px | Actual-font heading/navigation/action/footer fit and narrow-source checks. |

- All 15 JavaScript files pass Node syntax checks.
- 17 modeled interaction/geometry suites pass, including all booking steps/entry points, preserved data on Back/retry, backend acknowledgment gating, duplicate/late response guards, service/gallery entrances, image filtering/viewer behavior, hero/canvas lifecycle, carousel projected-card selection, native/stacked navigation mode switching and hand alignment.
- HTML IDs/ARIA references/local assets and CSS delimiters pass source validation.
- Text is preserved except a screen-reader hint updated to describe both native and stacked scrolling.
- All existing photographs/fonts are byte-identical to the pre-audit snapshot.
- Real project fonts were measured with Pillow to check heading, navigation, category, footer and paired-action fit at the requested widths.
- This project has no package.json, dependencies or build command. `dist/` is already the runnable static website; no npm build was invented or required.

The checks use retained harnesses under the workspace `work/` folder; those local QA tools are not production dependencies. Detailed measurements are in `work/responsive-audit/viewport-report.json`.

## Manual visual/device verification still required

1. At all six requested widths, review actual rendered wrapping, image crops/focal points, spacing, masks and side-card depth; source/font checks cannot prove painted layout or absence of every overflow.
2. On iPhone Safari and Android Chrome, open the menu, swipe the service rail and testimonials, switch every gallery category, open/close the image viewer and open every service detail.
3. Complete all four booking steps with the software keyboard visible, rotate the device, test safe areas/browser chrome and verify that focused fields and bottom actions stay reachable.
4. Test browser zoom/text enlargement and 200% text scaling, especially header/menu, category labels and paired modal actions.
5. Confirm the 1440px desktop composition against the approved version and check scroll-stack transitions in both directions. The desktop behavior is covered by regression models, not a screenshot comparison.
6. Use a real browser performance panel to check low-end-phone frame pacing; canvas budgets and offscreen/modal suspension are verified by model, not physical-device profiling.

The current booking completion remains a frontend demonstration until a real backend is configured. Responsive work does not activate email delivery. This audit does not publish or push a release.

Exact pre-change runtime snapshot: `work/responsive-audit-before/`.
