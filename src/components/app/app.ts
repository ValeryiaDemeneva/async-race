import { Server } from './../server/server';
import { View } from '../view/view';
import { GarageView } from '../view/garage/garageView';
export class App {
    view: View;
    garageView: GarageView;
    server: Server;
    constructor() {
        this.view = new View();
        this.server = new Server();
        this.garageView = new GarageView();
    }
    async start() {
        this.view.rendering();
        this.garageView.rendering();
        document.querySelector('.generation-section')?.addEventListener('click', async (event) => {
            const obj = {
                name: 'TESLA',
                color: 'black',
            };
            await this.server.postCarGarage(obj);
            const data = await this.server.getCarGarage('1');
            console.log(data);
        });
    }
}
