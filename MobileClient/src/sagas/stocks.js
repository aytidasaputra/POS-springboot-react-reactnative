import {instanceAxios} from '../utils/apiUtil';
import {
  FIND_STOCK_REQUEST,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_FAILURE,
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  SAVE_STOCK_FAILURE,
  SAVE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCKS_FAILURE,
  SUMMARY_STOCK_SUCCESS,
  SUMMARY_STOCK_FAILURE,
  SUMMARY_STOCK_REQUEST,
} from '../actions/constant';
import {put, takeLatest} from 'redux-saga/effects';

function* stockSummary(action) {
  const {search, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield instanceAxios.get('stocks/summary', {
      params: {...search, sort, page, size},
    });
    yield put({
      type: SUMMARY_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SUMMARY_STOCK_FAILURE,
      error: error,
    });
  }
}

function* findAll(action) {
  const {search, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield instanceAxios.get('stocks', {
      params: {...search, sort, page, size},
    });
    yield put({
      type: FIND_STOCKS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_STOCKS_FAILURE,
      error: error,
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`stocks/${action.id}`);
    yield put({
      type: FIND_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_STOCK_FAILURE,
      error: error,
    });
  }
}

function* deletedStocksById(action) {
  try {
    const data = yield instanceAxios.delete(`stocks/${action.id}`);
    yield put({
      type: DELETE_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_STOCK_FAILURE,
      error: error,
    });
  }
}

function* save(action) {
  const {id, item, quantity, unit} = action.data;
  try {
    const data = yield id
      ? instanceAxios.put(`stocks/${id}`, {
          id,
          item: {id: item.id},
          quantity,
          unit: {id: unit.id},
        })
      : instanceAxios.post(`stocks`, {
          item: {id: item.id},
          quantity,
          unit: {id: unit.id},
        });
    yield put({
      type: SAVE_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_STOCK_FAILURE,
      error: error,
    });
  }
}

export function* watchStockSummary() {
  yield takeLatest(SUMMARY_STOCK_REQUEST, stockSummary);
}

export function* watchFindStocks() {
  yield takeLatest(FIND_STOCKS_REQUEST, findAll); // setiap ada request maka akan diarahkan ke findAll
}

export function* watchStockFindById() {
  yield takeLatest(FIND_STOCK_REQUEST, findById);
}
export function* watchDeletedStockById() {
  yield takeLatest(DELETE_STOCK_REQUEST, deletedStocksById);
}

export function* watchSaveStocks() {
  yield takeLatest(SAVE_STOCK_REQUEST, save);
}
