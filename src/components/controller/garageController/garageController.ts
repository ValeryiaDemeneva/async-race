import { animation, getDistanse } from '../../helper/animation';
import { generateCarObject, randomRGBColor } from '../../helper/randoms';
import { Server } from '../../server/server';
import { GarageView } from '../../view/garage/garageView';
import { storeAnimation } from '../../helper/store';
import { popup } from '../../popup/index';

interface IScore {
    id: string;
    speed: number;
    time: number;
}

export interface IWinners {
    id: string;
    wins: string;
    time: string;
}
export class GarageController {
    server: Server;
    garageView: GarageView;
    carId: string[];
    public speed = 0;
    winner: IScore;
    constructor() {
        this.server = new Server();
        // @ts-ignore
        this.garageView = new GarageView();
        this.carId = [];
        this.winner = {
            id: '',
            speed: 0,
            time: 0,
        };
    }

    async onRemoveCar(id: string) {
        await this.server.deleteCarGarage(id);
        await this.garageView.reRenderCarsList();
    }

    async onCreateCar() {
        const inputName: HTMLInputElement | null = document.querySelector('.input-name');
        const inputColor: HTMLInputElement | null = document.querySelector('.input-color');
        const obj = {
            name: inputName?.value,
            color: inputColor?.value,
        };
        await this.server.postCarGarage(obj);
        await this.garageView.reRenderCarsList();
    }

    async onSelectCarToUpdate(id: string) {
        const car = await this.server.getCarGarage(id);
        this.carId.push(id);
        const inputName: HTMLInputElement | null = document.querySelector('.input-name-update');
        const inputColor: HTMLInputElement | null = document.querySelector('.input-color-update');
        const updateButton: HTMLInputElement | null = document.querySelector('.update-button');
        const hiddenInput: HTMLInputElement | null = document.querySelector('.hidden-input');

        if (hiddenInput) {
            hiddenInput.value = id;
        }
        if (inputName) {
            inputName.disabled = false;
            inputName.value = car.name;
        }
        if (inputColor) {
            inputColor.disabled = false;
            inputColor.value = car.color;
        }
        if (updateButton) {
            updateButton.disabled = false;
        }
    }

    async onUpdateCar() {
        const inputName: HTMLInputElement | null = document.querySelector('.input-name-update');
        const inputColor: HTMLInputElement | null = document.querySelector('.input-color-update');
        const updateButton: HTMLInputElement | null = document.querySelector('.update-button');
        const hiddenInput: HTMLInputElement | null = document.querySelector('.hidden-input');
        const obj = {
            name: inputName?.value,
            color: inputColor?.value,
        };
        await await this.server.updateCarGarage(hiddenInput?.value || '', obj);
        await this.garageView.reRenderCarsList();

        if (hiddenInput) {
            hiddenInput.value = '';
        }
        if (inputName) {
            inputName.disabled = true;
            inputName.value = '';
        }
        if (inputColor) {
            inputColor.disabled = true;
        }
        if (updateButton) {
            updateButton.disabled = true;
        }
    }

    async generateCars() {
        for (let i = 0; i <= 100; i++) {
            const randomCar = {
                name: generateCarObject(),
                color: randomRGBColor(),
            };
            await this.server.postCarGarage(randomCar);
        }
        await this.garageView.reRenderCarsList();
    }

    async nextPage() {
        const count = localStorage.getItem('page');
        if (!count) {
            localStorage.setItem('page', '2');
        } else {
            const num = +count + 1;
            localStorage.setItem('page', num.toString());
        }
        await this.garageView.reRenderCarsList();
    }
    async prevPage() {
        const count = localStorage.getItem('page');
        if (count) {
            const num = +count - 1;
            localStorage.setItem('page', num.toString());
        }
        await this.garageView.reRenderCarsList();
    }

    async driweCar(id: string) {
        const car = document.querySelector(`.car-model-${id}`) as HTMLElement;
        const flag = document.querySelector(`.flag${id}`) as HTMLElement;
        const data = await this.server.startEngineCar(id);
        const { velocity, distance } = data && data.result;
        const pass = getDistanse(car, flag) + 95;
        const time = Math.round(distance / velocity);
        storeAnimation[+id] = animation(car, pass, time);
        const dataDrive = await this.server.switchToDriveMode(id);
        if (dataDrive && dataDrive.status === 500) window.cancelAnimationFrame(storeAnimation[+id].id);
        return { dataDrive, data, id, time };
    }

    async stopCar(id: string) {
        await this.server.stopEngineCar(id);
        const car = document.querySelector(`.car-model-${id}`) as HTMLElement;
        /*eslint no-self-assign: ["error", {"props": false}]*/
        car.style.marginLeft = car.style.marginLeft;
        if (storeAnimation[+id]) {
            window.cancelAnimationFrame(storeAnimation[+id].id);
        }
    }

    async resetCars() {
        await this.garageView.reRenderCarsList();
    }

    async race() {
        const score: IScore[] = [];
        const carsId: string[] | null = [];
        const cars = document.querySelectorAll('.car-root');
        cars.forEach((item) => {
            const ides = item.getAttribute('carid');
            if (ides) {
                carsId.push(ides);
            }
        });
        carsId.forEach(async (item) => {
            const data = await this.driweCar(item);
            const status = data?.dataDrive && data.dataDrive.status;
            if (status !== 500) {
                const obj = {
                    id: data.id,
                    time: data.time,
                    speed: data?.data && data?.data.result.velocity,
                };
                score.push(obj);
                const sorted = score?.sort((a, b) => a.time - b.time);
                this.winner = sorted[0];

                await this.updateWinnersTable(obj);
            }
        });
        setTimeout(async () => {
            document.querySelectorAll('.popup-container').forEach((item) => {
                item.remove();
            });
            const pop = await popup(this.winner);
            pop.classList.remove('hidden');
            setTimeout(() => {
                pop.classList.add('hidden');
            }, 7000);
        }, 5000);
    }

    async updateWinnersTable(obj: IScore) {
        const winners: IWinners[] = await this.server.getWinners();
        winners.forEach(async (item) => {
            if (item.id === obj.id) {
                const car = {
                    wins: item.wins + 1,
                    time: +item.time > +obj.time ? item.time : obj.time,
                };
                await this.server.updateWinner(obj.id, car);
            } else {
                const car = {
                    id: obj.id,
                    wins: 1,
                    time: obj.time,
                };
                await this.server.postWinners(car);
            }
        });
    }
}
