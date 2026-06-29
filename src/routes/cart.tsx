import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Your basket — Maison Ocre" },
      { name: "description", content: "Review the pieces in your basket." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, setQty, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-boutique py-32 text-center">
        <p className="eyebrow">Your basket</p>
        <h1 className="mt-4 font-display text-5xl">Nothing here yet</h1>
        <p className="mt-4 text-muted-foreground">Wander the shop and gather what you love.</p>
        <Link to="/shop" className="btn-primary mt-10 inline-flex">Shop the collection</Link>
      </div>
    );
  }

  return (
    <div className="container-boutique py-20">
      <p className="eyebrow">Your basket</p>
      <h1 className="mt-3 text-5xl font-display">{items.length} {items.length === 1 ? "piece" : "pieces"}</h1>

      <div className="mt-14 grid lg:grid-cols-3 gap-12">
        <ul className="lg:col-span-2 divide-y divide-border border-y border-border">
          {items.map((i) => (
            <li key={i.slug} className="py-6 flex gap-6">
              <Link to="/shop/$slug" params={{ slug: i.slug }} className="w-24 h-32 bg-muted overflow-hidden shrink-0">
                <ProductImage src={i.image_url} alt={i.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link to="/shop/$slug" params={{ slug: i.slug }} className="font-display text-xl hover:text-terracotta">{i.name}</Link>
                    <p className="text-sm text-muted-foreground mt-1">{formatPrice(i.price_cents)} each</p>
                  </div>
                  <button onClick={() => remove(i.slug)} aria-label="Remove" className="text-muted-foreground hover:text-terracotta">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQty(i.slug, i.qty - 1)} className="p-2 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-sm tabular-nums">{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.qty + 1)} className="p-2 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="font-display text-lg">{formatPrice(i.price_cents * i.qty)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-1">
          <div className="bg-secondary p-8">
            <p className="eyebrow">Summary</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(total)}</dd></div>
              <div className="flex justify-between text-muted-foreground"><dt>Shipping</dt><dd>{total >= 20000 ? "Complimentary" : "Calculated at checkout"}</dd></div>
            </dl>
            <div className="hairline mt-6 pt-6 flex justify-between font-display text-2xl">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
            <button className="btn-primary w-full mt-8" onClick={() => alert("This is a demo capstone — checkout is not enabled.")}>
              Proceed to checkout
            </button>
            <button onClick={clear} className="w-full mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-terracotta py-2">
              Clear basket
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
