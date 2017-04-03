// Import Redux
import * as redux from 'redux';
import thunk from 'redux-thunk';
const { resolve } = require('path');
// Import Reducers
import {checklistReducer, housesReducer, curHouseReducer, photoUploadReducer, loggedInReducer} from 'reducers';
import { reducer as formReducer } from 'redux-form';

export var configure = (initialState = {}) => {
    // assigns all of the functions from the /reducers/ file to handle the local state
	var reducer = redux.combineReducers({
		form : formReducer,
		houses : housesReducer,
		house : curHouseReducer,
        photo : photoUploadReducer,
        loggedIn : loggedInReducer
	});

    // Thunk is for asynchronous actions. window.devToolExtension() line is
    // for enabling easy to view chrome dev tools
	var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

    // Following code segment automatically reloads server on compilation
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/reducers', () => {
            var {checklistReducer, housesReducer, curHouseReducer} = require('reducers');
            var nextRootReducer = redux.combineReducers({
                form : formReducer,
                houses : housesReducer,
                house : curHouseReducer,
                // address : mapAddressReducer,
                photo : photoUploadReducer,
                loggedIn : loggedInReducer
            });
            store.replaceReducer(nextRootReducer);
        });
      }

	return store;
}