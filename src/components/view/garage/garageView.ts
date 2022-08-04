import { createTag, createInput } from '../../helper/helper';
export class GarageView {
    root: HTMLElement;
    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }

    rendering = () => {
        const garageSection = createTag('div', 'garage-section', '');
        this.root.append(garageSection);
        const generationSection = createTag('div', 'generation-section', '');
        garageSection.append(generationSection);
        const generationFirstLine = createTag('div', 'generation-first-line', '');
        generationSection.append(generationFirstLine);
        const generationSecondLine = createTag('div', 'generation-second-line', '');
        generationSection.append(generationSecondLine);
        const generationThirdLine = createTag('div', 'generation-third-line', '');
        generationSection.append(generationThirdLine);
        const textInputFirst = createInput('input', 'text', '', '');
        generationFirstLine.append(textInputFirst);
        const colorPickerFirst = createInput('input', 'color', '#0000ff', '');
        generationFirstLine.append(colorPickerFirst);
        const createButton = createInput('input', 'button', 'CREATE', '');
        generationFirstLine.append(createButton);
        const textInputSecond = createInput('input', 'text', '', '');
        generationSecondLine.append(textInputSecond);
        const colorPickerSecond = createInput('input', 'color', '#0000ff', '');
        generationSecondLine.append(colorPickerSecond);
        const updateButton = createInput('input', 'button', 'UPDATE', '');
        generationSecondLine.append(updateButton);
        const raceButton = createInput('input', 'button', 'RACE', '');
        generationThirdLine.append(raceButton);
        const resetButton = createInput('input', 'button', 'RESET', '');
        generationThirdLine.append(resetButton);
        const generateButton = createInput('input', 'button', 'GENERATE CARS', '');
        generationThirdLine.append(generateButton);
    };
}
