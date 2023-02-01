/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=ddcfdcbddecf23822b13021713cbda14&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// click button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    let allData = {
        zipCode: document.getElementById('zip').value,
        feel: document.getElementById('feelings').value,
        date: newDate,
    };
    getZipInfo(allData.zipCode).then((zipInfo) => {
        allData.temp = zipInfo.main.temp;
        postData(allData);
    }).catch((err) => {
        console.log(err);
    });
}

async function getZipInfo(zipCode) {
    return await (await fetch(baseURL + zipCode + apiKey)).json();
}

// post data
const postData = async (allData) => {
    const newDate = allData;
    const response = await fetch(`/postData`, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDate),
    });
    try {
        response.json().then((allData) => {
            retrieveData();
        }).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        console.log(err);
    };
}

// Retrieve Data
const retrieveData = async () => {
    const request = await fetch('/allData');
    try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
    }
    catch(err) {
        console.log(err);
    }
}