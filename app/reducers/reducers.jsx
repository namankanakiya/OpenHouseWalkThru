var uuid = require('node-uuid');

export var checklistReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CHECKLIST_ITEM':
			return [
				...state,
				{
					id : uuid(),
					feature : action.feature
				}
			];
		case 'DELETE_CHECKLIST_ITEM':
			return state.filter(feature => feature.id != action.id);
		default:
			return state;
	};
};

export var housesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_HOUSE':
			return [
				...state,
				action.house
			];
		case 'DELETE_HOUSE':
			return state.filter(house => house.id != action.id);
		default:
			return state;
	};
};