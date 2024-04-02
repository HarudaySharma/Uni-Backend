import express, { Request, Response, urlencoded } from 'express'
import session from 'express-session'

import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'

import userAuth from './middlewares/auth.middleware.js';
import authorization from './middlewares/authorization.middleware.js';
import { USER, login } from './controllers/auth.controller.js';

const app = express();
const PORT = 42010;

// for typescript (ignore)
declare module "express-session" {
    interface SessionData {
        user: USER;
    }
}

// to parse form data
app.use(urlencoded({extended: true}));
// to give a body to request object
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
}))

/***public routes*****/
app.get('/dashboard', (req: Request, res: Response) => {
    res.sendFile('public/dashboard.html', {root: 'backend'});
})
app.get('/login', (req: Request, res: Response) => {
    res.sendFile('public/login.html', {root: 'backend'});
})
app.post('/api/login', login);
/***********/

// authorization
// token based(industry) || session based(inside session user details is stored)
// session based in syllabus
app.use('/api/user', userAuth, userRoutes);
app.use('/api/admin', userAuth, authorization, adminRoutes);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

