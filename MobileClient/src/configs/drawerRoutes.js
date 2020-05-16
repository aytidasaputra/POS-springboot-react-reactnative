import {HomeScreen} from '../screens/home';
import {ItemsScreen} from '../screens/items';
import {UnitsScreen} from '../screens/units';
import {TransactionsScreen} from '../screens/transactions';
import {StocksScreen, StockSummary} from '../screens/stocks';
export const drawerRoutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Items',
    component: ItemsScreen,
  },
  {
    name: 'Units',
    component: UnitsScreen,
  },
  {
    name: 'Transactions',
    component: TransactionsScreen,
  },
  {
    name: 'Stocks',
    component: StocksScreen,
  },
  {
    name: 'StockSummary',
    component: StockSummary,
  },
];
