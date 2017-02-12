var $ = require('jquery');

module.exports = {
	setChecklists : function(checklists) {
		if ($.isArray(checklists)) {
			localStorage.setItem('checklists', JSON.stringify(checklists));
			return checklists;
		}
	},
	getChecklists : function() {
		var stringChecklists = localStorage.getItem('checklists');
		var checklists = [];
		try {
			checklists = JSON.parse(stringChecklists);
		} catch (e) {
			console.log("error retrieving checklists", e);
		}
		return $.isArray(checklists) ? checklists : [];
	},
	findHouseById : function(houses, id) {
		if ($.isArray(houses)) {
			for (var i = 0; i < houses.length; i++) {
				if (houses[i].id === id) {
					return houses[i]
				}
			}
			return null;
		} else {
			return null;
		}
	}
}