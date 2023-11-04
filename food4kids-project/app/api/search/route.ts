import { spoonacular } from '@/spoonacular';
import { SearchResult } from '@/types';
import { NextResponse } from 'next/server';

type ResponseData = {
    simpleFoods: SearchResult[];
    products: SearchResult[];
};

interface SpoonacularFoodSearchResponse {
    sorting: unknown;
    filterMapping: unknown;
    filterOptions: unknown;
    activeFilterOptions: unknown;
    query: string;
    totalResults: number;
    limit: number;
    offset: number;
    searchResults: {
        name:
            | 'Recipes'
            | 'Products'
            | 'Menu Items'
            | 'Articles'
            | 'Videos'
            | 'Simple Foods';
        type: 'products' | 'custom';
        totalResults: number;
        results: SearchResult[];
    }[];
    expires: number;
    isStale: boolean;
}

export async function GET(req: Request): Promise<NextResponse<ResponseData>> {
    const query = new URL(req.url).searchParams.get('q')?.toString() ?? '';
    const data = (await spoonacular('GET', '/food/search', {
        query,
        offset: '0',
        number: '10',
    })) as SpoonacularFoodSearchResponse;

    const response: ResponseData = {
        simpleFoods: [],
        products: [],
    };

    for (const category of data.searchResults) {
        if (category.name === 'Simple Foods') {
            response.simpleFoods = category.results;
        } else if (category.name === 'Products') {
            response.products = category.results;
        }
    }

    return NextResponse.json(response);
}
