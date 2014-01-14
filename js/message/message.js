function message(type, msg) {

	var $pageWrapper = $('#page-wrapper');
	var $alert = $('<div>', {
		'class' : "alert alert-dismissable"
	});
	var $alertBtn = $('<button>', {
			'type'        : "button",
			'class'       : "close" ,
			'data-dismiss': "alert",
			'aria-hidden' : "true",
			'text'        : "x"
	}).appendTo($alert);


	(function() {
		switch(type) {
			case 'success':
				$alert.addClass('alert-success');
				$alert.html($alert.html() + '<strong>Success: </strong>' + msg);
			break;
			case 'info':
				$alert.addClass('alert-info');
				$alert.html($alert.html() + '<strong>Info: </strong>' + msg);
			break;
			case 'warning':
				$alert.addClass('alert-warning');
				$alert.html($alert.html() + '<strong>Warning:</strong>' + msg);
			break;
			case 'error':
				$alert.addClass('alert-danger');
				$alert.html($alert.html() + '<strong>Error: </strong>' + msg);
			break;
			default:
				$alert.addClass('alert-info');
				$alert.html($alert.html() + '<strong>Info: </strong>' + msg);
			break;
		}

		$alert.prependTo($pageWrapper);
	})();
}
