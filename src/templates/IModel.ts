import ICard from './ICards';
import IBasket from './IBasket';

interface IModel {
    basket:IBasket;
    currentCards:ICard[];
    num1:number;
    num2:number;
    defaultCards:ICard[];
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

    checkCurrentToyValues:(arg0:string[])=>boolean;
    setCurrentElement:(arg0:ICard)=>boolean;
    bindTrainChange:(arg0:()=>void)=>void;
    checkValueOfCategory:(arg0:string, arg1?:string)=>void;
    checkByCategory:(arg0:string)=>void;
    filterCards:()=>void;
    sortNameCount:(sortParameter:string)=>void;
    setNum:()=>void;
    sortArrayBy:(arg0:string)=>number|ICard[];
    setCardBySymbol:(arg0:ICard)=>boolean;
    checkTheSameSymbols:(arg0:string)=>void;
    handleDragStart:(e:DragEvent)=>void;
}

export default IModel;
