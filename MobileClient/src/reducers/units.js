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

const defaultState = {
  data: null,
  loading: false,
  error: null,
};

export function savedUnits(state = defaultState, action) {
  switch (action.type) {
    case SAVE_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case SAVE_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case SAVE_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function deletedUnitById(state = defaultState, action) {
  switch (action.type) {
    case DELETE_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case DELETE_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case DELETE_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function unitsId(state = defaultState, action) {
  switch (action.type) {
    case FIND_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case FIND_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case FIND_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function units(state = defaultState, action) {
  switch (action.type) {
    case FIND_UNITS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FIND_UNITS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case FIND_UNITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
