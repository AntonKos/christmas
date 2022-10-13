import IBasket from './IBasket';
import ICard from './ICards';

import IModel from './IModel';
import IView from './IView';

interface IController {
    model:IModel;
    view:IView;

    handlerSetToyBoxes: ()=>void;
    handlerAddToBasket: (arg0:string)=>boolean;
    handleEventListener: (arg0:string, arg1:string) => void;
    handleMinMaxCount: (arg0:number, arg1:number) => void;
    handleMinMaxYear: (arg0:number, arg1:number) => void;
    handleEventListenerReset: () => void;
    handleEventListenerSortNameQuantity: (arg0:string)=> void;
    showCards:()=>void;
    handleInputValue:(arg0:string)=>void;
    handleDragEvent: (arg0:DragEvent) =>void;
}

export default IController;
