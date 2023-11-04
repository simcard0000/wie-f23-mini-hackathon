import { nutritionix } from '@/api';
import { SearchResult } from '@/types';
import { NextResponse } from 'next/server';

type ResponseData = {
    /**
     * results from Nutritionix.com branded food database (restaurant brands and
     * grocery brands)
     */
    branded: SearchResult[];
    /**
     * results from a user's own food log (only if header x-user-jwt is
     * provided, otherwise this result is null)
     */
    self: null;
    /**
     * results from Nutritionix.com common food database (curated list of
     * averaged food items that are not brand-specific)
     */
    common: SearchResult[];
};

export async function GET(req: Request): Promise<NextResponse<ResponseData>> {
    const query = new URL(req.url).searchParams.get('q')?.toString() ?? '';
    const data = await nutritionix('GET', '/search/instant', {}, { query });
    return NextResponse.json(data as ResponseData);
}
