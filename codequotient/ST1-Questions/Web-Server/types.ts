export interface REQLOG {
    RequestUrl: string;
    date: string;
    time: string;
}

export interface CIRCULARBUFFER {
    size: number;
    currentIndex: number;
    buffer: Array<REQLOG>;
}
