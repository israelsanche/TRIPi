var cityInput = ""
var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-chloe&location=" + cityInput;

$("#city-click").on("click", function (event) {
    cityInput = $("#city-search").val()
    console.log($("#city-search").val());
    event.preventDefault();
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=" + cityInput;

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


});