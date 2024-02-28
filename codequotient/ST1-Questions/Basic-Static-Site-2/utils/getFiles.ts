import { readFile } from "fs/promises"

export const getContentType = (pathname: string) => {
    if(pathname.endsWith(".html"))
       return 'text/html';
    if(pathname.endsWith(".css"))
       return 'text/css';
    if(pathname.endsWith(".js"))
       return 'text/javascript';
   return 'text/html';
}

export const fetchFile = async (pathname: string) => {
    const path = new URL(`../../static${pathname}`, import.meta.url);
    try {
        const file = await readFile(path, {encoding: 'utf8'});
        return file;
    }
    catch(err) {
        console.log(`---error fetching ${pathname}---`);
        console.error(err);
    }
}

