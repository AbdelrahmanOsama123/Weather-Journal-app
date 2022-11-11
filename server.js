
// Express to run server and routes.
const express = require('express');
// Start up an instance of app.
const app = express();

//Require and Use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
const cors = require('cors');
app.use(cors());

// Initialize the main project folder.
app.use(express.static('website'));

const port = 8000;
const localhost = '127.0.0.1';

//sign up for server and debug that is running.
const server = app.listen(port,()=>{
    console.log('server running');
    console.log(`running at http://${localhost}:${port}/`);
});

let projectData = [];
//HTTP get request to send projectData variable to store the API data.
app.get('/all',(req,res)=>{
    res.send(projectData);
});

//HTTP post request (Clint Side send three parts of data ) :-

//Temperature data that is got from the API data ,date of Today and user response for the feelings. 
//These three parts that are in the requset body will be stored in project data.
app.post('/sendData',function (req,res){
    var newEntry ={
        date : req.body.date,
        temp : req.body.temp,
        feelings : req.body.feelings,
    }
    projectData = newEntry;
});

//HTTP get request to send the three parts of data(temperature,date,feelings) to update the user interface of web app.
app.get('/add',(req,res)=>{
    res.send(projectData);
});

