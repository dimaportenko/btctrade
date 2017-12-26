// API google doc
// https://docs.google.com/document/d/1ocYA0yMy_RXd561sfG3qEPZ80kyll36HUxvCRe5GbhE/edit
//
// https://btc-trade.com.ua/api/trades/sell/doge_uah
// https://btc-trade.com.ua/api/trades/buy/doge_uah

const BASE_URL = 'https://btc-trade.com.ua/api';
const TRADE_SELL = 'trades/sell';
const TRADE_BUY = 'trades/buy';

// btc_uah - BitCoin к гривне
// ltc_uah - LitCoin к гривне
// nvc_uah - NovaCoin к гривне
// clr_uah - CoperLark к гривне
// doge_uah - Doge к гривне

import sha256 from 'sha256';

class BTCTradeApi {

    // post(path, params) {
    //     return this.send(path, 'POST', null, params);
    // }
    //
    // put(path, params) {
    //     return this.send(path, 'PUT', null, params);
    // }
    //
    // get(path, params, data) {
    //     return this.send(path, 'GET', params, data);
    // }
    //
    // send(url, method, params, data) {
    //     let uri = `${this.base_url}${this.root_path}${url}`;
    //
    //     if (params) {
    //         let separator = '?';
    //         Object.keys(params).forEach(key => {
    //             uri += `${separator}${key}=${params[key]}`;
    //             separator = '&';
    //         });
    //     }
    //
    //     //check if there's any missing parameters
    //     const missingFields = uri.match(/(\{[a-zA-Z0-9_]+\})/g);
    //     if (missingFields && missingFields.length > 0) {
    //         return Promise.reject(`URL missing parameters: ${missingFields.join(', ')}`);
    //     }
    //
    //     const headers = {
    //         'User-Agent': this.configuration.userAgent,
    //         'Content-Type': 'application/json'
    //     };
    //     if (this.access_token) {
    //         headers.Authorization = `Bearer ${this.access_token}`;
    //     }
    //
    //     return new Promise((resolve, reject) => {
    //         console.log({ uri, method, headers, data, ...params });
    //         fetch(uri, { method, headers, body: JSON.stringify(data) })
    //             .then(response => {
    //                 console.log(response);
    //                 return response.json();
    //             })
    //             .then(responseData => {
    //                 // TODO: check response code
    //                 // debugger;
    //                 console.log(responseData);
    //                 resolve(responseData);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //                 reject(error);
    //             });
    //     });
    // }

    constructor() {
        this.base_url = 'https://btc-trade.com.ua/api';
    }

    auth(publicKey, privateKey) {
        const url = `${this.base_url}/auth`;
        const outOrderId = Math.floor(Math.random() * 100 + 2);
        const nonce = Math.floor(Math.random() * (outOrderId - 1));
        const hashData = `nonce=${nonce}&out_order_id=${outOrderId}${privateKey}`;
        const method = 'POST';
        const apiSign = sha256(hashData);
        const headers = {
            'api-sign': apiSign,
            'public-key': publicKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const body = this.createFormData({
            nonce,
            out_order_id: outOrderId
        });

        return new Promise((resolve, reject) => {
            console.log({ url, method, headers, body});
            fetch(url, { method, headers, body })
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(responseData => {
                    // TODO: check response code
                    // debugger;
                    console.log(responseData);
                    resolve(responseData);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    createFormData(object) {
        var formBody = [];
        for (var property in object) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(object[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }
}

export const btcTradeApi = new BTCTradeApi();
