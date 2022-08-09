import { createTag } from '../../helper/helper';
import { rendering } from './garageRender';
import { CarModel } from './carModel/carModel';
import { Server } from '../../server/server';
import { ICar } from '../../interfaces/index';
export class GarageView {
    root: HTMLElement;
    garageRoot: HTMLElement;
    carsCount: number;
    carsOnPage: number;
    server: Server;
    constructor(garageRoot: HTMLElement) {
        this.garageRoot = garageRoot || document.querySelector('.garage-root');
        this.root = document.querySelector('.root') as HTMLElement;
        this.server = new Server();
        this.carsOnPage = 7;
        this.carsCount = 0;
    }
    async renderCars(page = 1) {
        const carsList = createTag('div', 'cars-list', ' ');
        const pageNum = localStorage.getItem('page') || page;
        const data = await this.server.getCarsGarage();
        data.forEach((item: ICar, index: number) => {
            const model = new CarModel(item.id, item.name, item.color);
            const list = model.init();
            if (!pageNum || pageNum === 1) {
                if (index + 1 <= this.carsOnPage) {
                    carsList.append(list);
                }
            } else {
                if (index + 1 > this.carsOnPage * (+pageNum - 1) && index < this.carsOnPage * +pageNum) {
                    carsList.append(list);
                }
            }
        });
        this.carsCount = data.length;
        this.garageRoot.append(carsList);
        return data;
    }

    renderSetting = (length: number) => {
        const pageNumber = localStorage.getItem('page') || '1';
        const count = createTag('div', 'cars-count', 'cars-count');
        const page = createTag('div', 'page-count', 'page-count');
        const carsCountOnPage = +pageNumber * this.carsOnPage >= length;
        count.innerHTML = `Garage ${length}`;
        page.innerHTML = `Page: ${pageNumber}`;
        pageNumber == '1'
            ? document.querySelector('.prev')?.classList.add('disabled')
            : document.querySelector('.prev')?.classList.remove('disabled');
        carsCountOnPage
            ? document.querySelector('.next')?.classList.add('disabled')
            : document.querySelector('.next')?.classList.remove('disabled');
        document.querySelector('.garage-section')?.appendChild(count);
        document.querySelector('.garage-section')?.appendChild(page);
    };

    async reRenderCarsList() {
        document.querySelectorAll('.cars-list')?.forEach((item) => {
            item.remove();
        });
        document.querySelectorAll('.cars-count')?.forEach((item) => {
            item.remove();
        });
        document.querySelectorAll('.page-count')?.forEach((item) => {
            item.remove();
        });
        const data = await this.renderCars();
        this.renderSetting(data.length);
    }
    async init() {
        rendering(this.garageRoot);
        await this.renderCars().then((data) => {
            this.renderSetting(data.length);
        });
    }
}
