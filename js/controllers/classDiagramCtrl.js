/**
 * [controller ClassDiagramCtrl]
 * @param  {[angular]} $scope [description]
 */
getset.controller("ClassDiagramCtrl", function($scope) {
	
	/**
	 * $scope vars
	 */
	$scope.models = [];

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
	 * [switchView description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	$scope.switchView = function(event) {
		var $btn = $(event.currentTarget),
			$modEl = $btn.parents('.modelElement'),
			$viewList = $modEl.children('ul').find('li.viewList'),
			$formList = $modEl.children('ul').find('li.formList');

		$btn.toggleClass('active');

		if($viewList.hasClass('hidden')) {
			$viewList.removeClass('hidden').addClass('fadeInDown').removeClass('fadeOutDown');
			$formList.removeClass('fadeInUp').addClass('fadeOutUp').delay(10000).addClass('hidden');
		} else {
			$viewList.removeClass('fadeInDown').addClass('fadeOutDown').delay(10000).addClass('hidden');
			$formList.removeClass('hidden').addClass('fadeInUp').removeClass('fadeOutUp');
		}

		scrollToModel($modEl);
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
 * [Attr description]
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
 * [Method description]
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
 * [Model description]
 * @param {[type]} className [description]
 */
function Model(className) {
	this.className = (typeof className == "undefined" ? "className" : className);
	this.attributes = [];
	this.methods = [];
}

/**
 * [scrollToModel description]
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function scrollToModel($el) {
	$('html, body').animate({
        scrollTop: $el.parents('.model').offset().top - 50
    }, 300);
}

/**
 * [getValueFor description]
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
 * [getTagName description]
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function getTagName($el) {
	return $el.context.localName;
}