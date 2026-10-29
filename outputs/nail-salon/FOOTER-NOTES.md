# Footer redesign

The existing footer is replaced in place with four desktop columns: brand, five service links, discovery navigation and contact information. The reference image informs its hierarchy, spacing and quiet champagne-on-espresso palette. It preserves Cormorant/Gilroy and the current button system. The background is plain espresso; the decorative ribbon has been removed. No image asset, dependency or continuous animation is added.

## Real content and actions
- Address: 90 Võ Trứ, Phường Chánh Hưng, TP. Hồ Chí Minh.
- Hours: 08:00–20:00. No operating-day assumptions were added.
- Telephone: 0933 303 282; tel:+84933303282.
- Zalo: existing https://zalo.me/0933303282.
- All five service buttons reuse data-book/data-service and open the existing service detail modal with the corresponding selection. The generic booking link reuses the same booking flow.
- Discovery links use the existing Gallery, Testimonials and Visit IDs. Brand and back-to-top links use #main and the current gesture navigation handler.
- No fictitious email, social account, legal page or empty policy link is introduced. The dynamic year and concept-brand label remain.

## Responsive and integration
Four columns above 1100px, two at tablet widths, and brand/contact spanning a pair of compact navigation columns on phones. Footer width uses minmax(0,...) tracks; the footer retains its own overflow boundary. Existing sticky ancestors and global scroll implementation are unchanged. Mobile bottom clearance accounts for the existing fixed booking bar and safe area. Footer links/social controls consume the shared text/icon button variants, including circular 44px icon controls and focus/hover/pressed/reduced-motion states.

## Verification
Modeled integration checks pass for the six footer booking controls, correct selected service, modal close/focus return, existing dropdown/calendar interactions and existing one-gesture section navigation. All section/booking markup outside the footer is unchanged, as are all prior scripts and images. Only index.html, buttons.css (two new selector adapters) and new footer.css change at runtime.

HTML IDs, ARIA references, internal link destinations, contact content, CSS brace balance and scope hashes were verified. Actual Gilroy text widths fit navigation columns at 320/375/414/768px. This is source/model verification, not live browser QA; visual rendering remains unverified due the earlier access restriction.

Design self-critique: Philosophy 4, Hierarchy 5, Execution 4, Specificity 5, Restraint 5, Variety 4. Existing brand tokens are intentionally retained.

Backup: work/footer-redesign-before.

Bottom tagline alignment: desktop uses equal left/right tracks around the centered text. Tablet places the tagline in a centered full-width row; mobile retains full-width centered text. The decorative ribbon SVG and all its CSS have been removed. Text, contact links and buttons are unchanged. Source geometry/font-width checks pass; live browser visual QA remains unverified.
