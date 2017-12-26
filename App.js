/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/components/Main';
import store from './src/store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}
