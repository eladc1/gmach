var gmach = angular.module('gmach',[]);

gmach.config(function($sceDelegateProvider) {

var googleKey = "AIzaSyDgpJz6b1xaU44czAqQ7oQ5eIjZNAJ6k0k";
var googleEmmedKey = "AIzaSyB4MnIeH5f36G0fiRMZPen3yHOaaHBziUU";

 $sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   ' https://www.google.com/**']);
 })

gmach.controller("gSearch",[ '$scope', 'gFactory' , function($scope, gFactory){
    $scope.searchResult = [];

    gFactory.getAllLocations().then(function(data){
      var parseData =  JSON.parse(data.data);
      $scope.searchResult.push( ...parseData.operations);
      $scope.searchResult.push( ...parseData.operations);
      $scope.searchResult.push( ...parseData.operations);
    }, function(err){
      console.log(err);
    });

    //gFactory.getUserLocation();

    function search(){
      gFactory.getLocationFromGoolge($scope.searchBar).then(function(data){
          var results = data.data.results;
          const lat = results[0].geometry.location.lat;
          const lng = results[0].geometry.location.lng;
        //  const formatted_address = results[0].formatted_address;
          
        gFactory.getClosestLocation(lat, lng).then(function(data){

        }, function(err){
          console.log(err);
        });

      },
      function(err){
        console.log(err);
      });
    }
    
    $scope.search = search;

}]);

gmach.controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});

gmach.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        // show the map and place some markers
        initMap();
        
        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});