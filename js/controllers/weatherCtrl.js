/**
 * [weatherService]
 * @param  {[type]} $http
 * @param  {[type]} $q
 * @return {api functions} [description]
 */
getset.factory('weatherService', function($http, $q) {
	/**
	 * CONSTANTES
	 */
	var WEATHER_API_START      = 'http://api.openweathermap.org/data/2.5/';
	var WEATHER_API_CONSTANTES = '&mode=json&lang=fr&units=metric&APPID=e7b120e3590db1d3b910e3c21394345d';

	return {
		getWeather: function(city) {
			var deferred = $q.defer();

			$http.get(WEATHER_API_START + 'weather?q=' + city + WEATHER_API_CONSTANTES).success(function(data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		},
		getWeatherByCoord: function(coord) {
			var deferred = $q.defer();

			$http.get(WEATHER_API_START + 'weather?lat=' + coord.latitude + '&lon=' + coord.longitude + WEATHER_API_CONSTANTES).success(function(data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		},
		getForecast: function(city) {
			var deferred = $q.defer();

			$http.get(WEATHER_API_START + 'forecast?q=' + city + WEATHER_API_CONSTANTES).success(function(data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		},
		getDailyForecast: function(city) {
			var deferred = $q.defer();

			$http.get(WEATHER_API_START + 'forecast/daily?q=' + city + WEATHER_API_CONSTANTES).success(function(data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		},
		getDailyForecastByCoord: function(coord) {
			var deferred = $q.defer();

			$http.get(WEATHER_API_START + 'forecast/daily?lat=' + coord.latitude + '&lon=' + coord.longitude + WEATHER_API_CONSTANTES).success(function(data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		}
	};
});


/**
 * [WeatherCtrl]
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} $window
 * @param  {[type]} weatherService
 */
getset.controller("WeatherCtrl", function($scope, $http, $window, weatherService) {

	/**
	 * CONSTANTES
	 */
	var WEATHER_URL = "data/weather.json";

	/**
	 * $scope vars
	 */
	$scope.city      = "";
	$scope.latitude  = '';
	$scope.longitude = '';
	$scope.codes     = [];
	$scope.Math      = Math;
	$scope.weather   = {};
	$scope.forecast  = {};

	/**
	 * [loadCodes description]
	 */
    $scope.loadCodes = function() {
		$http({method: 'GET', url: WEATHER_URL})
			.success(function(data, status, headers, config) {
				$scope.codes = data.weather;
				new message("success", "Weather is loaded");
			})
			.error(function(data, status, headers, config) {
				new message("error", status + ", " + config.url);
			});
	};

	/**
	 * [getGeoloc description]
	 */
	$scope.getGeoloc = function() {
		// tranform geoloc btn to loading action
		$('#geolocBtn').children('i').addClass('fa-spinner').addClass('fa-spin').removeClass('fa-location-arrow');

		// get geoloc current position
		$window.navigator.geolocation.getCurrentPosition($scope.geoSuccess, $scope.geoError, {timeout: 10000});
	};

	/**
	 * [geoSuccess description]
	 * @param  {obj} position
	 */
	$scope.geoSuccess = function(position) {
		// update $scope latitude and longitude
		$scope.$apply(function() {
			$scope.latitude		= position.coords.latitude;
			$scope.longitude	= position.coords.longitude;

			// update $scope forecast
			weatherService.getDailyForecastByCoord(position.coords).then(function(data) {
				$scope.updateForecast(data);
			});

		});
	};

	/**
	 * [geoError description]
	 * @param  {[type]} error
	 */
	$scope.geoError = function(error) {
		new message("error","Geolocation seems to have a problem");
	};

	/**
	 * [getWeather description]	 
	 */
	$scope.getWeather = function() {
		weatherService.getWeather($scope.city).then(function(data) {
			$scope.updateForecast(data);
		});
	};

	/**
	 * [getDailyForecast description]
	 */
	$scope.getDailyForecast = function() {

		weatherService.getDailyForecast($scope.city).then(function(data) {
			$scope.updateForecast(data);
		});
	};

	/**
	 * [updateWeather description]
	 * @param  {obj} data
	 */
	$scope.updateWeather = function(data) {
		console.log(data);
	};

	/**
	 * [updateForecast description]
	 * @param  {obj} data
	 */
	$scope.updateForecast = function(data) {
		for(var key in data.list) {

			data.list[key].getset = {};

			// city
			$scope.city = data.city.name + ', ' + data.city.country ;

			// prettyDate
			data.list[key].getset.prettyDate = {
				timestamp: data.list[key].dt,
				date: new Date(data.list[key].dt*1000)
			};

			// temp
			data.list[key].getset.temp = data.list[key].temp;

			// humidity
			data.list[key].getset.humidity = data.list[key].humidity;

			// pressure
			data.list[key].getset.pressure = data.list[key].pressure / 10;
			
			// icon
			data.list[key].getset.icon = $scope.getIconFromCode(data.list[key].weather[0].icon);
			
			// description
			data.list[key].getset.description = data.list[key].weather[0].description;
			
			// wind
			data.list[key].getset.wind = Math.round(data.list[key].speed / 1000 * 60 * 60);
			
			// windChill
			if(data.list[key].getset.wind >= 5) {
				data.list[key].getset.windChill = (13.12 + 0.6215 * data.list[key].getset.temp.day - 11.37 * Math.pow(data.list[key].getset.wind,0.16) + 0.3965 * data.list[key].getset.temp.day * Math.pow(data.list[key].getset.wind,0.16));
			} else {					data.list[key].getset.windChill = (data.list[key].getset.temp.day + 0.2 * (0.1345 * data.list[key].getset.temp.day - 1.59) * data.list[key].getset.wind);
			}
			
		}
		
		// update $scope forecast
		$scope.forecast = data;

		// remove loading action to geoloc btn
		$('#geolocBtn').children('i').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-location-arrow');
	};

	/**
	 * [onClickPanelTitle description]
	 * @param  {event} event
	 */
	$scope.onClickPanelTitle = function(event) {
		var $panel = $(event.currentTarget).next('.panel-collapse');
		$panel.slideToggle(400).toggleClass('fadeInUp').toggleClass('fadeOutDown');
	};
	

	/**
	 * [getIconFromCode description]
	 * @param  {string} code
	 * @return {icon | boolean}
	 */
    $scope.getIconFromCode = function(code) {
		for(var key in $scope.codes) {
			if(code == $scope.codes[key].code) {
				return $scope.codes[key].icon;
			}
		}
		return true;
    };

    // launch geoloc
    $scope.getGeoloc();

});