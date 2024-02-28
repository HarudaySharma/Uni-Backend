import http from "http";
import url from "url"
import { getHomeHtml, getStyleCss, getTaskJpg } from "./utils/getFiles.js";


//Task 1:
//    Create a web server to handle request at port 3001,
const app = http.createServer(async (req, res) =>{
    if(!req.url) {
        return;
    }
    const parsedUrl = url.parse(req.url, true)
    console.log(parsedUrl);
    //Task 2:
    //    Create a home endpoint "/" to send the home.html page to user.
    if(parsedUrl.pathname == '/') {
        const homeHtml = await getHomeHtml();
        res.setHeader('content-type', 'text/html');
        res.write(homeHtml);
    }
    //Task 3:
    //    Home.html is using one style.css and one image task.jpg,
    //    handle endpoints to send style.css and task.jpg, so that home.html can use them.
    //    All other request to any other file should be rejected.
    if(parsedUrl.pathname == '/style.css') {
        const css = await getStyleCss();
        res.setHeader('content-type', 'text/css');
        res.write(css);
    }

    if(parsedUrl.pathname == '/task.jpg') {
        const img = await getTaskJpg();
        res.setHeader('content-type', 'image/jpeg');
        res.write(img);
    }
    res.end();
})

//    give proper message at console "Server started..." 

//    if actually it started or give "unable to start server" if there is an issue in starting the server.
app.on('error', () => {
    console.log("unable to start server ");
});

const PORT: string = "3001";
app.listen(PORT, () => {
    console.log("Server started");
});
