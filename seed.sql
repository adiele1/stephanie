-- Glowith starter catalog — reflects what's actually seeded into the live Supabase
-- project. Products are REAL, currently-sold items (verified via web research), not
-- placeholder brand names — no affiliate program yet, so affiliate_url is a plain
-- retailer/brand product page for now (see schema.sql's note on that field).

insert into products (name, brand, category, shade_match_range, tier, price, currency, affiliate_url, image_url) values
('Fit Me Matte + Poreless Foundation', 'Maybelline', 'foundation', '{"shade":"334 Warm Sun"}', 'drugstore', 11.99, 'USD', 'https://www.maybelline.com/face-makeup/foundation-makeup/fit-me-matte-poreless-foundation', null),
('Original Pure Serum Radiant Natural Liquid Foundation Mineral SPF 20', 'bareMinerals', 'foundation', '{"shade":"Fair Cool 1.5"}', 'mid', 44.00, 'USD', 'https://www.bareminerals.com/products/original-pure-serum-radiant-natural-liquid-foundation-mineral-spf-20', null),
('Airbrush Flawless Foundation', 'Charlotte Tilbury', 'foundation', '{"shade":"16 Cool"}', 'luxury', 52.00, 'USD', 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-16-cool', null),

('Instant Age Rewind Eraser Dark Circles Concealer', 'Maybelline', 'concealer', '{"shade":"130"}', 'drugstore', 12.99, 'USD', 'https://www.maybelline.com/face-makeup/concealer/instant-age-rewind-eraser-dark-circles-concealer-treatment', null),
('Radiant Creamy Concealer', 'NARS', 'concealer', '{"shade":"Vanilla"}', 'mid', 36.00, 'USD', 'https://www.narscosmetics.com/USA/radiant-creamy-concealer/999NACRCC0001.html', null),
('Traceless Soft Matte Concealer', 'Tom Ford', 'concealer', '{"shade":"3C0 Tulle"}', 'luxury', 62.00, 'USD', 'https://www.tomfordbeauty.com/product/traceless-soft-matte-concealer', null),

('Bite-Size Mini Eyeshadow Palette', 'e.l.f. Cosmetics', 'eyes', '{"shade":"Hot Jalapeño"}', 'drugstore', 4.00, 'USD', 'https://www.elfcosmetics.com/bite-size-eyeshadow/29928.html', null),
('ChromaPlus 12-Pan Eyeshadow Palette', 'Morphe', 'eyes', '{"shade":"Flickering Sands"}', 'mid', 23.00, 'USD', 'https://www.morphe.com/products/chromaplus-12-pan-eyeshadow-palette', null),
('Naked3 Eyeshadow Palette', 'Urban Decay', 'eyes', '{"shade":"Buzz"}', 'luxury', 59.00, 'USD', 'https://www.ulta.com/p/naked3-soft-pink-eyeshadow-palette-pimprod2057662?sku=2266731', null),

('Brow Ultra Slim Defining Eyebrow Pencil', 'Maybelline', 'brows', '{"shade":"Soft Brown"}', 'drugstore', 9.99, 'USD', 'https://www.maybelline.com/eye-makeup/eyebrow-makeup/brow-ultra-slim-defining-eyebrow-pencil', null),
('Brow Wiz', 'Anastasia Beverly Hills', 'brows', '{"shade":"Chocolate"}', 'mid', 26.00, 'USD', 'https://www.anastasiabeverlyhills.com/products/brow-wiz', null),
('Brow Sculptor', 'Tom Ford', 'brows', '{"shade":"Taupe"}', 'luxury', 63.00, 'USD', 'https://www.tomfordbeauty.com/product/brow-sculptor', null),

('Super Stay Matte Ink Liquid Lipstick', 'Maybelline', 'lips', '{"shade":"Lover"}', 'drugstore', 12.99, 'USD', 'https://www.maybelline.com/lip-makeup/lipstick/superstay-matte-ink-liquid-lipstick', null),
('Maracuja Juicy Plumping Lip Oil', 'Tarte', 'lips', '{"shade":"Cherry Blossom"}', 'mid', 27.00, 'USD', 'https://tartecosmetics.com/products/maracuja-juicy-plumping-lip-oil', null),
('Lip Color Matte', 'Tom Ford', 'lips', '{"shade":"08 Velvet Cherry"}', 'luxury', 64.00, 'USD', 'https://www.tomfordbeauty.com/product/lip-color-matte', null);

-- 4 looks, each with its own step sequence (product_category order) and every step
-- linked to all 3 tiers of that category's products via look_step_products.
-- color_palette drives the on-device Canvas render (src/lib/faceRender.ts) — lipColor/
-- shadowColor/blushColor as oklch strings.
--
-- Soft Glam:      foundation, concealer, eyes, brows, lips   (25 min, medium coverage)
-- Natural Glow:    foundation, eyes, brows, lips              (15 min, light coverage — skips concealer, matches its "your skin but better" character)
-- Bold Smokey:     foundation, concealer, eyes, brows, lips   (35 min, full coverage)
-- Bridal Classic:  foundation, concealer, eyes, brows, lips   (40 min, full coverage)
--
-- See migrations seed_look_soft_glam / seed_look_natural_glow / seed_look_bold_smokey /
-- seed_look_bridal_classic for the exact insert statements (identical step instruction
-- text is intentional — application technique doesn't change per look, only the product
-- and color do).
