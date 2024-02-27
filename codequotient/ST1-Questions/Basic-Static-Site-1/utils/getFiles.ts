import { readFile } from "fs/promises"

export const getStyleCss = async(): Promise<string | undefined> => {
    const path = new URL("../../static/style.css", import.meta.url);
    try {
        const file = await readFile(path, {encoding: 'utf8'});
        return file;
    }
    catch(err) {
        console.log('error reading style.css');
        console.error(err);
    }
}

export const getTaskJpg = async(): Promise<Buffer | undefined> => {
    const path = new URL("../../static/task.jpg", import.meta.url);
    try {
        const file = await readFile(path);
        return file;
    }
    catch(err) {
        console.log('error fetching task.jpg');
        console.error(err);
    }
}

export const getHomeHtml = async(): Promise<string | undefined> => {
    const path = new URL("../../static/home.html", import.meta.url);
    try {
        const file = await readFile(path, {encoding: 'utf8'});
        return file;
    }
    catch(err) {
        console.log('error reading home.html');
        console.error(err);
    }
}
