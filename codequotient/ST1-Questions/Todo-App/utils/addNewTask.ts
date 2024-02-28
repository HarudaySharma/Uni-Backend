import { readFile, writeFile } from "fs/promises";
import { STATUS, TASK } from "../types.js";

export const getTasksViaStatus = async (status: STATUS): Promise<TASK[]> => {
    const path = new URL("../../tasks.json", import.meta.url);
    try {
        const fileData = await readFile(path, { encoding: 'utf8' });
        const tasks: TASK[] = JSON.parse(fileData);
        const requestedTasks: TASK[] = tasks.filter((task) => task.status === status);
        return requestedTasks;
    }
    catch(err) {
        throw err;
    }
}
export const addNewTask = async (task: TASK): Promise<boolean> => {
    if(!task.status || !task.id || !task.title)
        return false;
    const path = new URL("../../tasks.json", import.meta.url);
    try {
        const fileData = await readFile(path, { encoding: 'utf8' });
        const tasks: TASK[] = JSON.parse(fileData);
        tasks.push(task);
        await writeFile(path, JSON.stringify(tasks), {encoding: 'utf8'});
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}
