export const getposition = (el: HTMLElement): { x: number; y: number } => {
    const { top, left, width, height } = el.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2,
    };
};
export const getDistanse = (el1: HTMLElement, el2: HTMLElement): number => {
    const pos1 = getposition(el1);
    const pos2 = getposition(el2);

    return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
};
export const animation = (el: HTMLElement, distance: number, duration: number): { [id: string]: number } => {
    const start = performance.now();
    const draw = (passed: number) => {
        el.style.marginLeft = `${Math.min(passed)}px`;
    };
    const store: { [id: string]: number } = {};
    function animate(time: number) {
        const time1 = time - start;
        const passed = Math.round(time1 * (distance / duration));
        draw(passed);
        if (passed < distance) {
            store.id = requestAnimationFrame(animate);
        }
    }
    store.id = requestAnimationFrame(animate);
    return store;
};
