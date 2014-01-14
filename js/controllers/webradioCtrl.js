getset.controller("WebradioCtrl", function($scope, $timeout, $http) {
	// CONSTANTES
	var WEBRADIO_URL = "data/webradio.json";

	// it's time to wake up
	var clock = '07:30';

	// all radios
	$scope.radios = [];

	// load webradios from json
	$scope.loadWebradios = function() {
		$http({method: 'GET', url: WEBRADIO_URL})
			.success(function(data, status, headers, config) {
				$scope.radios = data.webradios;
			})
			.error(function(data, status, headers, config) {
				
			});
	};

	/**
	 * [player description]
	 * @type {Object}
	 */
	$scope.player = {
		radioName: '',
		radioDescription: '',
		url: '',
		isPlaying: false,
		infosClock: 'Aucun réveil',
		infosPlayed: 'Aucune Webradio',
		clock: clock,
		clockTime: 0,
		clockTimer: false,
		isClocked: false,
		clockName: ''
	};

	var $playerFrame = $('.playerFrame');
	var $playerAudio = $('.playerFrame audio');

	/**
	 * [play description]
	 * @param  {[type]} radio
	 * @return {[type]}
	 */
	$scope.play = function(radio) {
		var $source = $('<source>', {src: radio.url});
		$scope.addAudio($source);

		this.player.infosPlayed = 'Vous écoutez ' + radio.name;
		this.player.url = radio.url;
		this.player.isPlaying = true;
		this.player.radioName = radio.name;
		this.player.radioDescription = radio.description;
		$scope.noPlayed();
		radio.isPlayed = true;
	};

	/**
	 * [addAudio description]
	 * @param {[type]} $source
	 */
	$scope.addAudio = function($source) {
		$playerAudio = $playerFrame.children('audio').length > 0 ? $playerFrame.children('audio') : false;
		if(!$playerAudio) {
			$playerAudio = $('<audio>', {
				autoplay: true,
				controls: true
			}).appendTo($playerFrame);
		}
		$playerAudio.empty();
		$playerAudio.append($source);
		$playerFrame.removeClass('hidden slideOutUp').addClass('slideInDown');
	};

	/**
	 * [stop description]
	 * @return {[type]}
	 */
	$scope.stop = function() {
		$playerFrame.empty();
		$playerFrame.removeClass('slideInDown').addClass('slideOutUp');

		this.player.infosPlayed = 'Aucune Webradio';
		this.player.url = '';
		this.player.isPlaying = false;
		this.player.radioName = '';
		this.player.radioDescription = '';
		$scope.noPlayed();
	};

	/**
	 * [noPlayed description]
	 * @return {[type]}
	 */
	$scope.noPlayed = function() {
		for(var key in $scope.radios) {
			var radio = $scope.radios[key];
			radio.isPlayed = false;
		}
	};

	/**
	 * [dring description]
	 * @param  {[type]} radio
	 * @return {[type]}
	 */
	$scope.dring = function(radio) {
		if($scope.player.clockTimer === false) {
			$scope.player.clockName = radio.name;
			$scope.player.isClocked = true;

			$scope.setClockTime(radio);

			$timeout.cancel($scope.player.clockTimer);
			
			$scope.player.clockTimer = $timeout(function() {
				$scope.player.infosClock = 'Aucun réveil';
				$scope.player.isClocked  = false;
				$scope.player.clockName  = '';
				$scope.player.clockTimer = false;
				$scope.play(radio);
			}, $scope.player.clockTime);

		} else {
			$timeout.cancel($scope.player.clockTimer);
			$scope.player.isClocked = false;
			$scope.player.clockName = '';
			$scope.player.clockTimer = false;
			$scope.player.infosClock = 'Aucun réveil';
		}
	};

	/**
	 * [setClockTime description]
	 * @param {[type]} radio
	 */
	$scope.setClockTime = function(radio) {
		var time        = $scope.player.clock.split(':');
		var askTime     = {hours: parseInt(time[0], 10), minutes: parseInt(time[1], 10)};
		var now         = new Date();
		var currentTime = {hours: now.getHours(), minutes: now.getMinutes()};
		var diff        = {hours: 0, minutes: 0};
		
		if(
			askTime.hours > currentTime.hours &&
			askTime.minutes > currentTime.minutes
		) {
			// ask 10:20 / current 9:12 -> 1:8
			diff.hours = askTime.hours - currentTime.hours;
			diff.minutes = askTime.minutes - currentTime.minutes;
		} else if(
			askTime.hours > currentTime.hours &&
			askTime.minutes < currentTime.minutes
		) {
			// ask 10:20 / current 9:52 -> 0:28
			diff.hours = askTime.hours - currentTime.hours - 1;
			diff.minutes = (askTime.minutes + 60) - currentTime.minutes;
		} else if(
			askTime.hours == currentTime.hours &&
			askTime.minutes > currentTime.minutes
		) {
			// ask 10:20 / current 10:12 -> 0:8
			diff.hours = 0;
			diff.minutes = askTime.minutes - currentTime.minutes;
		} else if(
			askTime.hours == currentTime.hours &&
			askTime.minutes < currentTime.minutes
		) {
			// ask 10:20 / current 10:52 -> 23:28
			diff.hours = (askTime.hours + 23) - currentTime.hours;
			diff.minutes = (askTime.minutes + 60) - currentTime.minutes;
		} else if(
			askTime.hours < currentTime.hours &&
			askTime.minutes > currentTime.minutes
		) {
			// ask 10:20 / current 11:12 -> 22:8
			diff.hours = (askTime.hours + 23) - currentTime.hours;
			diff.minutes = askTime.minutes - currentTime.minutes;
		} else if(
			askTime.hours < currentTime.hours &&
			askTime.minutes < currentTime.minutes
		) {
			// ask 10:20 / current 11:52 -> 22:28
			diff.hours = (askTime.hours + 23) - currentTime.hours;
			diff.minutes = (askTime.minutes + 60) - currentTime.minutes;
		} else {
			diff.hours = 0;
			diff.minutes = 0;
		}

		$scope.player.clockTime = ((diff.hours * 60 * 60) + (diff.minutes * 60)) * 1000;
		this.player.infosClock = 'Vous serez réveillez à ' + $scope.player.clock + ' avec ' + radio.name;
	};

});