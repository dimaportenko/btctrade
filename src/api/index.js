// API google doc
// https://docs.google.com/document/d/1ocYA0yMy_RXd561sfG3qEPZ80kyll36HUxvCRe5GbhE/edit
//

import sha256 from 'sha256';

class BTCTradeApi {

    constructor() {
        this.base_url = 'https://btc-trade.com.ua/api';
    }

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

    tradesBuy(code) {
        const url = `${this.base_url}/trades/buy/${code}`;
        return this.getPublic(url);
    }

    tradesSell(code) {
        const url = `${this.base_url}/trades/sell/${code}`;
        return this.getPublic(url);
    }

    getPublic(url, params) {
        return this.sendPublic(url, 'GET', params);
    }

    sendPublic(url, method, params = {}) {
        return new Promise((resolve, reject) => {
            console.log({ url, method});
            fetch(url, { method })
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
}

export const btcTradeApi = new BTCTradeApi();
