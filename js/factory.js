gmach.factory("gFactory", ['$http', function($http){    
    function getLocationFromGoolge(search){
        return $http.get("http://maps.google.com/maps/api/geocode/json?address="+ search);
    }

    function getClosestLocation(lat , lng){
        const data = {
            lat : lat,
            lng : lng
        };
        return $http.get("", JSON.stringify(data));
    }

    function getLocationByID(id){
        return $http.get("http://wschool.co.il.networkprotected.com/api/gmc/GetGmc/"+ id);
    }

    function getAllLocations(){
        return {}
    }

    return {
        getLocationFromGoolge   : getLocationFromGoolge,
        getClosestLocation      : getClosestLocation,
        getUserLocation         : getUserLocation,
        getLocationByID         : getLocationByID
    }



    function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude : " + latitude + " Longitude: " + longitude);
    }
    function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    }else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
    }
    function getUserLocation(){
        if(navigator.geolocation){
            // timeout at 60000 milliseconds (60 seconds)
            var options = {timeout:60000};
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler);
        }else{
            alert("Sorry, browser does not support geolocation!");
        }
    }

}]);