import { createTag, createInput } from '../helper/helper';
import { GarageView } from './garage/garageView';
import { WinnersView } from './winners/winnersView';
export class View {
    root: HTMLElement;
    garageRoot: HTMLElement;
    winnerRoot: HTMLElement;
    winnersView: WinnersView;
    garageView: GarageView;
    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
        this.rendering();
        this.garageRoot = createTag('div', 'garage-root', ' ');
        this.winnerRoot = createTag('div', 'winners-root', ' ');
        this.root.append(this.garageRoot);
        this.root.append(this.winnerRoot);
        this.garageView = new GarageView(this.garageRoot);
        this.winnersView = new WinnersView(this.winnerRoot);
    }

    rendering = () => {
        const buttonsSection = createTag('div', 'buttons-section', '');
        this.root.append(buttonsSection);
        const garageButton = createInput('input', 'button', 'TO GARAGE', 'button-router');
        const winnersButton = createInput('input', 'button', 'TO WINNERS', 'button-router');
        garageButton.classList.add('disabled');
        garageButton.addEventListener('click', () => {
            winnersButton.classList.remove('disabled');
            garageButton.classList.add('disabled');
            this.winnerRoot.innerHTML = '';
            this.garageView.init();
        });
        buttonsSection.append(garageButton);
        winnersButton.addEventListener('click', () => {
            garageButton.classList.remove('disabled');
            winnersButton.classList.add('disabled');
            this.winnersView.init();
            this.garageRoot.innerHTML = '';
        });
        buttonsSection.append(winnersButton);
    };

    init() {
        this.garageView.init();
        const footer = document.createElement('a');
        footer.innerHTML = 'ValeriyaDemeneva, RsSchool 2022';
        footer.href = 'https://github.com/ValeryiaDemeneva';
        footer.classList.add('footer-link');
        this.root.appendChild(footer);
    }
}
