import {LOGIN_REQUEST} from './constant';

export function login(data) {
  return {
    type: LOGIN_REQUEST,
    data: data,
  };
}
