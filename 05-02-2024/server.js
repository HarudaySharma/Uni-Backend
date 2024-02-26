import http from "http";
import getFile from "./utils/getFile.js";

const app = http.createServer(async(req, res) => {
    try {
        const file = await getFile(req.url);
        if(req.url.endsWith('.html'))
            res.setHeader('Content-Type', 'text/html');
        res.write(file)
        res.end();
    }
    catch(err) {
        console.log(err);
    } 
       // if(req.url.endsWith('.css'))
       //     res.setHeader('Content-Type', 'text/css');
       // if(req.url.endsWith('.js'))
       //     res.setHeader('Content-Type', 'application/javascript');

});
app.listen(3000);
