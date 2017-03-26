var $ = require('jquery');

module.exports = {
	/*setChecklists : function(checklists) {
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
	},*/
    // Given a house id, return te house from the list of houses
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
	},

    sortHouses : function(houses) {
        if ($.isArray(houses)) {
            houses = houses.filter((house) => {
                return house.score !== -1;
            });
            houses.sort((a,b) => {
                if (a.score > b.score) {
                    return -1;
                } else if (b.score > a.score) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return houses;
        } else {
            return [];
        }
    }
	/*addChecklistItem : function(checklistArray, checklistString) {
		if ($.isArray(checklistArray)) {
			var checklistObject = {
				id : uuid.random(),
				feature : checklistString,
				rating : -1,
				comments : '',
				picture : '',
				priority : -1
			}
			checklistArray.push(checklistObject);
			return checklistArray;
		} else {
			return [];
		}
	}*/
}