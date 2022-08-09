import * as products from '../../../components/data/data';


const cartDisplayedQty = document.querySelector('.qty-in-cart') as HTMLElement;


function getCartTotalQty(cart : products.CartContent): number {
  const cartTotalQty : number = cart.reduce((prev, cartItem) => prev + cartItem.qty,0);
  return cartTotalQty;
}

function cartIndexOfItem(item: string, cart: products.CartContent): number {
  let index = -1;

  cart.forEach((crtItem, indx) => {if (crtItem.id === item) index = indx;} );

  return index;
}

export function updateDisplayedCartQty(cart : products.CartContent): void {

  if (cart.length === 0) {
    cartDisplayedQty.classList.add('hidden');
  }

  if (cart.length > 0) {
    if (cartDisplayedQty.classList.contains('hidden')) {
      cartDisplayedQty.classList.remove('hidden');
    }
    cartDisplayedQty.textContent = getCartTotalQty(cart).toString(10).padStart(2, '0');
  }
}

export function updateItemDisplayedQty(
                    itemID: string,
                    cart: products.CartContent,
                    card: HTMLElement) {

  const itemIndex = cartIndexOfItem(itemID, cart);
  if (itemIndex !== -1) {
    (card.querySelector('.qty-cart') as HTMLElement).textContent = `${cart[itemIndex].qty}`;
  }

}

export function toggleCardBtns(card: HTMLElement): void {
  const btnToCart = card.querySelector('.btn-to-cart') as HTMLElement;
  const btnIncreaseQty = card.querySelector('.btn-incr') as HTMLElement;
  const btnDecreaseQty = card.querySelector('.btn-decr') as HTMLElement;
  const btnDeleteFromCart = card.querySelector('.btn-del') as HTMLElement;
  const displayQty = card.querySelector('.qty-cart') as HTMLElement;


  if (btnToCart.classList.contains('hidden')) {
    btnToCart.classList.remove('hidden');
    btnIncreaseQty.classList.add('hidden');
    btnDecreaseQty.classList.add('hidden');
    btnDeleteFromCart.classList.add('hidden');
    displayQty.classList.add('hidden');
  } else {
    btnToCart.classList.add('hidden');
    btnIncreaseQty.classList.remove('hidden');
    btnDecreaseQty.classList.remove('hidden');
    btnDeleteFromCart.classList.remove('hidden');
    displayQty.classList.remove('hidden');
  }
}


export default {
  updateDisplayedCartQty,
  updateItemDisplayedQty,
  toggleCardBtns,
};
