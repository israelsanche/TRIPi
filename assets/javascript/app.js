// Global Variables

var locationQuery = "";
var zomatoQuery = "";
$("#yelpDiv").hide();
$("#zomatoDiv").hide();
$("#hotelDiv").hide();
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
geocoder.on("result", function (e) {
    console.log(e.result);
    locationQuery = e.result.place_name;
    zomatoQuery = e.result.geometry.coordinates;
    console.log(zomatoQuery);
})


$("#city-click").on("click", function (event) {

    console.log($("#city-search").val());
    event.preventDefault();
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant&location=" + locationQuery;
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

            if (response.businesses.length > 0) {
                $("#yelpDiv").show();
                $("#yelp").empty();
                for (i = 0; i < 10; i++) {
                    var card = $("<div class='card'>");
                    var cardBody = $("<div class='card-body'>");
                    var businessTitle = $("<h4 class='card-title'>").text(response.businesses[i].name);
                    var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(response.businesses[i].phone);
                    var address = $("<p class='card-text'>").text(response.businesses[i].location.address1 + ", " + response.businesses[i].location.city + ", " + response.businesses[i].location.state + " " + response.businesses[i].location.zip_code);
                    var rating = $("<p class='card-text'>").text("Business is Rated: " + response.businesses[i].rating);
                    $(card).append(cardBody);
                    $(cardBody).append(businessTitle);
                    $(cardBody).append(phone);
                    $(cardBody).append(address);
                    $(cardBody).append(rating);
                    $(card).css("width", "20%");
                    $("#yelp").append(card);
                }
            }
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

            if (response2.businesses.length > 0) {
                $("#hotelDiv").show();
                $("#yelpHotel").empty();
                for (i = 0; i < 10; i++) {
                    var card = $("<div class='card'>");
                    var cardBody = $("<div class='card-body'>");
                    var businessTitle = $("<h4 class='card-title'>").text(response2.businesses[i].name);
                    var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(response2.businesses[i].phone);
                    var address = $("<p class='card-text'>").text(response2.businesses[i].location.address1 + ", " + response2.businesses[i].location.city + ", " + response2.businesses[i].location.state + " " + response2.businesses[i].location.zip_code);
                    var rating = $("<p class='card-text'>").text("Business is Rated: " + response2.businesses[i].rating);
                    $(card).append(cardBody);
                    $(cardBody).append(businessTitle);
                    $(cardBody).append(phone);
                    $(cardBody).append(address);
                    $(cardBody).append(rating);
                    $(card).css("width", "20%");
                    $("#yelpHotel").append(card);
                }
            }
        }
    });



    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + locationQuery + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (weatherresponse) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(weatherresponse);

            // code to display weather on html here...


        });
    //ZOMATO API//
    //   api key: d26b1d8dcb1755149c3453df8f881735 //

    // click function that's gonna trigger that call

    event.preventDefault();
    //grabbing value of the search input//
    // Change to a geocode request and pass lon lat to the call and call the list of restaurants in the area. 
    console.log("dude you're searching it up!");
    // var zomatourl = "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=" + zomatoQuery + "&apikey=d26b1d8dcb1755149c3453df8f881735"
    var zomatourl = "https://developers.zomato.com/api/v2.1/geocode?lat=" + zomatoQuery[1] + "&lon=" + zomatoQuery[0] + "&apikey=d26b1d8dcb1755149c3453df8f881735"
    $.ajax({
        url: zomatourl,
        method: "GET",
        beforeSend: function (xhr) { xhr.setRequestHeader('user-key', 'd26b1d8dcb1755149c3453df8f881735'); },
    }).then(function (zomatoresponse) {
        console.log(zomatoresponse);
        // code to display to html here...
        if (zomatoresponse.nearby_restaurants.length > 0) {
            $("#zomatoDiv").show();
            $("#zomato").empty();
            for (i = 0; i < 10; i++) {
                var card = $("<div class='card'>");
                var cardBody = $("<div class='card-body'>");
                var businessTitle = $("<h4 class='card-title'>").text(zomatoresponse.nearby_restaurants[i].restaurant.name);
                var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(zomatoresponse.nearby_restaurants[i].restaurant.phone);
                var address = $("<p class='card-text'>").text(zomatoresponse.nearby_restaurants[i].restaurant.location.address);
                var rating = $("<p class='card-text'>").text("Business is Rated: " + zomatoresponse.nearby_restaurants[i].restaurant.user_rating.aggregate_rating);
                $(card).append(cardBody);
                $(cardBody).append(businessTitle);
                $(cardBody).append(phone);
                $(cardBody).append(address);
                $(cardBody).append(rating);
                $(card).css("width", "20%");
                $("#zomato").append(card);
            }
        }
    });



});