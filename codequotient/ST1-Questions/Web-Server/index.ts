import EventEmitter from "events";
import http from "http";
import url from "url"
import { writeInValidRequestLog } from "./utils/writeLogs.js";


const PORT: string = "3001";
class MyEmmiter extends EventEmitter {}

const myEmmiter = new MyEmmiter();
myEmmiter.on('invalidEndpoint', writeInValidRequestLog);

//Task 1:
//    Write the endpoint to handle request other /about, /home, All other request to server must be handled by this endpoint
const app = http.createServer((req, res) =>{
    if(!req.url) {
        return;
    }
    const parsedUrl = url.parse(req.url, true)
    console.log(parsedUrl);

    res.setHeader('content-type', 'text/html');
    if(parsedUrl.path == 'about') {
        res.write(`<h1> about </h1>`);
    }
    if(parsedUrl.path == 'home') {
        res.write(`<h1> home </h1>`);
    }
    else {
        //Task 2:
        //    Enpoint must store all the other request in a file with Request URL, Date and Time in a file on server with errors.log each entry in one line.
        myEmmiter.emit('invalidEndpoint', parsedUrl);
        res.write(`<h1> invalid endpoint </h1>`);
    }
    res.end();
})
app.listen(PORT);

