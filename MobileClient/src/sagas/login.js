import {LOGIN_FAILURE, LOGIN_SUCCES, LOGIN_REQUEST} from '../actions/constant';
import {put, takeLatest} from 'redux-saga/effects';
import {instanceAxios} from '../utils/apiUtil';
function* login(action) {
  const {username, password} = action.data;
  console.log('data: ', action.data);

  try {
    const data = yield instanceAxios.post('auth/signin', {
      username: username,
      password: password,
    });
    console.log('data: ', data);
    yield put({
      type: LOGIN_SUCCES,
      data: data,
    });
    console.log('data succes: ', data);
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: error,
    });
    console.log('data failure: ', error);
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
