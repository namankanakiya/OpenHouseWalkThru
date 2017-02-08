var redux = require('redux');
var {setChecklistReducer} = require('reducers');

export var configure = () => {
	var reducer = redux.combineReducers({
		checklist : setChecklistReducer
	});

	var store = redux.createStore(reducer, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
}