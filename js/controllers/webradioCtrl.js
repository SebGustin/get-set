/**
 * [WebradioCtrl]
 * @param  {[type]} $scope
 * @param  {[type]} $timeout
 * @param  {[type]} $http
 */
getset.controller("WebradioCtrl", function($scope, $timeout, $http) {
	/**
	 * CONSTANTES
	 */
	var WEBRADIO_URL = "data/webradio.json";

	/**
	 * vars
	 */
	var clock        = '07:30';					// it's time to wake up
	var $playerFrame = $('.playerFrame');		// div.playerFrame
	var $playerAudio = $('.playerFrame audio'); // div.playerFrame > audio

	/**
	 * $scope vars
	 */
	$scope.radios = [];							// all radios

	/**
	 * [loadWebradios description]
	 */
	$scope.loadWebradios = function() {
		$http({method: 'GET', url: WEBRADIO_URL})
			.success(function(data, status, headers, config) {
				$scope.radios = data.webradios;
			})
			.error(function(data, status, headers, config) {
				new message("error", status + ", " + config.url);
			});
	};

	/**
	 * [player description]
	 */
	$scope.player = {
		radioName       : '',
		radioDescription: '',
		url             : '',
		isPlaying       : false,
		infosClock      : 'Aucun réveil',
		infosPlayed     : 'Aucune Webradio',
		clock           : clock,
		clockTime       : 0,
		clockTimer      : false,
		isClocked       : false,
		clockName       : ''
	};


	/**
	 * [play description]
	 * @param  {[obj]} radio
	 */
	$scope.play = function(radio) {
		// create a new source with radio
		var $source = $('<source>', {src: radio.url});

		// add source to audio player
		$scope.addAudio($source);

		// update player infos
		this.player.infosPlayed      = 'Vous écoutez ' + radio.name;
		this.player.url              = radio.url;
		this.player.isPlaying        = true;
		this.player.radioName        = radio.name;
		this.player.radioDescription = radio.description;

		// desactive all radios
		$scope.desactiveRadios();

		// active current radio
		radio.isPlayed = true;
	};

	/**
	 * [addAudio description]
	 * @param {[type]} $source
	 */
	$scope.addAudio = function($source) {
		// get playerAudio
		$playerAudio = $playerFrame.children('audio').length > 0 ? $playerFrame.children('audio') : false;

		// create playerAudio if not exist 
		if(!$playerAudio) {
			$playerAudio = $('<audio>', {
				autoplay: true,
				controls: true
			}).appendTo($playerFrame);
		}

		// empty playerAudio
		$playerAudio.empty();

		// add source to playerAudio
		$playerAudio.append($source);

		// show playerFrame
		$playerFrame.removeClass('hidden slideOutUp').addClass('slideInDown');
	};

	/**
	 * [stop description]
	 */
	$scope.stop = function() {
		// empty playerFrame
		$playerFrame.empty();

		// hide playerAuFrame
		$playerFrame.removeClass('slideInDown').addClass('slideOutUp');

		// reset player infos
		this.player.infosPlayed      = 'Aucune Webradio';
		this.player.url              = '';
		this.player.isPlaying        = false;
		this.player.radioName        = '';
		this.player.radioDescription = '';

		// desactive all radios
		$scope.desactiveRadios();
	};

	/**
	 * [desactiveRadios description]
	 * @return {[type]}
	 */
	$scope.desactiveRadios = function() {
		for(var key in $scope.radios)
			$scope.radios[key].isPlayed = false;
	};

	/**
	 * [dring description]
	 * @param  {[type]} radio
	 */
	$scope.dring = function(radio) {
		// if clock is not active => update clock
		if($scope.player.clockTimer === false) {

			// update player infos
			$scope.player.clockName = radio.name;
			$scope.player.isClocked = true;
			$scope.setClockTime(radio);

			// cancel current player timeout
			$timeout.cancel($scope.player.clockTimer);

			// launch new player timeout
			$scope.player.clockTimer = $timeout(function() {

				// update player infos
				$scope.player.infosClock = 'Aucun réveil';
				$scope.player.isClocked  = false;
				$scope.player.clockName  = '';
				$scope.player.clockTimer = false;

				// play radio
				$scope.play(radio);
			}, $scope.player.clockTime);

		} else {

			// cancel current player timeout
			$timeout.cancel($scope.player.clockTimer);

			// reset player infos
			$scope.player.isClocked  = false;
			$scope.player.clockName  = '';
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
			// for example: ask 10:20 / current 9:12 -> 1:8
			diff.hours = askTime.hours - currentTime.hours;
			diff.minutes = askTime.minutes - currentTime.minutes;
		} else if(
			askTime.hours > currentTime.hours &&
			askTime.minutes < currentTime.minutes
		) {
			// for example: ask 10:20 / current 9:52 -> 0:28
			diff.hours = askTime.hours - currentTime.hours - 1;
			diff.minutes = (askTime.minutes + 60) - currentTime.minutes;
		} else if(
			askTime.hours == currentTime.hours &&
			askTime.minutes > currentTime.minutes
		) {
			// for example: ask 10:20 / current 10:12 -> 0:8
			diff.hours = 0;
			diff.minutes = askTime.minutes - currentTime.minutes;
		} else if(
			askTime.hours == currentTime.hours &&
			askTime.minutes < currentTime.minutes
		) {
			// for example: ask 10:20 / current 10:52 -> 23:28
			diff.hours = (askTime.hours + 23) - currentTime.hours;
			diff.minutes = (askTime.minutes + 60) - currentTime.minutes;
		} else if(
			askTime.hours < currentTime.hours &&
			askTime.minutes > currentTime.minutes
		) {
			// for example: ask 10:20 / current 11:12 -> 22:8
			diff.hours = (askTime.hours + 23) - currentTime.hours;
			diff.minutes = askTime.minutes - currentTime.minutes;
		} else if(
			askTime.hours < currentTime.hours &&
			askTime.minutes < currentTime.minutes
		) {
			// for example: ask 10:20 / current 11:52 -> 22:28
			diff.hours = (askTime.hours + 23) - currentTime.hours;
			diff.minutes = (askTime.minutes + 60) - currentTime.minutes;
		} else {
			diff.hours = 0;
			diff.minutes = 0;
		}

		// update player clockTime info
		$scope.player.clockTime = ((diff.hours * 60 * 60) + (diff.minutes * 60)) * 1000;
		this.player.infosClock  = 'Vous serez réveillez à ' + $scope.player.clock + ' avec ' + radio.name;
	};

});