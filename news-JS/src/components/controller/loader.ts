import { CallbackFunc } from '../interfaces'
import { TUrlOptions } from '../interfaces'
import { DataNews } from '../interfaces'
import { DataSources } from '../interfaces'
class Loader {
    baseLink: string;
    options: object;
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: {endpoint: string, options?: Record<string, never>},
        callback: CallbackFunc<DataNews | DataSources> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, never>, endpoint: string) {
        const urlOptions: TUrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: CallbackFunc<DataNews | DataSources>, options: Record<string, never>) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data:DataNews | DataSources) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
