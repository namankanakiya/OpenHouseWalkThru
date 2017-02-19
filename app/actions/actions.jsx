
export var addChecklistItem = (id, feature) => {
	return {
		type : 'ADD_CHECKLIST_ITEM',
		feature,
		id
	}
};

export var addChecklistItemPriority = (id, feature, priority) => {
    return {
        type : 'ADD_CHECKLIST_ITEM_PRIORITY',
        feature,
        id,
        priority
    }
};

export var deleteFeature = (id, featureId) => {
	return {
		type : 'DELETE_CHECKLIST_ITEM',
		id,
		featureId
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

export var addCurHouse = (house) => {
	return {
		type : 'ADD_CUR_HOUSE',
		house
	}
};

export var updateRating = (houseId, checklistId, rating) => {
	return {
		type : 'UPDATE_RATING',
		houseId,
		checklistId,
		rating
	}
};

export var updateComments = (houseId, checklistId, comments) => {
	return {
		type : 'UPDATE_COMMENTS',
		houseId,
		checklistId,
		comments
	}
};
