import { supabase } from './supabase';
import type { TechniqueCategory } from '../components/technique/TechniqueDiagram';

export interface StepProduct {
  id: string;
  name: string;
  brand: string;
  tier: 'drugstore' | 'mid' | 'luxury';
  price: number;
  shade: string;
  url: string | null;
}

export interface LookStep {
  id: string;
  order: number;
  category: TechniqueCategory;
  instruction: string;
  tip: string | null;
  products: StepProduct[];
}

const TIER_ORDER: Record<string, number> = { drugstore: 0, mid: 1, luxury: 2 };

export async function fetchLookSteps(lookId: string): Promise<LookStep[]> {
  const { data, error } = await supabase
    .from('look_steps')
    .select(
      `id, step_order, product_category, instruction_text, technique_tip,
       look_step_products ( products ( id, name, brand, tier, price, shade_match_range, affiliate_url ) )`,
    )
    .eq('look_id', lookId)
    .order('step_order', { ascending: true });

  if (error) throw error;

  return data.map((row): LookStep => {
    const products: StepProduct[] = (row.look_step_products ?? [])
      .map((join) => {
        const p = (join as unknown as { products: Record<string, unknown> }).products;
        if (!p) return null;
        const shadeRange = p.shade_match_range as { shade?: string } | null;
        return {
          id: p.id as string,
          name: p.name as string,
          brand: p.brand as string,
          tier: p.tier as StepProduct['tier'],
          price: Number(p.price),
          shade: shadeRange?.shade ?? '',
          url: (p.affiliate_url as string | null) ?? null,
        };
      })
      .filter((p): p is StepProduct => p !== null)
      .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);

    return {
      id: row.id,
      order: row.step_order,
      category: row.product_category as TechniqueCategory,
      instruction: row.instruction_text,
      tip: row.technique_tip,
      products,
    };
  });
}
