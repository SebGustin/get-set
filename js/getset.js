var ROUTES_PATH = 'data/route.json';

var getset = angular.module("getset", ["ngAnimate", "ngRoute"]);

getset.config(['$routeProvider', function($routeProvider) {
	$routeProviderReference = $routeProvider;
}]);

getset.run(['$rootScope', '$http', '$route', function($rootScope, $http, $route) {

	$http.get(ROUTES_PATH).success(function (data) {
		var j = 0,
			currentRoute;

		for ( ; j < data.routes.length; j++ ) {

			currentRoute = data.routes[j];

			$routeProviderReference
				.when('/', {
					redirectTo: data.routes[0].url
				})
				.when(currentRoute.url, {
					templateUrl: currentRoute.templateUrl,
					controller: currentRoute.controller
				})
				.otherwise({
					template: "404"
				});

		}
		$route.reload();

	});

}]);
