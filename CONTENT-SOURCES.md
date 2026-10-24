# Kwao Thai content sources

The user provided https://www.kwaothai.com, copied homepage text, and a screenshot on October 23, 2026. Network policy blocked fetching the website; no independent web verification is claimed.

Phone, address, split lunch/dinner hours, Tuesday–Sunday schedule, dine-in/takeout options, 30–35-minute preparation estimate, DoorDash/Localpass availability, and five spice levels come from the copied text. Closed statutory holidays and vegetarian/vegan availability are visible in the supplied screenshot. The 30–35-minute estimate is presented as a preparation allowance, not a guaranteed pickup countdown.

The user subsequently supplied the restaurant website menu text. All 52 distinct items are transcribed, preserving source dish numbers and protein/portion prices in CAD. Spelling and grammar are lightly normalized (for example, “Lamp” to “Lamb”). Repeated dish headings are deduplicated, and numbering gaps are preserved. Review quotations/ratings, a usable logo file, email, and direct checkout links were not supplied. The site links to the official homepage for online-ordering links. The Reviews section points to a Google Maps search using the known name and address and does not claim a verified Google Place ID. The optional map uses the supplied address, with no invented coordinates or API key.

The generic Thai cuisine photos are AI-generated illustrations, explicitly labeled on the site. They are not extracted restaurant photos or claims about actual menu items. The outdated Thanksgiving greeting and incorrect Wix/Luna Tapas footer were omitted. The text wordmark is an independent concept; the original logo was not copied.

This is a review concept, visibly labeled and marked noindex. SEO titles, social previews, structured business information, and an AI-readable summary are prepared accurately from the supplied content. Enable indexing and replace canonical URLs only when publishing an approved production site.

Sushi Den code is preserved on the `sushi-den` branch, and its existing live files stay at the root of `gh-pages`. Kwao Thai source is isolated on `kwao-thai`; its built preview is added under `kwao-thai/` on `gh-pages`.

## Menu transcription and ambiguity

`data/menu.json` is the editable source of truth. `scripts/render-menu.mjs` creates static menu HTML and Menu structured data for all eight categories: 10 appetizers/salads, 5 soups, 6 noodle dishes, 5 fried rice dishes, 5 curries, 10 stir-fries, 3 chef specials, and 8 side orders (52 items). Generation runs before development startup and production builds. Search and category filtering are progressive JavaScript enhancements; all items and prices remain readable without JavaScript.

The source explicitly says the PDF is inaccurate. No PDF is used or linked. The copied website text has conflicting prices for #24 Pineapple Fried Rice ($18 in its options, $19 in its displayed price), #50 Lamb Pad King and #51 Lamb Pad Prig Thai Dum ($22.50 in descriptions, $21.50 in displayed prices). Their base prices are left unconfirmed in both the UI and structured data. The unambiguous #24 prawn option ($21) is retained. The soup heading says one size, while #12/#13 mention conflicting small/large labels; prices are retained by protein without inventing portion sizes. “Thai Hot” and “Extra Hot” are displayed together as source naming variants. The Lunch Special heading has no items and is not expanded into invented dishes. Taxes, rice inclusion, availability, and current live pricing are not inferred.

Descriptions retain relevant supplied ingredients such as peanuts, cashews, milk, oyster sauce, shrimp paste, egg, and wheat-containing noodles. Tofu/vegetable protein options do not imply that an entire dish is vegan, vegetarian, or allergen-free. Dietary and allergy enquiries remain directed to the restaurant.

## About page

The user supplied copied About-page text. The new About section uses its family-run positioning, Kwao/kaaow meaning rice, jasmine rice, shared-table tradition, and balance of salty, sour, sweet and spicy flavors. Copy is condensed rather than reproducing the full original. No founder names, dates, family photographs, awards, or testimonials are invented. The David Thompson quotation is omitted. The menu guidance preserves the source’s instruction for vegan diners to ask about fish sauce, with other ingredients also requiring confirmation. The source’s gluten-free remark about rice is not expanded into a claim that complete dishes are gluten-free.
