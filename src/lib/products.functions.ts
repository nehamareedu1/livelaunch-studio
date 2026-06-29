import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function getClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  price_cents: number;
  category: string;
  image_url: string;
  materials: string | null;
  in_stock: boolean;
  featured: boolean;
};

export const listProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, tagline, description, price_cents, category, image_url, materials, in_stock, featured")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  },
);

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }): Promise<Product | null> => {
    const supabase = getClient();
    const { data: row, error } = await supabase
      .from("products")
      .select("id, slug, name, tagline, description, price_cents, category, image_url, materials, in_stock, featured")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });
