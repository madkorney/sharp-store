import * as products from './data';
import fullProdList from './products.json';
import stockAvailable from './stock-available.json';
import categoriesLvl0 from './categories-lvl-0.json';
import categoriesLvl1 from './categories-lvl-1.json';
import categoriesLvl2 from './categories-lvl-2.json';
import categoriesUseCasesJSON from './categories-use-cases.json';


const fullProductList = fullProdList as products.Product[];
const  categoriesUseCases =  categoriesUseCasesJSON as products.Category[];

function getFilterRangeBoundaries(productList : products.Product[]) {
  const filterBoundaries : products.FilterState = {
    price: {
      high: 0,
      low: productList[0].priceValue,
    },
    bladeLength: {
      high: 0,
      low: productList[0].features.bladeLengthMm || 0,
    },
    weight: {
      high: 0,
      low: productList[0].features.weightGramms || 0,
    },
  };

  productList.forEach((product) => {
    if (filterBoundaries.price) {
      filterBoundaries.price.high = Math.max(filterBoundaries.price?.high , product.priceValue);
      filterBoundaries.price.low = Math.min(filterBoundaries.price?.low , product.priceValue);
    }
    if (filterBoundaries.bladeLength) {
      filterBoundaries.bladeLength.high = Math.max(filterBoundaries.bladeLength?.high , product.features.bladeLengthMm || 0);
      filterBoundaries.bladeLength.low = Math.min(filterBoundaries.bladeLength?.low , product.features.bladeLengthMm || 0);
    }
    if (filterBoundaries.weight) {
      filterBoundaries.weight.high = Math.max(filterBoundaries.weight?.high , product.features.weightGramms || 0);
      filterBoundaries.weight.low = Math.min(filterBoundaries.weight?.low , product.features.weightGramms || 0);
    }
  });
 return filterBoundaries;
}


//  images preload  - products/utility/icons
function importAll(r:__WebpackModuleApi.RequireContext) {
    interface ImageList extends Record<string, string | number | undefined> {
      name :  string;
    }
    const images : ImageList = {'name':''};
    r.keys().map((item : string) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const productImages = importAll(require.context('../../assets/img/products', false, /\.(png|jpe?g|svg)$/i));
const utilityImages = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/i));
const iconImages = importAll(require.context('../../assets/icons/', false, /\.(png|jpe?g|svg)$/i));





export default {
  fullProductList,
  categoriesLvl0,
  categoriesLvl1,
  categoriesLvl2,
  categoriesUseCases,
  stockAvailable,
  productImages,
  utilityImages,
  iconImages,
  getFilterRangeBoundaries,
};
