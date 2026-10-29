# Asset notes

Two new concept images were produced with the built-in ImageGen tool, inspected, and copied into this project's dist/assets folder. They are explicitly labeled AI concept images on the page and are not represented as actual salon work.

## Hero prompt
Use case: photorealistic-natural. Create one ultra-wide luxury beauty editorial photograph for the Cloud.Nails nail atelier concept website. Ratio approximately 2.4:1. Subject: two anatomically accurate graceful adult feminine hands resting diagonally on a subtly folded black silk surface; one wrist enters from lower left, the other from right; all visible nails medium almond shape with immaculate translucent pearlescent nude polish, realistic nail beds, natural skin pores and fine creases. Skin warm tan. Dramatic directional studio light from upper left, precise creamy reflections in the lacquer, deep warm charcoal background with quiet negative space on the upper left. Sculptural fashion campaign still life, restrained and tactile, photographed on medium format, not glossy plastic render. No jewelry, no pearls, no props, no typography, no logo, no watermark. Meticulous realistic hands and fingers. This is illustrative placeholder photography, not actual salon work. Save a local image file if supported.

Saved: dist/assets/hero-editorial.png

## Oxblood prompt
Use case: photorealistic-natural. Portrait 3:4 luxury nail editorial photograph for a beauty atelier moodboard. An anatomically accurate graceful adult woman's hand with five natural fingers and immaculate short oval glossy deep oxblood red nails. Sculptural side view with fingers gently curved, wrist emerges from a matte black sleeve, on warm charcoal studio background. Directional side lighting, creamy precise reflections, warm brown skin with natural skin texture. Understated European fashion photography, medium format detail, dramatic crop but show all nail tips clearly. No jewelry, no text, no logos, no watermark. The photograph is an illustrative concept asset, not actual salon work.

Saved: dist/assets/oxblood-editorial.png

## Stock references
Nude manicure: https://images.unsplash.com/photo-1610992015732-2449b76344bc
Nail technician: https://images.unsplash.com/photo-1632345031435-8727f6897d53
These previously used reference images are bundled locally and labeled as reference photography. The technician image receives a CSS grayscale treatment. Replace with actual salon photography before business use.

## Font
Cormorant Garamond 300, 400 and 300 italic, fetched through Google Fonts. Font license included in dist/assets/FONT-LICENSE.txt. Font files are local TrueType assets.

## Full-screen portrait background — built-in ImageGen
Saved: dist/assets/hero-fullscreen.png

Prompt: Use case: photorealistic-natural. Asset: full-screen 16:9 luxury nail atelier website background photograph. Create an original beauty editorial photograph: close-up of an adult woman age 28 with warm tan skin, dark tousled hair, calm confident gaze, head and face occupying the right half of frame. Graceful anatomically correct hands with immaculate long almond nude glossy manicure frame her lower face and cheek. One hand rests softly across black textured silk from left towards chin, another hand near her cheek, natural five-finger anatomy. Subtle sculptural brass earrings only. Deep brown-black textured silk and shadow fill the left 45 percent of image, intentionally very dark quiet negative space for website headline. Warm directional side light, tactile skin pores and natural fine detail, controlled lacquer highlights, sophisticated fashion magazine photography, cinematic chiaroscuro, not plastic or airbrushed. Tight crop from top of head to wrists. The key eye and manicure details must remain in right 55 percent of image. No words, no UI, no logos, no watermarks, no borders. Landscape 16:9 composition. This is an illustrative concept photograph.


## Service columns — built-in ImageGen
Three additional illustrative service photos were generated, inspected and saved locally. The manicure and gel columns use the previously generated hero-editorial.png and oxblood-editorial.png assets. These are concept illustrations, not actual client or salon photographs.

Saved: dist/assets/service-extensions.png
Prompt: Vertical professional nail salon service photograph. Close view of a hand with long almond nail extensions in a transparent beige finish, resting on dark fabric. Warm studio lighting, realistic photographic detail. Dark background and empty space at the top for a heading. No lettering, no logo.

Saved: dist/assets/service-nail-design.png
Prompt: Vertical professional nail art portfolio photograph. Close view of manicured nails with fine abstract chrome lines over beige polish, fingers resting on a smooth dark stone. Warm studio lighting, realistic photographic detail. Dark background and empty space at the top for a heading. No lettering, no logo.

Saved: dist/assets/service-lashes.png
Prompt: Vertical photograph illustrating a professional eyelash salon service. Close crop of a single eye with neatly curled eyelashes and a natural eyebrow. Warm studio lighting, realistic cosmetic photography, dark background and empty space at the top for a heading. No lettering, no logo.

## Testimonial gold dust background
assets/testimonial-gold-dust.png is the exact PNG supplied by the user as codex-clipboard-25da1eb0-0617-41aa-b2b4-b88f19297edf.png. Copied without image generation or retouching. Used only as the testimonial background; CSS controls brightness/reveal and the existing Canvas adds slow moving dust. Asset ownership/licensing was not independently established.

## CTA manicure replacements
- creation-left-lavender-gold.png: built-in ImageGen transparent edit of the existing five-finger left-hand layer, styled after user reference codex-clipboard-6b4165fd-eda8-4fef-be9f-865a7a7dd03b.png.
- creation-right-french-gold.png: built-in ImageGen transparent edit of the existing right-hand layer, styled after user reference codex-clipboard-4ffc59eb-390c-4fa3-85e2-70023720d7ec.png.
Both are copied verbatim from generated outputs. The two manicure reference photos were used as visual references only; their hands/backgrounds/text were not inserted into the website. Final prompts are recorded in HAND-EDIT-NOTES.md. Existing background, historic hand images and other page photography remain unchanged.

## Right-hand dark celestial variant
creation-right-celestial-gold.png is a built-in ImageGen transparent edit of creation-right-french-gold.png, following user reference codex-clipboard-89b0afbe-cad7-43ed-a63d-506469d539cb.png. Copied without programmatic image editing. Replaces only the CTA right-hand manicure; the approved lavender/gold left layer is unchanged. Exact prompt and coordinates: HAND-EDIT-NOTES.md.

## Right nail-plane correction
creation-right-celestial-profile.png is a built-in ImageGen transparent correction of the right-hand manicure, using original creation-right.png as the authoritative nail geometry reference. The final output is copied unchanged, 1669 x 942 RGBA. It replaces the face-on nail perspective in the prior celestial variant. Left hand and all other imagery are unchanged. Prompts: HAND-EDIT-NOTES.md.

## Current CTA right manicure: slender nude/ivory
Built-in ImageGen edit: dist/assets/creation-right-nude-pearl-slim.png (1671 x 941 RGBA), copied unchanged from the generated PNG. Sheer nude/milky ivory, delicate gold branch linework and tiny pearl accents; narrow oblique nails preserve the original pose. Approved left hand unchanged. Contact (740,447.5). Full prompt and validation: HAND-EDIT-NOTES.md. Prior variants retained for rollback.

## Current CTA: original user-provided PNGs
creation-left-provided-baroque.png (1882 × 836 RGBA) and creation-right-provided-pearl.png (1704 × 923 RGBA) are exact byte copies of the supplied transparent files. No image processing or generation. Source filenames and SHA-256 hashes are recorded in HAND-EDIT-NOTES.md. Prior assets remain as backups.

CTA sleeve-edge masks: creation-left-sleeve-edge.svg and creation-right-sleeve-edge.svg are native SVG alpha masks matching the original PNG aspect ratios. They only soften cropped lower sleeve fabric in CSS; original PNG bytes/alpha and approved sizes are unchanged. No generated image assets were used.

Visibility repair: the two SVG sleeve-mask files have been removed from the runtime. CTA edge blending now uses direct CSS gradients. Original supplied PNG files are unchanged.

Current right CTA: creation-right-provided-extended.png, 2046 × 768 RGBA, exact byte copy of user-supplied Ornate Hand with Gilded Sleeve 1.png. SHA-256: 34e0ceb7cfad2189152e0ca70329f0ee04f082a5076a858e90583c6ae639993d. Source details preserved; no processing.

## Body font: Gilroy
Vietnamese-capable SVN-Gilroy installed OTF sources copied unchanged: gilroy-light.otf (300), gilroy-regular.otf (400), gilroy-bold.otf (700), declared as Gilroy in assets/fonts.css. All page Vietnamese glyphs were checked in font cmaps. Cormorant display assets remain unchanged.
- assets/gilroy-light.otf SHA-256: 7ee84306f48024a9aa8e6c842b6c33d695d447c73ed62888e785144e9fa85ac0
- assets/gilroy-regular.otf SHA-256: 3f7848a321e42e9be8f54e7fcc3adfa434cc9e11d9f462fdc90967801a62f83d
- assets/gilroy-bold.otf SHA-256: e8d146923563b38c695608590a6aea421e1a1f570001e894a1fd672dc2a50761
