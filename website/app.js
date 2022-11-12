// Create a new date instance dynamically with JS.
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear(); /// 11 / 11 / 2022

// store the api key that I got when entering my credentials to OpenWeatherMap webiste.
const ApiKey = '7115f60ea7859e5bd6f06afecf6bbb69';

// function perfrom action that will be implementend when clicking on generate button .
document.getElementById('generate').addEventListener('click',performAction);

// function perform action to get data from api and post the data with user response with date of today to server. 
// then get data again to update the user interface of the web app .
function performAction(){
    getData()
    .then(function(data) {
        const feelings = document.getElementById('feelings').value;
        postData('/sendData',{date:newDate,temp:data.main.temp,feelings:feelings})
        updateUI('/add');
    });
}

//Function to GET Web API Data from API Link that consists of baseURL , zipCode and APIkey.
const getData = async()=>{
    const zip = document.getElementById('zip').value;
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${ApiKey}&units=metric`;
    const response = await fetch(baseURL);
    try {
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log('error',error);
    }
}

//Function to POST data (three parts of data => temperature,date and User response for feelings) to the server.
const postData = async ( url ='' , data = {})=>{
    const request = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

        try {
        const newData = await request.json();
        return newData;
        }catch(error) {
            console.log("error", error);
        }
}

// Update The user interface of the web app with the three parts of the data.
const updateUI = async(url)=>{
    const response = await fetch(url);
    try {
        const data = await response.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.feelings;
        return data;
    }
    catch(error){
        console.log('error',error);
    }
}



