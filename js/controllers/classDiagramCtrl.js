/**
 * [controller ClassDiagramCtrl]
 * @param  {[angular]} $scope [description]
 */
getset.controller("ClassDiagramCtrl", function($scope) {
	
	/**
	 * $scope vars
	 */
	$scope.models	= [];
	$scope.modeView = [{"text": true, "form": false}];

	/**
	 * [addAttribute description]
	 * @param {[type]} model [description]
	 */
	$scope.addAttribute = function(model) {
		model.attributes.push(new Attr());
	};

	/**
	 * [addMethod description]
	 * @param {[type]} model [description]
	 */
	$scope.addMethod = function(model) {
		model.methods.push(new Method());
	};

	/**
	 * [addModel description]
	 */
	$scope.addModel = function() {
		var newModel = new Model();
		newModel.attributes.push(new Attr());
		newModel.methods.push(new Method());
		$scope.models.push(newModel);
	};

	/**
	 * [setAttrName description]
	 * @param {[type]} attr  [description]
	 * @param {[type]} event [description]
	 */
	$scope.setAttrName = function(attr, event) {
		attr.name = getValueFor($(event.currentTarget));
	};

	/**
	 * [setAttrMultiplicity description]
	 * @param {[type]} attr  [description]
	 * @param {[type]} event [description]
	 */
	$scope.setAttrMultiplicity = function(attr, event) {
		console.log(getValueFor($(event.currentTarget)));
		attr.multiplicity = getValueFor($(event.currentTarget));
	};

	/**
	 * [setAttrType description]
	 * @param {[type]} attr  [description]
	 * @param {[type]} event [description]
	 */
	$scope.setAttrType = function(attr, event) {
		attr.type = getValueFor($(event.currentTarget));
	};

	/**
	 * [setMethReturn description]
	 * @param {[type]} method [description]
	 * @param {[type]} event  [description]
	 */
	$scope.setMethReturn = function(method, event) {
		method.return = getValueFor($(event.currentTarget));
	};

	/**
	 * [setMethName description]
	 * @param {[type]} method [description]
	 * @param {[type]} event  [description]
	 */
	$scope.setMethName = function(method, event) {
		method.name = getValueFor($(event.currentTarget));
	};

	/**
	 * [setMethParameters description]
	 * @param {[type]} method [description]
	 * @param {[type]} event  [description]
	 */
	$scope.setMethParameters = function(method, event) {
		method.parameters = getValueFor($(event.currentTarget));
	};

	/**
	 * [deleteAttribute description]
	 * @param  {[type]} model [description]
	 * @param  {[type]} index [description]
	 * @param  {[type]} event [description]
	 */
	$scope.deleteAttribute = function(model, index, event) {
		var $btn = $(event.currentTarget);
		$btn.find('i').removeClass('glyphicon glyphicon-remove').addClass('fa fa-spinner fa-spin');
		$btn.parents('.attr').removeClass('fadeInUp');
		model.attributes.splice(index, 1);
	};

	/**
	 * [deleteMethod description]
	 * @param  {[type]} model [description]
	 * @param  {[type]} index [description]
	 * @param  {[type]} event [description]
	 */
	$scope.deleteMethod = function(model, index, event) {
		var $btn = $(event.currentTarget);
		$btn.find('i').removeClass('glyphicon glyphicon-remove').addClass('fa fa-spinner fa-spin');
		$btn.parents('.meth').removeClass('fadeInUp');
		model.methods.splice(index, 1);
	};

	/**
	 * [deleteModel description]
	 * @param  {[type]} model [description]
	 * @param  {[type]} index [description]
	 * @param  {[type]} event [description]
	 */
	$scope.deleteModel = function(index, event) {
		var $btn = $(event.currentTarget);
		$btn.find('i').removeClass('glyphicon glyphicon-remove').addClass('fa fa-spinner fa-spin');
		$scope.models.splice(index, 1);
	};

	/**
	 * [switchView description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	$scope.switchView = function(event, mode) {
		var
			$btn      = $(event.currentTarget),
			$icon     = $btn.children('i'),
			$model    = $btn.parents('.modelElement'),
			$viewList = $model.children('ul').find('li.viewList'),
			$formList = $model.children('ul').find('li.formList');

		
		if($icon.hasClass('fa fa-eye')) {
			$icon.attr('class','fa fa-th-list');
		} else {
			$icon.attr('class','fa fa-eye');
		}

		if($viewList.hasClass('hidden')) {
			$viewList.removeClass('hidden').addClass('fadeInDown').removeClass('fadeOutDown');
			$formList.removeClass('fadeInUp').addClass('fadeOutUp').delay(10000).addClass('hidden');
		} else {
			$viewList.removeClass('fadeInDown').addClass('fadeOutDown').delay(10000).addClass('hidden');
			$formList.removeClass('hidden').addClass('fadeInUp').removeClass('fadeOutUp');
		}

		scrollToModel($model);
	};

	/**
	 * [switchModeView description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	$scope.switchModeView = function(event) {
		var $btn = $(event.currentTarget);

		// TODO: implement function with switchView() and mode param
		console.log($btn);
	};

	/**
	 * [drawModel description]
	 * @return {[type]} [description]
	 */
	$scope.drawModel = function() {
		var firstModel = new Model('Firstmodel');
		firstModel.attributes.push(new Attr());
		firstModel.methods.push(new Method());
		$scope.models.push(firstModel);
	};
	
});

/**
 * [Class Attr description]
 * @param {[type]} vis  [description]
 * @param {[type]} name [description]
 * @param {[type]} mult [description]
 * @param {[type]} type [description]
 */
function Attr(vis, name, mult ,type) {
	this.visibility   = (typeof vis == "undefined" ? "-" : vis);
	this.name         = (typeof name == "undefined" ? "name" : name);
	this.multiplicity = (typeof mult == "undefined" ? "multiplicity" : mult);
	this.type         = (typeof type == "undefined" ? "type" : type);
}

/**
 * [Class Method description]
 * @param {[type]} vis    [description]
 * @param {[type]} name   [description]
 * @param {[type]} params [description]
 * @param {[type]} ret    [description]
 */
function Method(vis, name, params, ret) {
	this.visibility = (typeof vis == "undefined" ? "+" : vis);
	this.name       = (typeof name == "undefined" ? "name" : name);
	this.params     = (typeof params == "parameters" ? "parameters" : params);
	this.return     = (typeof ret == "return" ? "return" : ret);
}

/**
 * [Class Model description]
 * @param {[type]} className [description]
 */
function Model(className) {
	this.className = (typeof className == "undefined" ? "className" : className);
	this.attributes = [];
	this.methods = [];
}

/**
 * [function scrollToModel description]
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function scrollToModel($el) {
	$('html, body').animate({
        scrollTop: $el.parents('.model').offset().top - 50
    }, 300);
}

/**
 * [function getValueFor description]
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function getValueFor($el) {
	if(getTagName($el) === 'span')
		return $el.text();
	else
		return $el.val();
}

/**
 * [function getTagName description]
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function getTagName($el) {
	return $el.context.localName;
}