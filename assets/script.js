
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
                let barRow = $('<div>').appendTo('#nearestBars')
                $('<a>').appendTo(barRow).attr('href', barEntry.url).text(barEntry.name)

            }
        });
    } // END YELP API CALL

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

                // For loop
                for (var i = 0; i < response.drinks.length; i++) {

                    var drinkArray = response.drinks[i];

                    console.log(drinkArray);

                    var ingredientsAndMeasure1 = ((drinkArray.strIngredient1 + " - " + drinkArray.strMeasure1));
                    console.log(ingredientsAndMeasure1);
                    var ingredientsAndMeasure2 = ((drinkArray.strIngredient2 + " - " + drinkArray.strMeasure2));
                    console.log(ingredientsAndMeasure2);
                    var ingredientsAndMeasure3 = ((drinkArray.strIngredient3 + " - " + drinkArray.strMeasure3));
                    console.log(ingredientsAndMeasure3);
                    var ingredientsAndMeasure4 = ((drinkArray.strIngredient4 + " - " + drinkArray.strMeasure4));
                    console.log(ingredientsAndMeasure4);
                    var ingredientsAndMeasure5 = ((drinkArray.strIngredient5 + " - " + drinkArray.strMeasure5));
                    console.log(ingredientsAndMeasure5);
                    var ingredientsAndMeasure6 = ((drinkArray.strIngredient6 + " - " + drinkArray.strMeasure6));
                    console.log(ingredientsAndMeasure6);


                    // var ingredientsAndMeasure7 = ((drinkArray.strIngredient7 + " - " + drinkArray.strMeasure7));
                    // var ingredientsAndMeasure8 = ((drinkArray.strIngredient8 + " - " + drinkArray.strMeasure8));
                    // var ingredientsAndMeasure9 = ((drinkArray.strIngredient9 + " - " + drinkArray.strMeasure9));
                    // var ingredientsAndMeasure10 = ((drinkArray.strIngredient10 + " - " + drinkArray.strMeasure10));
                    // var ingredientsAndMeasure11 = ((drinkArray.strIngredient11 + " - " + drinkArray.strMeasure11));
                    // var ingredientsAndMeasure12 = ((drinkArray.strIngredient12 + " - " + drinkArray.strMeasure12));
                    // var ingredientsAndMeasure13 = ((drinkArray.strIngredient13 + " - " + drinkArray.strMeasure13));
                    // var ingredientsAndMeasure14 = ((drinkArray.strIngredient14 + " - " + drinkArray.strMeasure14));
                    // var ingredientsAndMeasure15 = ((drinkArray.strIngredient15 + " - " + drinkArray.strMeasure15));


                    var drinkName = (drinkArray.strDrink + " Details:");
                    console.log(drinkName);

                    var instructions = drinkArray.strInstructions;

                    var drinkImageURL = drinkArray.strDrinkThumb;
                    console.log(drinkImageURL);

                    var searchResultsDiv = $("#recipes");
                    var h3drinkName = $("<h3>").text(drinkName);
                    var ingredAndMeasure1 = $("<p>").text(ingredientsAndMeasure1);
                    var ingredAndMeasure2 = $("<p>").text(ingredientsAndMeasure2);
                    var ingredAndMeasure3 = $("<p>").text(ingredientsAndMeasure3);
                    var ingredAndMeasure4 = $("<p>").text(ingredientsAndMeasure4);
                    var ingredAndMeasure5 = $("<p>").text(ingredientsAndMeasure5);
                    var h5instructionHeader = $("<h5>").text("Instructions:");
                    var pInstructions = $("<p>").text(instructions);
                    var image = $("<img>").attr("src", drinkImageURL);

                    searchResultsDiv.append(h3drinkName);
                    searchResultsDiv.append(ingredAndMeasure1);
                    searchResultsDiv.append(ingredAndMeasure2);
                    searchResultsDiv.append(ingredAndMeasure3);
                    searchResultsDiv.append(ingredAndMeasure4);
                    searchResultsDiv.append(ingredAndMeasure5);
                    searchResultsDiv.append(h5instructionHeader);
                    searchResultsDiv.append(pInstructions);
                    searchResultsDiv.append(image);
                    $("#results").append(searchResultsDiv);

                }

            })
    })
}); // end of function-ready jquery