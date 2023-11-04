import { Stat, Stats } from "./stats";
import { Package, ProductInfo, SimpleFoodInfo } from "./types";

function calculateTotalStats(pkg: Package): Stats {
  return Stats.sum(
    ...pkg.simpleFoods.map(Stats.fromSimpleFood),
    ...pkg.products.map(Stats.fromProduct)
  );
}

function calculateRank(stats: Stats): number {
  let r = 0;
  for (const stat of Object.values(Stat)) {
    if (stat === Stat.Price || stat === Stat.Weight) continue;
    const delta = stats.values[stat] - 100;
    r += delta * delta;
  }
  r += stats.values.Price;
  r += stats.values.Weight;
  return r;
}

export function optimizeQuantities(input: Package): Package {
  if (input.simpleFoods.length + input.products.length === 0) {
    return input;
  }

  // make a copy of pkg first, so we can play around with quantities however we want
  const pkg: Package = {
    ...input,
    simpleFoods: input.simpleFoods.map((x) => ({ ...x })),
    products: input.products.map((x) => ({ ...x })),
  };

  for (const food of pkg.simpleFoods) {
    food.quantity = 0;
  }
  for (const product of pkg.products) {
    product.quantity = 0;
  }

  let rank = Infinity;

  while (true) {
    let bestFood: SimpleFoodInfo | ProductInfo | null = null;
    let bestRank = rank;
    for (const food of pkg.simpleFoods) {
      if (food.quantity < 5) {
        food.quantity += 1;
        const newRank = calculateRank(calculateTotalStats(pkg));
        if (newRank < bestRank) {
          bestFood = food;
          bestRank = newRank;
        }
        food.quantity -= 1;
      }
    }
    if (!bestFood) break;
    bestFood.quantity += 1;
  }

  return pkg;
}
