import { Article } from '../../interfaces';
import './sources.css';

class Sources {
    draw(data: Array<Article>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            (sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLTemplateElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLTemplateElement).append(fragment);
    }
}

export default Sources;
