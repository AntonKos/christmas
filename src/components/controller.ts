import IModel from '../templates/IModel';
import IView from '../templates/IView';

export default class Controller {
  model:IModel;

  view:IView;

  constructor(model:IModel, view:IView) {
    this.model = model;
    this.view = view;
    this.view.bindSetButtons(
      this.handleEventListener,
      this.handleEventListenerReset,
      this.handleEventListenerSortNameQuantity,
      this.handleInputValue,
      this.handleMinMaxCount,
      this.handleMinMaxYear,
      this.handlerAddToBasket,
      this.model.basket,
      this.handlerSetToyBoxes,
      this.showCards,
    );
    this.view.displayList(this.model.defaultCards, this.model.basket);
    this.model.bindTrainChange(this.showCards);
    this.view.setToysBoxes(this.handleDragEvent, this.model.basket);
  }

  handlerSetToyBoxes = () => {
    this.view.setToysBoxes(this.handleDragEvent, this.model.basket);
  };

  handlerAddToBasket = (name:string) => {
    if (!this.model.basket[name]) {
      this.model.basket[name] = {
        ...this.model.defaultCards.find((el) => el.name === name),
        countInBasket: 1,
      };
      return true;
    }
    delete this.model.basket[name];

    return false;
  };

  handleEventListener = (category:string, valueOfCategory:string) => {
    this.model.checkValueOfCategory(category, valueOfCategory);
  };

  handleMinMaxCount = (min:number, max:number) => {
    this.model.minCount = min;
    this.model.maxCount = max;
    this.model.filterCards();
  };

  handleMinMaxYear = (min:number, max:number) => {
    this.model.minYear = min;
    this.model.maxYear = max;
    this.model.filterCards();
  };

  handleEventListenerReset = () => {
    this.model.currentCategories.length = 0;

    this.view.rangeInput[0].value = '0'; // присвоить значения через цикл?
    this.view.rangeInput[1].value = '12';
    this.view.rangeInput[2].value = '1940';
    this.view.rangeInput[3].value = '2020';

    this.view.priceInput[0].value = '0';
    this.view.priceInput[1].value = '12';
    this.view.priceInput[2].value = '1940';
    this.view.priceInput[3].value = '2020';

    this.model.minCount = 0;
    this.model.maxCount = 12;
    this.model.minYear = 1940;
    this.model.maxYear = 2020;

    this.view.rangeCount.style.left = '0';
    this.view.rangeCount.style.right = '0';
    this.view.rangeYear.style.left = '0';
    this.view.rangeYear.style.right = '0';

    this.model.filterCards();
  };

  handleEventListenerSortNameQuantity = (sortParameter:string) => {
    this.model.sortNameCount(sortParameter);
  };

  showCards = () => {
    this.view.displayList(this.model.currentCards, this.model.basket);
  };

  handleInputValue = (value:string) => {
    if (value) {
      this.model.checkTheSameSymbols(value);
    } else {
      this.model.filterCards();
    }
  };

  handleDragEvent = (event:DragEvent) => {
    this.model.handleDragStart(event);
  };
}
