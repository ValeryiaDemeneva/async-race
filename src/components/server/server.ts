export class Server {
    port: string;
    urlGarage: string;
    urlEngine: string;
    urlWinnners: string;
    constructor() {
        this.port = 'http://127.0.0.1:3000';
        this.urlGarage = `/garage`;
        this.urlEngine = '/engine';
        this.urlWinnners = '/winners';
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

    async startEngineCar(carId: string) {
        try {
            const data = await fetch(`${this.port}/engine?id=${carId}&status=started`, {
                method: 'PATCH',
            });
            const res = await data.json();

            return {
                status: data.status,
                result: res,
            };
        } catch (err) {
            console.log(err);
        }
    }

    async stopEngineCar(carId: string) {
        try {
            const data = await fetch(`${this.port}/engine?id=${carId}&status=stopped`);
            const res = await data.json();

            return {
                status: data.status,
                result: res,
            };
        } catch (err) {
            console.log(err);
        }
    }

    async switchToDriveMode(carId: string) {
        try {
            const data = await fetch(`${this.port}/engine?id=${carId}&status=drive`, {
                method: 'PATCH',
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    async postWinners(car: object) {
        try {
            const result = await fetch(`${this.port}${this.urlWinnners}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car),
            });
            const data = await result.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    async getWinners() {
        const result = await fetch(`${this.port}${this.urlWinnners}`);
        const data = await result.json();
        return data;
    }

    async updateWinner(id: string, car: object) {
        const result = await fetch(`${this.port}${this.urlWinnners}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        const data = await result.json();
        return data;
    }
}
