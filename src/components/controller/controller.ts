import dt from '../../components/data/data-loader';
import * as products from '../../components/data/data';
import * as fi from './filter';
import * as filterView from '../view/filter/filter-view';
import * as localStorage from './local-storage';

class AppController  {
  cart : products.CartContent;
  favourites : string[];
  filteredProductList : products.Product[];
  filter : fi.ProductsFilter;
  maxQtyInCart : number;

  constructor() {
    this.filter = new fi.ProductsFilter;
    this.maxQtyInCart = 20;

    if (localStorage.localStorageHasData()) {
      const savedData = localStorage.getStateFromLocalStorage();
      this.filter.filterState = savedData.filterState;
      this.favourites = savedData.favs;
      this.cart = savedData.cart;
      this.filteredProductList = this.filter.applyFilter(this.favourites);

    } else {
      this.filteredProductList = dt.fullProductList.slice();
      this.favourites = [];
      this.cart = [];
    }

  }

  updateList(redrawList : products.viewCallback) {

    this.filter.updateFilterFromControls();
    this.filteredProductList = this.filter.applyFilter(this.favourites);

    redrawList(this.filteredProductList,
      this.cart,
      this.favourites
    );

    localStorage.saveStateToLocalStorage(
        this.cart,
        this.favourites,
        this.filter.filterState
    );

    }

  clearFilter(redrawList : products.viewCallback) {

    filterView.resetControls();
    this.filter.clearFilterState();
    this.filteredProductList = dt.fullProductList.slice();

    redrawList(this.filteredProductList,
      this.cart,
      this.favourites
    );

    localStorage.saveStateToLocalStorage(
      this.cart,
      this.favourites,
      this.filter.filterState
    );

  }

  getCartTotalQty(): number {
    const cartTotalQty : number = this.cart.reduce((prev, cartItem) => prev + cartItem.qty, 0);
    return cartTotalQty;
  }

  cartIndexOfItem(itemID: string): number {
    let index = -1;

    this.cart.forEach((crtItem, indx) => {if (crtItem.id === itemID) index = indx;} );

    return index;
  }

  addItemToCart(itemID : string) : boolean {
    const newCartItem: products.cartItem = {
      id: itemID,
      qty: 1
    };

    if (this.getCartTotalQty() < this.maxQtyInCart) {
      this.cart.push(newCartItem);

      localStorage.saveStateToLocalStorage(
        this.cart,
        this.favourites,
        this.filter.filterState
      );

      return true;
    } else {
      // todo modal view call
      alert(`Sorry, you can not have more than ${this.maxQtyInCart} units in cart.`);
      return false;
    }
  }

  increaseItemQtyInCart(itemID : string) {
    const itemIndex = this.cartIndexOfItem(itemID);

    if (itemIndex !== -1) {
      if (this.getCartTotalQty() < this.maxQtyInCart) {
        this.cart[itemIndex].qty += 1;

        localStorage.saveStateToLocalStorage(
          this.cart,
          this.favourites,
          this.filter.filterState
        );
      } else {
        // todo modal view call
        alert(`Sorry, you can not have more than ${this.maxQtyInCart} units in cart.`);
      }
    }
  }

  decreaseItemQtyInCart(itemID : string): number  {
    const itemIndex = this.cartIndexOfItem(itemID);

    if (itemIndex !== -1) {
      if (this.cart[itemIndex].qty  > 1) {
        this.cart[itemIndex].qty -= 1;

        localStorage.saveStateToLocalStorage(
          this.cart,
          this.favourites,
          this.filter.filterState
        );

        return this.cart[itemIndex].qty;
      } else {
        this.removeItemFromCart(itemID);
        return 0;
      }
    }
    return 0;
  }

  removeItemFromCart(itemID : string): boolean {
    const itemIndex = this.cartIndexOfItem(itemID);

    if (itemIndex !== -1) {
      this.cart.splice(itemIndex, 1);

      localStorage.saveStateToLocalStorage(
        this.cart,
        this.favourites,
        this.filter.filterState
      );
      return true;
    }
    return false;
  }

  removeFromFav(itemID : string) {
    const indexOfItem = this.favourites.indexOf(itemID);

    if (indexOfItem !== -1) {
      this.favourites.splice(indexOfItem, 1);

      localStorage.saveStateToLocalStorage(
        this.cart,
        this.favourites,
        this.filter.filterState
      );
    }
  }

  addToFav(itemID : string) {
    if (!this.favourites.includes(itemID)) {
      this.favourites.push(itemID);

      localStorage.saveStateToLocalStorage(
        this.cart,
        this.favourites,
        this.filter.filterState
      );
    }
  }


  clearSettingsInLocalStorage() {
    localStorage.clearLocalStorageData();
  }





}

export default AppController;
