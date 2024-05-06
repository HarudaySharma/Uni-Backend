import express, { Application, Request, Response } from "express";
import upload from "./multer";

const app: Application = express();

app.use(express.static('./public'));

app.post('/upload', upload.fields([{name: 'fs', maxCount: 10}]), (req: Request, res: Response) => {
    console.log(req.files);
    res.send('<h1>DONE</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});

app.on('error', (err) => {
    console.log("error using port: " + PORT);
    console.error(err);
})
