import { Router, Request, Response } from 'express'

import { login } from '../controllers/auth.controller.js';

const router =  Router();

// both admin and user can access this page
router.get('/page', (req: Request, res: Response) => {
    res.sendFile('public/users/userPage.html', {root: 'backend'});
})


export default router;

