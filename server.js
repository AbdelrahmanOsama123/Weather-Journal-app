// Setup empty JS object to act as endpoint for all routes
let projectData = [];

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
const { prototype } = require('events');
app.use(cors());
app.use(express.static('website'));

const port = 8000;
const host = 'localhost';
app.listen(port,function(){
    console.log('server running');
    console.log(`running on localhost: http://${host}:${port}`);
});

app.get('/all',(req,res)=>{
    res.send(projectData);
})
app.post('/post',(req,res)=>{
    let data = {
        temp : req.body.temp,
        feelings : req.body.feelings,
        date : req.body.date,
    }
    projectData = data;
});
app.get('/add',(req,res)=>{
    res.send(projectData);
})