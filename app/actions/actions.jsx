
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
};

export var addHouse = (house) => {
	return {
		type : 'ADD_HOUSE',
		house
	}
};

export var deleteHouse = (id) => {
	return {
		type : 'DELETE_HOUSE',
		id
	}
};
