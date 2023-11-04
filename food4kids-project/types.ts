/** Search result from Nutritionix database */
export interface SearchResult {
    food_name: string;
    image: string | null;
    serving_unit: string;
    nix_brand_id: string;
    brand_name_item_name: string;
    serving_qty: number;
    nf_calories: number;
    brand_name: string;
    brand_type: number;
    nix_item_id: string;
}
