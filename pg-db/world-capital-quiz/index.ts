import express from "express";
import bodyParser from "body-parser";
import pgClient from './services/postgres.client.js'

import rootRouter from './routes/root.routes.js';
import submitRouter from './routes/submit.routes.js'
import { CAPITAL } from "./types.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use('/', rootRouter);
app.use('/submit', submitRouter);

export let allData: CAPITAL[] = []

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    try {
        await pgClient.connect();
        const query = await pgClient.query('SELECT * FROM capitals;');
        query.rows.forEach((c: CAPITAL) => {
            allData.push(c);
        })
        pgClient.end();
    }
    catch (err) {
        console.log("POSTGRES ERROR");
        console.error(err);
    }


});
