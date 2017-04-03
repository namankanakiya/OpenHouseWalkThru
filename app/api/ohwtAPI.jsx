var $ = require('jquery');

module.exports = {
    // Given a house id, return te house from the list of houses
	findHouseById : function(houses, id) {
		if ($.isArray(houses)) {
            // simple walk through array
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
            // get rid of houses with default score (-1)
            houses = houses.filter((house) => {
                return house.score !== -1;
            });
            // Sort houses
            houses.sort((a,b) => {
                if (a.score > b.score) {
                    return -1;
                } else if (b.score > a.score) {
                    return 1;
                } else {
                    return 0;
                }
            });
            // return sorted houses
            return houses;
        } else {
            return [];
        }
    },

    calculateHouseScore : function(house) {
        let checklistItems = house.checklist;
        let runningScore = 0;
        let numAmount = 0;
        // for each checklistItem
        checklistItems.map((item) => {
            //calculate score
            let priority = item.priority || 0;
            let rating = item.rating || 0;
            // if the feature has actually been rated, consider it in weighted score
            if (!(rating === 0) && !(rating === -1) && !(priority === 0) && !(priority === -1)) {
                let priorityMultiplier = (priority * 0.5) + 0.5; // change 1,2,3 -> 1,1.5,2
                let ratingMultiplier = rating * 20; //5 star system -> 100
                runningScore = runningScore + (priorityMultiplier * ratingMultiplier);
                numAmount = numAmount + priorityMultiplier;
            }
        });
        // if one or more features have been rated for the house
        if (numAmount !== 0) {
            let toReturn = runningScore / numAmount;
            return Math.ceil(toReturn);
        } else {
            return -1;
        }
    },
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

}