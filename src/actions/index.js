import { AsyncStorage } from 'react-native';
import { btcTradeApi } from '../api';

import {
    SELL_BUY_FETCH,
    SELL_BUY_FETCHING,
    BTC_AUTH_SUCCESS,
    BTC_AUTH_FAIL
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
        btcTradeApi.auth(this.state.publicKey, this.state.privateKey)
            .then(data => {
                console.log('onSubmitResponse');
                console.log(data);
                if (data.status && data.public_key === publicKey) {
                    AsyncStorage.setItem('public_key', publicKey)
                        .then(() => AsyncStorage.setItem('privet_key', privateKey)
                            .then(() => {
                                dispatch({ type: BTC_AUTH_SUCCESS, payload: {privateKey, publicKey}})
                            }) );
                } else {
                    dispatch({ type: BTC_AUTH_FAIL })
                }
            })
            .catch(error => console.log(error));
    };
};
