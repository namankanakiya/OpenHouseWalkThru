import {combineReducers} from "redux";
import housesReducer, {curHouseReducer} from "./reducers";
import { reducer as formReducer } from 'redux-form';

export default rootReducer = combineReducers({
    form : formReducer,
    houses : housesReducer,
    house : curHouseReducer
});

