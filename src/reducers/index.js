import { combineReducers } from 'redux';
import { reducer as loading } from './loadingReducer';
import { reducer as weather } from './weatherReducer';

const rootReducer = combineReducers({
    loading,
    weather
});

export default rootReducer;
