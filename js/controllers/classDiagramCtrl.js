/**
 * [controller ClassDiagramCtrl]
 * @param  {[angular]} $scope [description]
 */
getset.controller("ClassDiagramCtrl", function($scope) {
	
	$scope.models = [
		{
			"className" : "Person",
			"attributes": [
				{
					"visibility": "-", // private | protected | public | - | # | +
					"name" : "firstname",
					"multiplicity": 1,
					"type": "string"
				},
				{
					"visibility": "-", // private | protected | public | - | # | +
					"name" : "lastname",
					"multiplicity": 1,
					"type": "string"
				}
			],
			"methods": [
				{
					"visibility": "+",
					"name" : "getName",
					"parameters": "",
					"return": "string"
				},
				{
					"visibility": "+",
					"name" : "getNameById",
					"parameters": "id",
					"return": "string"
				}
			]
		},
		{
			"className" : "Employe",
			"attributes": [
				{
					"visibility": "-", // private | protected | public | - | # | +
					"name" : "firstname",
					"multiplicity": 1,
					"type": "string",
					"profession": "Developer"
				},
				{
					"visibility": "-", // private | protected | public | - | # | +
					"name" : "lastname",
					"multiplicity": 1,
					"type": "string"
				}
			],
			"methods": [
				{
					"visibility": "+",
					"name" : "getName",
					"parameters": "",
					"return": "string"
				},
				{
					"visibility": "+",
					"name" : "getProfession",
					"parameters": "",
					"return": "string"
				}
			]
		}
	];

	$scope.drawModel = function() {

	};

	$scope.addModel = function() {
		var newModel = new Model();
		newModel.attributes.push(new Attr());
		newModel.methods.push(new Method());
		$scope.models.push(newModel);
	};

	$scope.switchView = function(event) {
		var $btn = $(event.currentTarget),
			$modEl = $btn.parents('.modelElement'),
			$viewList = $modEl.children('ul').find('li.viewList'),
			$formList = $modEl.children('ul').find('li.formList');

		if($viewList.hasClass('hidden')) {
			$viewList.removeClass('hidden').addClass('fadeInDown').removeClass('fadeOutDown');
			$formList.removeClass('fadeInUp').addClass('fadeOutUp').delay(10000).addClass('hidden');
		} else {
			$viewList.removeClass('fadeInDown').addClass('fadeOutDown').delay(10000).addClass('hidden');
			$formList.removeClass('hidden').addClass('fadeInUp').removeClass('fadeOutUp');
		}

		scrollToModel($modEl);
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

	function getValueFor($el) {
		if(getTagName($el) === 'span')
			return $el.text();
		else
			return $el.val();
	}

	function getTagName($el) {
		return $el.context.localName;
	}
});

function Attr(vis, name, mult ,type) {
	this.visibility   = (typeof vis == "undefined" ? "-" : vis);
	this.name         = (typeof name == "undefined" ? "name" : name);
	this.multiplicity = (typeof mult == "undefined" ? "multiplicity" : mult);
	this.type         = (typeof type == "undefined" ? "type" : type);
}

function Method(vis, name, params, ret) {
	this.visibility = (typeof vis == "undefined" ? "+" : vis);
	this.name = (typeof name == "undefined" ? "name" : name);
	this.params = (typeof params == "parameters" ? "" : params);
	this.return = (typeof ret == "return" ? "" : ret);
}

function Model() {
	this.className = "NewClass";
	this.attributes = [];
	this.methods = [];
}

function scrollToModel($el) {
	console.log($el.parents('.model'));
	$('html, body').animate({
        scrollTop: $el.parents('.model').offset().top - 50
    }, 300);
}