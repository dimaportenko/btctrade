import { AsyncStorage } from 'react-native';
import { btcTradeApi } from '../api';

import {
    SELL_BUY_FETCH,
    SELL_BUY_FETCHING,
    BTC_AUTH_SUCCESS,
    BTC_AUTH_FAIL,
    BTC_CHECK_AUTH_KEYS,
    BTC_AUTH_IN_PROGRESS,
    BTC_ACCOUNT_BALANCE
} from "./types";

export const sellBuyFetch = (code) => {
    return dispatch => {
        dispatch({ type: SELL_BUY_FETCHING, payload: { fetching: true, code }});
        fetch(`https://btc-trade.com.ua/api/trades/buy/${code}`)
            .then(response => response.json())
            .then(buyResult => {
                fetch(`https://btc-trade.com.ua/api/trades/sell/${code}`)
                    .then(response1 => response1.json())
                    .then(sellResult => {
                        dispatch({
                            type: SELL_BUY_FETCH,
                            payload: {
                                code,
                                buyResult,
                                sellResult,
                                error: false
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        dispatch({
                            type: SELL_BUY_FETCH,
                            payload: {
                                code,
                                error: true
                            }
                        });
                    });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: SELL_BUY_FETCH,
                    payload: {
                        code,
                        error: true
                    }
                });
            });
    };
};

export const auth = (publicKey, privateKey) => {
    return dispatch => {
        dispatch({ type: BTC_AUTH_IN_PROGRESS, payload: true });
        btcTradeApi.auth(publicKey, privateKey)
            .then(data => {
                console.log('onSubmitResponse');
                console.log(data);
                if (data.status && data.public_key === publicKey) {
                    saveKeys(publicKey, privateKey, dispatch);
                } else {
                    dispatch({ type: BTC_AUTH_FAIL })
                }
            })
            .catch(error => console.log(error));
    };
};

const saveKeys = (publicKey, privateKey, dispatch) => {
    AsyncStorage.setItem('public_key', publicKey)
        .then(() => AsyncStorage.setItem('privet_key', privateKey)
            .then(() => {
                dispatch({ type: BTC_AUTH_SUCCESS, payload: {privateKey, publicKey}})
                getBalanceAfterAuth(dispatch);
            })
        );
};

const getBalanceAfterAuth = (dispatch) => {
    btcTradeApi.getBalance()
        .then(data => {
            console.log('getBalance');
            console.log(data);
            if (!data.accounts || !data.accounts.length) {
                setTimeout(() => {
                    getBalanceAfterAuth(dispatch);
                }, 1000);
            } else {
                dispatch({ type: BTC_ACCOUNT_BALANCE, payload: data });
            }
        })
        .catch(error => console.log(error));
};

export const checkSavedKeys = () => {
    return async dispatch => {
        try {
            const publicKey = await AsyncStorage.getItem('public_key');
            const privateKey = await AsyncStorage.getItem('privet_key');
            if(publicKey && privateKey) {
                dispatch({
                    type: BTC_CHECK_AUTH_KEYS,
                    payload: { privateKey, publicKey }
                });
                return;
            }

            dispatch({
                type: BTC_CHECK_AUTH_KEYS
            });
        } catch (error) {

        }
    }
};
