import * as products from '../../data/data';
import dt from '../../data/data-loader';



export function displayCards({ productsToDisplay, stockAvailable, favourites, cartProducts }:
    { productsToDisplay: products.Product[];
      stockAvailable: products.StockItem[];
      favourites: string[];
      cartProducts: products.CartContent; }): void {
    //input - filtered and sorted list
    function priceFormatCentToUSD(priceCent : number) :string {
      const priceUSD =  `${Math.ceil(priceCent / 100)}.${(priceCent % 100).toString(10).padStart(2,'0')}`;
      return `${priceUSD} USD`;
    };

    function isInCart(cart : products.CartContent, item : products.Product): boolean {
      let inCart = false;
      cart.forEach(element => {
        if (element.id === item.ID) {
          inCart = true;
          return true;}
      });
      return inCart;
    }

    function qtyInCart(cart : products.CartContent, item : products.Product): number {
      let inCartQty = -1;
      cart.forEach(element => {
        if (element.id === item.ID) {
          inCartQty = element.qty;
          return;
        }
      });
      return inCartQty;
    }

    function getStockPerID(productID: string): number {
      let itemStock = 0;
      stockAvailable.forEach((element) => {
        if (element.id === productID) itemStock = element.qty;
      });
      return itemStock;
    }

    const cardTemplate = document.querySelector('#card-template') as HTMLTemplateElement;
    const cardContainer = document.querySelector('.cards') as HTMLElement;

    cardContainer.innerHTML = '';
    const notFoundMessage = document.querySelector('.not-found-msg') as HTMLElement;
    (document.querySelector('.found-qty') as HTMLElement).textContent = `${productsToDisplay.length}`;

    if (productsToDisplay.length === 0) {
      notFoundMessage.classList.remove('hidden');
      return;
    }
    notFoundMessage.classList.add('hidden');


    productsToDisplay.forEach((product : products.Product ) => {
      const cardClone = cardTemplate.content.cloneNode(true) as HTMLElement;

      (cardClone.querySelector('.card-container') as HTMLElement).dataset.prodid = product.ID;

      (cardClone.querySelector('.preview-img') as HTMLElement)
        .setAttribute('src', `${dt.productImages[product.pictures[0]] || dt.productImages['placeholder.jpg']}`);

      (cardClone.querySelector('.info-brand') as HTMLElement).textContent = product.brand;

      (cardClone.querySelector('.info-name') as HTMLElement).textContent = product.name;

      if (product.features.bladeSteel) {
        (cardClone.querySelector('.info-steel') as HTMLElement).textContent = product.features.bladeSteel;
        (cardClone.querySelector('.info-steel') as HTMLElement).classList.remove('hidden');
      }

      if (product.features.bladeLengthMm) {
        (cardClone.querySelector('.info-blade-length') as HTMLElement).textContent = `${product.features.bladeLengthMm}mm`;
        (cardClone.querySelector('.info-blade-length') as HTMLElement).classList.remove('hidden');
      }

      if (product.features.weightGramms) {
        (cardClone.querySelector('.info-weight') as HTMLElement).textContent = `${product.features.weightGramms}g`;
        (cardClone.querySelector('.info-weight') as HTMLElement).classList.remove('hidden');
      }

      (cardClone.querySelector('.price') as HTMLElement).textContent = priceFormatCentToUSD(product.priceValue);

      (cardClone.querySelector('.stock-qty') as HTMLElement).textContent = `${getStockPerID(product.ID)}`;

      if (favourites.includes(product.ID)) {
        const favIcon = cardClone.querySelector('.fa-heart-o') as HTMLElement;
        favIcon.classList.remove('fa-heart-o');
        favIcon.classList.add('fa-heart');
        favIcon.classList.add('active');
      }

      if (isInCart(cartProducts, product)) { // in cart
        (cardClone.querySelector('.btn-to-cart') as HTMLElement).classList.add('hidden');

        (cardClone.querySelectorAll('.btn-card')).forEach(element => {
          element.classList.remove('hidden');
        });

        const displayQty = cardClone.querySelector('.qty-cart') as HTMLElement;
        displayQty.classList.remove('hidden');
        displayQty.textContent = `${qtyInCart(cartProducts, product)}`;
      }

      cardContainer.appendChild(cardClone);
    });
  }


// export default ProductCardsList;