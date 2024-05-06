import { CIRCULARBUFFER, REQLOG } from "../types.js";
import { appendFile, rm } from "fs/promises";

//Task 3:
//    if the total lines in the files exceeds 5 remove the last error, the error log must contains max of 5 lastest entries only.
export class CircularBuffer implements CIRCULARBUFFER {
    size: number;
    currentIndex: number;
    buffer: REQLOG[];
    constructor(size: number) {
        this.size = size;
        this.currentIndex = 0;
        this.buffer = new Array(size);
    }

    async insert(log: REQLOG) {
        this.buffer[this.currentIndex] = log;
        this.currentIndex += 1;
        this.currentIndex %= this.size;
        await this.saveToFile();
    }

    private async saveToFile() {
        let start = (this.currentIndex + 1) % this.size;
        let end = this.currentIndex;
        const logs: REQLOG[] = [];
        while (start != end) {
            logs.push(this.buffer[start]);
            start = (start + 1) % this.size;
        }
        // last log
        logs.push(this.buffer[end]);
        try {
            const path = new URL("../../errors.log", import.meta.url);
            await rm(path, { force: true });
            logs.forEach(async (log) => {
                if (!log)
                    return;
                const logStr = `${log.RequestUrl}\t${log.date}\t${log.time}\n`;
                await appendFile(path, logStr, { encoding: 'utf8' });
            })
            return;
        }
        catch (err) {
            console.log("error saving logs to the file");
            console.error(err);
        }
    }
}
