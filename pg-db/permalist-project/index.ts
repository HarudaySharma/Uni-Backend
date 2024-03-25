import express from "express";
import bodyParser from "body-parser";

import getRoutes from './routes/get.routes.js'
import postRoutes from './routes/post.routes.js'

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', getRoutes);
app.use('/', postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
