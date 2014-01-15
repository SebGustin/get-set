getset.controller("ClassDiagramCtrl", function($scope) {
	
	$scope.model = [
		{
			"classname" : "Person",
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
					"name" : "lastname",
					"parameters": [],
					"return": ""
				}
			]
		}
	];

	$scope.drawModel = function() {
		
	};
    
});