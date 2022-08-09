import { GarageController } from './garageController/garageController';

export class Controller {
    garageController: GarageController;
    constructor() {
        this.garageController = new GarageController();
    }
}
