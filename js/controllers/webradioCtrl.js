getset.controller("WebradioCtrl", function($scope, $timeout, $http) {


	var clock = '07:30';

	/*if(local.exist('clockTimeHours') && local.exist('clockTimeMinutes')) {
		clock = local.get('clockTimeHours') + ':' + local.get('clockTimeMinutes');
	}*/

	$scope.radios = [];

	$scope.loadWebradios = function() {
		$http({method: 'GET', url: 'data/data.json'})
			.success(function(data, status, headers, config) {
				$scope.radios = data.webradios;
			})
			.error(function(data, status, headers, config) {
				
			});
	};


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

	$scope.noPlayed = function() {
		for(var key in $scope.radios) {
			var radio = $scope.radios[key];
			radio.isPlayed = false;
		}
	};

	$scope.dring = function(radio) {

		if($scope.player.clockTimer === false) {
			$scope.player.clockName = radio.name;
			$scope.player.isClocked = true;

			$scope.setClockTime(radio);

			$timeout.cancel($scope.player.clockTimer);
			
			$scope.player.clockTimer = $timeout(function() {
				$scope.player.infosClock = 'Aucun réveil';
				$scope.play(radio);
				$scope.player.isClocked = false;
				$scope.player.clockName = '';
				$scope.player.clockTimer = false;
			}, $scope.player.clockTime);

		} else {
			$timeout.cancel($scope.player.clockTimer);
			$scope.player.isClocked = false;
			$scope.player.clockName = '';
			$scope.player.clockTimer = false;
			$scope.player.infosClock = 'Aucun réveil';
		}

		
	};

	$scope.setClockTime = function(radio) {
		var time = $scope.player.clock.split(':');
		var askTime = {
			hours: parseInt(time[0], 10),
			minutes: parseInt(time[1], 10),
		};
		var now = new Date();

		var currentTime = {
			hours: now.getHours(),
			minutes: now.getMinutes()
		};

		var diff = {
			hours: 0,
			minutes: 0
		};
		
		
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

		/*local.set('clockTimeHours', askTime.hours);
		local.set('clockTimeMinutes', askTime.minutes);*/

		$scope.player.clockTime = ((diff.hours * 60 * 60) + (diff.minutes * 60)) * 1000;

		this.player.infosClock = 'Vous serez réveillez à ' + $scope.player.clock + ' avec ' + radio.name;

	};


	

});