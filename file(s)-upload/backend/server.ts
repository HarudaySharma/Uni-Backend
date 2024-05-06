import express from 'express'
import cors from 'cors'
import { Application } from "express";

import uploadRoute from './routes/upload.route.js';
import galleryRoute from './routes/gallery.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app:Application = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(express.static('./public/gallery'));

app.use('/api/gallery', galleryRoute);

app.use('/api/upload', uploadRoute);

app.use(errorHandler);


const PORT = 42010;
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
})
