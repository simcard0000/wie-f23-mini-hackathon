/** Search result from Spoonacular database */
export interface SearchResult {
  id: string;
  name: string;
  image: string;
  type: "HTML" | "YOUTUBE_VIDEO";
  relevance: number;
  content: unknown;
  dataPoints: unknown[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string; // example: 'g', 'mg', 'IU'
  percentOfDailyNeeds: number;
}

export interface SimpleFoodInfo {
  id: string;
  original: string;
  originalName: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  possibleUnits: string[];
  estimatedCost: {
    value: number;
    unit: string; // ex: 'US Cents'
  };
  consistency: string; // ex: 'solid'
  shoppingListUnits: string[]; // ex: ['pieces']
  aisle: string; // ex: 'Produce'
  image: string; // ex: 'pineapple.jpg'
  meta: unknown[];
  nutrition: {
    nutrients: Nutrient[];
    properties: {
      name: string;
      amount: number;
      unit: string;
    }[];
    flavonoids: {
      name: string;
      amount: number;
      unit: string;
    }[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
  categoryPath: string[];
}

export type Badge =
  | "msg_free"
  | "no_artificial_colors"
  | "no_artificial_flavors"
  | "no_artificial_ingredients"
  | "gluten_free"; // might be more that I don't know about

export interface ProductInfo {
  id: string;
  title: string;
  price: number;
  likes: number;
  badges: Badge[];
  importantBadges: Badge[];
  nutrition: {
    nutrients: Nutrient[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    calories: number;
    fat: string; // example: '123g'
    protein: string; // example: '123g'
    carbs: string; // example: '123g'
  };
  servings: {
    number: number;
    size: number;
    unit: string;
  };
  spoonacularScore: number;
  breadcrumbs: string[];
  aisle: unknown;
  description: string;
  image: string; // url
  imageType: "jpeg";
  images: string[]; // url[]
  generatedText: unknown;
  upc: string;
  brand: string;
  ingredients: {
    name: string;
    safety_level: null | "low" | "medium" | "high";
    description: string | null;
  }[];
  ingredientCount: number;
  ingredientList: string;
}

export interface Package {
  name: string;
  preset: string;
  calories: number;
  weight: number;
  simpleFoods: SimpleFoodInfo[];
  products: ProductInfo[];
}
