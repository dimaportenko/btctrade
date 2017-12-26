import { TabNavigator } from 'react-navigation';

import Account from '../components/Account';
import Main from '../components/Main';

export const Navigator = TabNavigator({
    main: { screen: Main },
    account: { screen: Account },
}, {
    lazy: true
});
