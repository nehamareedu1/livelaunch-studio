import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-espresso text-cream">
      <div className="container-boutique py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl">Maison Ocre</h3>
          <p className="mt-4 max-w-sm text-cream/70 text-sm leading-relaxed">
            A small studio sourcing slow goods from independent makers across the Mediterranean and beyond.
          </p>
        </div>
        <div>
          <p className="eyebrow text-brass">Catalog</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/shop" className="hover:text-brass">All goods</Link></li>
            <li><Link to="/about" className="hover:text-brass">The atelier</Link></li>
            <li><Link to="/cart" className="hover:text-brass">Your basket</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-brass">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>14 Rue de Sévigné</li>
            <li>75004 Paris</li>
            <li>hello@maisonocre.co</li>
          </ul>
        </div>
      </div>
      <div className="hairline border-cream/15">
        <div className="container-boutique py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-cream/60">
          <span>© {new Date().getFullYear()} Maison Ocre — All rights reserved.</span>
          <span>Crafted with care. Shipped slowly.</span>
        </div>
      </div>
    </footer>
  );
}
