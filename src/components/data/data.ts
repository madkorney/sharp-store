export interface ProductCategory {
  level0: Category,
  level1: Category,
  level2: Category,
  id: string, // = lvl0id+lvl1id+lvl2id
}

export interface Category {
  id : string,
  name : string,
}

export enum Currency {
  RUB,
  USD
}

export enum CurrencyName {
  RUB = 'RUB',
  USD = 'USD',
}

export enum Brand {
  Benchmade = 'Benchmade',
  Rusber = 'RusBer',
  ColdSteel = 'Cold Steel',
  Martiini = 'Martiini',
  Buck = 'Buck',
  DougRitter = 'Doug Ritter',
  Falkniven = 'Falkniven',
  Victorinox = 'Victorinox',
  ESEE = 'ESEE',
  Camillus = 'Camillus',
  Mora = 'Mora',
  handmade = 'handmade',
  other = 'other',
  mrBlade = 'Mr. Blade',
  Fiskars = 'Fiskars',
  Zlatoust = 'Zlatoust',
}

export enum CounrtyOfOrigin {
  USA = 'USA',
  Russia = 'Russia',
  Finland = 'Finland',
  Swiss = 'Switzerland',
  China = 'China',
  Czech = 'Czech',
  Sweden = 'Sweden',
}

export enum Color {
  any = 'any',
  black = 'black',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  brown = 'brown',
  gray = 'gray',
}

export enum Steel {
  AUS8 = 'AUS8',
  C440 = '440C',
  S30V = 'CPM-S30V',
  D2 = 'D2',
  carbinox = 'Carbinox T508',
  s80CrV2 ='80CrV2',
  VG10 = 'VG10',
  VG1 = 'VG-1',
  s12C27= 'Sandvik 12C27',
  s35VN = 'S35VN',
}

export enum BladeStyle {
  dropPoint = 'Drop-point',
  tanto = 'Tanto',
  bowie = 'Bowie',
  puukko = 'Puukko',
}

export interface Features {
  material? : string,
  bladeSteel? : Steel,
  handleMaterial?: string,
  accessoryFor? : string[], // prod ids or cat ids
  weightGramms? : number,
  lengthMm? : number,
  bladeLengthMm? : number,
  handleLengthMm? : number,
  bladeThiknessMm? : number,
  bladeStyle? : BladeStyle,
  lockType? : string,
  numberOfTools? : number,
}


export interface Product {
  ID : string,
  name : string,
  modelID : string,  // can be empty str
  description : string,
  priceValue : number,
  category : ProductCategory,
  brand : Brand,
  year : number,
  color : Color,
  countryOfOrigin : CounrtyOfOrigin,
  pictures : string[],
  features : Features,
  useCases : string[],
}

export enum SortOrder {
  acseding,
  desceding,
}

export interface SortFlags {
  name: SortOrder,
  priceValue: SortOrder,
}

export interface StockItem {
  id: string,
  qty: number,
}

export type cartItem = {
  id:string,
  qty: number,
}

export type CartContent = cartItem[];

interface Interval {
  low: number,
  high: number,
}

export enum SortOptions {
 nosort = '',
 name = 'name',
 nameReverse= 'name-reverse',
 priceValue = 'priceValue',
 priceValueReverse = 'priceValue-reverse',
}

export interface FilterState {
  price?: Interval,
  namePart?: string,
  color?: Color,// one value for radio
  brand?: Brand[],
  useCase?: string[],
  bladeLength?: Interval,
  bladeSteel?: Steel[],
  weight?: Interval,
  displayFavouritesToggle?: boolean,
  sortOrder?: SortOptions,
}

export interface viewCallback {
  (productsToDisplay: Product[],
  cartProducts: CartContent,
  favourites: string[]
  ): void};

export interface viewCartQtyCallback {
  (itemID: string,
  cartProducts: CartContent
  ): void};

export interface viewToggleBtnsCallback {
  (card: HTMLElement): void};
