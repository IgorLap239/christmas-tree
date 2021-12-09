import AppLoader from './appLoader';
import { CallbackFunc } from '../interfaces'
import { DataNews } from '../interfaces'
import { DataSources } from '../interfaces'


class AppController extends AppLoader {
    getSources(callback: CallbackFunc<DataSources>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallbackFunc<DataNews>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId as never,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLInputElement;;
        }
    }
}

export default AppController;
