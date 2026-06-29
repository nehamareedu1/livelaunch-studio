import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Atelier — Maison Ocre" },
      { name: "description", content: "A small studio in the Marais sourcing slow goods from independent makers across the Mediterranean and beyond." },
      { property: "og:title", content: "The Atelier — Maison Ocre" },
      { property: "og:description", content: "A small studio in the Marais sourcing slow goods from independent makers across the Mediterranean and beyond." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-boutique py-20 md:py-32">
      <div className="max-w-2xl">
        <p className="eyebrow">The atelier</p>
        <h1 className="mt-4 text-5xl md:text-7xl font-display leading-[0.95]">
          We make rooms<br/><em className="text-terracotta not-italic">slower</em>.
        </h1>
        <p className="mt-10 text-lg leading-relaxed text-foreground/85">
          Maison Ocre began in a borrowed studio in the Marais in 2014, with a single hand-thrown vase and a notebook of makers we wanted to visit. A decade later we still travel four months of the year, and we still only carry pieces that earn the space they take.
        </p>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-12">
        {[
          { n: "01", t: "We visit every maker", b: "No catalogs, no agents. Every supplier we work with has been visited by Camille or Joaquim, often more than once a year." },
          { n: "02", t: "Small batches, fewer pieces", b: "We'd rather carry six remarkable objects than sixty average ones. When something sells out, it stays out until the next season." },
          { n: "03", t: "Honest materials, honest prices", b: "Our margins are visible. The price reflects the time, the skill and the rent — and nothing more." },
        ].map((v) => (
          <div key={v.n} className="border-t border-border pt-6">
            <p className="eyebrow">{v.n}</p>
            <h3 className="mt-3 font-display text-2xl">{v.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
