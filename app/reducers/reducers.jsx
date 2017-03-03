var uuid = require('human-readable-ids').hri;
var ohwtAPI = require('ohwtAPI');

export var curHouseReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CUR_HOUSE':
			return action.house;
		default:
			return state;
	}
}

export var housesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_HOUSE':
			return [
				...state,
				action.house,
			];
		case 'DELETE_HOUSE':
			return state.filter(house => house.id != action.id);
		case 'ADD_CHECKLIST_ITEM':
            console.log("stateReducer", state);
			return state.map((house) => {
                console.log("reached inside map")
				if (house.id === action.id) {
					house.checklist = [...house.checklist, action.item]
				}
				return house;
			});

		case 'DELETE_CHECKLIST_ITEM':
			return state.map((house) => {
				if (house.id === action.id) {
					house.checklist = house.checklist.filter(feature => feature.id != action.featureId);
				}
				return house;
			});

		case 'UPDATE_RATING':
			return state.map((house) => {
				if (house.id === action.houseId) {
					house.checklist = house.checklist.map(feature => {
						if (feature.id === action.checklistId) {
							feature.rating = Number(action.rating);
						}
						return feature;
					});
				}
				return house;
			});

		case 'UPDATE_COMMENTS':
			return state.map((house) => {
				if (house.id === action.houseId) {
					house.checklist = house.checklist.map(feature => {
						if (feature.id === action.checklistId) {
							feature.comments = action.comments;
						}
						return feature;
					});
				}
				return house;
			});

		default:
			return state;
	};
};