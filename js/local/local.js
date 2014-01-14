function local() {
	
	this.exist = function(key) {
		var exist = (typeof localStorage[key] === 'undefined' ? false : true);
		return exist;
	};

	this.get = function(key) {
		return localStorage[key];
	};

	this.set = function(key, value) {
		localStorage[key] = value;
	};

	this.add = function(key, value) {
		this.set(key, value);
	};

	this.delete = function(key) {
		localStorage.removeItem(key);
	};

	this.print = function() {
		console.log(localStorage);
	};

	this.deleteAll = function() {
		for(var key in localStorage) {
			this.delete(key);
		}
	};

}