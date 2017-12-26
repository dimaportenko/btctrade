import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'


class Login extends Component {

    onChangePublic = (text) => {

    };

    onChangePrivate = (text) => {

    };

    onSubmitPress = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <FormLabel>Public API Key</FormLabel>
                <FormInput onChangeText={this.onChangePublic} />
                <FormLabel>Privat API Key</FormLabel>
                <FormInput onChangeText={this.onChangePrivate} />
                <Button
                    title='Submit'
                    buttonStyle={styles.buttonStyle}
                    onPress={this.onSubmitPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    buttonStyle: {
        marginTop: 20
    }
});

export default Login;
