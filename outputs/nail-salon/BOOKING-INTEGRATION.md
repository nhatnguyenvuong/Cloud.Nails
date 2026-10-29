# Booking submission and success screen

Current mode: frontend demonstration. No request, email or clipboard operation occurs by default. Nothing is persisted in local/session storage. The completion screen says “Cảm ơn bạn.” and explicitly states that the details have not been sent. Its only action is “Hoàn tất”, which closes the dialog and returns focus to its opener. The real sent-request wording is used only after an explicitly configured backend acknowledges receipt. No reference number or copyable outcome summary is rendered.

## Service boundary

`dist/booking-submission.js` is independent of DOM rendering. `MaisonBookingSubmission.buildPayload(draft, service)` produces a structured object:

```js
{
  serviceId: 'gel-polish',
  serviceName: 'Sơn Gel',
  date: '2026-11-05',
  time: '08:00-10:00',
  name: 'Nguyễn An',
  phone: '0933303282',
  notes: '' // optional customer content; empty when omitted
}
```

Names/phone/notes are trimmed. Time retains both endpoints; date is a local calendar date, not a UTC timestamp. The service validates transport acknowledgments and cancellation. The UI validates fields before calling it. Backend validation is still required for a real integration.

## Connect a future backend

Implement a server endpoint or plugin adapter that validates this payload and sends the details to the salon through a server-managed email provider. Keep the owner email address, credentials and provider keys on the server. There is no active endpoint in this website.

Once that backend exists, configure the existing API while the dialog is closed. Example adapter (not enabled by default):

```js
MaisonNacreBooking.configure({
  submitBooking: async (payload, { signal }) => {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal
    });
    if (!response.ok) throw new Error('Submission failed');
    const receipt = await response.json();
    if (receipt.requestReceived !== true) throw new Error('Not acknowledged');
    return { requestReceived: true };
  }
});
```

The backend must return `requestReceived: true` only after actual successful processing/acceptance; HTTP success alone or arbitrary `{success: true}` is insufficient. This does not certify that the salon has confirmed the appointment. To return to demonstration mode, configure `submitBooking: null`.

While pending, the confirmation/back actions are disabled and the confirmation action reads “Đang gửi…”. On rejection or missing acknowledgment, the review screen remains open, announces an error and retains service/date/time/name/phone/notes for retry. Closing aborts pending work and late responses cannot update a newly opened dialog. No frontend service can guarantee cancellation of a request already received by a server; a production backend should handle duplicate submissions/idempotency.

## Layout and accessibility

The existing fixed-height dialog, image column and bottom action track remain. Completion replaces the progress/form area with a centered champagne checkmark, serif heading, supporting copy and one bottom action. The checkmark draws once; reduced-motion shows the completed mark immediately. Focus moves to the success heading, dialog labels update, Escape/backdrop/close continue to work, and “Hoàn tất” restores website focus.

Validation: JS syntax, balanced HTML, modeled four-step flow, default demo/no transport, structured payload, explicit backend acknowledgment, pending state, failure/retry with all data preserved, duplicate/late-response guards, focus/Done dismissal, fresh reopen and reduced-motion dismissal passed. Visual browser QA remains unverified under the prior local-file access restriction. Snapshot: work/booking-success-before.
