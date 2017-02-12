var uuid = require('node-uuid');
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
				action.house
			];
		case 'DELETE_HOUSE':
			return state.filter(house => house.id != action.id);
		case 'ADD_CHECKLIST_ITEM':
			return state.map((house) => {
				if (house.id === action.id) {
					house.checklist = [...house.checklist, {
						id : uuid(),
						feature : action.feature
					}]
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
		default:
			return state;
	};
};