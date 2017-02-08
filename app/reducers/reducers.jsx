export var setChecklistReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_CHECKLIST_ITEMS':
			return action.checklistItems;
		default:
			return state;
	};
}