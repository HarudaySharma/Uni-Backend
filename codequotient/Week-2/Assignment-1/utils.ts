export function sum(...eles: number[]): number {
    return eles.reduce((num, acc) => num + acc, 0);
}

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function divide(a: number, b: number): number {
    return a / b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

