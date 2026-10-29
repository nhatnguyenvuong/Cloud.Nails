# Cinematic hands scene

The fifth main section, the booking CTA (#visit.hands-scene), uses an independent background plate and two RGBA hand cutouts. The existing booking button and contact details are retained. The fourth section is a separate manual 3D testimonial carousel. All assets were prepared with the built-in ImageGen tool from the supplied reference; they are illustrative concept images. The third section (#gallery) is a separate floating photo gallery, with no hands animation.

## Saved assets
- dist/assets/creation-background.png — static background, 1672 × 941.
- dist/assets/creation-left.png — transparent left hand, 1672 × 941.
- dist/assets/creation-right.png — transparent right hand, 1671 × 941.

## Sequence
- 0–3.78 s: slow approach; the final 10% of the 4.2 s hand animation holds the contact position.
- 3.78 s: small golden contact light begins.
- 3.88 s: controlled radial flash, 1.25 s duration.
- 3.95 s: heading reveal begins; 4.15 s: booking/contact reveal begins.
- 5.25 s: final reveal ends and separate 13/15 s breathing rotations begin.

The fingertip coordinates are measured from the cutout assets. Geometry follows object-fit: cover and recalculates on section resize. Each hand rotates around its fingertip during the breathing loop, so the contact stays aligned. The background is never transformed. The hand component has no scroll handlers. Shared gesture navigation animates document positions to complete sticky stacking transitions.

Reduced motion shows the final composition immediately, with no approach, flash or breathing. Offscreen and hidden-tab animations pause. Keyboard focus bypasses the reveal. A loading/error fallback prevents text and controls from remaining hidden.

## Separate photo gallery
The gallery is now image-only: no numbered eyebrow, craft footer, visible count/caption or image-hover labels/icons. The heading, short description and five service tabs remain. The right image component stretches to the section height. Its stationary top/bottom mask fades the larger moving composition; desktop overscan is 24% vertically and 12px horizontally, beyond the 44px maximum fixed column offset plus 11px cursor travel (7px horizontally). Taller photo proportions continue behind these edge fades. Mobile uses two columns and disables cursor following.

Each group reserves six cells. Available image counts are 2/6/6/3/4. Transparent hand cutouts are no longer displayed in this gallery; missing slots use plain warm-neutral placeholders. No new image files were created. Placeholder elements have no source URL or link, are not keyboard stops, and are excluded from enlarged-image navigation. Accessible image labels and hidden category/error announcements remain. The actual image viewer and service tab switching are preserved, including stale-request protection, failure/retry and reduced-motion behavior. The hand CTA, marquee and shared section controller are unchanged.

Source/logic checks passed for placeholders, no missing image requests, category filtering, real-photo-only viewer navigation, async races/retry, keyboard isolation and parallax bounds. All non-gallery runtime files and image hashes match the saved baseline. Direct browser rendering remains unverified in this session.

## Manual testimonial carousel
The fourth section now follows a centered editorial header and a curved full-bleed review-card composition. Six existing sample reviews are shortened and reused with the existing local photos, customer names and service labels. A centered active card is brighter and closer; surrounding cards scale down, rotate in Y and recede in Z, with cropped outer previews. One aria-hidden, nonfocusable edge preview repeats existing content for symmetry, without adding a review. No new images or dependencies are used.

Navigation is manual: previous/next, side-card selection, left/right/Home/End keys on the card group and horizontal touch swipes. Counter and progress reflect the active item. CSS transforms transition for 760 ms; wrapped edge cards are rebased outside the focal area with stale-frame protection during rapid input. There is no autoplay. Keyboard vertical keys and vertical touch input remain with the unchanged global section controller.

On first section activation, the existing normal-flow section origin and covered-state class gate a one-time intro: heading, focal card, outward fan, then controls, completing in roughly 1.25 seconds. Focus or navigation skips the intro without blocking controls. Reduced motion opens the final layout immediately and changes selection without transitions. Mobile uses fewer visible cards and simpler flat transforms. The global stacking controller and all other sections are unchanged.

Mocked interaction checks passed for cyclic navigation, side/edge preview selection, index/progress, rapid wrapping, keyboard/focus, touch direction separation, entry-once, reduced motion and no autoplay. Source hashes confirm only index.html, testimonials.css and testimonials.js changed. Font metrics and focal-card geometry were checked at sampled phone/tablet/desktop sizes; these are not browser rendering/playback checks.

## Verification
Passed automated interaction-logic checks for initial entry, reveal completion, one-time playback, asset failure, delayed loads, focus bypass, reduced motion, and visibility pauses. The separate gallery passed mocked interaction checks for bounded cursor follow, hover tilt, settling, reduced motion, touch exclusion, image viewer, focus return, keyboard navigation and vertical-gesture pass-through. Section order, unchanged surrounding sections and unchanged snap styles were checked against the saved page. Asset alpha and fingertip geometry were checked. This is not a browser playback test: this session's browser tool blocks observation of the local file URL, so visual timing and touch/scroll behavior remain unverified in-browser.

## Original generation prompts
### left
Transparent output: true

Use case: background-extraction. Extract ONLY the left-side hand and forearm with its existing gold jewelry and the black fabric belonging to the left sleeve from this supplied composition. Output a genuinely transparent RGBA PNG cutout. Preserve the original 1672 by 941 canvas aspect ratio, original placement, scale, pose, lighting and photographic details exactly: left arm enters upper left; index fingertip points toward the canvas center near x830,y460. Remove the right hand, all background, all text, all circle/line graphics and all glow. All pixels except this left arm, hand, jewelry and sleeve must be transparent, including the entire right half. No replacement objects, no added fingers. This is one independently animatable layer for a professional nail salon website.

### right
Transparent output: true

Use case: background-extraction. Extract ONLY the right-side hand and forearm with its existing gold jewelry and black fabric belonging to the right sleeve from this supplied composition. Output a genuinely transparent RGBA PNG cutout. Preserve the original 1672 by 941 canvas aspect ratio, original placement, scale, pose, lighting and photographic details exactly: right arm enters lower right; index fingertip points left toward canvas center near x865,y470. Remove the left hand, all background, all text, all circle/line graphics and all glow. All pixels except this right arm, hand, jewelry and sleeve must be transparent, including the entire upper left region. No replacement objects, no added fingers. This is one independently animatable layer for a professional nail salon website.

### background
Transparent output: false

Use case: precise-object-edit. Prepare a clean background plate for this supplied luxury nail editorial composition. Remove BOTH hands, forearms, all jewelry, fabric sleeves, all text, the circle outline, vertical lines and contact light. Reconstruct only a quiet nearly black warm charcoal background with extremely subtle soft smoky material texture and deep espresso shadows. Preserve the source 16:9 canvas proportion. No hands, no objects, no lettering, no light point, no circular graphics. This plate must remain static behind separately animated hand cutouts.

## Gesture-triggered sticky stacking
The existing section content and all component code remain unchanged. stacking.js inserts zero-height, aria-hidden origins before the five sections to measure natural layout positions even while their sticky boxes overlap. CSS retains the increasing z-index layers and disables native smooth-scroll interpolation while the controller writes its own eased positions.

Each accepted vertical wheel burst triggers one autonomous 900 ms cubic-bezier(.76,0,.24,1) animation. A 240 ms idle boundary and a per-burst latch consume the momentum tail, including events after playback; input during playback is discarded rather than queued. A fresh burst after playback is accepted without an extra cooldown. There is no exact physical trackpad gesture API, so real-device tuning remains advisable. Forward gestures land on the next scene's start, reverse gestures on the previous scene's readable end. Tall-scene overflow is paged within the scene before changing scenes. The footer is a reachable final landing.

Keyboard keys, directional touch gestures, fragment links and focus restoration use the same endpoints. Horizontal gestures, form controls, nested scroll regions, native modal input and zoom are excluded. Modal overscroll is contained. Resize or a newly enabled reduced-motion preference finishes at the recalculated endpoint; reduced motion otherwise lands immediately. Stranded intermediate positions settle after external scrolling ends. Covered CSS loops remain paused and mobile booking visibility follows the visible scene.

Automated mocked-controller checks passed for completion from a single event, easing midpoint, a two-second momentum stream without a second transition, locking/no queue, up/down, keyboard/repeat/focus, horizontal/zoom exclusions, vertical/horizontal touch, modal/nested input, tall sections, footer, reduced motion, line/page wheel modes, aborted touch, resize, fragment links and scrollbar settling. Gallery, marquee and hand-logic regression checks passed. These are source/logic checks, not browser playback or hardware gesture tests. Direct local-file browser observation remains unavailable in this session.

## Corrected left-hand anatomy
The previous correction was rejected for fused lower fingers. The CTA now uses creation-left-five-fingers.png (1672 × 941), with an outward thumb and three separated relaxed fingers. Updated contact coordinate: (934, 563). See HAND-EDIT-NOTES.md for the ImageGen edit/placement prompts. The right hand and animation code are unchanged.

## Static testimonial studio atmosphere
The existing testimonial styles remain intact. An appended, section-scoped screen-only background uses near-black/deep-espresso gradients and a broad low-alpha champagne-brown radial source around the focal card's position. Static negative-z pseudo-elements add faint wide corner beams, a flat diffused floor shadow and a subtle edge vignette. Their pointer-events are disabled. The section's existing isolation and clipping contain the layers; no parent transform, opacity, filter or carousel z-index was changed. Mobile adjusts light origins/grounding position without changing any content dimensions. No background animation, grain asset or dependency is added, so reduced motion remains static.

Source verification confirms that testimonials.css is the only changed runtime file and its previous contents remain an exact prefix. Existing carousel logic checks pass. Visual browser rendering has not been verified in this session.

## Testimonial card pointer selection
The perspective stage is pointer-transparent, while visible card buttons remain pointer targets. A click capture listener on the clipped review window resolves the currently painted card polygon from the live computed CSS matrix, transform origin and stage perspective. It prioritizes the existing card z-index and uses transformed client bounds as an older-engine fallback. This also handles clicks landing on the flat parent plane instead of a recessed negative-Z card. The decorative edge preview forwards to its real review. Native keyboard button activation stays on its existing path; touch swipes suppress their following click, and selection focuses the real card without scrolling. Geometry, content, transition timing, background and global navigation remain unchanged.

Syntax and simulated interaction checks passed for projected side/edge cards, overlap priority, blank corners, hidden mobile cards, keyboard activation, taps, swipe-click suppression and reduced motion. These are source/mocked checks; browser rendering and real device input have not been verified in this session.

## Current testimonial studio sequence (supersedes static-only atmosphere)
The existing carousel's geometry, content, typography and selection logic remain. Only testimonials.css and testimonials.js changed; no new assets, libraries, DOM wrappers or global scrolling changes. One absolute, aria-hidden, pointer-transparent Canvas is inserted behind the perspective stage between the light and vignette layers inside the existing isolated section.

First entry waits for the shared normal-flow section origin, uncovered class and end of is-section-transitioning. The root/class observer catches the precise transition completion even if no further scroll event arrives. CSS reserves all layout dimensions while opacity/visibility animate. Timeline: darkness 0–400ms; dust/light fade 400–1200ms; focal card 900–1550ms; successive card distances at 1000/1100/1200ms, settling by 1700ms; heading 1300–1800ms; controls and sample note 1700–2000ms. Card entrance transforms settle into exactly the existing desktop/mobile poses. Carousel interaction or early focus skips the intro. Leaving midway finalizes it; return never replays it. Nothing delays or intercepts vertical navigation.

The particle renderer uses a cached soft radial sprite, 24 mobile / at most 68 desktop particles with low opacity, mixed depths, subpixel radii, slow 0.35–2.7px/s motion and two sparse diagonal flows. It caps drawing at 24/30fps and DPR at 1.5/2. No full-frame blur, image asset, glitter shapes, trails or additive bloom. Existing corner lighting is subtly enriched; an 18s low-amplitude CSS opacity/scale breath remains behind all content. Corner vignette and diffused floor shadow stay static. Reduced motion shows the finished UI immediately, stops lighting animation and draws only 10/18 static dust points. Canvas failure retains CSS lighting and all carousel functionality.

Scroll/class/visibility checks pause rAF and CSS lighting outside the active section. ResizeObserver updates dimensions/DPR; pagehide/pageshow handles BFCache without replay. Section removal or a non-persisted pagehide disconnects observers, removes component listeners and Canvas, clears timers and every queued component animation frame. No permanent off-screen rendering loop.

Syntax/source checks and mocked interaction/lifecycle tests passed: exact runtime-file scope, preserved core geometry/mobile rules/click projection, first activation after global transition, two-second deadline, interruption/return, density/DPR budgets, resize, hidden-tab pause, reduced-motion toggling, canvas fallback, BFCache and teardown. Existing card selection, arrows, keyboard/focus, swipe suppression and global gesture-navigation tests also pass. These are source and simulated checks; live browser visuals/device performance remain unverified because local browser access was blocked in this session.

## Updated gold-reference background and brisk opening (current)
The user's supplied PNG is now the full-cover testimonial backdrop, behind the existing carousel and Canvas. It keeps the supplied gold dust, side lighting and warm ribbons intact, with a very light tonal overlay and existing vignette. No new image generation. Final background opacity is .90, breathing to .97 over 18s; reduced motion is static.

This supersedes the previous 2s timing: black 0–90ms; moving dust fade 90–540ms; background image fade 90–690ms; central card 560–1020ms; neighbors start at 630/700/770ms and finish by 1170ms; typography 830–1190ms; controls 1050–1300ms. The full composition settles at 1300ms. Dust radius and opacity are increased slightly for clearer visibility, keeping the same count, DPR, pause/cleanup and device budgets. Existing carousel navigation duration remains 760ms.

Verified source scope: only testimonials.css, testimonials.js and the supplied background image changed in dist. Source checks preserve card geometry, click code and global navigation. Updated simulated opening/lifecycle, carousel and click-hit tests pass. Browser rendering has not been directly verified in this session.

## Gallery bento density and edge integration
Gallery-only HTML/CSS update: the heading uses two nonwrapping phrase spans with font size tied to the editorial container width; mobile places it across both content tracks. The existing three parallax columns each hold four tiles (12 total), with asymmetrical four-row proportions. Mobile reflows all slots into two nonoverlapping columns across 18 tracks. Each service retains its original first six image entries; six additional placeholder entries provide future photo capacity. No images were generated or substituted, and gallery.js is byte-identical.

Fixed, pointer-transparent left/right pseudo-elements on edit-gallery-panel fade into the section's exact #0b0b0a background, complementing the existing top/bottom mask. They do not move with the columns or obstruct clicks. Desktop overscan is 80px vertically and 12px horizontally, exceeding every existing column offset/parallax bound; mobile overscan is 40px vertically with no cursor-follow.

Source scope, unique IDs, 12-slot catalogs/markup, preserved image metadata, mobile track coverage, actual local-font heading widths at 320–2560px and overscan bounds passed. Existing gallery simulations pass filters, real-photo-only viewer, placeholders, async race/failure handling, keyboard, cursor-follow, touch and reduced motion. Live browser rendering remains unverified in this session.

## Current CTA entrance timing: brisk reveal
Only the existing six CSS entrance timing declarations changed: approach 1.2s (rest at 90%, 1.08s), contact .8s at 1.08s, flash .6s at 1.11s, aura .8s at 1.13s, heading .45s at 1.16s, footer .48s at 1.28s. All CTA content is revealed by 1.76s, compared with 5.25s previously; residual aura settles by 1.93s. The 13s/15s subtle breathing loops remain unchanged. Existing animationend completion, reduced motion and all hand alignment code remain byte-identical.

Removed the upper numbered eyebrow and lower demo/AI disclaimer paragraphs from the CTA, as requested. Runtime changes are limited to hands.css and those two HTML blocks. Existing hand logic tests pass (alignment, once-only entry, completion, pause/resume, focus bypass, reduced motion and asset fallback). Actual browser rendering has not been verified in this session.

## Current hero: left-aligned copy and automatic backgrounds
The last heading line loses its indentation and trailing period; all three lines share the same size on mobile. Supporting copy is in normal flow below the heading, followed by the existing booking button. Bottom padding is reduced to reserve a clear area for the existing centered scroll cue. The right-side image picker/counter are removed.

The three existing decorative photos crossfade using their existing .8s opacity transition after five active seconds. Alternate images load eagerly and decode before activation; failed images are skipped while the current photo remains visible. Timers stop offscreen/under the stacked scene, during section transitions, while the tab is hidden, while a dialog/menu is open and under reduced motion. No image counter/live announcements or new controls. BFCache suspends/resumes; DOM removal/nonpersisted pagehide clears timers, observers and listeners. Existing menu/booking/mobile bar/global navigation logic is unchanged.

Syntax, mocked autoplay/pause/error/async/BFCache/cleanup and global section gesture checks pass. Actual local-font heading measurements fit 320–2560px. Browser rendering remains unverified in this session.

## Hero action row, slower background and contact channels (current)
Heading and action row share a desktop intrinsic-width grid track; inline-size containment prevents the supporting row from expanding the heading's width. The row uses space-between. Mobile uses the full heading block width with smaller type/button metrics so both items remain on one row. Social contacts stay separate: bottom-right on desktop, in flow below the content on mobile to avoid the centered scroll cue. Zalo points to the supplied 0933303282 number; Messenger is disabled pending the actual page link.

The background interval is now 8000ms with a 1.8s opacity transition. Other image lifecycle, pause/reduced-motion and cleanup behavior is unchanged. Runtime changes are scoped to hero HTML/CSS and the two timing literals/comment in script.js. The 8s autoplay simulation and heading/action row font-metric checks at 320–2560px pass. Live browser rendering remains unverified.

## Current Gallery editorial entrance
Runtime scope: gallery.css and gallery.js only. No HTML, image/catalog, font, layout, global navigation or other component change. Existing Gallery CSS remains an exact prefix. Opening uses extra section classes and per-card/per-tab delay variables; existing parallax transforms stay on columns, while opacity/clip-path/22px translate/.985 scale live on cards. All opening transforms/clips disappear when the reveal settles.

Activation reads the shared navigator's is-section-navigation, is-section-transitioning and is-stack-covered state: the preceding scene must be covered and Gallery uncovered after the transition. MutationObserver observes those classes and structural lifecycle changes. No new scroll listener or IntersectionObserver triggers the opening; the existing IO remains solely for parallax reset. No global navigation change.

Timeline (1700ms): heading 0–400ms, supporting copy 60–490ms; center column starts at 400ms, left at 500ms, right at 580ms; each following tile adds 55ms, with a 540ms restrained reveal (all done by 1285ms). Tabs start at 900ms + 75ms per item, duration 300ms, ending by 1500ms. Active indicator appears 100ms after its tab with a 240ms scale/opacity transition. A pointer-transparent espresso/champagne radial layer behind the stage peaks softly during the reveal, then reaches .06 opacity by 1700ms; no particles or new visual UI.

Prewarming reuses loadImage and its cache, then decodes actual initial card images where supported. First active entry allows at most 100ms for remaining preparation; slow/failed loading settles immediately instead of hiding controls indefinitely or starting a partial photo reveal. Intro runs once. Category selection, pointer input, child focus, reduced motion, leaving the active scene or hidden/page lifecycle settle immediately; no scroll lock or input interception. Ending disconnects new observers/listeners and clears opening timers/frames. Cursor-follow resumes from neutral using the original easing/bounds on the next movement.

Syntax and mocked tests passed for shared-state activation, no premature reveal during the transition, center-first timing, image preparation/fallback, once-only completion, leaving/reentry, tabs/viewer, cursor gating/resume, focus/touch bypass, reduced motion, hidden tabs and teardown. Existing Gallery behavior and global gesture-navigation regressions pass. Source checks preserve geometry/typography/catalog and all unrelated files. Live browser rendering has not been verified in this session.

## Current Treatments opening: center-out reveal
Only services.css, new services.js and its deferred script inclusion changed. Original services.css is an exact prefix, so the five-panel grid, original photo crops, index/copy/button styles, mobile horizontal scrolling and image hover zoom remain intact. All section HTML, assets and unrelated components are unchanged.

The local controller consumes the existing navigator's is-section-navigation, is-section-transitioning and is-stack-covered classes using MutationObserver, with Hero as the preceding scene. It does not listen to scrolling or claim input. First active entry runs once; leaving, early focus/pointer interaction, hidden/page lifecycle and reduced motion finish immediately and disconnect opening observers/listeners/frames/timers. Photos warm using their existing DOM images/decode, with a bounded 100ms active-entry grace; failed/late preparation skips the decorative reveal rather than holding content invisible. No navigation support also falls back to the complete section.

1400ms timeline: rank = distance from the middle panel. Images start at 300ms + rank*120ms and reveal for 440ms (center 740ms, adjacent 860ms, outer 980ms completion). Parent panels use opacity, clip-path and 18px vertical translation; the inner photo retains its own original 1.035 hover scale/transition. Solid temporary per-panel shadows fade in the same window. Index/title/description reveal over 280ms beginning at 700ms + rank*100ms, with title/description offsets of 20/40ms, all complete by 1220ms. Indices preserve their original .8 opacity. Buttons fade over 190ms at 1010ms + rank*100ms, outer buttons ending at 1400ms. One pointer-transparent, low-alpha champagne gradient sweep runs 350–1100ms; it uses background-position to avoid enlarging mobile horizontal scroll overflow. All overlay content and opening transforms disappear on completion; the normal photo contrast gradient remains.

Mobile retains the same center-out timing without changing its scroll position or panel widths. Touch input can skip the reveal and continues to work as before. Reduced motion and print expose the complete section with no temporary overlay or sweep.

Syntax and mocked tests pass for shared-state activation, exact delay order/deadline, no replay, interruption, early focus/touch, reduced motion, asset readiness/failure/timeout, hidden tab/BFCache and cleanup. Existing service markup/booking-category checks and global gesture-navigation tests pass. Source hashing confirms scope and preserves all other components. Live browser rendering remains unverified in this session.

## Treatments timing refinement: earlier start, longer movement (current)
Removed the deliberate initial shadow hold. Panel delays are now 0/70/140ms from center outward; each panel reveal is 1200ms, while its dark overlay clears over 900ms with an early-responsive easing. Text starts at 120ms + rank*70ms (title/description +20/+40ms), fading/moving over 1000ms. Buttons start at 400ms + rank*70ms, fading over 1000ms. The gentle lighting pass starts at 0ms and lasts 1400ms. All panels finish by 1340ms, text by 1300ms and buttons by 1540ms; final cleanup is at 1600ms. This replaces the previous 300ms hold and 440ms panel movement.

Only timing expressions/declarations in services.js/services.css changed; activation, asset preparation, interaction bypass, layout, typography, hover and all unrelated files are unchanged. Updated timing/lifecycle and existing service markup/booking tests pass. Live browser visuals remain unverified in this session.

## CTA manicure assets (current)
The left layer now uses creation-left-lavender-gold.png (1672 x 941; index tip 974,579.5); the right layer uses creation-right-french-gold.png (1671 x 941; index tip 741,445). Both are RGBA edits of the existing hand layers, with one reference manicure per hand. Only CTA image sources/contact data changed, preserving the existing transform-origin alignment, approach, touch glow, content reveal, breathing and reduced-motion logic. See HAND-EDIT-NOTES.md for exact prompts and visual/metadata validation.

## Current CTA right layer
The right hand now uses creation-right-celestial-gold.png (1671 x 941 RGBA), index contact (730,442.5). The left lavender/gold layer remains unchanged. Only the right source and contact data in index.html changed; alignment, approach, glow, reveal, breathing and reduced-motion code remain byte-identical.

## Current right contact geometry
The corrected right asset is creation-right-celestial-profile.png, 1669 x 942, with index contact (737,447.5). Its smaller visible nail face follows the side-profile finger direction. Natural dimensions/contact metadata were updated in the image tag; hands.js, timing, glow and approved left layer remain unchanged.

## Current right contact: nude/pearl slim variant
CTA right asset: creation-right-nude-pearl-slim.png, 1671 x 941, tip (740,447.5). Only the image tag source/natural dimensions/contact attributes changed. Existing hands.js/hands.css, all timing, breathing, glow, scroll and approved left layer are unchanged. Alpha and cover-contact alignment pass at seven viewport sizes. Live browser rendering remains unverified.

## Current CTA: whole-cutout display geometry
Provided PNGs use object-fit:contain and a uniform individual scale around the measured index tip; hands.js distinguishes this from historical full-canvas cover images using data-render-scale/reference dimensions. Current display scale is 0.55 × reference for the left hand and 0.44 × reference for the right hand (20% smaller than its prior size). Each image scales uniformly around its fingertip; source pixels and the contact point remain unchanged. Source tips: left (1758,628.5), right (16,181.5). The reference scene remains 1672 × 941 and glow contact 50%,49%. Approach amplitude/angle use the original reference scale rather than contain scale. Timing and breathing keyframes remain unchanged; eight-aspect-ratio geometry and existing lifecycle checks pass. Browser visuals remain unverified.

## Sleeve-edge integration (current)
Approved sizes remain left 0.55/right 0.44. Shared contact X is clamped to the interval that places both sleeve canvas side edges outside the viewport (6px per 1000px width bleed, capped at 12px); Y remains 49%. Portrait layouts retain X=50%; wide layouts shift the complete pair and contact effects slightly right. Small source-aligned SVG masks feather only the lower fabric cutoff areas, without raster editing. Existing motion timing and fingertip origins remain. Eight-aspect-ratio edge/contact checks and legacy hand lifecycle checks pass.

## Current visibility repair
Supersedes sleeve-edge integration above: external SVG masks and the adaptive horizontal contact shift are removed. Contact/graphic return to 50%,49%; ring width/height are explicitly equal. Only right-sleeve edge blending remains, as inlined CSS gradients with no resource request. Fingertip regions stay opaque. Source images, 0.55/0.44 sizes and timing remain unchanged. CTA script/stylesheet references are versioned. Source/modeled checks pass; live browser visuals remain unverified.

## Current configuration: enlarge left instead of shrinking right
Right restored to original factor 0.55; left enlarged 25% to 0.6875. All sleeve masks/fades and their support variables removed. Alignment uses the clean centered geometry; ring stays explicitly square. PNG bytes and animation timing unchanged. Legacy hand lifecycle and eight-aspect-ratio actual-source geometry checks pass; live visuals remain unverified.

## Current extended right source
Right source is creation-right-provided-extended.png (2046 × 768), tip (55,184.5), render factor 0.79 to preserve the displayed physical hand span of the previous image. Left remains 0.6875. No CSS/JS change was required. Centered contact, approach, glow and breathing are unchanged. Eight-aspect-ratio geometry and source-canvas edge containment checks pass; live visuals remain unverified.

Current right display adjustment: extended right factor 0.79 → 0.74 (about 6.3% smaller); left remains 0.6875. Tip contact and all alignment/animation code remain unchanged.

## Hero campaign entrance (current)
Native CSS/JS 2.05-second first-load entrance, prepaint fail-open blackout, amber lighting/sparse dust, staggered line clips, then original composition. Parent image translate is separate from push-in scale and existing crossfade opacity. All other animation implementations remain unchanged. Detailed sequence, interaction escape, lifecycle/performance budgets, reduced-motion and validation limits: HERO-ANIMATION-NOTES.md.
