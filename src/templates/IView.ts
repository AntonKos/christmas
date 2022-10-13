import IBasket from './IBasket';
import ICard from './ICards';

interface IView {
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

    displayBasketScore:(basket:IBasket)=>string;
    displayList:(arg0:ICard[], arg1:IBasket)=>void;

    bindSetButtons:(
      handler:(category:string, value:string)=>void, handlerReset:()=>void,
      handlerSortNameCount:(value:string)=>void, handlerInput:(value:string)=>void,
      handlerMinMaxCount:(min:number, max:number)=>void, handlerMinMaxYear:(min:number, max:number)=>void,
      handlerAddToBasket:(name)=>boolean, basket:IBasket, handlerSetToyBoxes:()=>void, showCards:()=>void
    )=>void;

    setToysBoxes(handleDragEvent:(DragEvent)=>void, basket:IBasket);
}

export default IView;
