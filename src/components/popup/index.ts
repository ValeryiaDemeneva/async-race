import { createTag } from '../helper/helper';
import { Server } from '../server/server';
import './popup.css';
import { ICar } from '../interfaces/index';
import { carImage } from '../view/garage/carModel/image/carImage';
const server = new Server();
interface IScore {
    id: string;
    speed: number;
    time: number;
}
export const popup = async (obj: IScore) => {
    const car: ICar = await server.getCarGarage(obj.id);
    const tag = createTag('div', 'popup-container', '');
    tag.classList.add('hidden');

    const img = createTag('div', 'popup-image', '');

    const tagContent = createTag('div', 'popup-content', '');
    tag.append(tagContent);
    const name = createTag('div', 'popup-name', `${car.name}`);
    const color = createTag('div', 'popup-color', `Color: ${car.color}`);
    const speed = createTag('div', 'popup-color', `Speed: ${obj.speed} km/h`);
    const colorTag = createTag('div', 'popup-color-tag', ``);
    colorTag.innerHTML = carImage(car.color);
    tagContent.append(img);

    tagContent.append(name);
    tagContent.append(color);
    tagContent.append(speed);
    tagContent.append(colorTag);
    document.querySelector('.root')?.append(tag);
    return tag;
};
