import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';

class Account extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Login />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
});

export default Account;
