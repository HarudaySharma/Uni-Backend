import express, { Application, NextFunction, Request, Response } from 'express'
import { fetchFile, getContentType } from './utils/getFiles.js';
import { AVAILABLEPAGES } from './types.js';

const app: Application = express();
const PORT: string = "3001";

app.listen(PORT, () => {
    console.log("Server started...");
});

app.on('error', (err) => {
    console.log("unable to start server", err)
})

//Task 2:
//    Write a code to manage a simple endpoint "/details" which should be called using get method only,
//    and it must contain a variable called id,
//    if id doesn't exists send a message for invalid request,
//    if the it contains a variable check it must have a value,
//    if value is blank send a message "Specify the value" 
//    and if all ok send a message "Request received with value of id".
app.get('/details', async (req: Request, res: Response) => {
    console.log(req.query);
    const {id} = req.query;
    if(id === undefined) {
        res.status(404).json({message: "Invalid Request"});
        return;
    }
    if(id.length == 0) {
        res.status(404).json({message: "Specify a value"});
        return;
    }
    res.status(200).json({message: `Request received with value ${id}`});
    return;
})


app.use('/', async(req: Request, res: Response, next: NextFunction) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    console.log(pathname);
    // checking if a file is requested
    if (pathname.endsWith('.html') || pathname.endsWith('.css')
        || pathname.endsWith('.js')) {
        if (!AVAILABLEPAGES.includes(pathname.substring(1))) {
            const err = new Error('invalid path');
            return next(err);
        }
        // page is available
        try {
            const file = await fetchFile(pathname);
            if(file === undefined) {
                res.status(501).json({message: "Internal server Error"});
                return;
            }
            res.setHeader('content-type', getContentType(pathname));
            res.status(200).send(file);
            return;
        }
        catch(err) {
            console.log(err);
            res.status(501).json({message: "Internal server Error"});
            return;
        }
    }
    res.status(501).json({message: "Internal server Error"});
    return;
    //
});


//Task 1:
//    Create a logic to handle request to all the pages which actually does not exists,
//    send a response 404.html page to them.
app.use(async(err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("in error middleware");
        console.log("ERROR",  err);
        const FrOFr = await fetchFile("/404.html");
        res.setHeader('content-type', 'text/html');
        res.status(404).send(FrOFr);
    }
    catch (err) {
        console.error(err);
    }
})
