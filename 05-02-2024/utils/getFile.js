import fs from "fs/promises"

const getFile = async(endpoint) => {
    try {
        const fileLoc = new URL(`../static/${endpoint}`, import.meta.url);
        const file = await fs.readFile(fileLoc, {encoding: "utf8"});
        return file;
    }
    catch(err) {
        console.log(err)
    }
}
export default getFile;
