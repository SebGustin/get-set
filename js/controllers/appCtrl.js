getset.controller("AppCtrl", function($scope, $http, $location) {

	$scope.pages = [];

	$scope.init = function() {
		$http.get(ROUTES_PATH).success(function (data) {
			var j = 0,
				currentRoute;

			for ( ; j < data.routes.length; j++ ) {
				currentRoute = data.routes[j];
				$scope.pages.push(currentRoute);
			}

		});
    };
	

	$scope.isPageActive = function(route) {
        return route === $location.path();
    };


});