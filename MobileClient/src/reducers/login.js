import {LOGIN_SUCCES, LOGIN_FAILURE, LOGIN_REQUEST} from '../actions/constant';

const defaultState = {
  data: {username: null, token: null},
  loading: false,
  error: null,
};

export function login(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case LOGIN_SUCCES:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
