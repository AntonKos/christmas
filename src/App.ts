import View from './components/view';
import Model from './components/model';
import Controller from './components/controller';
import IModel from './templates/IModel';
import IView from './templates/IView';
import IController from './templates/IController';

export default class App {
  model:IModel;

  view:IView;

  controller:IController;

  init() {
    this.navigate();
  }

  navigate = () => {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  };
}
