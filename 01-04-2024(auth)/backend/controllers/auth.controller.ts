import { Request, Response } from "express";

export type USER = {
    'username': string,
    'password': string,
    'role': 'admin' | 'user'
}

const users: USER[] = [
    { 'username': 'abc', 'password': 'abc', 'role': 'admin' },
    { 'username': 'xyz', 'password': 'xyz', 'role': 'user' }
]


export const login = async (req: Request, res: Response) => {
    const {username, password}  = req.body;
    console.log(username, password);

    let user = users.find(user => user.username == username
        && user.password === password);
    if(user) {
        req.session.user = user;
        res.redirect('/dashboard');
    }
    else {
        res.send('Invalid username or password');
    }
}
