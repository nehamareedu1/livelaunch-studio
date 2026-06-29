
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  materials TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly viewable"
  ON public.products FOR SELECT
  USING (true);

INSERT INTO public.products (slug, name, tagline, description, price_cents, category, image_url, materials, featured, sort_order) VALUES
('terracotta-vase', 'Terracotta Vessel', 'Hand-thrown ceramic vase', 'A sculptural vessel turned on the wheel and finished with a warm matte glaze. Each piece bears the maker''s mark and slight variations.', 14800, 'ceramics', 'https://images.unsplash.com/photo-1612196808214-b40b3d3d3d3d?w=1200', 'Stoneware, food-safe glaze', true, 1),
('linen-throw', 'Stonewashed Linen Throw', 'Heavyweight European linen', 'Woven from long-staple flax and washed for a softness that deepens over time. Generous proportions for the sofa or bed.', 22400, 'textiles', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200', '100% Belgian linen', true, 2),
('brass-candlestick', 'Cast Brass Candlestick', 'Solid brass, hand-polished', 'A weighted candlestick cast from solid brass and polished by hand. Develops a rich patina with use.', 8600, 'objects', 'https://images.unsplash.com/photo-1602874801006-e26c4dcd0c4f?w=1200', 'Solid cast brass', true, 3),
('oak-cutting-board', 'White Oak Board', 'Heirloom-grade kitchenware', 'Milled from a single plank of quarter-sawn white oak. Finished with food-safe beeswax and mineral oil.', 11200, 'kitchen', 'https://images.unsplash.com/photo-1594224457860-25a1d3b1f6b6?w=1200', 'White oak, beeswax finish', false, 4),
('wool-rug', 'Atlas Wool Rug', 'Hand-knotted, naturally dyed', 'Knotted by artisans in the High Atlas using undyed and plant-dyed wool. Reversible and quietly graphic.', 64000, 'textiles', 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200', 'Hand-spun Berber wool', true, 5),
('porcelain-cup', 'Porcelain Tea Cup', 'Set of two', 'Translucent porcelain cups with an unglazed foot. Designed for green tea and quiet mornings.', 5200, 'ceramics', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200', 'Porcelain', false, 6),
('leather-tray', 'Saddle Leather Catchall', 'Vegetable-tanned, hand-stitched', 'A simple tray folded from a single piece of vegetable-tanned leather and stitched at the corners.', 9800, 'objects', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200', 'Vegetable-tanned leather', false, 7),
('clay-pitcher', 'Glazed Clay Pitcher', 'Workshop seconds', 'A generous serving pitcher with a confident pour. Glazed in earth tones over a red clay body.', 12400, 'ceramics', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200', 'Red earthenware, tin glaze', false, 8),
('walnut-spoons', 'Walnut Serving Spoons', 'Set of three', 'Carved from American black walnut. Each spoon is hand-finished and unique.', 6800, 'kitchen', 'https://images.unsplash.com/photo-1584346133934-2a39e9d8ce98?w=1200', 'Black walnut, raw linseed oil', false, 9);
