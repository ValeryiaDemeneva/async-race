import './garage.css';
import { createTag, createInput } from '../../helper/helper';
import { GarageController } from '../../controller/garageController/garageController';

export const rendering = (root: HTMLElement) => {
    const controller = new GarageController();
    const garageSection = createTag('div', 'garage-section', '');
    root.append(garageSection);
    const generationSection = createTag('div', 'generation-section', '');
    garageSection.append(generationSection);
    const generationFirstLine = createTag('div', 'generation-first-line', '');
    generationSection.append(generationFirstLine);
    const generationSecondLine = createTag('div', 'generation-second-line', '');
    generationSection.append(generationSecondLine);
    const generationThirdLine = createTag('div', 'generation-third-line', '');
    generationSection.append(generationThirdLine);
    const textInputFirst = createInput('input', 'text', '', 'input-name');
    generationFirstLine.append(textInputFirst);
    const colorPickerFirst = createInput('input', 'color', '#0000ff', 'input-color');
    generationFirstLine.append(colorPickerFirst);
    const createButton = createInput('input', 'button', 'CREATE', 'input-create');
    createButton.addEventListener('click', () => {
        controller.onCreateCar();
    });
    generationFirstLine.append(createButton);
    const textInputSecond = createInput('input', 'text', '', 'input-name-update');
    textInputSecond.disabled = true;
    generationSecondLine.append(textInputSecond);
    const colorPickerSecond = createInput('input', 'color', '#0000ff', 'input-color-update');
    const inputHiddenId = createInput('input', 'hidden', '', 'hidden-input');
    colorPickerSecond.disabled = true;
    generationSecondLine.append(colorPickerSecond);
    generationSecondLine.append(inputHiddenId);
    const updateButton = createInput('input', 'button', 'UPDATE', 'update-button');
    updateButton.disabled = true;
    updateButton.addEventListener('click', () => {
        controller.onUpdateCar();
    });
    generationSecondLine.append(updateButton);
    const raceButton = createInput('input', 'button', 'RACE', '');
    raceButton.addEventListener('click', () => {
        controller.race();
    });
    generationThirdLine.append(raceButton);
    const resetButton = createInput('input', 'button', 'RESET', '');
    resetButton.addEventListener('click', () => {
        controller.resetCars();
    });
    generationThirdLine.append(resetButton);

    const generateButton = createInput('input', 'button', 'GENERATE CARS', '');
    generateButton.addEventListener('click', () => {
        controller.generateCars();
    });
    generationThirdLine.append(generateButton);
    const container = createTag('div', 'pages-section', '');
    const next = createTag('div', 'next', 'NEXT');
    next.addEventListener('click', () => {
        controller.nextPage();
    });
    const prev = createTag('div', 'prev', 'PREV');
    prev.addEventListener('click', () => {
        controller.prevPage();
    });
    container.append(prev);
    container.append(next);
    generationSection.append(container);
};
