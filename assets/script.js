
$().ready(function () {
    console.log("ready!");

    // FUNCTION DEFINES GEOLOCATION COORDINATES OF USER
    function getLocation() {
        // Make sure browser supports this feature
        if (navigator.geolocation) {
            // Provide our showPosition() function to getCurrentPosition
            console.log(navigator.geolocation.getCurrentPosition(showPosition));
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    // This will get called after getCurrentPosition()
    function showPosition(position) {
        // Grab coordinates from the given object
        var lat = "latitude=" + position.coords.latitude;
        var lon = "longitude=" + position.coords.longitude;
        userLocation = lat + "&" + lon
        console.log(userLocation);

        // Call our next function, passing on the coordinates NEED TO REWORK THESE VARIABLES TO PASS TO YELP
        displayYelpOptions(userLocation);
    }

    //GLOBAL VARIABLES
    var userLocation = "";

    getLocation();
    // END OF GET GEOLOCATION FUNCTION

    // API CALL TO YELP
    function displayYelpOptions() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=cocktailbars&" + userLocation,
            "method": "GET",
            "headers": {
                "authorization": "Bearer _ewhfif6HwElInBICgFwHQyv1BGJR-r-EuRG_AaxlDadIboknN2hoNIe7JaOL-77jeqRmjdoG84N0rSKIoandG-ONXj08_9SQBqQJ02NDEj3zQF2Zxg4VoQuJ5mIXnYx",
                "cache-control": "no-cache",
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            var barList = response.businesses

            for (let i = 0; i < 5; i++) {
                let barEntry = barList[i];
                // $('<h1>').appendTo('body').text(barList[i].name).attr('href', barList[i].url)
                $('<h3>').appendTo('#nearestBars').text(barList[i].name)

            }



        });
    }

    // On click event for Cocktail Search:
    $("#searchButton").on("click", function (event) {
        event.preventDefault()

        var userInput = document.getElementById("drink-input").value;
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userInput
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {


                var drinkArray = (response.drinks);

                // for (var i = 0; i < drinkArray.length; i++) {

                //     console.log(drinkArray[i]);

                //     // Log the queryURL
                //     console.log(queryURL);

                //     // Log the resulting object
                //     console.log(response.drinks[i]);

                // For loop
                //     for (let i = 0; i < response.drinks.length; i++) {

                //     }

                // Adding text to the divs above
                $(".name").text((response.drinks[0].strDrink) + " Details");
                $(".ingredient1").text((response.drinks[0].strIngredient1 + " - " + response.drinks[0].strMeasure1));
                $(".ingredient2").text((response.drinks[0].strIngredient2 + " - " + response.drinks[0].strMeasure2));
                $(".ingredient3").text((response.drinks[0].strIngredient3 + " - " + response.drinks[0].strMeasure3));
                $(".ingredient4").text((response.drinks[0].strIngredient4 + " - " + response.drinks[0].strMeasure4));
                $(".instructions").text((response.drinks[0].strInstructions));

                // Pulling the image and appending it to image div
                var imgURL = response.drinks[0].strDrinkThumb;
                var image = $("<img>").attr("src", imgURL);
                $(".imageDiv").append(image);

            })
    })
}); // end of function-ready jquery