export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

export function getRandomNumber(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

export function setNumberInRange(number: number, min: number, max: number): number {
    let currentNumber = number;
    if (currentNumber < min) currentNumber = min;
    if (currentNumber > max) currentNumber = max;
    return currentNumber;
}

export const uuid = (prefix = 'uuid'): string => `${prefix}_${Math.random().toString(36).substring(2)}`;
