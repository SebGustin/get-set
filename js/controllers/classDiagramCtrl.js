/**
 * [controller ClassDiagramCtrl]
 * @param  {[angular]} $scope [description]
 */
getset.controller("ClassDiagramCtrl", function($scope) {
	
	$scope.models = [];

	$scope.addAttribute = function(model) {
		model.attributes.push(new Attr());
	};

	$scope.addMethod = function(model) {
		model.methods.push(new Method());
	};

	$scope.addModel = function() {
		var newModel = new Model();
		newModel.attributes.push(new Attr());
		newModel.methods.push(new Method());
		$scope.models.push(newModel);
	};

	$scope.setAttrName = function(attr, event) {
		attr.name = getValueFor($(event.currentTarget));
	};

	$scope.setAttrMultiplicity = function(attr, event) {
		attr.multiplicity = getValueFor($(event.currentTarget));
	};

	$scope.setAttrType = function(attr, event) {
		attr.type = getValueFor($(event.currentTarget));
	};

	$scope.setMethReturn = function(method, event) {
		method.return = getValueFor($(event.currentTarget));
	};

	$scope.setMethName = function(method, event) {
		method.name = getValueFor($(event.currentTarget));
	};

	$scope.setMethParameters = function(method, event) {
		method.parameters = getValueFor($(event.currentTarget));
	};

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

	
	$scope.drawModel = function() {
		var firstModel = new Model('Firstmodel');
		firstModel.attributes.push(new Attr());
		firstModel.methods.push(new Method());
		$scope.models.push(firstModel);
	};
	
});

function Attr(vis, name, mult ,type) {
	this.visibility   = (typeof vis == "undefined" ? "-" : vis);
	this.name         = (typeof name == "undefined" ? "name" : name);
	this.multiplicity = (typeof mult == "undefined" ? "multiplicity" : mult);
	this.type         = (typeof type == "undefined" ? "type" : type);
}

function Method(vis, name, params, ret) {
	this.visibility = (typeof vis == "undefined" ? "+" : vis);
	this.name       = (typeof name == "undefined" ? "name" : name);
	this.params     = (typeof params == "parameters" ? "parameters" : params);
	this.return     = (typeof ret == "return" ? "return" : ret);
}

function Model(className) {
	this.className = (typeof className == "undefined" ? "className" : className);
	this.attributes = [];
	this.methods = [];
}

function scrollToModel($el) {
	$('html, body').animate({
        scrollTop: $el.parents('.model').offset().top - 50
    }, 300);
}

function getValueFor($el) {
	if(getTagName($el) === 'span')
		return $el.text();
	else
		return $el.val();
}

function getTagName($el) {
	return $el.context.localName;
}