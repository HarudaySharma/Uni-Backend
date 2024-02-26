import { listDirectories } from "./utils.js";

const testDir = new URL('../test/', import.meta.url);
const a = async() => console.log(await listDirectories(testDir));
await a();


