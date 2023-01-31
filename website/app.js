/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=ddcfdcbddecf23822b13021713cbda14&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

const zipCodeElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// click button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    // debugger
    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsElement.value,
        date: newDate,
    };
    getZipCodeInfo(data.zipCode).then((zipInfo) => {
        data.temp = zipInfo.main.temp;
        postData(data);
    }).catch((err) => {
        console.log(err);
    });
}

async function getZipCodeInfo(zipCode) {
    return await (await fetch(baseURL + zipCode + apiKey)).json();
}

// post data
async function postData(data) {
    const newDate = data;
    const response = await fetch(`/postData`, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDate),
    });
    try {
        response.json().then((data) => {
            updateUI();
        }).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        console.log(err);
    };
}

// Update UI
async function updateUI() {
    const response = await fetch('/allData');
    try {
        response.json().then((data) => {
            dateElement.innerHTML = `Date Is: ${data.date}`;
            tempElement.innerHTML = `Temp Is: ${data.temp}`;
            contentElement.innerHTML = `My Feelings Is: ${data.content}`;
        }).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        console.log(err);
    }
}