import { REQLOG} from "../types.js";
import { UrlWithParsedQuery } from "url";
import { CircularBuffer } from "./CircularBuffer.js";


const cbuff = new CircularBuffer(5);

export const writeInValidRequestLog = async (urlObj: UrlWithParsedQuery): Promise<void> => {
    const log: REQLOG = {
        RequestUrl: urlObj.path || "invalid",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
    }
    await cbuff.insert(log);
    return;
}
