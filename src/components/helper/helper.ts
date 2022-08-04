type CreateTag = (tag: string, value: string, classList: string) => HTMLElement;
export const createTag: CreateTag = (tag: string, classList = '', value = '') => {
    const elem = document.createElement(tag);
    elem.innerHTML = value;
    classList && classList !== 'false' && elem.classList.add(classList);
    return elem;
};
type CreateInput = (tag: string, type: string, value: string, classList: string) => HTMLInputElement;
export const createInput: CreateInput = (tag: string, type: string, value: string, classList: string) => {
    const elem = document.createElement(tag) as HTMLInputElement;
    elem.type = type;
    elem.value = value;
    classList && classList !== 'false' && elem.classList.add(classList);
    return elem;
};
