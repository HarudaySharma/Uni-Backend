import { Request, Response, Router } from "express";
import fs from 'fs/promises';

const router = Router();

router.get('/', async(req: Request, res: Response) => {
    try {
        const files = await fs.readdir(new URL('../../public/gallery', import.meta.url), {encoding:'utf8'});
        res.json(files);
    }
    catch(err) {
        console.log(err);
    }
})

export default router;

