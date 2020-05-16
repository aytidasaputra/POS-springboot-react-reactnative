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
  SAVE_ITEM_SUCCESS
} from "../action/constants";

const defaultState = {
  data: null,
  loading: false,
  error: null,
  saveSucces: null
};

export function saveItems(state = defaultState, action) {
  switch (action.type) {
    case SAVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case SAVE_ITEM_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function deletedItemById(state = defaultState, action) {
  switch (action.type) {
    case DELETE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case DELETE_ITEM_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function findItemById(state = defaultState, action) {
  switch (action.type) {
    case FIND_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case FIND_ITEM_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function findItems(state = defaultState, action) {
  switch (action.type) {
    case FIND_ITEMS_REQUEST:
      return {
        loading: true,
        data: null
      };
    case FIND_ITEMS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
