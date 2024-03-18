import express from 'express'
import bodyParser from "body-parser"

const app = express();
app.listen(3001, () => {
    console.log("listening on PORT: 3001");
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/search', (req, res) => {
    console.log(req.query);
    // 
    // files can be sent using this also
    res.sendFile('/dir/index.html', {root: './dist'}, (err) => console.log(err));
})

//dynamic routing
app.get('/search/:uname/:email', (req, res) => {
})

