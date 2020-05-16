import {instanceAxios} from '../utils/apiUtil';
import {
  FIND_UNIT_REQUEST,
  FIND_UNIT_SUCCESS,
  FIND_UNIT_FAILURE,
  FIND_UNITS_REQUEST,
  FIND_UNITS_SUCCESS,
  FIND_UNITS_FAILURE,
  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  SAVE_UNIT_FAILURE,
  SAVE_UNIT_REQUEST,
  SAVE_UNIT_SUCCESS,
} from '../actions/constant';
import {put, takeLatest} from 'redux-saga/effects';

function* findUnits(action) {
  const {search, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield instanceAxios.get('units', {
      params: {...search, sort, page, size},
    });
    yield put({
      type: FIND_UNITS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_UNITS_FAILURE,
      error: error,
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`units/${action.id}`);
    yield put({
      type: FIND_UNIT_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_UNIT_FAILURE,
      error: error,
    });
  }
}

function* deletedUnitById(action) {
  try {
    const data = yield instanceAxios.delete(`units/${action.id}`);
    yield put({
      type: DELETE_UNIT_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_UNIT_FAILURE,
      error: error,
    });
  }
}

function* save(action) {
  const {id, name, description} = action.data;
  try {
    const data = yield id
      ? instanceAxios.put(`units/${id}`, {id, name, description})
      : instanceAxios.post(`units`, {name, description});
    yield put({
      type: SAVE_UNIT_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_UNIT_FAILURE,
      error: error,
    });
  }
}

export function* watchFindUnits() {
  yield takeLatest(FIND_UNITS_REQUEST, findUnits);
}

export function* watchUnitsFindById() {
  yield takeLatest(FIND_UNIT_REQUEST, findById);
}
export function* watchDeletedUnitById() {
  yield takeLatest(DELETE_UNIT_REQUEST, deletedUnitById);
}

export function* watchSaveUnits() {
  yield takeLatest(SAVE_UNIT_REQUEST, save);
}
