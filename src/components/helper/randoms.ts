export const randomRGBColor = (min = 0, max = 255) => {
    const random = () => min + Math.floor(Math.random() * (max - min + 1));
    const r = random();
    const g = random();
    const b = random();
    return `rgb(${r},${g},${b})`;
};

export const generateCarObject = () => {
    const carCompany = ['Tesla', 'BMW', 'Mercedes', 'Lada', 'Kia', 'Nissan', 'Scoda', 'Honda', 'Ford', 'Volkswagen'];
    const carMogel = ['Model X', 'X5', 'AMG200', 'Kalina', 'Rio', 'Luke', 'Octavia', 'Fit', 'Mustang'];
    const company = carCompany[Math.floor(Math.random() * carCompany.length)];
    const model = carMogel[Math.floor(Math.random() * carMogel.length)];
    return `${company} ${model}`;
};

export const getSeconds = (ms: number) => {
    const min = Math.floor((ms / 1000 / 60) << 0);
    const sec = Math.floor((ms / 1000) % 60);
    return `${min}:${sec}`;
};
