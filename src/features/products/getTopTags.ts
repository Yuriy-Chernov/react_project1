import type { Product } from './types';

export const getTopTags = (products: Product[], limit = 6): string[] => {
  const counts = new Map<string, number>();

  for (const product of products) {
    for (const tag of product.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
};
