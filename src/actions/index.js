import {
    SELL_BUY_FETCH,
    SELL_BUY_FETCHING
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
