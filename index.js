


let place_name;


let search_btn = document.getElementById("submit");
let lat;
let long;



search_btn.onclick = function () {//button click start


    place_name = document.getElementById("place").value;

    const APIurl_geocoding =
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place_name}&count=1&language=en&format=json`);

    //"https://geocoding-api.open-meteo.com/v1/search?name={Manipal}&count=1&language=en&format=json

    const Alldata_geocode = APIurl_geocoding.then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.results[0].name);
            console.log('Latitude is-->', data.results[0].latitude);
            console.log('Longitude is-->', data.results[0].longitude);

            lat = Number(data.results[0].latitude);
            long = Number(data.results[0].longitude);

            document.getElementById("placename").textContent = "Place-->" + data.results[0].name;
            document.getElementById("state").textContent = "-->" + data.results[0].admin1;
            document.getElementById("showLat").textContent = "Latitude is-->" + data.results[0].latitude;
            document.getElementById("showLong").textContent = "Longitude is-->" + data.results[0].longitude;

            //now from weather API, we fetch the weather details.
            const APIurl_weather = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max,sunrise,sunset&forecast_days=16&timezone=auto`);

            const Alldata_weather = APIurl_weather.then(Response => Response.json())
                .then(value => {
                    console.log(value);
                    console.log("The data-features for today are: ");
                    console.log(value.daily.time[0]);
                    console.log(value.daily.temperature_2m_max[0])

                    document.getElementById("date").textContent = value.daily.time[0];
                    document.getElementById("max_temp").textContent = "High: " + value.daily.temperature_2m_max[0] + "°C";
                    document.getElementById("min_temp").textContent = "Low: " + value.daily.temperature_2m_min[0] + "°C";
                    document.getElementById("rain_chance").textContent = "% chance of Precipitation: " + value.daily.precipitation_probability_mean[0];
                    document.getElementById("rain_amt").textContent = "Expected Amount of rain: " + value.daily.precipitation_sum[0] + " mm";




                });










        });





}//button click end



//https://api.open-meteo.com/v1/forecast?latitude={12.9716}&longitude={77.5946}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max,sunrise,sunset&forecast_days=16&timezone=auto


