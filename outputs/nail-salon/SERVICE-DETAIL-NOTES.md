# Current booking integration

The old single-screen preview form has been replaced by the shared four-step flow described in BOOKING-FLOW-NOTES.md. Service inspection and booking are two views of the same #booking dialog; service-catalog.js is their shared data source. Service-select.js and service-calendar.js remain only for recovery/history and are no longer loaded. The current inline scheduler reuses the Vietnamese calendar/button styles. The history below describes earlier iterations.

---

# Service detail modal

The existing #booking dialog and #booking-form are reused as one data-driven editorial modal. Original script.js booking handlers still reset/open the form and preserve the preview-only behavior. New service-detail.js runs after script.js and supplies service-specific content, images, input validation, scroll lock and an animated close. No dependencies or image assets were added.

## Interaction and layout
- All five service panels and their existing arrow buttons open their corresponding service. Pointer movement guards against opening on a horizontal swipe. Original card imagery, captions, hover transforms and opening sequence are unchanged.
- Desktop: two columns with the featured image stretching to fill the left column above its thumbnail row, constrained viewport, internally scrollable content and a visible close toolbar. Tablet spacing reduces; <=720px stacks image, service details and form with a bounded image height.
- Three thumbnail choices per service; where there is only one appropriate photo, existing full and detail crops are reused. A two-image opacity crossfade handles selection. Version tokens ignore late loads; errors preserve the last successfully selected photo.
- The service tabs and their content have been removed at the user’s request.
- Secondary “Liên hệ Zalo” appears on the left and “Đặt lịch hẹn” on the right of one row, including on mobile. Zalo opens the existing https://zalo.me/0933303282 contact in a new tab.
- Native showModal provides focus containment and makes the page inert. Focus starts on the selected service heading and returns to the original booking control. Close button, backdrop and Escape dismiss. Opening uses a 460ms fade/scale/rise; close uses 180ms. Reduced motion removes these animations.
- Root overflow locks while open (no new body scroll container, preserving sticky ancestors); prior inline scrollbar compensation is restored on close/pagehide. Existing stacking.js recognizes dialog[open], so its wheel, touch and keyboard navigation yields to the modal without changes.

## Booking limitations
The site has no booking backend or live availability. Service, date, desired time, full name and phone are validated. Submission only shows a clearly labeled preview; no data is sent or stored, and no booking confirmation is fabricated. The note links to the existing salon Zalo contact for confirmation. Time choices are requested times, not verified free slots.

## Verification
Modeled DOM integration tests: all five services; full-card click and swipe suppression; shared booking opener; service changes retaining entered information; removed tab state and same-row Zalo link; focus return; close/Escape/backdrop; scroll lock cleanup; out-of-order/failed thumbnail loading; date/phone/required validation; preview wording; pagehide and reduced motion. Native focus containment and visual rendering remain unverified in a live browser due the earlier browser access restriction.

Existing gesture navigation, service opening, hero background and gallery opening model tests pass. Original body markup before the booking dialog is unchanged. Runtime modifications are limited to the shared booking markup, two asset references in the head, and service-detail.css/js. All images and pre-existing CSS/JS are byte-for-byte unchanged.

Backup: work/service-detail-before (index.html and original runtime hashes).

Image navigation: previous/next buttons overlay the featured photograph and wrap through the existing thumbnail set. Requested-image indexing handles rapid clicks; out-of-order responses cannot rewind the selection. Existing crossfade, thumbnail controls and error handling are retained. Modeled integration tests cover both wrap directions, fast navigation and switching between thumbnails and arrows.

## Branded dropdown menus
service-select.js enhances the two original select controls. Native selects retain names, required validation, values and input/change events; without this script, styled native controls remain available. Separate labels associate with keyboard-focusable combobox buttons. The option lists use listbox/option semantics, active descendant, selected state, Arrow keys/Home/End/Enter/Space, accent-insensitive typeahead, Tab/outside dismissal, and Escape that dismisses the list before the dialog. Touch scrolling is not canceled. Validation routes focus and inline errors to the visible proxy control while retaining native form validation. Reset/open/service changes synchronize displayed values. Menu height and direction fit the modal scroll viewport, with option navigation scrolling only its own list. Warm near-black surfaces, champagne borders/checks, Gilroy, sharp corners and reduced-motion styling match the website.

Modeled DOM tests cover selection values/events, service-detail synchronization, keyboard/typeahead, touch pointer behavior, single open list, Escape priority, outside/Tab dismissal, required errors/focus, upward placement, reset and close cleanup. Existing modal tests pass. Live rendering and assistive technology behavior remain unverified in the browser due the prior access restriction. No existing scripts, gallery, card effects, global navigation or images changed.

## Branded Vietnamese calendar
service-calendar.js progressively enhances #date while retaining its native value, required validation and input/change events. If enhancement is absent, the original date field remains available. A labeled calendar trigger opens an inline non-modal dialog with Monday-first Vietnamese weekday labels, six-week grid, previous/next month, today/clear actions, selected/today states, and disabled past dates. Roving date-button focus supports arrows, Home/End, Page Up/Down and Shift+Page Up/Down for years. Month arithmetic clamps to valid dates, including leap years. Escape closes the calendar before the booking modal; outside press/focus, reset and modal close clean it up. Calendar position and scrollable height fit the modal viewport, including narrow layouts; no page scrolling or navigation handlers are replaced.

Modeled integration tests pass for Vietnamese labels, min date/past exclusion, today/selected state, arrow keys, month/year/leap-day boundaries, native value and display synchronization, required-error focus, clear/today, Escape priority, interaction with the service/time dropdowns, narrow-viewport width and reopening cleanup. Existing dropdown and modal tests also pass. Live browser visual QA remains unverified due the prior access restriction.
