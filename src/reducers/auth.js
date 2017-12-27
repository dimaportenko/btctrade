import {
    BTC_AUTH_SUCCESS,
    BTC_AUTH_FAIL
} from "../actions/types";

const INITIAL_STATE = {
    session: false,

};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BTC_AUTH_SUCCESS: {
            return { ...state, session: true };
        }
        case BTC_AUTH_FAIL: {
            return { ...state, session: false };
        }
        default:
            return state;
    }
};
