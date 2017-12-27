import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { btcTradeApi } from '../api';
import { auth } from '../actions';


class Login extends Component {

    state = {
        publicKey: '',
        privateKey: ''
    };

    onChangePublic = (text) => {
        this.setState({publicKey: text});
    };

    onChangePrivate = (text) => {
        this.setState({privateKey: text});
    };

    onSubmitPress = () => {
        this.props.auth(this.state.publicKey, this.state.privateKey);
        // btcTradeApi.auth(this.state.publicKey, this.state.privateKey)
        //     .then(data => {
        //         console.log('onSubmitResponse');
        //         console.log(data);
        //     })
        //     .catch(error => console.log(error));
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

export default connect(null, { auth })(Login);
