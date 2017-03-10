export var curHouseReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CUR_HOUSE':
			return action.house;
		default:
			return state;
	}
}

export var photoUploadReducer = (state = null, action) => {
	switch (action.type) {
		case 'CURRENT_IMAGE_URL':
			return action.pictureUrlId;

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
			return state.map((house) => {
				if (house.id === action.id) {
					house.checklist = [...house.checklist, action.item]
				}
				return house;
			});

		// NEW STUFF
		case 'ADD_HOUSE_PHOTO':
			return state.map((house) => {
				if (house.id === action.id) {
					house.imageURL = [...house.imageURL, action.imageURL]
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

		// NEW STUFF
		case 'ADD_FEATURE_PHOTO':
			return state.map((house) => {
				if (house.id === action.houseId) {
					house.checklist = house.checklist.map(feature => {
						if (feature.id === action.checklistId) {
							feature.pictureUrl = action.pictureUrl;
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