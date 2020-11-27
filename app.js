const express = require('express');
const parser = require('./parser');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static('./Webpages'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/Webpages/index.html")
});

app.post('/', (req,res) => {
    let csvFile = req.body.csv;
    let playerName = req.body.player;
    let demoFile = req.body.demo;
    let ishacker = (req.body.hacker) === "isHacker";
    parser(csvFile,playerName,demoFile,ishacker);
    res.sendFile(__dirname + "/Webpages/index.html")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
