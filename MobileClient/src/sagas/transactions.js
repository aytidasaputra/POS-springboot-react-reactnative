import {instanceAxios} from '../utils/apiUtil';
import {
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTIONS_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  SAVE_TRANSACTION_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
} from '../actions/constant';
import {put, takeLatest} from 'redux-saga/effects';

function* findAll(action) {
  //dijalankan sebelum masuk ke reducers
  const {search, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield instanceAxios.get('transactions', {
      params: {...search, sort, page, size},
    });
    yield put({
      type: FIND_TRANSACTIONS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTIONS_FAILURE,
      error: error,
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`transactions/${action.id}`);
    yield put({
      type: FIND_TRANSACTION_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTION_FAILURE,
      error: error,
    });
  }
}

function* deletedTransactionsById(action) {
  try {
    const data = yield instanceAxios.delete(`transactions/${action.id}`);
    yield put({
      type: DELETE_TRANSACTION_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_TRANSACTION_FAILURE,
      error: error,
    });
  }
}

function* save(action) {
  const {id, amount, type, description} = action.data;
  try {
    const data = yield id
      ? instanceAxios.put(`transactions/${id}`, {id, amount, description, type})
      : instanceAxios.post(`transactions`, {amount, description, type});
    yield put({
      type: SAVE_TRANSACTION_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_TRANSACTION_FAILURE,
      error: error,
    });
  }
}

export function* watchFindTransactions() {
  yield takeLatest(FIND_TRANSACTIONS_REQUEST, findAll); // setiap ada request maka akan diarahkan ke findAll
}

export function* watchTransactionsFindById() {
  yield takeLatest(FIND_TRANSACTION_REQUEST, findById);
}
export function* watchDeletedTransactionsById() {
  yield takeLatest(DELETE_TRANSACTION_REQUEST, deletedTransactionsById);
}

export function* watchSaveTransactions() {
  yield takeLatest(SAVE_TRANSACTION_REQUEST, save);
}
