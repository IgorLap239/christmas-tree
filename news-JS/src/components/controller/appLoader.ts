import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '6d63371d574a489993fd1b4af190d130', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
