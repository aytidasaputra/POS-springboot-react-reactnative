import {combineReducers} from 'redux';

import {items, itemsId, deletedItemById, savedItems} from './items';
import {units, unitsId, deletedUnitById, savedUnits} from './units';
import {
  transactions,
  transactionsId,
  deletedTransactionById,
  savedTransactions,
} from './transactions';
import {
  stocks,
  stocksId,
  deletedStockById,
  savedStocks,
  stockSummary,
} from './stocks';

import {login} from './login';

export default combineReducers({
  items,
  itemsId,
  deletedItemById,
  savedItems,
  units,
  unitsId,
  deletedUnitById,
  savedUnits,
  transactions,
  transactionsId,
  deletedTransactionById,
  savedTransactions,
  stocks,
  stocksId,
  deletedStockById,
  savedStocks,
  stockSummary,
  login,
});
