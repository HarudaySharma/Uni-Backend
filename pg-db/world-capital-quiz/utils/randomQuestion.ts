import { CAPITAL } from "../types";

export function randomQuestion(allData: CAPITAL[]): CAPITAL {
    return allData[Math.floor(Math.random() * allData.length)];
}
