
var headerContainer = $('#header-conatianer');
var pageContainer = $('#container');


const _apiKey = "cfe5d5d9a08fd676904cf5788dd3b4a1";

headerContainer.append(
    $('<div>')
        .attr("id", "weather-daskboard")
        .addClass("row full-width justify-content-center align-items-center weather-daskboard")
        .text("Weather Dashboard")
);

// create row for container
var divRow = $('<div>')
    .addClass("row m-5");

// create column for container search
var divColSearch = $('<div>')
    .attr("id", "search-container")
    .addClass("col-3 rounded-3 pt-3 bg-light");

// add item to column search
// block search items
var divInputGroup = $('<div>')
    .addClass("input-group mb-3");

//  1. Search for a City:
var h4Text = $('<h4>')
    .attr("id", "h4-text-search-city")
    .addClass("h4-text-search-city")
    .text("Search for a City:");
// append Input Text to divInputGroup

// 2. input text for search
var inputText = $('<input type="text">')
    .attr("id", "search-city")
    .addClass("form-control");

// create <div> button
var divInputGroupAppend = $('<div>')
    .addClass("input-group-append");

// 3. button search
var buttonSearch = $('<button type="button">')
    .attr("id", "button-search")
    .addClass("btn bg-primary text-light")
    .text("Search ");

var icoText = $('<i>')
    .addClass("fa fa-search");

buttonSearch.append(icoText);

// search history 
var ulBlock = $('<ul>')
    .attr("id", "ulList")
    .addClass("list-group");

divInputGroupAppend.append(buttonSearch);
divInputGroup.append(inputText, divInputGroupAppend);
divColSearch.append(h4Text, divInputGroup, ulBlock);
// end column for search container


// create column for container weather
var divColWeather = $('<div>')
    .attr("id", "weater-container")
    .addClass("col-9");

// 1row and entires column for current weather
var div1Row12Columns = $('<div>')
    .addClass("row ml-2")
// 12 columns in 1row for current weather
var divCurrentWeather = $('<div>')
    .attr("id", "current-weather")
    .addClass("col-sm-12 weather-card sunney-card");

var pCityName = $('<p>')
    .attr("id", "city-name")
    .addClass("px2 py-2");

var spanCurrentCity = $('<span>')
    .attr("id", "current-city")
    .addClass("city-name py-2 px-2 mb-1 mt-2 h3 bolder")

var spanDate = $('<span>')
    .attr("id", "current-date")
    .addClass("current py-2 px-2 mb-1 mt-2 h3 bolder");

var spanImgSign = $('<span>')
    .attr("id", "current-img-sign")
    .addClass("current py-2 px-2 mb-1 mt-2 h3 bolder");

var pWindSpeed = $('<p>')
    .text("Wind: ");
var spanWindSpeed = $('<span>')
    .attr("id", "current-wind")
    .addClass("current");

var pHumidity = $('<p>')
    .text("Humidity: ");
var spanHumidity = $('<span>')
    .attr("id", "humidity")
    .addClass("current");

var pTemperature = $('<p>')
    .text("Temperature: ");
var spanTemperature = $('<span>')
    .attr("id", "current-temperature")
    .addClass("current");

var pUVIndex = $('<p>')
    .text("UV index: ");
var spanUvIndex = $('<span>')
    .attr("id", "uv-index")
    .addClass("current rounded py-2 px-2 text-white");

pCityName.append(spanCurrentCity, spanDate, spanImgSign)
pTemperature.append(spanTemperature);
pWindSpeed.append(spanWindSpeed);
pHumidity.append(spanHumidity);
pUVIndex.append(spanUvIndex);

divCurrentWeather.append(pCityName, pTemperature, pWindSpeed, pHumidity, pUVIndex);
div1Row12Columns.append(divCurrentWeather);
divColWeather.append(div1Row12Columns);

// 5 days weather
var div5daysWeatherContainer = $('<div>')
    .attr("id", "weather-5days")
    .addClass("col-sm-12 mt-3 weather-5days");

var h35daysWeather = $('<h3>')
    .text("5-days Forecast:");

div5daysWeatherContainer.append(h35daysWeather);

var divWeather5RowsContainer = $('<div>')
    .attr("id", "row-5days-container")
    .addClass("row row-5days-container")



for (var i = 0; i <= 4; i++) {
    var divWeatherEachRow = $('<div>')
        .attr("id", "weather-day" + i)
        .addClass("col-sm-2  weather-card cloud-card m-1")

    var pDate = $('<p>')
        .attr("id", "date" + i)
        .addClass("justify-content-center py-2 mb-1 mt-2 bold");

    var pImage = $('<p>')
        .attr("id", "image_p" + i);
    var spanImage = $('<span>')
        .attr("id", "image" + i)
        .addClass("justify-content-center py-2 px-2 mb-1 mt-2 h3 bolder");

    pImage.append(spanImage);

    var pTemp = $('<p>')
        .attr("id", "temp_p" + i)
        .text("Temp: ");
    var spanTemp = $('<span>')
        .attr("id", "temp" + i);
    pTemp.append(spanTemp);

    var pWind = $('<p>')
        .attr("id", "wind_p" + i)
        .text("Wind: ");
    var spanWind = $('<span>')
        .attr("id", "wind" + i);
    pWind.append(spanWind);

    var pHumidity = $('<p>')
        .attr("id", "humidity_p" + i)
        .text("Humidity: ");
    var spanHumidity = $('<span>')
        .attr("id", "humidity" + i);
    pHumidity.append(spanHumidity);

    divWeatherEachRow.append(pDate, pImage, pTemp, pWind, pHumidity);

    divWeather5RowsContainer.append(divWeatherEachRow)

    div5daysWeatherContainer.append(divWeather5RowsContainer);
    divColWeather.append(div5daysWeatherContainer);
}



// append column container search and column container weather to row for page contaner.
divRow.append(divColSearch, divColWeather);

// append row container to page container
pageContainer.append(divRow);


function _currentWeatherByURL() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var _currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${_apiKey}`;

            fetch(_currentWeatherAPI)
                .then(response => response.json())
                .then(data => {
                    const { name } = data;
                    const { temp } = data.main;
                    const { speed } = data.wind;
                    const { humidity } = data.main;
                    const { icon } = data.weather[0];
                    let _cityName = name;
                    let _temp = (((temp - 273.5) * 1.80) + 32).toFixed(0);
                    let _windSpeed = (speed * 2.237).toFixed(0);
                    let _humidity = humidity;
                    let _icon = icon;
                    var _iconurl = "https://openweathermap.org/img/wn/" + _icon + ".png";
                    $("#current-img-sign").html("<img src=" + _iconurl + ">");
                    $('#current-city').html(_cityName);
                    $('#current-temperature').html(_temp + "&#8457");
                    $('#current-wind').html(_windSpeed + "mph");
                    $('#humidity').html(_humidity + "%");
                    var _currentDate = new Date((data.dt) * 1000).toLocaleDateString();
                    $('#current-date').html(_currentDate);

                    _cudrrentUVIndex(data.coord.lat, data.coord.lon);
                    _5daysWeatherByURL(data.coord.lat, data.coord.lon);
                });
        })
    }
};

function _5daysWeatherByURL(lat, long) {
    var _5dayWeatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${_apiKey}`;
    fetch(_5dayWeatherAPI)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 5; i++) {
                var _temp = data.list[((i + 1) * 8) - 1].main.temp;
                var _speed = data.list[((i + 1) * 8) - 1].wind.speed;
                var _humidity = data.list[((i + 1) * 8) - 1].main.humidity;
                var _icon = data.list[((i + 1) * 8) - 1].weather[0].icon;
                var _iconurl = "https://openweathermap.org/img/wn/" + _icon + ".png";
                var _currentDate = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                $("#image" + i).html("<img src=" + _iconurl + ">");
                $('#temp' + i).html((((_temp - 273.5) * 1.80) + 32).toFixed(0) + "&#8457");
                $('#wind' + i).html((_speed * 2.237).toFixed(0) + "mph");
                $('#humidity' + i).html(_humidity + "%");
                $('#date' + i).html(_currentDate);

            }
        });
};

// This function returns the UVIindex response.
function _cudrrentUVIndex(lat, long) {
    const _uvIndexURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${_apiKey}`;
    fetch(_uvIndexURL)
        .then(response => response.json())
        .then(uvdata => {
            const { value } = uvdata;
            let _uvValue = value;
            $('#uv-index').html(_uvValue);

            if (_uvValue > 0 && _uvValue <= 2) {
                $('#uv-index').removeClass("current rounded py-2 px-2 text-white").addClass("current rounded py-2 px-2 text-white bg-success");
            } else if (_uvValue >= 3 && _uvValue <= 7) {
                $('#uv-index').removeClass("current rounded py-2 px-2 text-white").addClass("current rounded py-2 px-2 text-white bg-warning");

            } else if (_uvValue >= 8) {
                $('#uv-index').removeClass("current rounded py-2 px-2 text-white").addClass("current rounded py-2 px-2 text-white bg-danger");
            }
        });
}



_currentWeatherByURL();

$('#button-search').on('click', () => {
    var _cityName = $('#search-city').val().trim();
    if (_cityName != "") {
        $('<li class = "list-group-item y-2 px-2 mb-1 h5">' + _cityName + '</li>').prependTo('#ulList');
        var _arrCityName = {
            _city:_cityName,
        }
        _saveCityName(_arrCityName);
        getWeatherByCity(_cityName);
    }


})

function getWeatherByCity(_cityName) {

    const _urlByCityCurrentDay = `https://api.openweathermap.org/data/2.5/weather?q=${_cityName}&appid=${_apiKey}`
    fetch(_urlByCityCurrentDay)
        .then(response => response.json())
        .then(data => {
            const { lat } = data.coord;
            const { lon } = data.coord;
            const { name } = data;
            const { temp } = data.main;
            const { speed } = data.wind;
            const { humidity } = data.main;
            const { icon } = data.weather[0];
            let _lat = lat;
            let _lon = lon;
            let _cityName = name;
            let _temp = (((temp - 273.5) * 1.80) + 32).toFixed(0);
            let _windSpeed = (speed * 2.237).toFixed(0);
            let _humidity = humidity;
            let _icon = icon;
            var _iconurl = "https://openweathermap.org/img/wn/" + _icon + ".png";
            $("#current-img-sign").html("<img src=" + _iconurl + ">");
            $('#current-city').html(_cityName);
            $('#current-temperature').html(_temp + "&#8457");
            $('#current-wind').html(_windSpeed + "mph");
            $('#humidity').html(_humidity + "%");

            getDatafor5days(lat, lon, _cityName);
        });
}

function getDatafor5days(lat, lon, _cityName) {
    const _urlByCity5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${_cityName}&lat=${lat}&lon=${lon}&appid=${_apiKey}`;
    fetch(_urlByCity5Days)
    .then(response => response.json())
    .then(data => {
        for (var i = 0; i < 5; i++) {
            var _temp = data.list[((i + 1) * 8) - 1].main.temp;
            var _speed = data.list[((i + 1) * 8) - 1].wind.speed;
            var _humidity = data.list[((i + 1) * 8) - 1].main.humidity;
            var _icon = data.list[((i + 1) * 8) - 1].weather[0].icon;
            var _iconurl = "https://openweathermap.org/img/wn/" + _icon + ".png";
            var _currentDate = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            $("#image" + i).html("<img src=" + _iconurl + ">");
            $('#temp' + i).html((((_temp - 273.5) * 1.80) + 32).toFixed(0) + "&#8457");
            $('#wind' + i).html((_speed * 2.237).toFixed(0) + "mph");
            $('#humidity' + i).html(_humidity + "%");
            $('#date' + i).html(_currentDate);

        }
    });
};


// function save events to localStorage
function _saveCityName(arr) {
    var arrtemp = [];
    arrtemp = JSON.parse(localStorage.getItem('_cityNames')) || [];
    arrtemp.unshift(arr);
    localStorage.setItem('_cityNames', JSON.stringify(arrtemp));
}

function _loadCityName() {
    var _cityNames = JSON.parse(localStorage.getItem('_cityNames')) || [];
    var _totalCity = Object.keys(_cityNames).length;

    for (var i = 0; i < _totalCity; i++) {
        var _cityName = _cityNames[i]['_city'];
        console.log(_cityName)
        $('<li class = "list-group-item y-2 px-2 mb-1 h5">' + _cityName + '</li>').appendTo('#ulList');
    }
}

// call function tbnLoadEvents to load data to page.
$(document).ready(function () {
    _loadCityName();
});