import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { getProduct } from "@/lib/products.functions";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";

const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: () => getProduct({ data: { slug } }),
  });

export const Route = createFileRoute("/shop/$slug")({
  head: (ctx) => {
    const p = ctx.loaderData as Awaited<ReturnType<typeof getProduct>> | undefined;
    if (!p) return { meta: [{ title: "Not found — Maison Ocre" }] };
    return {
      meta: [
        { title: `${p.name} — Maison Ocre` },
        { name: "description", content: p.tagline ?? p.description.slice(0, 150) },
        { property: "og:title", content: `${p.name} — Maison Ocre` },
        { property: "og:description", content: p.tagline ?? p.description.slice(0, 150) },
        { property: "og:image", content: p.image_url },
        { name: "twitter:image", content: p.image_url },
      ],
    };
  },
  loader: async ({ params, context }) => {
    const product = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!product) throw notFound();
    return product;
  },
  component: ProductDetail,
  errorComponent: ({ error }) => <div className="container-boutique py-24">Error: {error.message}</div>,
  notFoundComponent: () => (
    <div className="container-boutique py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl">Piece not found</h1>
      <Link to="/shop" className="btn-primary mt-8 inline-flex">Back to shop</Link>
    </div>
  ),
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(productQuery(slug));
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!p) return null;

  const onAdd = () => {
    cart.add({ slug: p.slug, name: p.name, price_cents: p.price_cents, image_url: p.image_url }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-boutique py-12 md:py-20">
      <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-10">
        <Link to="/shop" className="hover:text-espresso">Shop</Link>
        <span className="mx-2">/</span>
        <span>{p.category}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="bg-muted aspect-[4/5] overflow-hidden">
            <ProductImage src={p.image_url} alt={p.name} className="w-full h-full object-cover" priority />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <p className="eyebrow">{p.category}</p>
          <h1 className="mt-3 text-5xl font-display leading-[1.05]">{p.name}</h1>
          {p.tagline && <p className="mt-3 text-muted-foreground">{p.tagline}</p>}

          <p className="mt-8 text-2xl font-display">{formatPrice(p.price_cents)}</p>

          <div className="mt-10 hairline pt-8">
            <p className="text-[15px] leading-[1.7] text-foreground/85">{p.description}</p>
          </div>

          {p.materials && (
            <div className="mt-8 hairline pt-8">
              <p className="eyebrow">Materials</p>
              <p className="mt-2 text-sm">{p.materials}</p>
            </div>
          )}

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-muted" aria-label="Decrease">
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-muted" aria-label="Increase">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button onClick={onAdd} disabled={!p.in_stock} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
              {added ? (<><Check className="w-4 h-4" /> Added</>) : p.in_stock ? "Add to basket" : "Sold out"}
            </button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">Ships within 5 working days · Complimentary on orders over $200</p>
        </div>
      </div>
    </div>
  );
}
