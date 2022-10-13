import IBasket from '../templates/IBasket';
import ICard from '../templates/ICards';

export default class View {
  mainContainer:HTMLDivElement;

  basketImage:HTMLImageElement;

  buttonsShape:NodeListOf<HTMLButtonElement>;

  buttonReset:HTMLButtonElement;

  buttonsSize:NodeListOf<HTMLButtonElement>;

  buttonsColor:NodeListOf<HTMLButtonElement>;

  input:HTMLInputElement;

  buttonsSort:NodeListOf<HTMLButtonElement>;

  treeContainer:HTMLDivElement;

  numOfBoxes:number;

  secondAside:HTMLDivElement;

  toysWrapper:HTMLDivElement;

  rangeInput:NodeListOf<HTMLInputElement>;

  priceInput:NodeListOf<HTMLInputElement>;

  rangeCount:HTMLDivElement;

  rangeYear:HTMLDivElement;

  priceGap:number;

  constructor() {
    this.mainContainer = document.querySelector('.main-container');
    this.treeContainer = document.querySelector('.tree-container');
    this.basketImage = document.querySelector('.basket-img');

    this.buttonsColor = document.querySelectorAll('.button-color');
    this.buttonsShape = document.querySelectorAll('.button-shape');
    this.buttonsSize = document.querySelectorAll('.button-size');
    this.buttonReset = document.querySelector('.reset-button');
    this.buttonsSort = document.querySelectorAll('.button-sort');

    this.input = document.querySelector('.input-search');
    this.rangeInput = document.querySelectorAll('.range-input input');
    this.priceInput = document.querySelectorAll('.price-input input');
    this.rangeCount = document.querySelector('.slider.count .progress');
    this.rangeYear = document.querySelector('.slider.year .progress');
    this.priceGap = 1; 

    this.secondAside;
    this.toysWrapper;
  }

  displayBasketScore = (basket) => {
    let sum = 0;
    for (const key in basket) {
      sum += basket[key].countInBasket;
    }
    return String(sum);
  };

  displayList(data:ICard[], basket:IBasket) {
    this.basketImage.innerHTML = this.displayBasketScore(basket);

    const list:HTMLDivElement = document.querySelector('.main-container');
    const arrayToys = ['count', 'year', 'shape', 'color', 'size', 'favorite'];
    const arrayOfCategories:string[] = ['Количество', 'Год', 'Форма', 'Цвет', 'Размер', 'Любимая'];
    list.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const itemElement = document.createElement('div');
      itemElement.classList.add('card');

      const titleElement = document.createElement('h1');
      titleElement.classList.add('title');
      titleElement.innerHTML += data[i].name;

      const wrapperImageList = document.createElement('div');
      wrapperImageList.classList.add('wrapper-image-list');

      const wrapperImageElement = document.createElement('div');
      wrapperImageElement.classList.add('wrapper-image');
      wrapperImageElement.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${data[i].num}.png')`;

      const wrapperList = document.createElement('div');
      wrapperList.classList.add('wrapper-list');

      for (let y = 0; y < arrayOfCategories.length; y++) {
        const value:string = arrayToys[y];
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `${arrayOfCategories[y]}: ${data[i][value]}`;
        if (value === 'favorite') {
          if (data[i][value] as boolean === true) {
            categoryElement.innerHTML = `${arrayOfCategories[y]}: да`;
          } else {
            categoryElement.innerHTML = `${arrayOfCategories[y]}: нет`;
          }
        }
        wrapperList.appendChild(categoryElement);
      }

      const basketBtn = document.createElement('p');
      basketBtn.classList.add('to-basket-btn');
      basketBtn.setAttribute('data-id', data[i].name);
      if (basket[data[i].name]) {
        basketBtn.innerHTML = 'в корзинe';
        basketBtn.style.background = 'rgba(0, 255, 255, 0.332)';
      } else {
        basketBtn.innerHTML = 'в корзину';
        basketBtn.style.background = 'rgba(204, 221, 221, 0.075)';
      }

      wrapperImageList.appendChild(wrapperImageElement);
      wrapperImageList.appendChild(wrapperList);
      itemElement.appendChild(titleElement);
      itemElement.appendChild(wrapperImageList);
      itemElement.appendChild(basketBtn);
      list.appendChild(itemElement);
    }
  }

  bindSetButtons(
    handler:(category:string, value:string)=>void,
    handlerReset:()=>void,
    handlerSortNameCount:(value:string)=>void,
    handlerInput:(value:string)=>void,
    handlerMinMaxCount:(min:number, max:number)=>void,
    handlerMinMaxYear:(min:number, max:number)=>void,
    handlerAddToBasket:(name:string)=>boolean,
    basket:IBasket,
    handlerSetToyBoxes:()=>void,
    showCards:()=>void,
  ) {
    const mainPageBtn = document.querySelector('.logo');
    const basketBtn = document.querySelector('.basket-wrapper');
    const toysWrapper = document.querySelector('.toys-wrapper');
    const treeWrapper = document.querySelector('.tree-wrapper');

    this.mainContainer.addEventListener('click', (e:Event) => {
      const el = e.target as HTMLDivElement;
      if (el.classList.contains('to-basket-btn')) {
        if (handlerAddToBasket(el.dataset.id)) {
          el.innerHTML = 'в корзине';
          el.style.background = 'rgba(0, 255, 255, 0.332)';
        } else {
          el.innerHTML = 'в корзину';
          el.style.background = 'rgba(204, 221, 221, 0.075)';
        }
        this.basketImage.innerHTML = this.displayBasketScore(basket);
      }
    });

    this.treeContainer.addEventListener('click', (e) => {
      const el = e.target as HTMLDivElement;
      if (el.classList.contains('delete-img')) {
        handlerAddToBasket(el.dataset.id); // delete card from basket
        handlerSetToyBoxes();
        this.basketImage.innerHTML = this.displayBasketScore(basket);
      }
    });

    this.buttonsShape.forEach((button) => {
      button.addEventListener('click', () => {
        const valueOfShape = button.dataset.filter; // for example: шар
        handler('shape', valueOfShape);
      });
    });
    this.buttonsColor.forEach((button) => {
      button.addEventListener('click', () => {
        const valueOfColor = button.dataset.filter;
        handler('color', valueOfColor);
      });
    });
    this.buttonsSize.forEach((button) => {
      button.addEventListener('click', () => {
        const valueOfSize = button.dataset.filter;
        handler('size', valueOfSize);
      });
    });
    this.buttonReset.addEventListener('click', () => {
      handlerReset();
    });

    this.input.addEventListener('input', () => {
      const value = this.input.value.trim();
      handlerInput(value);
    });

    this.rangeInput.forEach((input) => {
      input.addEventListener('input', (e) => {
        let minVal:number;
        let maxVal:number;
        const el = e.target as HTMLInputElement;
        if (el.className === 'range-min count' || el.className === 'range-max count') {
          minVal = parseInt(this.rangeInput[0].value);
          maxVal = parseInt(this.rangeInput[1].value);
          handlerMinMaxCount(minVal, maxVal);
        } else {
          minVal = parseInt(this.rangeInput[2].value);
          maxVal = parseInt(this.rangeInput[3].value);
          handlerMinMaxYear(minVal, maxVal);
        }
        if ((maxVal - minVal) < this.priceGap) {
          if (el.className === 'range-min count') {
            this.rangeInput[0].value = String(maxVal - this.priceGap);
          } else if (el.className === 'range-max count') {
            this.rangeInput[1].value = String(minVal + this.priceGap);
          } else if (el.className === 'range-min year') {
            this.rangeInput[2].value = String(maxVal - this.priceGap);
          } else if (el.className === 'range-max year') {
            this.rangeInput[3].value = String(minVal + this.priceGap);
          }
        } else if (el.className === 'range-min count' || el.className === 'range-max count') {
          this.priceInput[0].value = String(minVal);
          this.priceInput[1].value = String(maxVal);

          this.rangeCount.style.left = `${(minVal / Number(this.rangeInput[0].max)) * 100}%`;
          this.rangeCount.style.right = `${100 - (maxVal / Number(this.rangeInput[1].max)) * 100}%`;
        } else {
          this.priceInput[2].value = String(minVal);
          this.priceInput[3].value = String(maxVal);

          this.rangeYear.style.left = `${((minVal - 1940) / Number(this.rangeInput[2].max)) * 2450}%`;
          this.rangeYear.style.right = `${100 - ((maxVal - 1940) / Number(this.rangeInput[3].max)) * 2450}%`;
        }
      });
    });

    basketBtn.addEventListener('click', () => {
      toysWrapper.classList.add('hide');
      treeWrapper.classList.remove('hide');
      handlerSetToyBoxes();
    });

    mainPageBtn.addEventListener('click', () => {
      treeWrapper.classList.add('hide');
      toysWrapper.classList.remove('hide');
      showCards(); 
    });

    for (let index = 0; index < this.buttonsSort.length; index++) {
      this.buttonsSort[index].addEventListener('click', () => {
        const value = this.buttonsSort[index].dataset.sort;
        handlerSortNameCount(value);
      });
    }
  }

  setToysBoxes(handleDragEvent:(DragEvent)=>void, basket:IBasket) {
    this.secondAside = document.querySelector('.second-aside');
    this.secondAside.innerHTML = '';

    for (const key in basket) {
      const toysPicture = document.createElement('img');
      toysPicture.classList.add('toys-picture');
      const picture = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${basket[key].num}.png`;
      toysPicture.src = picture;
      toysPicture.setAttribute('draggable', 'true');

      const toyWrapper = document.createElement('div');
      toyWrapper.appendChild(toysPicture);
      toyWrapper.classList.add('toy-wrapper');

      const name = document.createElement('p');
      name.classList.add('name-in-basket');
      name.innerHTML = basket[key].name;
      toyWrapper.appendChild(name);

      const deleteImage = document.createElement('div');
      deleteImage.classList.add('delete-img');
      deleteImage.setAttribute('data-id', basket[key].name); 

      toyWrapper.appendChild(deleteImage);

      this.secondAside.appendChild(toyWrapper);

      toysPicture.addEventListener('dragstart', (event) => {
        handleDragEvent(event);
      });
    }
  }
}
