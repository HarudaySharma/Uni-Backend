import * as fs from "fs/promises";
import path from "path";

let i = 0;
async function helper(dirPath: string | URL, parentDir: string): Promise<string[]> {
    const list: string[] = [];
    try {
        if (i > 3)
            return [];
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                //const fileStats = await fs.lstat(file.path);
                if (file.isFile()) {
                    list.push(`${file.name} is a file under ${parentDir} directory`);
                }
                else if (file.isDirectory()) {
                    i++;
                    console.log(file.name)
                    const subList = await helper(path.join(file.path, file.name), dirPath.toString());
                    list.push(...subList);
                }
            }
            catch (err) {
                console.error(`Error processing ${file.name}:`, err);
            }
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}

export async function listDirectories(path: string | URL, parentDir = "root") {
    try {
        const list = await helper(path, parentDir);
        return list;
    } catch (err) {
        console.error(err);
    }
}
