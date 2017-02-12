var redux = require('redux');
var {checklistReducer, housesReducer} = require('reducers');
import { reducer as formReducer } from 'redux-form'

export var configure = () => {
	var reducer = redux.combineReducers({
		form : formReducer,
		houses : housesReducer
	});

	var store = redux.createStore(reducer, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
}