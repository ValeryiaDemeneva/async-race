import { createTag, createInput } from '../helper/helper';
export class View {
    root: HTMLElement;
    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }

    rendering = () => {
        const buttonsSection = createTag('div', 'buttons-section', '');
        this.root.append(buttonsSection);
        const garageButton = createInput('input', 'main-button', 'TO GARAGE', 'button');
        buttonsSection.append(garageButton);
        const winnersButton = createInput('input', 'main-button', 'TO WINNERS', 'button');
        buttonsSection.append(winnersButton);
    };
}
