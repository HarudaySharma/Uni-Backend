import express, { Application, Request, Response } from 'express'

import signUpRoute from "./routes/signUp.route.js"

const app: Application = express();
const PORT: string = "3001";

app.listen(PORT, () => {
    console.log("Server started...");
});

app.on('error', (err) => {
    console.log("unable to start server", err)
})

app.use(express.json());

app.use('/', signUpRoute);
