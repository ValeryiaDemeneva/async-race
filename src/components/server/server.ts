export class Server {
    port: string;
    urlGarage: string;
    constructor() {
        this.port = 'http://127.0.0.1:3000';
        this.urlGarage = `/garage`;
    }
    async getCarGarage(id: string) {
        const result = await fetch(`${this.port}${this.urlGarage}/${id}`);
        const data = await result.json();
        return data;
    }

    async getCarsGarage() {
        const result = await fetch(`${this.port}${this.urlGarage}`);
        const data = await result.json();
        return data;
    }

    async postCarGarage(car: object) {
        const result = await fetch(`${this.port}${this.urlGarage}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        const data = await result.json();
        return data;
    }

    async deleteCarGarage(id: string) {
        const result = await fetch(`${this.port}${this.urlGarage}/${id}`, {
            method: 'DELETE',
        });
        const data = await result.json();
        return data;
    }
    async updateCarGarage(id: string, car: object) {
        const result = await fetch(`${this.port}${this.urlGarage}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        const data = await result.json();
        return data;
    }
}
