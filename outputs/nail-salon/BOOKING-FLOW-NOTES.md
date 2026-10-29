# Current completion behavior

The clipboard/Zalo handoff described in the historical notes below has been replaced by a dedicated completion screen: champagne checkmark, “Cảm ơn bạn.”, truthful demo/confirmed copy and “Hoàn tất”. The default is a frontend demonstration and sends nothing. A separate booking-submission.js service accepts a future backend adapter and requires an explicit receipt before showing sent-request copy. Failures retain all draft information for retry. See BOOKING-INTEGRATION.md for the current integration contract and checks.

---

# Previous implementation history

# Persistent booking actions and bounded content

The fixed-height booking dialog now uses two bounded columns on desktop. The service photograph fills its existing column; the right column has a stable heading area followed by a form with a scrollable step body and a separate bottom action row. Only the step body scrolls. The outcome view uses the same content/footer split. Buttons keep their intrinsic widths, shared height and opposite-end alignment.

The description has an explicit 20px gap before content (16px mobile). On mobile the existing image occupies a compact 80–140px row, with the remaining space assigned to the booking flow. Calendar/time keyboard focus scrolls the nearest content region, and each step resets that content region to the top. Header and action controls are outside it, so long content and validation errors cannot push the bottom row off screen. No global page navigation or booking data logic changed.

Validation: balanced HTML, JavaScript syntax, modeled full booking flows, interval/message persistence, stale-response guards, nearest-region focus scrolling and footer separation passed. Browser rendering remains unverified under the prior local-file access restriction. Snapshot: work/booking-bottom-actions-before.

---

# Current mode: preferred-time booking requests

The shared dialog now has a fixed outer height of min(860px, viewport height minus responsive margins): 64px desktop, 32px tablet and 20px mobile. The toolbar stays visible; only the body scrolls, with a reserved scrollbar gutter to avoid horizontal shifts. The same frame applies to service detail, all four booking steps and the final handoff. No page-scrolling behavior was changed.

Preferred time choices are a single vertical column: 08:00–10:00, 10:00–12:00, 12:00–14:00, 14:00–16:00, 16:00–18:00, 18:00–20:00. Drafts and submitted payloads retain both endpoints in canonical HH:MM-HH:MM form; summaries, review and the Zalo message use a spaced en dash. Custom providers can still supply individual HH:MM values. Range validation rejects invalid or reversed endpoints.

Checks: syntax, modeled four-step navigation and back-state retention, interval labels/message handoff, enabled options, custom-provider compatibility and stale-response guards passed. Frame sizing and single-column CSS were inspected; live browser rendering remains unverified under the prior local-file access restriction. Exact pre-change snapshot: work/booking-fixed-height-ranges-before.

The flow now collects appointment preferences rather than checking real-time availability. All six two-hour choices from 08:00–10:00 through 18:00–20:00 are enabled for today/future dates; past dates remain disabled. Artificial blocked demo dates/hours and the final availability recheck have been removed. Core default: requestAvailability (mode request).

All action rows use equal 48px control height, zero inherited margins, intrinsic widths and space-between alignment. Compact mobile typography preserves one-line labels. Visible sample/placeholder labels, fake email contact and the concept-brand footer label are removed. Gallery metadata credits remain in source records, but the image viewer shows only its category. Image placeholder tiles remain as previously requested.

Without an external request receiver, the final screen prepares a formatted, selectable booking message. The visitor can copy it and open the existing Zalo contact to send it. Clipboard success is reported only when copying succeeds; a selectable-text fallback is provided. No message is sent automatically, no data is stored, and no sent-request confirmation is fabricated. The existing genuine-receipt confirmation remains available only when a configured submitBooking callback returns {requestReceived:true}. Request receiving is independent of availability lookup; configure({submitBooking}) can be used without a live scheduling provider.

Current checks: all hours enabled (including earlier hours today and the formerly blocked demo date), no final scheduling recheck, complete message fields, clipboard feedback, field retention, real receipt-only success, duplicate/late-response guards, source/ARIA references, no visible sample labels, unchanged images and actual Gilroy button-pair fit at 320/375/381/414/768px. Visual browser QA remains unverified due the prior local-file access restriction.

Backup: work/booking-request-polish-before.

---

# Previous four-step implementation history

# Shared appointment booking flow

## Runtime architecture
One native #booking dialog contains service inspection and the four booking steps. No per-section or per-service booking dialog exists. All 17 data-book entry points use the same delegated controller: header, Hero, five service arrows, Gallery, CTA, footer service/general actions, mobile booking and the service-detail action. Generic CTAs start with no selected service. Service-specific CTAs preselect the matching catalog entry. The full service-card inspection surface preserves the detail showcase; booking from it switches view inside the already-open dialog without close/showModal.

Files:
- service-catalog.js extracts the existing five services/images into one shared catalog.
- service-detail.js retains image crossfade/thumbnail/arrow handling and exposes the showcase.
- booking-core.js supplies strict validation, date helpers, blank draft creation and the explicit demo availability provider.
- booking-calendar.js supplies the inline Vietnamese, Monday-first calendar with roving keyboard focus.
- booking.js owns the single draft, active step, dialog/focus/scroll lifecycle, slot loading and request adapter.
- booking.css styles only this flow, its inspection hit area and the requested Gallery appointment CTA.
- buttons.css consumes the existing primary/secondary/card tokens for the new controls.

## Flow
1. Select one service using compact image choices.
2. Select an available date/time. A selected-date/time status is always provided; unavailable choices are disabled.
3. Enter required full name/phone and optional notes. Native labels/autocomplete and inline Vietnamese errors are provided.
4. Review the complete request and use “Xác nhận đặt lịch”. Back navigation preserves all values.

In the default prototype, the final action creates a preview state clearly stating that no data was sent or stored. It never uses the sent-request message. The true received-request state is reachable only when an explicitly configured live submit callback returns {requestReceived:true}; it says “Yêu cầu đặt lịch đã được gửi.” and “Cloud.Nails sẽ liên hệ với bạn để xác nhận lịch hẹn.” It never claims that the appointment itself is confirmed.

## Prototype availability
The interface labels dates/times as demonstration data. Opening hours are 08:00–20:00, per the supplied salon details. Past dates/times are unavailable. Two hours (11:00 and 15:00) and the date two days after today are deliberately blocked demo fixtures, not claims about actual salon availability or operating days.

## Integration seam
No request endpoint, fetch, localStorage, analytics event or other persistence is added. State exists only in memory and identifying values/review content are cleared on close. A host integration may call, while the dialog is closed:

    window.MaisonNacreBooking.configure({
      availabilityProvider: {
        mode: 'live',
        isDateAvailable(isoDate, serviceId) { /* cached/loaded month map: boolean */ },
        async loadSlots({date, serviceId, signal}) {
          /* return [{value:'10:00', available:true}, ...] */
        }
      },
      async submitBooking(payload, {signal}) {
        /* only return {requestReceived:true} after the server receives it */
      }
    });

The live provider's date predicate is synchronous (for example, backed by a preloaded month map); slot loading and request receipt may be asynchronous and receive AbortSignals. Public open API: MaisonNacreBooking.open({service, source}); service is an optional catalog ID or name. Inspection API: showService(service, source). The current default remains the demo provider, with no submit callback.

## Interaction
- Native modal focus containment and inert background; root scroll lock and prior padding restored on close.
- Close button, backdrop and Escape; close animation is bypassed for reduced motion.
- Consistent progress/navigation; short lateral step reveal, removed for reduced motion.
- Service/time radio groups support arrows/Home/End; calendar supports arrows/Home/End/Page Up/Down and Shift+Page Up/Down. Focus is kept visible through modal-local scrolling.
- Photo inspection keeps the previous thumbnail/arrow crossfade and user-supplied assets.
- Service-card drag suppression preserves horizontal touch swipes.
- Availability loads use cancellation/version guards; stale responses cannot clear a newer loading state.
- Final submission rechecks the slot. Duplicate submission is guarded, errors retain editable data, and late responses after close/new flow cannot create an outcome.

## Validation and verification
All production JS passes syntax checks. Modeled DOM tests cover all four steps, missing service/date/time/contact validation, field values retained on Back, every CTA family, service preselection, detail-to-booking with one showModal call, demo-only outcome, explicit live-receipt outcome, duplicate-submit guard, live errors, abort/stale loading, late submission isolation, focus restoration, root scroll lock and reduced-motion dismissal. Date/core checks cover leap years, month/year transitions, invalid ISO dates/time/phone and demo exclusions. Existing gesture navigation, Hero cycle, Treatments opening and Gallery opening model tests pass.

Static checks verify one booking dialog/form, 17 shared appointment entry points, unique IDs, valid ARIA/local references, unchanged image files, no deleted runtime files, scoped edits and action text fitting at 320/375/414/768px using actual Gilroy metrics. All previous page scripts other than obsolete booking ownership are preserved.

Browser limitation: the session's earlier local-file browser access restriction remains; no alternate-browser/server bypass was attempted. The project is buildless and runnable from dist/index.html, but live visual rendering/responsive/browser focus behaviour have not been verified. These checks are source/modeled checks, not screenshots or browser execution.

Backup: work/booking-flow-before, including the prior runtime hashes and list of added files.
