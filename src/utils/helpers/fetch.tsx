import { BASE_URL } from 'configs';

export default class Fetch {
    static async fetch(options: any) {
        const { headers, method, body, path, data } = options;

        let requestOptions: RequestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers,
            },
            method,
            redirect: 'follow',
            body: null,
        };

        if (body) {
            requestOptions.body = JSON.stringify(body);
        } else if(data) {
            requestOptions.body = data;
        }
        // Fire the Request and Return the response promise Object
        const requestPromise = await fetch(new Request(`${BASE_URL}${path}`, requestOptions)).then((res)=> res).then((data)=> data.ok && data.json());

        return requestPromise;
    }

    /* GET (retrieve) */
    static get = (options: any) => Fetch.fetch({ ...options, method: 'GET' });

    /* POST (create) */
    static post = (options: any) => Fetch.fetch({ ...options, method: 'POST' });

    /* PUT (update) */
    static patch = (options: any) => Fetch.fetch({ ...options, method: 'PATCH' });;

    /* DELETE (remove) */
    static delete = (options: any) => Fetch.fetch({ ...options, method: 'DELETE' });
}
