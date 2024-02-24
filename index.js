const apiKey = "1abd8f875b458725807a9c336a146a0e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const search = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const wIcon = document.querySelector(".icon");
function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
let temp = 0;

async function checkWeather(city){
    const response = await fetch(apiUrl + city+ `&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".data").style.display = "none";
    }
    else{
        var data = await response.json();
    document.querySelector(".name").innerHTML = data.name;
    temp =  data.main.temp;
    document.querySelector(".temp").innerHTML = Math.round( data.main.temp) + "°C";  
    document.querySelector(".def").innerHTML = data.weather[0].main;
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr" +" " +degToCompass(data.wind.deg);
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".visiblity").innerHTML = data.visibility/1000 + "km";
    

    if(data.weather[0].main=="Clouds"){
        wIcon.src = "details/cloud.png";
    }
    else if(data.weather[0].main=="Clear"){
        wIcon.src = "details/sun.png";
    }
    else if(data.weather[0].main=="Rain"){
        wIcon.src = "details/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        wIcon.src = "details/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        wIcon.src = "details/mist.png";
    }
    else if(data.weather[0].main=="Snow"){
        wIcon.src = "details/snowy.png";
    }
    else if(data.weather[0].main=="Smoke"){
        wIcon.src = "details/fog.png";
    }    

    document.querySelector(".data").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }
}

search.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        btn.click();
    }
});

btn.addEventListener("click",()=>{
    checkWeather(search.value);
})

function myFun1(){
    document.querySelector(".temp").innerHTML = Math.round(temp) + "°C";
    document.getElementById("cel").style.color = "aqua";
    document.getElementById("far").style.color = "black";
}
function myFun2(){
    const temp1 = (temp * (9/5))+32;
    document.querySelector(".temp").innerHTML = Math.round(temp1) + "°F";
    document.getElementById("cel").style.color = "black";
    document.getElementById("far").style.color = "aqua";
}