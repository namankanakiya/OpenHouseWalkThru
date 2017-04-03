import firebase, {firebaseRef} from 'app/firebase';
var ohwtAPI = require('ohwtAPI');

// Components call these actions, which then do certain actions like access Firebase
// and then dispatch to the reducers file to update the internal state


export var startRegisterUser = (userId, name) => {
    // After successful firebase OAuth, we store the user info in the DB
    return (dispatch, getState) => {
        var item = {name : name};
        var userRef = firebaseRef.child("userInfo/" + userId).set(item);
    }
}

export var loginUser = (userId) => {
    // state login
    return {
        type : 'LOGIN_USER',
        userId
    }
}

export var logoutUser = () => {
    // state logout
    return {
        type: 'LOGOUT_USER'
    }
}

export var logoutHouses = () => {
    // state clear houses on logout
    return {
        type: 'LOGOUT_HOUSES'
    }
}

export var startLoadHouse = (userId) => {
    return (dispatch, getState) => {
        // Figure out which houses belong to current user
        var userHousesRef = firebaseRef.child("userHouses/" + userId);
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
                                checklist.push({...snapshot.val(), id: checklistRef.key});
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
};

export var addChecklistItem = (id, item) => {
    // add item to state
	return {
		type : 'ADD_CHECKLIST_ITEM',
        id,
		item
	}
};

export var startAddChecklist = (houseId, feature, priority=1) => {
    return (dispatch, getState) => {
        // Initial checklist initialization to Firebase
        var item = {
            feature : feature,
            rating : -1,
            comments : '',
            picture : '',
            numPics : 0,
            priority : priority
        };
        var checklistRef = firebaseRef.child("checklistItems").push(item);
        return checklistRef.then(() => {
            //Assign checklist to house
            var mapObject = {};
            mapObject[checklistRef.key] = true;
            var checklistItemHouseRef = firebaseRef.child("checklistItemHouseRef/" + houseId).update(mapObject);
            //update Redux
            dispatch(addChecklistItem(houseId, {...item, id:checklistRef.key}));            
        })
    };
};

export var deleteFeature = (id, featureId) => {
    // delete feature from checklist from state
	return {
		type : 'DELETE_CHECKLIST_ITEM',
		id,
		featureId
	}
};

export var startDeleteFeature = (houseId, featureId) => {
    return (dispatch, getState) => {
        // Get the database URL for the checklist item, and remove it
        var featureRef = firebaseRef.child("checklistItems/" + featureId).remove();
        return featureRef.then(() => {
            // Now need to update the house->checklist mapping
            var mapObject = {};
            mapObject[featureId] = null;
            var checklistItemHouseRef = firebaseRef.child("checklistItemHouseRef/" + houseId).update(mapObject);
            // After Firebase is updated, update internal redux store
            checklistItemHouseRef.then(() => {
                dispatch(deleteFeature(houseId, featureId));
            });
        });
    }
};

export var startAddHouse = (house, userId) => {
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
            var userHouseRef = firebaseRef.child("userHouses/" + userId).update(mapObject);
            //Add default checklist features to house
            dispatch(startAddChecklist(houseRef.key, 'Big Garage'));
            dispatch(startAddChecklist(houseRef.key, 'Wooden Floors'));
            dispatch(startAddChecklist(houseRef.key, 'Spacy Basement'));
            dispatch(startAddChecklist(houseRef.key, 'Modern'));
        })
    }
};

export var addHouse = (house) => {
    // add a house item to state
	return {
		type : 'ADD_HOUSE',
		house
	}
};

export var startDeleteHouse = (userId, houseId) => {
    return (dispatch, getState) => {
        // Remove the house data from firebase
        var houseRef = firebaseRef.child("houses/" + houseId).remove();
        return houseRef.then(() => {
            // Get the checklist items associated with the house
            var checklistHouseRef = firebaseRef.child("checklistItemHouseRef/" + houseId);
            checklistHouseRef.once("value", (snapshot) => {
                snapshot.forEach((checklistKey) => {
                    // Delete each checklist feature associated with the house
                    dispatch(startDeleteFeature(houseId, checklistKey.key));
                })
            });
            // Update Firebase user-> house mapping
            var mapObject = {};
            mapObject[houseId] = null;
            var userHousesRef = firebaseRef.child("userHouses/" + userId).update(mapObject);
            userHousesRef.then(() => {
                // Now that Firebase is updated, update internal redux store
                dispatch(deleteHouse(houseId));
            });
        });
    };
}

export var deleteHouse = (id) => {
    // delete an id'd house from state
	return {
		type : 'DELETE_HOUSE',
		id
	}
};

export var addCurHouse = (house) => {
    // switch out the house that the user is viewing
	return {
		type : 'ADD_CUR_HOUSE',
		house
	}
};

export var startUpdateRating = (houseId, checklistId, rating) => {
    return (dispatch, getState) => {
        // Update rating on Firebase
        var mapObject = {};
        mapObject["rating"] = rating;
        var ratingRef = firebaseRef.child("checklistItems/" + checklistId).update(mapObject);
        return ratingRef.then(() => {
            // After, update internal store, and updating scoring
            dispatch(updateRating(houseId, checklistId, rating));
            dispatch(startUpdateScore(houseId));
        })
    }
};

export var startUpdateScore = (houseId) => {
    return (dispatch, getState) => {
        // find the house that we want to update
        var houses = getState().houses;
        var house = ohwtAPI.findHouseById(houses, houseId);
        // calculate the updated score
        var newScore = ohwtAPI.calculateHouseScore(house);
        var mapObject = {};
        mapObject["score"] = newScore;
        // modify database to reflect new score
        var scoreRef = firebaseRef.child("houses/" + houseId).update(mapObject);
        // update local state with new score
        return scoreRef.then(() => {
            dispatch(updateScore(houseId, newScore));
        });
    };
};

export var updateScore = (houseId, score) => {
    // update state with new score
    return {
        type : 'UPDATE_SCORE',
        houseId,
        score
    }
};

export var updateRating = (houseId, checklistId, rating) => {
    // update a checklist item with new rating
	return {
		type : 'UPDATE_RATING',
		houseId,
		checklistId,
		rating
	}
};

export var startUpdatePriority = (houseId, checklistId, priority) => {
    return (dispatch, getState) => {
        // Update priority on Firebase
        var mapObject = {};
        mapObject["priority"] = priority;
        var priorityRef = firebaseRef.child("checklistItems/" + checklistId).update(mapObject);
        return priorityRef.then(() => {
            // After, update internal store, and update the rating
            dispatch(updatePriority(houseId, checklistId, priority));
            dispatch(startUpdateScore(houseId));
        })
    }
};

export var updatePriority = (houseId, checklistId, priority) => {
    // update local state with new priority
    return {
        type : 'UPDATE_PRIORITY',
        houseId,
        checklistId,
        priority
    }
};

export var startUpdateComments = (houseId, checklistId, comments) => {
    return (dispatch, getState) => {
        // update comments on Firebase
        var mapObject = {}
        mapObject["comments"] = comments;
        var commentRef = firebaseRef.child("checklistItems/" + checklistId).update(mapObject);
        return commentRef.then(() => {
            // after, update the internal store
            dispatch(updateComments(houseId, checklistId, comments));
        })
    }
};

export var updateComments = (houseId, checklistId, comments) => {
    // update local state with new comments
	return {
		type : 'UPDATE_COMMENTS',
		houseId,
		checklistId,
		comments
	}
};

export var updatePhoto = (houseId, checklistId, pictureUrl, numPics) => {
    // photo update for each individual feature
    return {
        type: 'ADD_FEATURE_PHOTO',
        houseId,
        checklistId,
        pictureUrl,
        numPics
    }
};

export var startUpdatePhoto = (houseId, checklistId, pictureUrl, numPics) => {
    return (dispatch, getState) => {
        // Update picture URL on Firebase
        var checklistRef = firebaseRef.child("checklistItems/" + checklistId);
        var pictureRef = checklistRef.child("picture");
        pictureRef.once("value", (snapshot) => {
            // Get the original pictures, and append new picture
            var newUrl = pictureUrl + ";" + snapshot.val();
            var mapObject = {}
            mapObject["picture"] = newUrl;
            mapObject["numPics"] = numPics;
            // Update picture, then update local store
            checklistRef.update(mapObject).then(()=>{
                dispatch(updatePhoto(houseId, checklistId, newUrl, numPics));
            })
        });
    }
};

export var currentImageURL = (pictureUrlId) => {
    // get URL to state from the cloudinary upload response
    return {
        type: 'CURRENT_IMAGE_URL',
        pictureUrlId
    }
};
/*
export var showAddress = (addressId) => {
    return {
        type: 'SHOW_ADDRESS',
        addressId
    }
};
*/