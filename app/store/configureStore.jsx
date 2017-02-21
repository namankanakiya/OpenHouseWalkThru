var redux = require('redux');
const { resolve } = require('path');
var {checklistReducer, housesReducer, curHouseReducer} = require('reducers');
import { reducer as formReducer } from 'redux-form';

export var configure = () => {
	var reducer = redux.combineReducers({
		form : formReducer,
		houses : housesReducer,
		house : curHouseReducer
	});

	var store = redux.createStore(reducer, redux.compose(
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