import { combineReducers } from 'redux';
import currencies from './currencies';
import auth from './auth';

export default combineReducers({
    currencies,
    auth
});
