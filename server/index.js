const express = require('express');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/test', (req, res)=>{
    res.status(200).json({result: 'hi'});
});

app.listen(3000, ()=>{console.log("connection")});