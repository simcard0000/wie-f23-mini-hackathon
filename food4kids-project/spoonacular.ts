import crypto from 'crypto';
import fs from 'fs/promises';

/** Query spoonacular API */
export async function spoonacular(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH',
    path: `/${string}`,
    params: Record<string, string> = {},
    // body?: any,
): Promise<object> {
    const url = new URL('https://api.spoonacular.com' + path);
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }

    const cacheFile = getCacheFile(url);
    const cached = await getCache(cacheFile);
    const log = `spoonacular ${method} ${url.pathname}${url.search}`;
    if (cached !== undefined) {
        console.log(`${log} = cached`);
        return cached;
    }

    url.searchParams.set('apiKey', SPOONACULAR_API_KEY);
    const init: RequestInit = {
        method,
        headers: { accept: 'application/json' },
    };
    // if (body !== undefined) {
    //     (init as any).headers['content-type'] = 'application/json';
    //     init.body = JSON.stringify(body);
    // }

    const response = await fetch(url, init);
    const quotaRequest =
        response.headers.get('X-API-Quota-Request')?.replace(/\.0*$/, '') ||
        '?';
    const quotaUsed =
        response.headers.get('X-API-Quota-Used')?.replace(/\.0*$/, '') || '?';
    const quotaLeft =
        response.headers.get('X-API-Quota-Left')?.replace(/\.0*$/, '') || '?';
    console.log(
        `${log} = ${response.status} [+${quotaRequest}] [${quotaUsed}/${quotaLeft}]`,
    );
    const data = await response.json();
    await saveCache(cacheFile, data);
    return data;
}

async function getCache(file: string): Promise<object | undefined> {
    try {
        const data = await fs.readFile(file, { encoding: 'utf-8' });
        return JSON.parse(data);
    } catch (e) {
        return undefined;
    }
}

async function saveCache(file: string, data: object): Promise<void> {
    try {
        await fs.mkdir('cache');
    } catch (e) {}
    try {
        const text = JSON.stringify(data);
        await fs.writeFile(file, text, { encoding: 'utf-8' });
    } catch (e) {
        console.log(`Could not save cache to file, ignoring. ${e}`);
    }
}

function getCacheFile(url: URL): string {
    const key = `${url.pathname}${url.search}`;
    const hash = crypto.createHash('sha1').update(key).digest('base64url');
    const name = key.replace(/[^A-Za-z0-9-_&=.,]/g, '_');
    let fullName = hash + name;
    if (fullName.length > 120) {
        fullName = fullName.substring(0, 120);
    }
    return 'cache/' + fullName + '.json';
}

const SPOONACULAR_API_KEY = 'ab7a8ed20a794764aab217e3e59fa2e5';
