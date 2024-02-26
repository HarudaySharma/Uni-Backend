import * as fs from "fs/promises";

async function helper(path: string | URL, parentDir: string): Promise<string[]> {
    const list: string[] = [];
    try {
        const files = await fs.readdir(path, { withFileTypes: true });
        for (const file of files) {
            try {
                const fileStats = await fs.lstat(file.path);
                if (fileStats.isFile()) {
                    list.push(`${file.name} is a file under ${parentDir} directory`);
                }
                else if (fileStats.isDirectory()) {
                    const subList = await helper(file.path, file.name);
                    list.push(...subList);
                }
            } catch (err) {
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
