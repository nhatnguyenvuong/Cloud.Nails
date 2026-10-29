# Gilroy body typography

The sans-serif body/UI token changed from Arial/Helvetica to Gilroy, with generic sans-serif fallback. Display typography remains Cormorant Garamond. All font sizes, responsive thresholds, letter spacing, colors, line heights, content, layouts and animations are unchanged.

The available Vietnamese-capable SVN-Gilroy family is self-hosted under the CSS family alias Gilroy. Original installed OpenType files were copied unchanged into dist/assets: gilroy-light.otf (300), gilroy-regular.otf (400), gilroy-bold.otf (700). No external font service or new dependency is used. The existing Cormorant faces/files remain unchanged.

The testimonial introduction now follows the same body token, replacing its previous system-font exception while retaining true weight 300 via Gilroy Light. All remaining body/UI roles inherit the new token. Larger display roles continue using the original primary font according to the existing size-based rules.

Validation: source font cmap tables contain every Vietnamese character currently authored in the page. Face weights match their font metadata. Font files are byte-identical to their installed sources. Inverse-diff checks confirm that prior CSS changed only at the body family and testimonial intro family; the HTML body is identical and all existing runtime scripts/other assets are unchanged. Versioned stylesheet references avoid stale cached font styles. Live browser rendering remains unverified due the prior browser access restriction.

Gallery and testimonial introductory subtext now share --section-subtext-size:14px at every viewport width. A shared section-scoped rule takes precedence over old 12/13px gallery and 15/17/18px testimonial responsive rules. Font family, weight, line height, alignment, line breaks, margins, cards, headings and booking UI are unchanged. Snapshot: work/subtext-size-before. CSS/source checked; live rendering not verified.
