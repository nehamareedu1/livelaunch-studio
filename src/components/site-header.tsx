import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border">
      <div className="container-boutique flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight text-espresso">Maison Ocre</span>
          <span className="eyebrow mt-1">est. 2014</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <Link to="/" activeProps={{ className: "text-terracotta" }} activeOptions={{ exact: true }} className="hover:text-terracotta transition-colors">Home</Link>
          <Link to="/shop" activeProps={{ className: "text-terracotta" }} className="hover:text-terracotta transition-colors">Shop</Link>
          <Link to="/about" activeProps={{ className: "text-terracotta" }} className="hover:text-terracotta transition-colors">Atelier</Link>
        </nav>
        <Link to="/cart" className="relative inline-flex items-center gap-2 text-sm hover:text-terracotta transition-colors">
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-terracotta text-cream text-[10px] font-medium w-5 h-5 rounded-full grid place-items-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
