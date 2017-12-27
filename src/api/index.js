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

    constructor() {
        this.base_url = 'https://btc-trade.com.ua/api';
    }

    // curl -k   -i -H "api-sign: 9925916858e6361ffb88fc0b71d763355ea979e3ac62a6acaa8fe4a8ba548abf"
    // -H "public-key: 9e6ea26cc7314d6dea8359f8ed5de68b2b5f0ec8daa0d5eac96b86d2b44ada38"
    // --data "out_order_id=2&nonce=1" -v  https://btc-trade.com.ua/api/balance

    getBalance() {
        const url = `${this.base_url}/balance`;
        return this.post(url);
    }

    auth(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;

        const url = `${this.base_url}/auth`;
        return this.post(url);
    }

    post(url, params) {
        return this.send(url, 'POST', params);
    }

    send(url, method, params = {}) {
        const outOrderId = Math.floor(Math.random() * 100 + 2);
        const nonce = Math.floor(Math.random() * (outOrderId - 1));
        const body = this.createFormData({
            nonce,
            out_order_id: outOrderId,
            ...params
        });
        const hashData = `${body}${this.privateKey}`;
        const apiSign = sha256(hashData);
        const headers = {
            'api-sign': apiSign,
            'public-key': this.publicKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

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
