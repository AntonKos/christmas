import { data } from '../dataObject';
import basket from './Basket';
import IBasket from '../templates/IBasket';
import ICard from '../templates/ICards';

export default class Model {
  basket:IBasket;

  num1:number;

  num2:number;

  defaultCards:ICard[];

  currentCards:ICard[];

  allValues:string;

  desc:boolean;

  size:string[];

  color:string[];

  shape:string[];

  currentCategories: string[];

  showCards:()=>void;

  minCount:number;

  maxCount:number;

  minYear:number;

  maxYear:number;

  constructor() {
    this.basket = basket;

    this.size = ['большой', 'средний', 'малый'];
    this.color = ['белый', 'красный', 'зелёный', 'желтый', 'синий'];
    this.shape = ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'];

    this.desc = false;

    this.currentCategories = [];
    this.defaultCards = data;
    this.currentCards = this.defaultCards;

    this.num1 = -1;
    this.num2 = 1;

    this.minCount = 0;
    this.maxCount = 12;
    this.minYear = 1940;
    this.maxYear = 2020;
  }

  checkCurrentToyValues(arrayOfToyValues:string[]):boolean {
    for (let i = 0; i < this.currentCategories.length; i += 1) {
      const el = this.currentCategories[i];
      if (!arrayOfToyValues.includes(el)) {
        return false;
      }
    }
    return true;
  }

  setCurrentElement(element:ICard) {
    if (Number(element.count) < this.minCount || Number(element.count) > this.maxCount
    || Number(element.year) < this.minYear || Number(element.year) > this.maxYear) {
      return false;
    }
    const arrayOfToyValues = [element.size, element.color, element.shape];
    return this.checkCurrentToyValues(arrayOfToyValues);
  }

  bindTrainChange(callback:()=>void) {
    this.showCards = callback;
  }

  checkValueOfCategory(category:'size'|'shape'|'color', valueOfCategory?:string):void { 
    this.checkByCategory(category);
    if (valueOfCategory !== 'all') {
      this.currentCategories.push(valueOfCategory);
    }
    this.filterCards();
  }

  checkByCategory(category:'size'|'shape'|'color') { 
    this.currentCategories = this.currentCategories.filter(function (element) {
      if (this[category].includes(element)) {
        return false;
      }
      return true;
    }, this);
  }

  filterCards() {
    this.currentCards = this.defaultCards.filter(
      this.setCurrentElement.bind(this),
    );
    this.showCards();
  }

  sortNameCount(sortParameter:string) {
    this.currentCards = this.sortArrayBy(sortParameter);
    this.showCards();
    this.desc = !this.desc;
  }

  setNum() {
    if (this.desc) {
      this.num1 = -1;
      this.num2 = 1;
    } else {
      this.num1 = 1;
      this.num2 = -1;
    }
  }

  sortArrayBy(sort:string) {
    this.setNum();

    if (sort === 'count') {
      this.currentCards.sort((a:ICard, b:ICard) => {
        if (Number(a[sort]) < Number(b[sort])) return this.num1;
        if (Number(a[sort]) > Number(b[sort])) return this.num2;
        return 0;
      });
    }
    if (sort === 'name') {
      this.currentCards.sort((a:ICard, b:ICard) => {
        if (a[sort] < b[sort]) return this.num1;
        if (a[sort] > b[sort]) return this.num2;
        return 0;
      });
    }
    return this.currentCards;
  }

  setCardBySymbol(element:ICard) {
    const arrayOfToyValues = [element.size, element.color, element.shape, element.name];
    const string = arrayOfToyValues.join('').replace(/\s/g, '').toLowerCase();

    if (string.search(this.allValues) === -1) {
      return false;
    }
    return true;
  }

  checkTheSameSymbols(allValues:string) {
    this.allValues = allValues;
    this.currentCards = this.currentCards.filter(
      this.setCardBySymbol.bind(this),
    );
    this.showCards();
  }

  handleDragStart(e:DragEvent) {
    e.dataTransfer.setData('text', (e.target as Element).id);
  }
}
