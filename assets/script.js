
$().ready(function () {
    console.log("ready!");

    $("#modal1").modal();
    $('input#input_text, textarea#textarea2').characterCounter();
    $(document).ready(function () {
        $("#modal1").modal('open');
        countdown();
    })

    //  current time in hours:minutes 
    var currentTime = moment().format('HH:mm');

    console.log(currentTime);


    // current time in hours:
    var currentHour = moment().format('HH');

    console.log(currentHour);

    //    function to get countdown: 
    function countdown() {

        if (currentHour > 19) {
            let hoursUntil = 24 - currentHour + 17;
            console.log(hoursUntil);
            $('#countdownText').html(hoursUntil + " hours until Happy Hour!");
        }

        if (currentHour < 17) {
            let gettingClose = 17 - currentHour;
            console.log(gettingClose);
            $('#countdownText').html(gettingClose + " hours until Happy Hour!");

        }

        if (currentHour == 16) {
            let hourLeft = 17 - currentHour;
            $('#countdownText').html(hourLeft + " hour until Happy Hour!");
        }


        if (currentHour == 17 || currentHour == 18 || currentHour == 19) {
            $('#countdownText').html("IT'S TIME FOR HAPPY HOUR!");
        }
    }




    // GLOBAL VARIABLES
    // recentSearches is a dynamically manipulated empty array to work with local storage
    var recentSearches = []
    var navList = $('#recentSearches')

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

    //--------- BEGIN LOCAL STORAGE FUNCTIONS ---------
    getLocal()
    function getLocal() {
        //Parse the local storage data for my specific 'Events' key and assign it a variable of stored
        var storedRecents = JSON.parse(localStorage.getItem('Recent Drinks'))
        //if stored is null (doesn't exist) function ends and doesn't update calEvents array with the correct data.
        console.log(storedRecents)
        if (storedRecents !== null) {
            recentSearches = storedRecents;
            generateNav()
        }
    }// end of Get Local

    // THIS save FUNCTION IS WORKING AND SAVES VALUES ADDED TO THE INPUT BOX TO THE LOCAL STORAGE
    function saveRecents() {
        // // saves entire Object to local storage
        localStorage.setItem('Recent Drinks', JSON.stringify(recentSearches));
    }
    // NEEDED TEMPORARY FUNCTION TO MAKE THE HEADER POP TO TOP WHENEVER NAV ITEM IS CREATED
    function callRecentsHd() {
        $('#recentsHdr').remove()
        let recentsHeader = $('<div>').prependTo('#recentSearches').addClass('collection-header').attr('id', 'recentsHdr')
        $('<h6>').appendTo(recentsHeader).text('Your recently searched cocktails...').css({ 'color': 'white', 'font-size': '1.4rem', 'text-align': 'center' })
    }

    function generateNav() {
        //NEEDED TO REVERSE THIS LOOP TO CREATE THE ELEMENTS IN THE SAME ORDER AS SEARCHED
        // for (let i = recentSearches.length - 1; i >= 0; i--) {
        //     pushNavItem(recentSearches[i])
        // }
        for (let i = 0; i < recentSearches.length; i++) {
            pushNavItem(recentSearches[i])
        }
        callRecentsHd()
    }
    //--------- END LOCAL STORAGE ---------

    getLocation();
    // END OF GET GEOLOCATION FUNCTION

    // ----- API CALL TO YELP
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
            let barHeader = $('<div>').appendTo('#nearestBars').addClass('collection-header')
            $('<h6>').appendTo(barHeader).text('Cocktail Bars near ' + barList[0].location.city).css({ 'color': 'white', 'font-size': '1.4rem', 'text-align': 'center' })

            for (let i = 0; i < 5; i++) {
                let barEntry = barList[i];
                let barRow = $('<div>').appendTo('#nearestBars').addClass('collection-item').css({ 'color': 'white' })
                $('<a>').appendTo(barRow).attr('href', barEntry.url).text(barEntry.name).css({ 'color': 'white', 'font-size': '1.1em', 'font-weight': 'bolder' })
                $('<p>').appendTo(barRow).text(barEntry.location.address1 + ", " + barEntry.location.city + " " + barEntry.location.zip_code)
            }
        });
    } // ----- END YELP API CALL

    // ----- BEGIN GENERATE RECENT NAV ITEM (Called by #searchbutton.onClick)

    // this function checks the length of the recentSearches array and decides whether to remove the oldest
    function updateRecents(param) {
        // if less than 6 add it to the array
        if (recentSearches.length < 8) {
            //adds item to end of array
            recentSearches.push(param)
            pushNavItem(param)
            saveRecents()
        } // if not, remove the oldest item and add the new one
        else {
            //removes oldest from beginning of array
            recentSearches.shift()
            //DELETE THE LAST ELEMENT FROM NAVLIST
            navList.children().last().remove()
            //ADD THE NEW ARRAY ITEM TO FRONT OF ARRAY
            recentSearches.push(param)
            //APPEND THE NEW ARRAY ITEM TO THE TOP OF THE NAV LIST
            pushNavItem(param)
            saveRecents()
        }
    }
    //this function adds the recent search elements
    function pushNavItem(param) {
        console.log(param)
        $('<a>').addClass('collection-item').attr('data-name', param).on('click', btnValParse).text(param).prependTo(navList)
        callRecentsHd()
    }
    // this is a temporary solution to parse the data value to send to searchCocktails
    function btnValParse() {
        var param = ($(this).data('name'))
        searchCocktails(param)
    }

    // ----- END GENERATE RECENT NAV ITEM

    //specific onclick event for search button
    $("#searchButton").on("click", function (event) {
        event.preventDefault()
        var userInput = document.getElementById("drink-input").value;
        userInput = userInput.charAt(0).toUpperCase() + userInput.slice(1)
        console.log(userInput)

        if (userInput == "" || userInput == " ") {
            return
        }
        updateRecents(userInput)
        searchCocktails(userInput)
    })

    function searchCocktails(param) {
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + param
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function (response) {
                var searchResultsDiv = $("#recipes");
                searchResultsDiv.empty()
                $("#results").css('background', 'rgba(-35, 141, 115, 0.5)');
                // For loop
                for (var i = 0; i < response.drinks.length; i++) {

                    var drinkArray = response.drinks[i];
                    var ingredArray = [];

                    console.log(drinkArray);

                    var drinkName = (drinkArray.strDrink + " Details:");
                    console.log(drinkName);

                    var instructions = drinkArray.strInstructions;

                    var drinkImageURL = drinkArray.strDrinkThumb;
                    console.log(drinkImageURL);

                    var h3drinkName = $("<h3>").text(drinkName);
                    var ingredientsHeader = $("<h5>").text("Ingredients:")
                    var h5instructionHeader = $("<h5>").text("Instructions:");
                    var pInstructions = $("<p>").text(instructions);
                    var image = $("<img>").attr("src", drinkImageURL);

                    searchResultsDiv.append(h3drinkName);
                    searchResultsDiv.append(h5instructionHeader);
                    searchResultsDiv.append(pInstructions);
                    searchResultsDiv.append(image);
                    searchResultsDiv.append(ingredientsHeader);
                    $("#results").addClass("scrollbar");
                    $("#results").append(searchResultsDiv);

                    function getIngredientsAndMeasure() {
                        for (let k = 0; k < ingredArray.length; k++) {
                            $("<p>").text(ingredArray[k]).appendTo(searchResultsDiv);

                        }
                    }

                    //Start of Ingredients Rendering
                    for (var j = 1; j < 16; j++) {
                        var itemIndex = "strIngredient" + [j];
                        var ingredientIndex = "strMeasure" + [j];
                        if (drinkArray[itemIndex] !== null && drinkArray[ingredientIndex] !== null) {
                            console.log(drinkArray[itemIndex] + " " + drinkArray[ingredientIndex]);
                            var ingAndMeas = drinkArray[itemIndex] + " - " + drinkArray[ingredientIndex];
                            ingredArray.push(ingAndMeas);
                        }

                    };

                    getIngredientsAndMeasure();

                }

            })

    }
}); // end of function-ready jquery