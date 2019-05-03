$(document).ready(function () {

    var locationQuery = "";
    var geoQuery = "";
    var markerHeight = 50, markerRadius = 10, linearOffset = 25;
    var popupOffsets = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

    $("#yelpDiv").hide();
    $("#zomatoDiv").hide();
    $("#hotelDiv").hide();
    $("#eventsDiv").hide();

    mapboxgl.accessToken = 'pk.eyJ1IjoidHlsZXItbGFycmFiZWUiLCJhIjoiY2p1dnU1bjh5MDVrNDQ0bGoyNWtreWRnZiJ9.eF1RC1zYSNU6iDVUE2FIqw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 3
    });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    var locator = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    });

    map.addControl(geocoder);
    
    map.addControl(locator);

    geocoder.setPlaceholder("Set Location");

    geocoder.on("result", function (e) {
        
        event.preventDefault();
        locationQuery = e.result.place_name;
        geoQuery = e.result.geometry.coordinates;

        yelp("restaurant", locationQuery, "#yelp", "#yelpDiv", "red");
        yelp("hotels", locationQuery, "#yelpHotel", "#hotelDiv", "purple");
        yelp("events", locationQuery, "#events", "#eventsDiv", "yellow");
        zomato(geoQuery);

    });

    locator.on("geolocate", function (e) {
        
        geoQuery = [e.coords.longitude, e.coords.latitude]
        zomato(geoQuery);
        yelp("restaurants", geoQuery, "#yelp", "#yelpDiv", "red");
        yelp("hotels", geoQuery, "#yelpHotel", "#hotelDiv", "purple");
        yelp("events", geoQuery, "#events", "#eventsDiv", "yellow");

    });

    function zomato(lngLat) {
        var zomatourl = "https://developers.zomato.com/api/v2.1/geocode?lat=" + lngLat[1] + "&lon=" + lngLat[0] + "&apikey=d26b1d8dcb1755149c3453df8f881735"
        $.ajax({
            url: zomatourl,
            method: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('user-key', 'd26b1d8dcb1755149c3453df8f881735'); },
        }).then(function (zomatoresponse) {
            
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
                    var coord = [zomatoresponse.nearby_restaurants[i].restaurant.location.longitude, zomatoresponse.nearby_restaurants[i].restaurant.location.latitude]
                    marker(coord, "green", zomatoresponse.nearby_restaurants[i].restaurant.name)

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
    }

    function yelp(type, yelpQuery, selector, divSelector, markerColor) {
       var myurl = function url(yelpQuery){
        if(yelpQuery === locationQuery){
           return "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + type + "&location=" + yelpQuery;
        }else{
            return "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + type + "&longitude=" + yelpQuery[0] + "&latitude=" + yelpQuery[1];
        }
        } 
        $.ajax({
            url: myurl(yelpQuery),
            headers: {
                'Authorization': 'Bearer BMqPeh9LSaDcy2Ynzrlg9b3Pg-zqx7NkPeU6d042djt_xHyFXUHMMftzKLTkw_ftN-_m3GRnBIxeyfvo_U9wHH1WRcYx0LsH6TMMMtyyqgp77l_raGrlydIVQUzBXHYx',
            },
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                
                if (response.businesses.length > 0) {
                    $(divSelector).show();
                    $(selector).empty();
                    for (i = 0; i < 10; i++) {

                        var lonLat = [response.businesses[i].coordinates.longitude, response.businesses[i].coordinates.latitude]
                        var card = $("<div class='card'>");
                        var cardBody = $("<div class='card-body'>");
                        var businessTitle = $("<a class='card-title'>").text(response.businesses[i].name);
                        businessTitle.attr("href", response.businesses[i].url);
                        var phone = $("<p class='card-subtitle mb-2 text-muted'>").text(response.businesses[i].phone);
                        var address = $("<p class='card-text'>").text(response.businesses[i].location.address1 + ", " + response.businesses[i].location.city + ", " + response.businesses[i].location.state + " " + response.businesses[i].location.zip_code);
                        var rating = $("<p class='card-text'>").text("Rating: " + response.businesses[i].rating);
                        var price = $("<p class='card-text'>").text("Price: " + response.businesses[i].price);

                        marker(lonLat, markerColor, response.businesses[i].name);

                        $(card).append(cardBody);
                        $(cardBody).append(businessTitle);
                        $(cardBody).append(phone);
                        $(cardBody).append(address);
                        $(cardBody).append(rating);
                        $(cardBody).append(price);
                        $(card).css("width", "20%");
                        $(selector).append(card);
                    }
                }
            }
        });

    };

    function marker(coord, color, name) {
        var popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
        popup.setLngLat({ lon: coord[0], lat: coord[1] });
        popup.setHTML("<p>" + name + "</p>")
        popup.setMaxWidth("300px")

        var marker = new mapboxgl.Marker({ color: color })
        marker.setLngLat(coord)
        marker.addTo(map);
        marker.setPopup(popup);
    }
});
