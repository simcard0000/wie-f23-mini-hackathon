import { Nutrient, ProductInfo, SimpleFoodInfo } from "./types";

export enum Stat {
  Price = "Price",
  Calories = "Calories",

  Calcium = "Calcium",
  Carbohydrates = "Carbohydrates",
  Cholesterol = "Cholesterol",
  // Copper = 'Copper',
  // Fat = 'Fat',
  Fiber = "Fiber",
  // Iron = 'Iron',
  // Magnesium = 'Magnesium',
  // Manganese = 'Manganese',
  // Phosphorus = 'Phosphorus',
  Potassium = "Potassium",
  Protein = "Protein",
  SaturatedFat = "Saturated Fat",
  Sodium = "Sodium",
  Sugar = "Sugar",
  VitaminA = "Vitamin A",
  // VitaminB1 = 'Vitamin B1',
  VitaminB12 = "Vitamin B12",
  // VitaminB2 = 'Vitamin B2',
  // VitaminB3 = 'Vitamin B3',
  // VitaminB5 = 'Vitamin B5',
  // VitaminB6 = 'Vitamin B6',
  VitaminC = "Vitamin C",
  VitaminD = "Vitamin D",
  // VitaminE = 'Vitamin E',
  VitaminK = "Vitamin K",
  Weight = "Weight",
  Zinc = "Zinc",
}

export class Stats {
  public values: Record<Stat, number>;

  constructor(values: Partial<Record<Stat, number>> = {}) {
    let result: Partial<Record<Stat, number>> = {};
    for (const stat of Object.values(Stat)) {
      result[stat] = values[stat] ?? 0;
    }
    this.values = result as Record<Stat, number>;
  }

  add(other: Stats): Stats {
    const newValues: Partial<Record<Stat, number>> = {};
    for (const stat of Object.values(Stat)) {
      newValues[stat] = this.values[stat] + other.values[stat];
    }
    return new Stats(newValues);
  }

  multiply(scalar: number): Stats {
    const newValues: Partial<Record<Stat, number>> = {};
    for (const stat of Object.values(Stat)) {
      newValues[stat] = this.values[stat] * scalar;
    }
    return new Stats(newValues);
  }

  static sum(...stats: Stats[]): Stats {
    let accumulator = new Stats();
    for (const stat of stats) {
      accumulator = accumulator.add(stat);
    }
    return accumulator;
  }

  static fromSimpleFood(info: SimpleFoodInfo): Stats {
    const stats = Stats.fromNutrients(info.nutrition.nutrients);
    stats.values.Price = info.estimatedCost.value;
    stats.values.Weight = info.nutrition.weightPerServing.amount;
    return stats.multiply(info.quantity);
  }

  static fromProduct(info: ProductInfo): Stats {
    const stats = Stats.fromNutrients(info.nutrition.nutrients);
    stats.values.Price = info.price;
    stats.values.Calories = info.nutrition.calories;
    return stats.multiply(info.quantity);
  }

  private static fromNutrients(nutrients: Nutrient[]): Stats {
    let result: Partial<Record<Stat, number>> = {};
    for (const nutrient of nutrients) {
      result[nutrient.name as Stat] = nutrient.percentOfDailyNeeds;
    }
    return new Stats(result);
  }
}
