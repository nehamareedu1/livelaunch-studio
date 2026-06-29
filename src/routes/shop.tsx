import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { listProducts } from "@/lib/products.functions";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";

const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
});

const searchSchema = z.object({
  cat: z.enum(["all", "ceramics", "textiles", "objects", "kitchen"]).catch("all"),
});

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Maison Ocre" },
      { name: "description", content: "Browse the full collection of slow goods: ceramics, textiles, brass and kitchenware from independent makers." },
      { property: "og:title", content: "Shop the collection — Maison Ocre" },
      { property: "og:description", content: "Browse the full collection of slow goods from independent makers." },
    ],
  }),
  validateSearch: searchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Shop,
  errorComponent: ({ error }) => <div className="container-boutique py-24">Could not load goods: {error.message}</div>,
  notFoundComponent: () => <div className="container-boutique py-24">Not found.</div>,
});

const CATEGORIES = ["all", "ceramics", "textiles", "objects", "kitchen"] as const;

function Shop() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="container-boutique py-16 md:py-24">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">The collection</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-display">All goods</h1>
          <p className="mt-4 text-muted-foreground max-w-lg">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}, each made in small batches.
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-wrap gap-2 lg:justify-end">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => navigate({ search: { cat: c } })}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-colors ${
                cat === c
                  ? "bg-espresso text-cream border-espresso"
                  : "border-border text-foreground/70 hover:border-espresso hover:text-espresso"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16">
        {filtered.map((p) => (
          <Link key={p.id} to="/shop/$slug" params={{ slug: p.slug }} className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-muted relative">
              <ProductImage
                src={p.image_url}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {!p.in_stock && (
                <span className="absolute top-3 left-3 bg-cream/95 px-2 py-1 text-[10px] uppercase tracking-widest">
                  Sold out
                </span>
              )}
            </div>
            <div className="mt-5">
              <p className="eyebrow text-xs">{p.category}</p>
              <div className="flex items-baseline justify-between mt-2">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <span className="text-sm whitespace-nowrap ml-3">{formatPrice(p.price_cents)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-24 text-center text-muted-foreground">No pieces in this category right now.</p>
      )}
    </div>
  );
}
