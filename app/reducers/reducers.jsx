var uuid = require('node-uuid');

export var setChecklistReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CHECKLIST_ITEM':
			return [
				...state,
				{
					id : uuid(),
					feature : action.feature
				}
			]
		case 'DELETE_CHECKLIST_ITEM':
			return state.filter(feature => feature.id != action.id);
		default:
			return state;
	};
}