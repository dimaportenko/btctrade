import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { sellBuyFetch } from '../actions';

class BalanceRow extends Component {
    state = {
        fetching: false,
        isError: false
    };

    componentWillMount() {
        // this.props.sellBuyFetch(this.props.code);
    }

    refresh = () => {
        // this.props.sellBuyFetch(this.props.code);
    };

    renderResults() {
        // const { currencies, balance } = this.props;
        // const currency = currencies[code];
        // if (currency.fetching) {
        //     return <ActivityIndicator size='large' />;
        // }
        //
        // if (currency.isError) {
        //     return <Text>Error. Please try again later.</Text>
        // }
        //
        // if (!currency.buyResult || !currency.sellResult) {
        //     return <View />;
        // }

        // return (
        //     <View>
        //         <Text style={styles.rateStyle}>Buy: {currency.buyResult.max_price}</Text>
        //         <Text style={styles.rateStyle}>Sell: {currency.sellResult.min_price}</Text>
        //     </View>
        // )
    }

    renderRefreshButton() {
        // if (!this.state.fetching) {
        //     return (
        //         <Button
        //             icon={{ name: 'refresh', color: 'gray' }}
        //             backgroundColor='rgba(0, 0, 0, 0)'
        //             onPress={this.refresh}
        //         />
        //     );
        // }
    }

    calculateSellToUAH = () => {
        const { title, balance, currencies } = this.props;
        const code = title.toLowerCase() + '_uah';
        const currency = currencies[code];

        if (currency && Number(currency.buyResult.max_price) > 0) {
            const result = currency.buyResult.max_price * balance;
            return parseFloat(result).toFixed(8);
        }
        return '';
    };

    render() {
        return (
            <View>
                <View style={styles.containerStyle}>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                    <Text style={styles.titleStyle}>{this.props.balance}</Text>
                    <Text style={styles.titleStyle}>{this.calculateSellToUAH()}</Text>
                </View>
                <Divider style={{ backgroundColor: 'gray' }} />
            </View>
        );
    }
}
//                    <View style={styles.rateContainerStyle}>
//                        {this.renderResults()}
//                    </View>
//                    {this.renderRefreshButton()}

const styles = {
    containerStyle: {
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    titleStyle: {
        marginTop: 7,
        marginBottom: 5,
        fontWeight: 'bold',
        width: '33%',
        textAlign: 'center',
        justifyContent:'center'
    },
    rateStyle: {
        textAlign: 'left',
    },
    rateContainerStyle: {
        width: '50%',
    }
};

const mapStateToProps = ({currencies}) => {
    return { currencies };
};

export default connect(mapStateToProps, { sellBuyFetch })(BalanceRow);
