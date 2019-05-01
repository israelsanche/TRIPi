// Global Variables

var locationQuery = "";


mapboxgl.accessToken = 'pk.eyJ1IjoidHlsZXItbGFycmFiZWUiLCJhIjoiY2p1dnU1bjh5MDVrNDQ0bGoyNWtreWRnZiJ9.eF1RC1zYSNU6iDVUE2FIqw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10'
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

$("#citytext").append(geocoder.onAdd(map));

// geocoder.query("New York");
geocoder.setPlaceholder("Set Location");
geocoder.on("result", function(e){
    console.log(e.result);
locationQuery = e.result.place_name;
console.log(locationQuery);
})


$("#city-click").on("click", function (event) {
   
    console.log($("#city-search").val());
    event.preventDefault();
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=" + locationQuery;
    var hotelurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=hotels&location=" + locationQuery;
    var eventurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=events&location=" + locationQuery;
var weatherurl = "https://weather-ydn-yql.media.yahoo.com/forecastrss?location=" + locationQuery;

    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer BMqPeh9LSaDcy2Ynzrlg9b3Pg-zqx7NkPeU6d042djt_xHyFXUHMMftzKLTkw_ftN-_m3GRnBIxeyfvo_U9wHH1WRcYx0LsH6TMMMtyyqgp77l_raGrlydIVQUzBXHYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            var address1 = response.businesses[0].location.address1 + ", " + response.businesses[0].location.city + ", " + response.businesses[0].location.state + " " + response.businesses[0].location.zip_code;
            var address2 = response.businesses[1].location.address1 + ", " + response.businesses[1].location.city + ", " + response.businesses[1].location.state + " " + response.businesses[1].location.zip_code;
            var address3 = response.businesses[2].location.address1 + ", " + response.businesses[2].location.city + ", " + response.businesses[2].location.state + " " + response.businesses[2].location.zip_code;
            var address4 = response.businesses[3].location.address1 + ", " + response.businesses[3].location.city + ", " + response.businesses[3].location.state + " " + response.businesses[3].location.zip_code;
            var address5 = response.businesses[4].location.address1 + ", " + response.businesses[4].location.city + ", " + response.businesses[4].location.state + " " + response.businesses[4].location.zip_code;

            $("#businessName1").text(response.businesses[0].name);
            $("#phoneNumber1").text(response.businesses[0].phone);
            $("#address1").text(address1);
            $("#rating1").text("Business is Rated: " + response.businesses[0].rating);

            $("#businessName2").text(response.businesses[1].name);
            $("#phoneNumber2").text(response.businesses[1].phone);
            $("#address2").text(address2);
            $("#rating2").text("Business is Rated: " + response.businesses[1].rating);

            $("#businessName3").text(response.businesses[2].name);
            $("#phoneNumber3").text(response.businesses[2].phone);
            $("#address3").text(address3);
            $("#rating3").text("Business is Rated: " + response.businesses[2].rating);

            $("#businessName4").text(response.businesses[3].name);
            $("#phoneNumber4").text(response.businesses[3].phone);
            $("#address4").text(address4);
            $("#rating4").text("Business is Rated: " + response.businesses[3].rating);

            $("#businessName5").text(response.businesses[4].name);
            $("#phoneNumber5").text(response.businesses[4].phone);
            $("#address5").text(address5);
            $("#rating5").text("Business is Rated: " + response.businesses[4].rating);

        }
    });
    $.ajax({
        url: hotelurl,
        headers: {
            'Authorization': 'Bearer BMqPeh9LSaDcy2Ynzrlg9b3Pg-zqx7NkPeU6d042djt_xHyFXUHMMftzKLTkw_ftN-_m3GRnBIxeyfvo_U9wHH1WRcYx0LsH6TMMMtyyqgp77l_raGrlydIVQUzBXHYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (response2) {
            console.log(response2);
            var address12 = response2.businesses[0].location.address1 + ", " + response2.businesses[0].location.city + ", " + response2.businesses[0].location.state + " " + response2.businesses[0].location.zip_code;
            var address22 = response2.businesses[1].location.address1 + ", " + response2.businesses[1].location.city + ", " + response2.businesses[1].location.state + " " + response2.businesses[1].location.zip_code;
            var address32 = response2.businesses[2].location.address1 + ", " + response2.businesses[2].location.city + ", " + response2.businesses[2].location.state + " " + response2.businesses[2].location.zip_code;
            var address42 = response2.businesses[3].location.address1 + ", " + response2.businesses[3].location.city + ", " + response2.businesses[3].location.state + " " + response2.businesses[3].location.zip_code;
            var address52 = response2.businesses[4].location.address1 + ", " + response2.businesses[4].location.city + ", " + response2.businesses[4].location.state + " " + response2.businesses[4].location.zip_code;

            $("#2businessName1").text(response2.businesses[0].name);
            $("#2phoneNumber1").text(response2.businesses[0].phone);
            $("#2address1").text(address12);
            $("#2rating1").text("Business is Rated: " + response2.businesses[0].rating);

            $("#2businessName2").text(response2.businesses[1].name);
            $("#2phoneNumber2").text(response2.businesses[1].phone);
            $("#2address2").text(address22);
            $("#2rating2").text("Business is Rated: " + response2.businesses[1].rating);

            $("#2businessName3").text(response2.businesses[2].name);
            $("#2phoneNumber3").text(response2.businesses[2].phone);
            $("#2address3").text(address32);
            $("#2rating3").text("Business is Rated: " + response2.businesses[2].rating);

            $("#2businessName4").text(response2.businesses[3].name);
            $("#2phoneNumber4").text(response2.businesses[3].phone);
            $("#2address4").text(address42);
            $("#2rating4").text("Business is Rated: " + response2.businesses[3].rating);

            $("#2businessName5").text(response2.businesses[4].name);
            $("#2phoneNumber5").text(response2.businesses[4].phone);
            $("#2address5").text(address52);
            $("#2rating5").text("Business is Rated: " + response2.businesses[4].rating);

        }
    });


  
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q="+ locationQuery + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(weatherresponse) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(weatherresponse);

        // // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        // $(".temp").text("Temperature (F) " + response.main.temp);

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + response.main.temp);
      });

});