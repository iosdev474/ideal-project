const express = require('express');
const parser = require('./parser');
const predict = require('./predict');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static('./Webpages'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/Webpages/index.html")
});
app.get('/parse', (req,res) => {
    res.sendFile(__dirname + "/Webpages/parse.html")
});
app.get('/predict', (req,res) => {
    res.sendFile(__dirname + "/Webpages/predict.html")
});
app.post('/parse', (req,res) => {
    let csvFile = req.body.csv;
    let playerName = req.body.player;
    let demoFile = req.body.demo;
    let ishacker = (req.body.hacker) === "isHacker";
    parser(csvFile,playerName,demoFile,ishacker);
    res.sendFile(__dirname + "/Webpages/index.html")
    console.log(`Parse called.`)
});
app.post('/predict', (req,res) => {
    
    let playerName = req.body.player;
    let demoFile = req.body.demo;
    let predictPromise = predict(playerName,demoFile);
    predictPromise.then(data => {
        if(data === "hacker") {
            res.sendFile(__dirname + "/Webpages/hacker.html")
            console.log(`hacker.`);
        }
        else{
            res.sendFile(__dirname + "/Webpages/notHacker.html")
            console.log(`not hacker`);
        }
    });
    console.log(`predict called.`);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
