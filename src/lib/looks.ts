import { supabase } from './supabase';
import type { Look } from '../state/SessionContext';
import type { LookPalette } from './faceRender';

interface LookRow {
  id: string;
  name: string;
  color_palette: LookPalette | null;
  coverage_level: string | null;
  estimated_minutes: number | null;
  step_count: number | null;
}

const TAGLINES: Record<string, string> = {
  'Soft Glam': 'Radiant everyday glam with a soft-focus finish.',
  'Natural Glow': 'Your-skin-but-better, dewy and effortless.',
  'Bold Smokey': 'Sultry, smudged eyes for a night that means business.',
  'Bridal Classic': 'Timeless, camera-ready, made to last all day.',
};

const FALLBACK_PALETTE: LookPalette = {
  lipColor: 'oklch(55% 0.15 25)',
  shadowColor: 'oklch(75% 0.12 235)',
  blushColor: 'oklch(78% 0.11 30)',
};

export async function fetchLooks(): Promise<Look[]> {
  const { data, error } = await supabase
    .from('looks')
    .select('id, name, color_palette, coverage_level, estimated_minutes, step_count')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return (data as LookRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    tagline: TAGLINES[row.name] ?? '',
    steps: row.step_count ?? 0,
    time: row.estimated_minutes ? `${row.estimated_minutes} min` : '',
    coverage: row.coverage_level
      ? row.coverage_level[0].toUpperCase() + row.coverage_level.slice(1)
      : '',
    palette: row.color_palette ?? FALLBACK_PALETTE,
  }));
}
