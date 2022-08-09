import dt from '../../components/data/data-loader';
import {displayCards} from '../../components/view/product-list/product-list';
import * as products from '../../components/data/data';
import filterView from '../../components/view/filter/filter-view';
import cartView from '../../components/view/cart/cart-view';

export class AppView {

    updateLogoImages() {
    (document.querySelector('.rss-logo') as HTMLInputElement).
      setAttribute('src', `${dt.iconImages['rs_school_js.svg']}`);

    (document.querySelector('.top-logo') as HTMLInputElement).
      setAttribute('src', `${dt.utilityImages['zlogo.png']}`);

    }

    prepareControls(filterState : products.FilterState) {
      filterView.prepareControls();
      filterView.setControlsValues(filterState);
    }

    updateProductList(
      products : products.Product[],
      cart :products.CartContent,
      favs : string[] ) {

      displayCards({
        productsToDisplay: products,
        stockAvailable: dt.stockAvailable,
        favourites: favs,
        cartProducts: cart
      });

    }

    toggleCardButtons(card: HTMLElement) {
      cartView.toggleCardBtns(card);

    }

    updateCartDisplayedQty(cart: products.CartContent) {
      cartView.updateDisplayedCartQty(cart);
    }

    updateItemDisplayedQty(itemID: string, cart: products.CartContent, card: HTMLElement) {
      cartView.updateItemDisplayedQty(itemID, cart, card);
    }


}

export default AppView;
