// Global Variables

var locationQuery = "";
var zomatoQuery = "";
$("#yelpDiv").hide();
$("#zomatoDiv").hide();
$("#hotelDiv").hide();
$("#eventsDiv").hide();
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

    var markerHeight = 50, markerRadius = 10, linearOffset = 25;
    var popupOffsets = {
     'top': [0, 0],
     'top-left': [0,0],
     'top-right': [0,0],
     'bottom': [0, -markerHeight],
     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
     'left': [markerRadius, (markerHeight - markerRadius) * -1],
     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
     };
    var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
      popup.setLngLat({lon: e.result.geometry.coordinates[0], lat: e.result.geometry.coordinates[1]});
      popup.setHTML("<p>Hello World!</p>")
      popup.setMaxWidth("300px")
      popup.addTo(map);
});


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
            console.log(response)
            if (response.businesses.length > 0) {
                $("#yelpDiv").show();
                $("#yelp").empty();
                for (i = 0; i < 10; i++) {
                    var card = $("<div class='card'>");
                    var cardBody = $("<div class='card-body'>");
                    var businessTitle = $("<a class='card-title'>").text(response.businesses[i].name);
                    businessTitle.attr("href", response.businesses[i].url);
                    var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(response.businesses[i].phone);
                    var address = $("<p class='card-text'>").text(response.businesses[i].location.address1 + ", " + response.businesses[i].location.city + ", " + response.businesses[i].location.state + " " + response.businesses[i].location.zip_code);
                    var rating = $("<p class='card-text'>").text("Rating: " + response.businesses[i].rating);
                    var price = $("<p class='card-text'>").text("Price: " + response.businesses[i].price);
                    $(card).append(cardBody);
                    $(cardBody).append(businessTitle);
                    $(cardBody).append(phone);
                    $(cardBody).append(address);
                    $(cardBody).append(rating);
                    $(cardBody).append(price);
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
            console.log(response2)
            if (response2.businesses.length > 0) {
                $("#hotelDiv").show();
                $("#yelpHotel").empty();
                for (i = 0; i < 10; i++) {
                    var card = $("<div class='card'>");
                    var cardBody = $("<div class='card-body'>");
                    var businessTitle = $("<a class='card-title'>").text(response2.businesses[i].name);
                    businessTitle.attr("href", response2.businesses[i].url);
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

    $.ajax({
        url: eventurl,
        headers: {
            'Authorization': 'Bearer BMqPeh9LSaDcy2Ynzrlg9b3Pg-zqx7NkPeU6d042djt_xHyFXUHMMftzKLTkw_ftN-_m3GRnBIxeyfvo_U9wHH1WRcYx0LsH6TMMMtyyqgp77l_raGrlydIVQUzBXHYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (getFuckedUp) {
            console.log(getFuckedUp);
            if (getFuckedUp.businesses.length > 0) {
                $("#eventsDiv").show();
                $("#events").empty();
                for (i = 0; i < 10; i++) {
                    var card = $("<div class='card'>");
                    var cardBody = $("<div class='card-body'>");
                    var businessTitle = $("<a class='card-title'>").text(getFuckedUp.businesses[i].name);
                    businessTitle.attr("href", getFuckedUp.businesses[i].url);
                    var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(getFuckedUp.businesses[i].phone);
                    var address = $("<p class='card-text'>").text(getFuckedUp.businesses[i].location.address1 + ", " + getFuckedUp.businesses[i].location.city + ", " + getFuckedUp.businesses[i].location.state + " " + getFuckedUp.businesses[i].location.zip_code);
                    var rating = $("<p class='card-text'>").text("Business is Rated: " + getFuckedUp.businesses[i].rating);
                    $(card).append(cardBody);
                    $(cardBody).append(businessTitle);
                    $(cardBody).append(phone);
                    $(cardBody).append(address);
                    $(cardBody).append(rating);
                    $(card).css("width", "20%");
                    $("#events").append(card);
                }
            }
        }
    })


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
            for (i = 0; i < 9; i++) {
                var card = $("<div class='card'>");
                var cardBody = $("<div class='card-body'>");
                var businessTitle = $("<a class='card-title'>").text(zomatoresponse.nearby_restaurants[i].restaurant.name);
                businessTitle.attr("href", zomatoresponse.nearby_restaurants[i].restaurant.url);
                var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(zomatoresponse.nearby_restaurants[i].restaurant.phone);
                var address = $("<p class='card-text'>").text(zomatoresponse.nearby_restaurants[i].restaurant.location.address);
                var rating = $("<p class='card-text'>").text("Business is Rated: " + zomatoresponse.nearby_restaurants[i].restaurant.user_rating.aggregate_rating);
                var avgCost = $("<p class='card-text'>").text("Avg. Cost for Two: " + zomatoresponse.nearby_restaurants[i].restaurant.currency + zomatoresponse.nearby_restaurants[i].restaurant.average_cost_for_two);
                $(card).append(cardBody);
                $(cardBody).append(businessTitle);
                $(cardBody).append(phone);
                $(cardBody).append(address);
                $(cardBody).append(avgCost);
                $(cardBody).append(rating);
                $(card).css("width", "20%");
                $("#zomato").append(card);
            }
        }
    });
});