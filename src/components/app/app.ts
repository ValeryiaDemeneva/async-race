import { Server } from '../server/server';
import { View } from '../view/view';
import { Controller } from '../controller/controller';
export class App {
    view: View;
    server: Server;
    controller: Controller;
    constructor() {
        this.view = new View();
        this.controller = new Controller();
        this.server = new Server();
    }
    async start() {
        this.view.init();
    }
}
