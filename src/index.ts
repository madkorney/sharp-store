import App from './components/app/app';
import './global.scss';
import './components/view/product-card/card.scss';
import './css/fontawesome/font-awesome.scss';

const app = new App();
app.start();

// focus on search input on load
(document.querySelector('#search-by-name-input') as HTMLInputElement)?.focus();
