/* Global Variables */
const dataUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip='
const apiKey = '&appid=8514c583425735e84a9f85444c121dfa';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//chaining promises 
document.getElementById('generate').addEventListener('click', action);

function action(e) {
    const userResponse = document.getElementById('feelings').value;
    if(zip==''){
        alert('Please enter a ZIP code, Thank you!')
    }else{
        retrieveData()
            .then(function (data) {
                console.log(data);
                postData('/add', { temp: data.main.temp, date: newDate, userResponse: userResponse });
            })
            .then(()=>{
                updateUI()
            })
    };
};
    
// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch('/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Async GET
const retrieveData = async () => {
    const zip=document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    const request = await fetch(dataUrl+zip+apiKey);
    try {
        const allData = await request.json();
        return allData;
    }
    catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + '\u2103';
        document.getElementById('content').innerHTML = allData.userResponse;

    } catch (error) {
        console.log("error", error);
    }}