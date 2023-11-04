/**
 * spoonacular API
 * The spoonacular Nutrition, Recipe, and Food API allows you to access over thousands of recipes, thousands of ingredients, 800,000 food products, over 100,000 menu items, and restaurants. Our food ontology and semantic recipe search engine makes it possible to search for recipes using natural language queries, such as \"gluten free brownies without sugar\" or \"low fat vegan cupcakes.\" You can automatically calculate the nutritional information for any recipe, analyze recipe costs, visualize ingredient lists, find recipes for what's in your fridge, find recipes based on special diets, nutritional requirements, or favorite ingredients, classify recipes into types and cuisines, convert ingredient amounts, or even compute an entire meal plan. With our powerful API, you can create many kinds of food and especially nutrition apps.  Special diets/dietary requirements currently available include: vegan, vegetarian, pescetarian, gluten free, grain free, dairy free, high protein, whole 30, low sodium, low carb, Paleo, ketogenic, FODMAP, and Primal.
 *
 * OpenAPI spec version: 1.1
 * Contact: mail@spoonacular.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ParseIngredients200ResponseInnerNutritionCaloricBreakdown } from './ParseIngredients200ResponseInnerNutritionCaloricBreakdown';
import { ParseIngredients200ResponseInnerNutritionNutrientsInner } from './ParseIngredients200ResponseInnerNutritionNutrientsInner';
import { ParseIngredients200ResponseInnerNutritionPropertiesInner } from './ParseIngredients200ResponseInnerNutritionPropertiesInner';
import { ParseIngredients200ResponseInnerNutritionWeightPerServing } from './ParseIngredients200ResponseInnerNutritionWeightPerServing';
import { HttpFile } from '../http/http';

export class ParseIngredients200ResponseInnerNutrition {
    'nutrients': Set<ParseIngredients200ResponseInnerNutritionNutrientsInner>;
    'properties': Set<ParseIngredients200ResponseInnerNutritionPropertiesInner>;
    'flavonoids': Set<ParseIngredients200ResponseInnerNutritionPropertiesInner>;
    'caloricBreakdown': ParseIngredients200ResponseInnerNutritionCaloricBreakdown;
    'weightPerServing': ParseIngredients200ResponseInnerNutritionWeightPerServing;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "nutrients",
            "baseName": "nutrients",
            "type": "Set<ParseIngredients200ResponseInnerNutritionNutrientsInner>",
            "format": ""
        },
        {
            "name": "properties",
            "baseName": "properties",
            "type": "Set<ParseIngredients200ResponseInnerNutritionPropertiesInner>",
            "format": ""
        },
        {
            "name": "flavonoids",
            "baseName": "flavonoids",
            "type": "Set<ParseIngredients200ResponseInnerNutritionPropertiesInner>",
            "format": ""
        },
        {
            "name": "caloricBreakdown",
            "baseName": "caloricBreakdown",
            "type": "ParseIngredients200ResponseInnerNutritionCaloricBreakdown",
            "format": ""
        },
        {
            "name": "weightPerServing",
            "baseName": "weightPerServing",
            "type": "ParseIngredients200ResponseInnerNutritionWeightPerServing",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ParseIngredients200ResponseInnerNutrition.attributeTypeMap;
    }

    public constructor() {
    }
}

