let d = new Date();
let newDate = d.toLocaleDateString();

let apiKey = '&appid=e5688e3d580f8ae38e98664fc42882be';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

document.getElementById('generate').addEventListener('click',performAction);

function performAction(){
    let zip = document.getElementById('zip').value;
    let URL = `${baseURL}${zip}${apiKey}&units=metric`;
    getData(URL)
    .then(function(data){
        let temp = data.main.temp;
        let feelings = document.getElementById('feelings').value;
        const newData = {temp:temp,
            feelings:feelings,
            date:newDate};
            
        postData('/post',newData);
    })
    .then(function(){
        updateUI('/add')
      });
}

const getData = async(url)=>{
    const request = await fetch(url);
    try{
        const newData = await request.json();
        return newData;
    }
    catch(error){
        console.log("error", error);
    }
}
const postData = async (url=' ',data= {})=>{
    const res = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          body : JSON.stringify(data),
      });
      try {
            const newData = await res.json();
            return newData;
          }
          catch(error) {
             console.log("error", error);
          }
}
const updateUI = async(url=" ")=>{
    const request = await fetch(url); 
    try{
        const allData = await request.json();
        document.getElementById("date").innerHTML = "date =>"+allData[0].date;
        document.getElementById("temp").innerHTML = "temp =>"+allData[0].temp;
        document.getElementById("content").innerHTML ="content =>"+allData[0].feelings;
    }
    catch(error){
      console.log("error", error);
    }
  }
  