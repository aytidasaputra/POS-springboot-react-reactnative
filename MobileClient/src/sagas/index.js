import {
  watchFindAll,
  watchDeletedItemsById,
  watchItemsFindById,
  watchSaveItems,
} from './items';

import {
  watchFindUnits,
  watchUnitsFindById,
  watchDeletedUnitById,
  watchSaveUnits,
} from './units';

import {
  watchFindTransactions,
  watchTransactionsFindById,
  watchDeletedTransactionsById,
  watchSaveTransactions,
} from './transactions';

import {
  watchFindStocks,
  watchStockFindById,
  watchDeletedStockById,
  watchSaveStocks,
  watchStockSummary,
} from './stocks';

import {watchLogin} from './login';

import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(watchFindAll),
    fork(watchDeletedItemsById),
    fork(watchItemsFindById),
    fork(watchSaveItems),
    fork(watchFindUnits),
    fork(watchUnitsFindById),
    fork(watchDeletedUnitById),
    fork(watchSaveUnits),
    fork(watchFindTransactions),
    fork(watchTransactionsFindById),
    fork(watchDeletedTransactionsById),
    fork(watchSaveTransactions),
    fork(watchFindStocks),
    fork(watchStockFindById),
    fork(watchDeletedStockById),
    fork(watchSaveStocks),
    fork(watchLogin),
    fork(watchStockSummary),
  ]);
}
