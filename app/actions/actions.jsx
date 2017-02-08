
export var addChecklistItem = (feature) => {
	return {
		type : 'ADD_CHECKLIST_ITEM',
		feature	
	}
};

export var deleteFeature = (id) => {
	return {
		type : 'DELETE_CHECKLIST_ITEM',
		id
	}
}
