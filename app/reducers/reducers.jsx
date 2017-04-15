// Each of these reducers is responsible for keeping the local
// state of that object in order.


// Takes care of the current house that the user is looking at
// (an object)
export var curHouseReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CUR_HOUSE':
			return action.house;
		default:
			return state;
	}
}

// Takes care of storing the uploaded image URL
export var photoUploadReducer = (state = null, action) => {
	switch (action.type) {
		case 'CURRENT_IMAGE_URL':
			return action.pictureUrlId;

		default:
			return state;
	}
}

// Takes care of tracking whether the user is logged in, and who it is
export var loggedInReducer = (state = {loggedIn : false, userId : null}, action) => {
    switch (action.type) {
        case 'LOGIN_USER' :
            return {loggedIn : true, userId : action.userId};
        case 'LOGOUT_USER' :
            return {loggedIn : false, userId : null};
        default:
            return state;
    }
}

// Takes care of tracking all of the POI's the user has currently
export var poiReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POI':
            return [...state, {name : action.name, address : action.address, id : action.id}];
        case 'DELETE_POI':
            return state.filter(poi => poi.id != action.id);
        case 'LOGOUT_POI':
            return [];
        default:
            return state;
    }
}

// Takes care of managing all of the houses (list) that the user owns
// the spread operater (...) takes everything before it. Easy way
// to append information. Names are self-explanatory.
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

        case 'UPDATE_SCORE':
            return state.map((house) => {
                if (house.id === action.houseId) {
                    house.score = action.score
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

        case 'UPDATE_PRIORITY':
            return state.map((house) => {
                if (house.id === action.houseId) {
                    house.checklist = house.checklist.map(feature => {
                        if (feature.id === action.checklistId) {
                            feature.priority = Number(action.priority);
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

		case 'ADD_FEATURE_PHOTO':
			return state.map((house) => {
				if (house.id === action.houseId) {
					house.checklist = house.checklist.map(feature => {
						if (feature.id === action.checklistId) {
							feature.picture = action.pictureUrl;
                            feature.numPics = action.numPics;
						}
						return feature;
					});
				}
				return house;
			});

        case 'LOGOUT_HOUSES':
            return [];
			
		default:
			return state;
	};
};