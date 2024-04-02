import { Router, Request, Response } from 'express'

const router =  Router();

router.get('/page', (req: Request, res: Response) => {
    res.sendFile('public/admin/adminPage.html', {root: 'backend'});
})

router.get('/dashboard', (req: Request, res: Response) => {
    res.sendFile('public/admin/adminDashboard.html', {root: 'backend'});
})

router.get('/payment', (req: Request, res: Response) => {
    res.sendFile('public/admin/payment.html', {root: 'backend'});
})



export default router;


