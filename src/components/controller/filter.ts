import * as products from '../data/data';
import dt from '../data/data-loader';
import * as noUiSlider from 'nouislider';

export class ProductsFilter {
  filterState : products.FilterState;

  constructor() {
    this.filterState = {};
  }

   clearFilterState() {
     for (const key in this.filterState) {
       delete this.filterState[key as keyof typeof this.filterState];
     }
   }

   updateFilterFromControls()  {
    //update on controls change
    const rangePrice = document.getElementById('price-slider') as noUiSlider.target;
    const rangeBladeLength = document.getElementById('length-slider') as noUiSlider.target;
    const rangeWeight = document.getElementById('weight-slider') as noUiSlider.target;
    const sort = document.getElementById('sel-sort') as HTMLInputElement;

    this.filterState.price =
      {low : (rangePrice.noUiSlider?.get(true) as number[])[0] ,
       high : (rangePrice.noUiSlider?.get(true) as number[])[1]};

    this.filterState.bladeLength =
      {low : (rangeBladeLength.noUiSlider?.get(true) as number[])[0] ,
       high : (rangeBladeLength.noUiSlider?.get(true) as number[])[1]};

    this.filterState.weight =
      {low : (rangeWeight.noUiSlider?.get(true) as number[])[0] ,
       high : (rangeWeight.noUiSlider?.get(true) as number[])[1]};

    if (sort.value !== '') {
      this.filterState.sortOrder = sort.value as products.SortOptions;
    } else {
      delete this.filterState.sortOrder;
    }

  }

  applyFilter(favs : string[]) : products.Product[] {
    const filteredList: products.Product[] = [];

    dt.fullProductList.forEach((product) => {
      let fitsFilter = true;

      if (this.filterState.price) {
        fitsFilter = (product.priceValue >= this.filterState.price.low)
                  && (product.priceValue <= this.filterState.price.high)
                  && fitsFilter;
      }

      if (this.filterState.bladeLength) {
        if (product.features.bladeLengthMm) {
        fitsFilter = (product.features.bladeLengthMm >= this.filterState.bladeLength.low)
                  && (product.features.bladeLengthMm <= this.filterState.bladeLength.high)
                  && fitsFilter;
        } else fitsFilter = false;
      }

      if (this.filterState.weight) {
        if (product.features.weightGramms) {
        fitsFilter = (product.features.weightGramms >= this.filterState.weight.low)
                  && (product.features.weightGramms <= this.filterState.weight.high)
                  && fitsFilter;
        } else fitsFilter = false;
      }

      if (this.filterState.namePart && this.filterState.namePart !== '') {
        fitsFilter = product.name.toLowerCase().includes(this.filterState.namePart.toLowerCase())
                     && fitsFilter;
      }

      if (this.filterState.brand
       && this.filterState.brand.length > 0) {
        fitsFilter = this.filterState.brand.includes(product.brand)
                      && fitsFilter;
      }

      if (this.filterState.bladeSteel
        && this.filterState.bladeSteel.length > 0) {
        if (product.features.bladeSteel) {
         fitsFilter = this.filterState.bladeSteel.includes(product.features.bladeSteel)
         && fitsFilter;
       } else fitsFilter = false;
      }

       if (this.filterState.color
        && this.filterState.color !== products.Color.any) {
         fitsFilter = this.filterState.color === product.color
         && fitsFilter;
       }

       if (this.filterState.displayFavouritesToggle) {
         fitsFilter = favs.includes(product.ID)
         && fitsFilter;
       }



      if (fitsFilter) {
        filteredList.push(product);
      }

    });

  if (this.filterState.sortOrder) {
    switch (this.filterState.sortOrder)  {
      case products.SortOptions.name:
        filteredList.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
        break;
      case products.SortOptions.nameReverse:
        filteredList.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));
        break;
      case products.SortOptions.priceValue:
        filteredList.sort((a,b) => (a.priceValue - b.priceValue));
        break;
      case products.SortOptions.priceValueReverse:
        filteredList.sort((a,b) => (b.priceValue - a.priceValue));
        break;
    }

  }


    return filteredList;
  };

}

export default {
  ProductsFilter,
};
