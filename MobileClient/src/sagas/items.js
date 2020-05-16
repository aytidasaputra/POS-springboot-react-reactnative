import {instanceAxios} from '../utils/apiUtil';
import {
  FIND_ITEM_REQUEST,
  FIND_ITEM_SUCCESS,
  FIND_ITEM_FAILURE,
  FIND_ITEMS_REQUEST,
  FIND_ITEMS_SUCCESS,
  FIND_ITEMS_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  SAVE_ITEM_FAILURE,
  SAVE_ITEM_REQUEST,
  SAVE_ITEM_SUCCESS,
} from '../actions/constant';
import {put, takeLatest} from 'redux-saga/effects';

function* findAll(action) {
  //dijalankan sebelum masuk ke reducers
  const {search, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield instanceAxios.get('items', {
      params: {...search, sort, page, size},
    });
    yield put({
      type: FIND_ITEMS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      //karna generator, yield ini bisa di pause
      type: FIND_ITEMS_FAILURE,
      error: error,
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`items/${action.id}`);
    yield put({
      type: FIND_ITEM_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_ITEM_FAILURE,
      error: error,
    });
  }
}

function* deletedItemsById(action) {
  try {
    const data = yield instanceAxios.delete(`items/${action.id}`);
    yield put({
      type: DELETE_ITEM_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_ITEM_FAILURE,
      error: error,
    });
  }
}

function* save(action) {
  console.log(action);

  const {id, name} = action.data;
  try {
    const data = yield id
      ? instanceAxios.put(`items/${id}`, {id, name})
      : instanceAxios.post(`items`, {name});
    console.log('action', data);

    yield put({
      type: SAVE_ITEM_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_ITEM_FAILURE,
      error: error,
    });
  }
}

export function* watchFindAll() {
  yield takeLatest(FIND_ITEMS_REQUEST, findAll); // setiap ada request maka akan diarahkan ke findAll
}

export function* watchItemsFindById() {
  yield takeLatest(FIND_ITEM_REQUEST, findById);
}
export function* watchDeletedItemsById() {
  yield takeLatest(DELETE_ITEM_REQUEST, deletedItemsById);
}

export function* watchSaveItems() {
  yield takeLatest(SAVE_ITEM_REQUEST, save);
}
