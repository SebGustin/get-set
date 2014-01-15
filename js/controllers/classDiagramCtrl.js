/**
 * [controller ClassDiagramCtrl]
 * @param  {[angular]} $scope [description]
 */
getset.controller("ClassDiagramCtrl", function($scope) {
	
	function Attr() {
		this.visibility = "";
		this.name = "";
		this.multiplicity = 0;
		this.type = "";
	}

	function Method() {
		this.visibility = "";
		this.name = "";
		this.parameters = "";
		this.return = "";
	}

	function Model() {
		this.className = "NewClass";
		this.attributes = [];
		this.methods = [];
	}

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
			$parent = $btn.parents('.modelElement'),
			$viewList = $parent.children('ul').find('li.viewList'),
			$formList = $parent.children('ul').find('li.formList');

		if($viewList.hasClass('hidden')) {
			$viewList.removeClass('hidden').addClass('fadeInDown').removeClass('fadeOutDown');
			$formList.removeClass('fadeInUp').addClass('fadeOutUp').delay(300).addClass('hidden');
		} else {
			$viewList.removeClass('fadeInDown').addClass('fadeOutDown').delay(300).addClass('hidden');
			$formList.removeClass('hidden').addClass('fadeInUp').removeClass('fadeOutUp');
		}
	};

	$scope.setReturn = function(method, event) {
		var $target = $(event.currentTarget);
		var ret = '';

		if($target.context.localName === 'span')
			ret = $target.text();
		else
			ret = $target.val();

		method.return = ret;
	};

    
});