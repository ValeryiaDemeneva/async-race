import './car.css';

import { createTag, createTagModel } from '../../../helper/helper';
import { carImage } from './image/carImage';
import { GarageController } from '../../../controller/garageController/garageController';
export class CarModel {
    root: HTMLElement;
    id: string;
    name: string;
    garageController: GarageController;
    color: string;
    constructor(id: string, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.root = createTagModel('div', this.id, `car-root`, '');
        this.root.classList.add(`root-${this.id}`);
        this.root.setAttribute('carid', this.id);
        this.garageController = new GarageController();
    }
    renderControllButton() {
        const container = createTag('div', 'car-container-controllers', '');
        const select = createTagModel('div', this.id, 'car-select', 'Select');
        const remove = createTagModel('div', this.id, 'car-remove', 'Remove');
        remove.addEventListener('click', async () => {
            await this.garageController.onRemoveCar(this.id);
        });
        select.addEventListener('click', async () => {
            await this.garageController.onSelectCarToUpdate(this.id);
        });
        const name = createTag('div', 'car-name', this.name);
        const flag = createTag('div', 'belarus-flag', '');
        container.append(select);
        container.append(remove);
        container.appendChild(name);
        container.appendChild(flag);
        return container;
    }

    renderSpeedButton() {
        const container = createTag('div', 'container-speed', '');
        const run = createTagModel('div', this.id, 'car-run', 'A');

        run.addEventListener('click', () => {
            this.garageController.driweCar(this.id);
            stop.classList.remove('disabled');
            run.classList.add('disabled');
        });
        const stop = createTagModel('div', this.id, 'car-stop', 'B');
        stop.addEventListener('click', () => {
            this.garageController.stopCar(this.id);
            stop.classList.add('disabled');
            run.classList.remove('disabled');
        });
        stop.classList.add('disabled');
        container.append(run);
        container.append(stop);
        return container;
    }
    renderCarModel() {
        const car = createTagModel('div', this.id, `car-model-${this.id}`, '');
        car.innerHTML = carImage(this.color);
        car.classList.add('relative-car');
        return car;
    }
    renderRoad() {
        const road = createTag('div', '', 'car-road');
        return road;
    }

    init() {
        const controllersBlock = createTag('div', 'controllersBlock', '');
        const carBlock = createTag('div', 'carBlock', '');
        carBlock.append(this.renderSpeedButton());
        carBlock.append(this.renderCarModel());
        controllersBlock.append(this.renderControllButton());
        controllersBlock.append(carBlock);
        const flag = createTag('div', 'flag', ' ');
        flag.classList.add(`flag${this.id}`);
        this.root.append(controllersBlock);
        this.root.append(flag);
        return this.root;
    }
}
