import {
  FIND_STOCK_REQUEST,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_FAILURE,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCKS_FAILURE,
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  SAVE_STOCK_FAILURE,
  SAVE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  SUMMARY_STOCK_FAILURE,
  SUMMARY_STOCK_REQUEST,
  SUMMARY_STOCK_SUCCESS
} from "../action/constants";

const defaultState = { data: null, loading: false, error: null };

export function saveStock(state = defaultState, action) {
  switch (action.type) {
    case SAVE_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case SAVE_STOCK_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function deletedStockById(state = defaultState, action) {
  switch (action.type) {
    case DELETE_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case DELETE_STOCK_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case DELETE_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function findStocksById(state = defaultState, action) {
  switch (action.type) {
    case FIND_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case FIND_STOCK_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function findStocks(state = defaultState, action) {
  switch (action.type) {
    case FIND_STOCKS_REQUEST:
      return {
        loading: true,
        data: null
      };
    case FIND_STOCKS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_STOCKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function showSummary(state = defaultState, action) {
  switch (action.type) {
    case SUMMARY_STOCK_REQUEST:
      return {
        loading: true,
        data: null
      };
    case SUMMARY_STOCK_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SUMMARY_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
