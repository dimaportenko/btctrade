import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { checkSavedKeys, auth, sellBuyFetch } from "../actions";
import Login from './Login';
import BalanceRow from './BalanceRow';

class Account extends Component {
    state = {
        refreshing: false
    };

    componentWillReceiveProps(next) {
        if (!next.session
            && next.keysChecked
            && next.publicKey
            && next.privateKey
            && !next.authInProgress) {
            this.props.auth(next.publicKey, next.privateKey);
        }
    }

    componentWillMount() {
        this.props.checkSavedKeys();
    }

    onRefresh = () => {
        Object.values(this.props.currencies).map(item => {
            this.props.sellBuyFetch(item.code);
        });
    };


    keyExtractor = (item, index) => item.currency;

    renderItem = ({item}) => {
        if (Number(item.balance) > 0) {
            return (
                <BalanceRow
                    key={item.currency}
                    balance={item.balance}
                    title={item.currency}
                />
            );
        }

        return <View key={item.currency} />;
    };

    renderContent() {
        if (!this.props.keysChecked) {
            return (
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        const { publicKey, privateKey } = this.props;
        if (!publicKey || !privateKey) {
            return <Login />;
        }

        if (!this.props.accounts || !this.props.accounts.length) {
            return (
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    keyExtractor={this.keyExtractor}
                    data={this.props.accounts}
                    renderItem={this.renderItem}
                />
                <Text>Totals - {this.calculateTotals()} uah</Text>
            </View>
        );

    }

    calculateTotals = () => {
        const { accounts, currencies } = this.props;

        const totals = accounts.reduce((result, item) => {
            if(Number(item.balance) > 0) {
                const code = item.currency.toLowerCase() + '_uah';
                const currency = currencies[code];

                if (currency && Number(currency.buyResult.max_price) > 0) {
                    return result + currency.buyResult.max_price * item.balance;
                }
            }

            return result;
        }, 0);

        return parseFloat(totals).toFixed(2);
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({ auth, currencies }) => {
    console.log(auth);
    return { ...auth, currencies };
};

export default connect(mapStateToProps, {
    checkSavedKeys,
    auth,
    sellBuyFetch
})(Account);
