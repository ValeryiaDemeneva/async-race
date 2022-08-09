import './winners.css';
import { Server } from '../../server/server';
import { createTag } from '../../helper/helper';
import { IWinners } from '../../controller/garageController/garageController';
import { CarModel } from '../garage/carModel/carModel';
import { carImage } from '../garage/carModel/image/carImage';
import { getSeconds } from '../../helper/randoms';
export class WinnersView {
    winnnerRoot: HTMLElement;
    server: Server;
    carModel: CarModel;
    carsOnPage: number;
    constructor(winnnerRoot: HTMLElement) {
        this.winnnerRoot = winnnerRoot;
        this.server = new Server();
        this.carsOnPage = 10;
        this.carModel = new CarModel('', '', '');
    }

    createPagginationButton() {
        const fullSection = createTag('div', 'full-section', '');
        const container = createTag('div', 'pages-section-winners', '');
        const next = createTag('div', 'next-winners', 'NEXT');
        next.addEventListener('click', async () => {
            const count = localStorage.getItem('pageWinners');
            if (!count) {
                localStorage.setItem('pageWinners', '2');
            } else {
                const num = +count + 1;
                localStorage.setItem('pageWinners', num.toString());
            }
            await this.rerenderTableBySort('');
        });
        const prev = createTag('div', 'prev-winners', 'PREV');
        prev.addEventListener('click', async () => {
            const count = localStorage.getItem('pageWinners');
            if (count) {
                const num = +count - 1;
                localStorage.setItem('pageWinners', num.toString());
            }
            await this.rerenderTableBySort('');
        });
        container.append(prev);
        container.append(next);
        fullSection.append(container);
        return fullSection;
    }

    async renderTable() {
        const table = createTag('table', 'table', '');
        const tr = createTag('tr', '', '');
        table.append(tr);
        const th1 = createTag('th', '', 'Number');
        const th2 = createTag('th', '', 'Car');
        const th3 = createTag('th', '', 'Name');
        const th4 = createTag('th', '', 'Wins');
        const th5 = createTag('th', '', 'Time');
        th4.id = 'thPointer';
        th5.id = 'thPointer';

        th4.addEventListener('click', () => {
            if (th4.classList.length) {
                th4.classList.remove('selected-sort');
                this.rerenderTableBySort('');
            } else {
                th5.classList.remove('selected-sort');
                th4.classList.add('selected-sort');
                this.rerenderTableBySort('wins');
            }
        });

        th5.addEventListener('click', () => {
            if (th5.classList.length) {
                th5.classList.remove('selected-sort');
                this.rerenderTableBySort('');
            } else {
                th4.classList.remove('selected-sort');
                th5.classList.add('selected-sort');
                this.rerenderTableBySort('time');
            }
        });
        tr.append(th1);
        tr.append(th2);
        tr.append(th3);
        tr.append(th4);
        tr.append(th5);
        this.winnnerRoot.append(table);
    }

    createPageAndWinners = () => {
        const fullSection = createTag('div', 'full-section-number', '');
        const countWinner = createTag('div', 'count-winner', '0');
        const countPage = createTag('div', 'count-winner-page', '0');
        fullSection.append(countWinner);
        fullSection.append(countPage);

        return fullSection;
    };

    async createTD(sort = '', page = 1) {
        const table = document?.querySelector('.table');
        const winners: IWinners[] = await this.server.getWinners();
        const pageNum = localStorage.getItem('pageWinners') || page;
        const winnersCount = document.querySelector('.count-winner');
        const pageCount = document.querySelector('.count-winner-page');
        const carsCountOnPage = +pageNum * this.carsOnPage >= winners.length;
        pageNum == '1'
            ? document.querySelector('.prev-winners')?.classList.add('disabled')
            : document.querySelector('.prev-winners')?.classList.remove('disabled');
        carsCountOnPage
            ? document.querySelector('.next-winners')?.classList.add('disabled')
            : document.querySelector('.next-winners')?.classList.remove('disabled');
        if (winnersCount) {
            winnersCount.innerHTML = `Winners: ${winners.length}`;
        }
        if (pageCount) {
            pageCount.innerHTML = `Page: ${pageNum}`;
        }
        if (sort) {
            if (sort === 'wins') {
                winners?.sort((a, b) => +b.wins - +a.wins);
            }
            if (sort === 'time') {
                winners?.sort((a, b) => +b.time - +a.time);
            }
        }
        winners.forEach(async (item: IWinners, index: number) => {
            const car = await this.server.getCarGarage(item.id);
            const model = carImage(car.color);
            const tr = createTag('tr', 'carTr', '');
            const tdNumber = createTag('td', 'table-td', `${index + 1}`);
            const tdCar = createTag('td', 'table-td', `${model}`);
            const tdName = createTag('td', 'table-td', `${car.name}`);
            const tdWins = createTag('td', 'table-td', `${item.wins}`);
            const tdTime = createTag('td', 'table-td', `${getSeconds(+item.time)} s`);
            tr.append(tdNumber);
            tr.append(tdCar);
            tr.append(tdName);
            tr.append(tdWins);
            tr.append(tdTime);
            if (!pageNum || pageNum == 1) {
                if (index + 1 <= this.carsOnPage) {
                    table && table.append(tr);
                }
            } else {
                if (index + 1 > this.carsOnPage * (+pageNum - 1) && index < this.carsOnPage * +pageNum) {
                    table && table.append(tr);
                }
            }
        });
    }

    async rerenderTableBySort(sort: string) {
        document.querySelectorAll('.carTr').forEach((item) => {
            item.remove();
        });
        await this.createTD(sort);
    }
    async init() {
        const section = this.createPagginationButton();
        section.append(this.createPageAndWinners());
        this.winnnerRoot.append(section);
        this.renderTable();
        this.createTD();
    }
}
