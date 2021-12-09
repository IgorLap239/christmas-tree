import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataNews } from '../interfaces'
import { DataSources } from '../interfaces'

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
            (document.querySelector('.sources') as HTMLElement)
            .addEventListener('click', (e) => this.controller.getNews(e, (data: DataNews) => this.view.drawNews(data)));
        this.controller.getSources((data: DataSources) => this.view.drawSources(data));
    }
}

export default App;
