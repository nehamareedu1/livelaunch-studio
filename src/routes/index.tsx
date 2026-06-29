import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { listProducts } from "@/lib/products.functions";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";

const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Ocre — Slow goods for the modern home" },
      { name: "description", content: "Hand-thrown ceramics, heavyweight linen and cast brass — small batches from independent Mediterranean makers." },
      { property: "og:title", content: "Maison Ocre — Slow goods for the modern home" },
      { property: "og:description", content: "Hand-thrown ceramics, heavyweight linen and cast brass — small batches from independent Mediterranean makers." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Home,
  errorComponent: ({ error }) => <div className="container-boutique py-24">Could not load goods: {error.message}</div>,
  notFoundComponent: () => <div className="container-boutique py-24">Not found.</div>,
});

function Home() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="container-boutique pt-12 md:pt-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="eyebrow">Volume XIV · Autumn collection</p>
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-display leading-[0.95] text-espresso">
              Objects that<br/>
              <em className="text-terracotta not-italic">soften</em> a room.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed">
              Small-batch ceramics, heavyweight linen and cast brass — sourced from independent makers we visit each season.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">Shop the collection <ArrowRight className="w-3.5 h-3.5" /></Link>
              <Link to="/about" className="btn-ghost">Our atelier</Link>
            </div>
            <dl className="mt-16 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["38", "Makers"],
                ["12", "Countries"],
                ["10y", "Curating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl text-espresso">{n}</dt>
                  <dd className="eyebrow mt-2">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-clay/40 -z-10 rounded-sm rotate-1" />
              <img
                src={heroImg}
                alt="Hand-thrown terracotta vessel resting in afternoon light"
                width={1600}
                height={1200}
                fetchPriority="high"
                className="w-full h-auto object-cover aspect-[4/5] shadow-[var(--shadow-deep)]"
              />
              <div className="absolute -bottom-6 -left-6 bg-cream px-6 py-4 shadow-[var(--shadow-soft)] max-w-[200px]">
                <p className="eyebrow">No. 014</p>
                <p className="font-display text-lg mt-1 leading-tight">Terracotta Vessel — Atelier Sienne</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-boutique pb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow">Currently featured</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-display">Pieces we're loving</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex text-sm gap-2 items-center hover:text-terracotta">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p) => (
            <Link key={p.id} to="/shop/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <ProductImage
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between mt-5">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <span className="text-sm">{formatPrice(p.price_cents)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="bg-espresso text-cream py-28">
        <div className="container-boutique grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brass">A note from the studio</p>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl md:text-4xl leading-[1.25]">
              "We carry fewer things, on purpose. Every piece in the room earns its space — by the way it catches light, by the way it ages, by the hands that shaped it."
            </p>
            <p className="mt-8 text-sm text-cream/70">— Camille Aïssa, founder</p>
          </div>
        </div>
      </section>
    </>
  );
}
