/** Query nutritionix API */
export async function nutritionix(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH',
    path: `/${string}`,
    params: Record<string, string> = {},
    body?: any,
): Promise<object> {
    const url = new URL('https://trackapi.nutritionix.com/v2' + path);
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }

    const init: RequestInit = {
        method,
        headers: {
            'x-app-id': NUTRITIONIX_APPLICATION_ID,
            'x-api-key': NUTRITIONIX_API_KEY,
            // https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit#bookmark=id.hhai9sbk4b8f
            'x-remote-user-id': '0',
            accept: 'application/json',
        },
    };
    if (body !== undefined) {
        (init as any).headers['content-type'] = 'application/json';
        init.body = JSON.stringify(body);
    }

    const response = await fetch(url, init);
    console.log(
        `nutritionix ${method} ${url.pathname}${url.search} = ${response.status} ${response.statusText}`,
    );
    return await response.json();
}

const NUTRITIONIX_APPLICATION_ID = 'cbe5f49a';
const NUTRITIONIX_API_KEY = '36b8e81074469c12309ee1af226ce793';
