import { Request, Response, Router } from "express";
import { signUpController } from "../controllers/signUp.controller.js";

const router = Router();

router.post('/signup', signUpController);

// Task 2:
//    if request to the endpoint "/signup" was made with get request,
//    return an html content to the user with "Invalid request method - 1" to the user.
//    Where 1 is the total no of invalid requests method, keep on increasing this, 
//    and the count on the server for each invalid request method.
router.get('/signup', (req: Request, res: Response) => {
    res.set('content-type', 'text/html');
    res.write('<h1> Invalid request method</h1>')
    res.end();
});
export default router;
