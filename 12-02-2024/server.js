import http from "http"
import fs from "fs/promises"

// used to parse urls queries
import url from "url"

const PORT = "3000";

const getQuestions = async () => {
    try {
        const data = await fs.readFile(new URL("./file.json", import.meta.url));
        return await JSON.parse(data);
    }
    catch (err) {
        console.log(err);
    }
}

const app = http.createServer(async (req, res) => {
    console.log(`server on PORT:${PORT}`);

    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:35229');
    //await req.on('data', (chunk) => {
    //    console.log(chunk);
    //});
    const parsedUrl = url.parse(req.url, false)
    console.log(parsedUrl)

    if (parsedUrl.path == '/question') {
        try {
            const questions = await getQuestions();
            res.setHeader('Content-Type', "application/json");
            res.write(JSON.stringify(questions));
            res.end();
        }
        catch (err) {
            res.statusCode = 500;
            res.end();
            return;
        }
    }

});
app.listen(PORT);
