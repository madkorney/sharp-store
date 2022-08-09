import * as products from '../../../components/data/data';
import dt from '../../../components/data/data-loader';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import '../../../css/nouislider.scss';

const filterBounds = dt.getFilterRangeBoundaries(dt.fullProductList);
const chkBoxBrand = document.querySelector('#brand-chk') as HTMLElement;
const chkBoxColor = document.querySelector('#color-rad') as HTMLElement;
const rangePrice = document.getElementById('price-slider') as noUiSlider.target;
const rangeBladeLength = document.getElementById('length-slider') as noUiSlider.target;
const rangeWeight = document.getElementById('weight-slider') as noUiSlider.target;
const chkBladeSteel = document.querySelector('#steel-chk') as HTMLElement;
const sortSelect = document.querySelector('#sel-sort') as HTMLInputElement;
const nameSearch = document.querySelector('#search-by-name-input') as HTMLInputElement;
const filterForm = document.querySelector('#form-filters') as HTMLFormElement;


export function prepareControls(): void {

    // todo refactor to func
  for (const brand in products.Brand) {
    const cInput = document.createElement('input');
    const cLabel = document.createElement('label');
    const cDiv = document.createElement('div');
    cDiv.classList.add('chkbox');
    cInput.setAttribute('type','checkbox');
    cInput.setAttribute('id',`brand-${brand}`);
    cInput.setAttribute('name','chk-brand');
    cInput.setAttribute('form','form-filters');
    cLabel.setAttribute('for',`brand-${brand}`);
    cLabel.textContent = products.Brand[brand as keyof typeof products.Brand];
    cDiv.appendChild(cInput);
    cDiv.appendChild(cLabel);
    chkBoxBrand.appendChild(cDiv);
  }

  for (const color in products.Color) {
    const cInput = document.createElement('input');
    const cLabel = document.createElement('label');
    const cDiv = document.createElement('div');
    cDiv.classList.add('chkbox');
    cInput.setAttribute('type','radio');
    cInput.setAttribute('id',`color-${color}`);
    cInput.setAttribute('name','rad-color');
    cInput.setAttribute('form','form-filters');
    if (color === products.Color.any)
      cInput.setAttribute('checked','');
    cLabel.setAttribute('for',`color-${color}`);
    cLabel.textContent = color;
    cLabel.style.borderLeft=`12px solid ${color}`;
    cDiv.appendChild(cInput);
    cDiv.appendChild(cLabel);
    chkBoxColor.appendChild(cDiv);
  }

  for (const steel in products.Steel) {
    const cInput = document.createElement('input');
    const cLabel = document.createElement('label');
    const cDiv = document.createElement('div');
    cDiv.classList.add('chkbox');
    cInput.setAttribute('type','checkbox');
    cInput.setAttribute('id',`steel-${steel}`);
    cInput.setAttribute('name','chk-brand');
    cInput.setAttribute('form','form-filters');
    cLabel.setAttribute('for',`steel-${steel}`);
    cLabel.textContent = products.Steel[steel as keyof typeof products.Steel];
    cDiv.appendChild(cInput);
    cDiv.appendChild(cLabel);
    chkBladeSteel.appendChild(cDiv);
  }

  // todo refactor to func
{
  noUiSlider.create(rangePrice, {
    start: [0, filterBounds.price?.high || 1000],
    connect: true,
    range: {
        'min': [filterBounds.price?.low || 0],
        'max': [filterBounds.price?.high || 1000],
    }
  });
  const labelsDiv = document.querySelector('#price-slider-labels') as HTMLElement;
  rangePrice.noUiSlider?.on('update', function (values) {
    labelsDiv.textContent =
    `from $${(Number(values[0]) / 100).toFixed(2)} to $${(Number(values[1]) / 100).toFixed(2)}`;
  });

}

{
  noUiSlider.create(rangeBladeLength, {
    start: [0, filterBounds.bladeLength?.high || 1000],
    connect: true,
    range: {
        'min': [filterBounds.bladeLength?.low || 0],
        'max': [filterBounds.bladeLength?.high || 1000],
    }
  });

  const labelsDiv = document.querySelector('#length-slider-labels') as HTMLElement;
  rangeBladeLength.noUiSlider?.on('update', function (values) {
    labelsDiv.textContent =
    `from ${values[0]} mm to ${values[1]} mm`;
  });

}

{
  noUiSlider.create(rangeWeight, {
    start: [0, filterBounds.weight?.high || 1000],
    connect: true,
    range: {
        'min': [filterBounds.weight?.low || 0],
        'max': [filterBounds.weight?.high || 1000],
    }
  });
  const labelsDiv = document.querySelector('#weight-slider-labels') as HTMLElement;
  rangeWeight.noUiSlider?.on('update', function (values) {
    labelsDiv.textContent =
    `from ${values[0]} g to ${values[1]} g`;
  });

}
}

export function resetControls(): void {
  const filterControls = filterForm.elements;

  for (const control of filterControls) {
    (control as HTMLFormElement).checked = false;
  }
  (document.querySelector('#color-any') as HTMLInputElement).checked = true;

  rangeBladeLength.noUiSlider?.reset();
  rangeWeight.noUiSlider?.reset();
  rangePrice.noUiSlider?.reset();

  nameSearch.value = '';
  sortSelect.value = products.SortOptions.nosort;
  document.querySelector('#fav-toggle')?.classList.remove('fa-toggle-on');
  document.querySelector('#fav-toggle')?.classList.add('fa-toggle-off');
}

export function setControlsValues(filterState: products.FilterState): void {
  const filterControls = filterForm.elements;

  for (const control of filterControls) {
    if (control) {
      const trgtElement = control as HTMLFormElement;
      const paramType = trgtElement.getAttribute('id')?.split('-')[0] || '';
      const param = trgtElement.getAttribute('id')?.split('-')[1] || '';

      if (paramType === 'color' && !filterState.color && param === 'any') {
        trgtElement.setAttribute('checked','');
      }

      if (paramType === 'color' && filterState.color && param === filterState.color) {
        trgtElement.setAttribute('checked','');
      }

      if (paramType === 'brand'
          && filterState.brand
          && filterState.brand.length > 0
          && filterState.brand.includes(products.Brand[param as keyof typeof products.Brand])
         ) {
        trgtElement.setAttribute('checked','');
      }

      if (paramType === 'steel'
          && filterState.bladeSteel
          && filterState.bladeSteel.length > 0
          && filterState.bladeSteel.includes(products.Steel[param as keyof typeof products.Steel])
         ) {
        trgtElement.setAttribute('checked','');
      }
    }
  }

  // set noUIsliders
  if (filterState.price) {
    rangePrice.noUiSlider?.set([filterState.price.low,
                                filterState.price.high
                              ]);
  }

  if (filterState.bladeLength) {
    rangeBladeLength.noUiSlider?.set([filterState.bladeLength.low,
                                      filterState.bladeLength.high
                                    ]);
  }

  if (filterState.weight) {
    rangeWeight.noUiSlider?.set([filterState.weight.low,
                                 filterState.weight.high
                                ]);
  }

  if (filterState.namePart && filterState.namePart !=='') {
    nameSearch.value = filterState.namePart;
  }

  if (filterState.sortOrder) {
    sortSelect.value = filterState.sortOrder;
  }
  
}

export default {
  prepareControls,
  resetControls,
  setControlsValues,
};
