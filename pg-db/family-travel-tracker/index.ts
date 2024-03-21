import express from "express";
import bodyParser from "body-parser";

import getRoutes from './routes/root.getRoutes.js'
import postRoutes from './routes/root.Postroutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', getRoutes);
app.post('/', postRoutes);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
