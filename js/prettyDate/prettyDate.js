function prettyDate() {
	
	var library = {
		days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		shortDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
		months: ["Janvier", "Février", "Mars", "Avril"]
	};

	this.exist = function(key) {
		var exist = (typeof localStorage[key] === 'undefined' ? false : true);
		return exist;
	};

	

}