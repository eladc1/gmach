var gmach = angular.module('gmach',[]);

gmach.config(function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

gmach.controller("gSearch",[ '$scope', 'gFactory' , function($scope, gFactory){
    $scope.searchResult = [];


    gFactory.getLocationByID(1).then(function(data){
      console.dir(data.data.d);
    }, function(err){
      console.log(err);
    });

    //gFactory.getUserLocation();

    function search(){

      $scope.searchResult = 123;

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