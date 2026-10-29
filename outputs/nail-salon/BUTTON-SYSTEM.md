# Cloud.Nails — Button system

Source of truth: dist/buttons.css, loaded after existing component styles. It uses a primitive → semantic → component token hierarchy and maps the existing selectors to shared roles. No script, event hook, image, content, section position or animation has changed.

## Contract
| Role | Specification | Where used |
|---|---|---|
| Primary | Champagne fill, dark text, 48px minimum height, 1px border, square corners | Header, Hero, CTA, mobile booking, modal submit |
| Secondary | Champagne outline and text, transparent surface, same type and dimensions | Zalo contact |
| Icon | 44 × 44px, 18px icon, circular shape (50% radius), dark translucent surface and champagne border | Services, testimonial navigation, gallery viewer, social links, modal close, image navigation, month navigation |
| Field trigger | 48px, Gilroy, consistent border, open and error states | Service/time selectors and date picker |
| Text action | 44px touch height, compact Gilroy label, subtle underline on hover | Calendar footer, original image, back to top |
| Editorial navigation | Existing display typography/spacing, shared active colour and focus | Gallery category tabs |
| Image selection | Existing image proportions, square corners, champagne selected border, inset focus | Service thumbnails and photographic cards |
| Calendar day | Compact 40px grid cell, Gilroy 14, shared selected/disabled/focus colours | Date picker |

Typography: Gilroy 14/20, weight 400, .01em letter spacing for standard action labels. Explicit compact variants use 13px on mobile and 12px for tight layouts. Editorial Gallery navigation preserves its established display font above 20px and existing responsive sans-serif switch below 20px. Close glyphs are icons, not large text labels.

The palette is #d8b995 champagne, #ead0af hover, #c6a47f pressed, #17110c on-accent, #ece8df ivory and deep espresso surfaces. Primary label contrast is 10.07:1 default, 12.60:1 hover and 8.04:1 pressed. Icon backgrounds remain dark enough to separate controls from light photography.

## States
- Hover: shared palette and 180ms colour/border transition; touch devices avoid a persistent hover fill.
- Pressed: deeper champagne or dark icon surface; no added translate/scale that could conflict with existing animations.
- Focus: 2px champagne outline, 3px offset, inset for clipped photographic controls and date cells.
- Selected/open: champagne border/foreground; date selection uses the primary fill.
- Error: existing warm error border remains visible.
- Disabled: shared 40% opacity and muted colours; disabled attributes and behaviour are preserved.
- Reduced motion: button transitions are removed. Existing section animation rules remain authoritative.
- Print: prior hidden navigation/interactive controls remain hidden.

## Verification
Inventory checks cover the original 31 static buttons and all dynamic thumbnail, select, date-trigger, month-navigation, date-grid and calendar-footer families. Every custom token resolves. Only index.html (one stylesheet link) and buttons.css changed in runtime files; the complete original body and all existing CSS/JS/images match their prior hashes. No section positioning, scroll rules or animation declarations are introduced. Live browser rendering remains unverified due the earlier browser access restriction.

Backup: work/button-system-before. The website ZIP includes the updated stylesheet and this specification.

Icon-only controls now use --button-icon-radius:50%; text actions, fields, date cells and photographic controls retain their existing geometry. Size, colour, focus and interaction states are unchanged.

Footer adapters: .site-footer .footer-link consumes the text-action variant; .site-footer .footer-social consumes the circular icon variant, including its shared states. The six footer booking controls reuse existing modal handlers.

Booking flow adapters: .booking-back consumes secondary; service choices/time slots use the shared choice/focus/reduced-motion tokens; .service-inspect keeps photographic-card focus styling. Existing circular icon controls remain unchanged.

Booking action rows: intrinsic button widths, equal 48px height, margin:0 and flex space-between. Mobile labels share compact sizing; old form .button margin no longer offsets the primary action.
