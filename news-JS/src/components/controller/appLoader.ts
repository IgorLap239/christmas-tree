import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '6d63371d574a489993fd1b4af190d130', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
