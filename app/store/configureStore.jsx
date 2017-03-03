import * as redux from 'redux';
import thunk from 'redux-thunk';
const { resolve } = require('path');
import {checklistReducer, housesReducer, curHouseReducer} from 'reducers';
import { reducer as formReducer } from 'redux-form';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		form : formReducer,
		houses : housesReducer,
		house : curHouseReducer
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

    if (module.hot) {
        console.log("hotreload?2");
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/reducers', () => {
            console.log("hotreload?");
            var {checklistReducer, housesReducer, curHouseReducer} = require('reducers');
            var nextRootReducer = redux.combineReducers({
                form : formReducer,
                houses : housesReducer,
                house : curHouseReducer
            });
            store.replaceReducer(nextRootReducer);
        });
      }

	return store;
}