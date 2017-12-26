import {
    SELL_BUY_FETCH,
    SELL_BUY_FETCHING
} from "../actions/types";

const INITIAL_STATE = {
    'doge_uah': { code: 'doge_uah', title: 'Doge', fetching: true },
    'sib_uah': { code: 'sib_uah', title: 'SIB', fetching: true},
    'krb_uah': { code: 'krb_uah', title: 'Karbowanec', fetching: true }
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELL_BUY_FETCHING: {
            let item = state[action.payload.code];
            item = { ...item, ...action.payload };
            return { ...state, [action.payload.code]: item };
        }
        case SELL_BUY_FETCH: {
            let item = state[action.payload.code];
            item = { ...item, ...action.payload, fetching: false };
            return { ...state, [action.payload.code]: item };
        }
        default:
            return state;
    }
};
