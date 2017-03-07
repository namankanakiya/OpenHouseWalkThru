import firebase, {firebaseRef} from 'app/firebase';

export var startLoadHouse = (userID) => {
    return (dispatch, getState) => {
        // Figure out which houses belong to current user
        var userHousesRef = firebaseRef.child("userHouses/" + userID);
        userHousesRef.once("value", (snapshot) => {
            snapshot.forEach((houseKey) => {
                // For each of these houses, get the house
                var houseRef = firebaseRef.child("houses/" + houseKey.key);
                houseRef.once("value", (snapshot) => {
                    var house = snapshot.val();
                    var checklist = []
                    // For each house, get the checklist items which belong to it
                    var checklistHouseRef = firebaseRef.child("checklistItemHouseRef/" + houseKey.key);
                    checklistHouseRef.once("value", (snapshot) => {
                        snapshot.forEach((checklistKey) => {
                            var checklistRef = firebaseRef.child("checklistItems/" + checklistKey.key);
                            checklistRef.once("value", (snapshot) => {
                                // For each checklist item, add to checklist array for house
                                checklist.push(snapshot.val());
                            })
                        })
                    })
                    // Add the checklist items, and house id to house object, and add to state
                    house = {...house, id: houseKey.key, checklist: checklist};
                    dispatch(addHouse(house));
                })
            })
        })
    }
}

export var addChecklistItem = (id, item) => {
	return {
		type : 'ADD_CHECKLIST_ITEM',
        id,
		item
	}
};

export var startAddChecklist = (id, feature, priority=null) => {
    return (dispatch, getState) => {
        //
        var item = {
            feature : feature,
            rating : -1,
            comments : '',
            picture : '',
            priority : priority
        };
        var checklistRef = firebaseRef.child("checklistItems").push(item);
        return checklistRef.then(() => {
            //Assign checklist to house
            var mapObject = {};
            mapObject[checklistRef.key] = true;
            var checklistItemHouseRef = firebaseRef.child("checklistItemHouseRef/" + id).update(mapObject);
            //update Redux
            dispatch(addChecklistItem(id, {
                ...item,
                id : checklistRef.key
            }));            
        })
    };
};

export var deleteFeature = (id, featureId) => {
	return {
		type : 'DELETE_CHECKLIST_ITEM',
		id,
		featureId
	}
};

export var startAddHouse = (house, userID) => {
    return (dispatch, getState) => {
        //add house to houses Firebase object
        var houseRef = firebaseRef.child("houses").push(house);
        //after async call
        return houseRef.then(() => {
            //update store with house
            dispatch(addHouse({...house, id:houseRef.key, checklist:[]}));
            //Assign house to uuid
            var mapObject = {}
            mapObject[houseRef.key] = true;
            var userHouseRef = firebaseRef.child("userHouses/" + userID).update(mapObject);
            //Add default checklist features to house
            dispatch(startAddChecklist(houseRef.key, 'Big Garage'));
            dispatch(startAddChecklist(houseRef.key, 'Wooden Floors'));
            dispatch(startAddChecklist(houseRef.key, 'Spacy Basement'));
            dispatch(startAddChecklist(houseRef.key, 'Modern'));
        })
    }
}

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
