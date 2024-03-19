import express from "express";
import bodyParser from "body-parser";

import rootRouter from './routes/root.route.js'

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use('/', rootRouter);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
