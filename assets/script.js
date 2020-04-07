
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
                $('<p>').appendTo('nearestBars').text(barList[i].name)

            }



        });
    }
}); // end of function-ready jquery