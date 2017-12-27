import {
    BTC_AUTH_SUCCESS,
    BTC_AUTH_FAIL,
    BTC_CHECK_AUTH_KEYS,
    BTC_AUTH_IN_PROGRESS,
    BTC_ACCOUNT_BALANCE
} from "../actions/types";

const INITIAL_STATE = {
    session: false,
    authInProgress: false,
    keysChecked: false,
    publicKey: false,
    privateKey: false,
    accounts: []
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BTC_AUTH_SUCCESS:
            return { ...state, session: true, authInProgress: false };
        case BTC_AUTH_FAIL:
            return { ...state, session: false, authInProgress: false };
        case BTC_CHECK_AUTH_KEYS: {
            if (action.payload) {
                return {
                    ...state,
                    keysChecked: true,
                    publicKey: action.payload.publicKey,
                    privateKey: action.payload.privateKey
                };
            }
            return {
                ...state,
                keysChecked: true
            };
        }
        case BTC_AUTH_IN_PROGRESS:
            return { ...state, authInProgress: action.payload };
        case BTC_ACCOUNT_BALANCE:
            return { ...state, accounts: action.payload.accounts };
        default:
            return state;
    }
};
