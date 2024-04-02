import { Router, Request, Response } from 'express'

const router =  Router();

const user = {
    username: 'hritvik',
}

router.get('/', (req: Request, res: Response) => {
    res.render('home', {user});
})


export default router;

