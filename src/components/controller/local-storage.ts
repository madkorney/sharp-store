import * as products from '../../components/data/data';

const localStorageKey = 'sharp-store-data';

export interface localStorageData {
  cart : products.CartContent,
  favs : string[],
  filterState : products.FilterState,
}

export function saveStateToLocalStorage(
  cart : products.CartContent,
  favorites : string[],
  filter: products.FilterState ):void {

  const data : localStorageData ={
    cart : cart,
    favs : favorites,
    filterState : filter
  };

   localStorage.removeItem(localStorageKey);
   localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export function getStateFromLocalStorage():localStorageData {

  const data :localStorageData = JSON.parse(localStorage.getItem(localStorageKey) || '');

  return data;
}

export function clearLocalStorageData():void {
  if (localStorage.getItem(localStorageKey)) {
    localStorage.removeItem(localStorageKey);
  }
}

export function localStorageHasData():boolean {
  return localStorage.getItem(localStorageKey) !== null;
}


export default {
  saveStateToLocalStorage,
  getStateFromLocalStorage,
  clearLocalStorageData,
  localStorageHasData,
};
