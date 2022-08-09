import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import * as products from '../../components/data/data';
import * as noUiSlider from 'nouislider';

class App {
  controller : AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();

    this.view.updateLogoImages();
    this.view.prepareControls(this.controller.filter.filterState);

    this.view.updateProductList(
      this.controller.filteredProductList,
      this.controller.cart,
      this.controller.favourites
    );

    this.view.updateCartDisplayedQty(this.controller.cart);
  }

  start() {

    document.querySelector('#reset-filter')?.addEventListener('click', (event: Event) => {
         this.controller.clearFilter(this.view.updateProductList);
      });

    document.querySelector('#reset-settings')?.addEventListener('click', (event: Event) => {
      this.controller.clearSettingsInLocalStorage();
    });

    document.querySelector('#btn-search')?.addEventListener('click', () => {
      this.controller.filter.filterState.namePart =
            (document.querySelector('#search-by-name-input') as HTMLInputElement).value;
      this.controller.updateList(this.view.updateProductList);
    });

    const filterForm = document.querySelector('#form-filters') as HTMLFormElement;
    const filterControls = filterForm.elements;

    for (const control of filterControls) {
      control.addEventListener('change' , (event: Event) => {
        if (event.target instanceof Element) {
          const trgtElement = event.target as HTMLFormElement;
          const paramType = trgtElement.getAttribute('id')?.split('-')[0];
          const param = trgtElement.getAttribute('id')?.split('-')[1];

          if (paramType === 'color') {
            if (trgtElement.checked) {
              this.controller.filter.filterState.color = param as products.Color;
              if (param === 'any') {
                delete this.controller.filter.filterState.color;
              }
            }
          }

          if (paramType === 'brand') {
            const brand = param as products.Brand;
            if (trgtElement.checked) {
              if (!this.controller.filter.filterState.brand) {
                this.controller.filter.filterState.brand = [];
              }
              this.controller.filter.filterState.brand?.push(products.Brand[brand as keyof typeof products.Brand]);
            } else {
              this.controller.filter.filterState.brand?.splice(
                this.controller.filter.filterState.brand.indexOf(products.Brand[brand as keyof typeof products.Brand]), 1
              );
            }
          }

          if (paramType === 'steel') {
            const steel = param as products.Steel;
            if (trgtElement.checked) {
              if (!this.controller.filter.filterState.bladeSteel) {
                this.controller.filter.filterState.bladeSteel = [];
              }
              this.controller.filter.filterState.bladeSteel?.push(products.Steel[steel as keyof typeof products.Steel]);
            } else {
              this.controller.filter.filterState.bladeSteel?.splice(
                this.controller.filter.filterState.bladeSteel.indexOf(products.Steel[steel as keyof typeof products.Steel])
                , 1
              );
            }
          }

          if (paramType === 'favs') {
            this.controller.filter.filterState.displayFavouritesToggle = trgtElement.checked;
            const toggle = document.querySelector('#fav-toggle');
            if (trgtElement.checked) {
              toggle?.classList.remove('fa-toggle-off');
              toggle?.classList.add('fa-toggle-on');
            } else {
              toggle?.classList.remove('fa-toggle-on');
              toggle?.classList.add('fa-toggle-off');
            }
          }

          this.controller.filter.filterState.namePart =
            (document.querySelector('#search-by-name-input') as HTMLInputElement).value;


          this.controller.updateList(this.view.updateProductList);
        }
      });
    }

    const rangePrice = document.getElementById('price-slider') as noUiSlider.target;
    const rangeBladeLength = document.getElementById('length-slider') as noUiSlider.target;
    const rangeWeight = document.getElementById('weight-slider') as noUiSlider.target;

    rangePrice.noUiSlider?.on('change', () =>
      this.controller.updateList(this.view.updateProductList));

    rangeBladeLength.noUiSlider?.on('change', () =>
      this.controller.updateList(this.view.updateProductList));

    rangeWeight.noUiSlider?.on('change', () =>
      this.controller.updateList(this.view.updateProductList));


    //prod cards
    // todo upd favs / cart
    document.querySelector('.cards')?.addEventListener('click', (event: Event) => {
      if (event.target instanceof Element ) {
        const trgtElement = event.target as HTMLElement;

        if (trgtElement.classList.contains('cbtn')) {
          const cardContainer = trgtElement.parentElement?.parentElement?.parentElement?.parentElement;
          const prodID = cardContainer?.dataset.prodid;

          if (prodID && prodID !== '') {

            if (trgtElement.classList.contains('fa-heart')) {
              this.controller.removeFromFav(prodID);

              trgtElement.classList.remove('fa-heart');
              trgtElement.classList.remove('active');
              trgtElement.classList.add('fa-heart-o');
            }
            else {

            if (trgtElement.classList.contains('fa-heart-o')) {
              this.controller.addToFav(prodID);

              trgtElement.classList.remove('fa-heart-o');
              trgtElement.classList.add('fa-heart');
              trgtElement.classList.add('active');
            }}

            if (trgtElement.classList.contains('btn-to-cart')) {
              if (this.controller.addItemToCart(prodID)) {
                this.view.toggleCardButtons(cardContainer);
              }
            }

            if (trgtElement.classList.contains('fa-minus')) {
              const itemFinQty =  this.controller.decreaseItemQtyInCart(prodID);
              if (itemFinQty === 0) {
                this.view.toggleCardButtons(cardContainer);
              }
            }

            if (trgtElement.classList.contains('fa-plus')) {
              this.controller.increaseItemQtyInCart(prodID);
            }

            if (trgtElement.classList.contains('fa-trash')) {
              this.controller.removeItemFromCart(prodID);
              this.view.toggleCardButtons(cardContainer);
            }

            this.view.updateCartDisplayedQty(this.controller.cart);
            this.view.updateItemDisplayedQty(prodID, this.controller.cart, cardContainer);
          }
        }

        if (trgtElement.classList.contains('fa-cart-arrow-down')) {
          const cardContainer = trgtElement.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
          const prodID = cardContainer?.dataset.prodid;
          if (prodID && prodID !== '') {
            if (this.controller.addItemToCart(prodID)) {
              this.view.toggleCardButtons(cardContainer);
            }
          }
        }

      }
      });


  }
}

export default App;