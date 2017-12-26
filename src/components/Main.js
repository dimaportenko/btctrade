import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { sellBuyFetch } from '../actions';
import CurrencyRow from './CurrencyRow';

class Main extends Component {
    state = {
        refreshing: false
    };

    // renderCurrencies() {
    //     return Object.values(this.props.currencies).map(item => {
    //         return (
    //             <CurrencyRow
    //                 key={item.code}
    //                 code={item.code}
    //                 title={item.title}
    //             />
    //         );
    //     });
    // }

    onRefresh = () => {
        Object.values(this.props.currencies).map(item => {
            this.props.sellBuyFetch(item.code);
        });
    };

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <ScrollView
    //                 refreshControl={
    //                     <RefreshControl
    //                         refreshing={this.state.refreshing}
    //                         onRefresh={this.onRefresh}
    //                     />
    //                 }
    //             >
    //                 {this.renderCurrencies()}
    //             </ScrollView>
    //         </View>
    //     );
    // }

    _keyExtractor = (item, index) => item.code;

    _renderItem = ({item}) => (
        <CurrencyRow
            key={item.code}
            code={item.code}
            title={item.title}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    keyExtractor={this._keyExtractor}
                    data={Object.values(this.props.currencies)}
                    renderItem={this._renderItem}
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
});

const mapStateToProps = ({ currencies }) => {
    return { currencies };
};

export default connect(mapStateToProps, { sellBuyFetch })(Main);
