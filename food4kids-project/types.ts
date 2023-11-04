/** Search result from Nutritionix database */
export interface SearchResult {
    id: number;
    name: string;
    image: string;
    type: 'HTML' | 'YOUTUBE_VIDEO';
    relevance: number;
    content: unknown;
    dataPoints: unknown[];
}
