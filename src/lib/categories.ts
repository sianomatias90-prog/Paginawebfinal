export const CATEGORY_LABELS: Record<string, string> = {
  'chop-futbol': 'Chop Futbol',
  futbol: 'Chop Futbol',
  'chop-musica': 'Chop Musica',
  'Chop musica': 'Chop Musica',
  'chop musica': 'Chop Musica',
  'Chop Musica': 'Chop Musica',
  'grabado-laser': 'Grabado Laser',
  'vasos-milkshake': 'Vasos Milkshake',
};

export const CATEGORY_ORDER = [
  'Todos',
  'Chop Futbol',
  'Chop Musica',
  'Grabado Laser',
  'Vasos Milkshake',
];

export function getCategoryLabel(category: string): string {
  const trimmed = category.trim();
  if (!trimmed) return '';
  return CATEGORY_LABELS[trimmed] ?? CATEGORY_LABELS[trimmed.toLowerCase()] ?? formatCategorySlug(trimmed);
}

function formatCategorySlug(category: string): string {
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/** Filtros del catálogo: orden conocido + cualquier categoría usada en productos (p. ej. desde Admin). */
export function buildCategoryFilters(products: { category: string }[]): string[] {
  const labelsInUse = new Set(
    products.map(p => getCategoryLabel(p.category)).filter(Boolean),
  );

  const hidden = new Set(['Varios Personalizados', 'Regalos', 'Musica', 'musica']);
  const fromOrder = CATEGORY_ORDER.filter(
    c => c === 'Todos' || (labelsInUse.has(c) && !hidden.has(c)),
  );
  const extras = [...labelsInUse]
    .filter(l => !CATEGORY_ORDER.includes(l) && !hidden.has(l))
    .sort((a, b) => a.localeCompare(b, 'es'));

  const known = fromOrder.filter(c => c !== 'Todos');
  return ['Todos', ...known, ...extras];
}
