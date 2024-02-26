import { appendFile } from "fs/promises";
import { USER } from "../types.js";

export const saveUser = async (user: USER): Promise<void> => {
    const path = new URL("../../user.txt", import.meta.url);
    try {
        await appendFile(path, `${JSON.stringify(user)}\n`, {encoding: 'utf8'});
        return;
    }
    catch(err) {
        throw err;
    }
}
