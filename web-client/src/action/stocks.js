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
} from "./constants";
import { instanceAxios } from "../utils/apiUtil";

function sleep(delay, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, value);
  });
}

export const deletedStockById = id => dispatch => {
  dispatch({ type: DELETE_STOCK_REQUEST });
  instanceAxios
    .delete(`stocks/${id}`)
    .then(data => sleep(500, data))
    .then(data => data)
    .then(data => {
      dispatch(deletedSuccess(data));
    })
    .catch(error => {
      dispatch(deletedStockFailure(error));
    });
};

export const saveStock = ({ id, item, quantity, unit }) => dispatch => {
  dispatch({ type: SAVE_STOCK_REQUEST });

  const request = id
    ? instanceAxios.put(`stocks/${id}`, {
        id,
        item: { id: item.id },
        quantity,
        unit: { id: unit.id }
      })
    : instanceAxios.post(`stocks`, {
        item: { id: item.id },
        quantity,
        unit: { id: unit.id }
      });
  request
    .then(data => data)
    .then(data => {
      dispatch(saveSuccess(data));
    })
    .catch(error => {
      dispatch(saveFailure(error));
    });
};

export const findStocksById = id => dispatch => {
  dispatch({ type: FIND_STOCK_REQUEST });
  instanceAxios
    .get(`stocks/${id}`)
    .then(data => data)
    .then(data => {
      dispatch(findByIdSucces(data));
    })
    .catch(error => {
      dispatch(findByIdFailure(error));
    });
};

export const findAll = ({
  search,
  sort = "asc",
  page = 0,
  size = 10
} = {}) => dispatch => {
  dispatch({ type: FIND_STOCKS_REQUEST });
  instanceAxios
    .get(`stocks`, {
      params: { ...search, sort, page, size }
    })
    .then(data => sleep(2000, data))
    .then(data => data)
    .then(data => {
      dispatch(findAllSucces(data));
    })
    .catch(error => {
      dispatch(findAllFailure(error));
    });
};

export const showSummary = ({
  search,
  sort = "asc",
  page = 0,
  size = 10
} = {}) => dispatch => {
  dispatch({ type: SUMMARY_STOCK_REQUEST });
  instanceAxios
    .get(`stocks/summary`, {
      params: { ...search, sort, page, size }
    })
    .then(data => data)
    .then(data => {
      dispatch(showSummarySucces(data));
    })
    .catch(error => {
      dispatch(showSummaryFailure(error));
    });
};

function findByIdSucces(data) {
  return {
    type: FIND_STOCK_SUCCESS,
    data: data
  };
}

function findByIdFailure(error) {
  return {
    type: FIND_STOCK_FAILURE,
    error: error
  };
}

function findAllSucces(data) {
  return {
    type: FIND_STOCKS_SUCCESS,
    data: data
  };
}

function findAllFailure(error) {
  return {
    type: FIND_STOCKS_FAILURE,
    error: error
  };
}

function showSummarySucces(data) {
  return {
    type: SUMMARY_STOCK_SUCCESS,
    data: data
  };
}

function showSummaryFailure(error) {
  return {
    type: SUMMARY_STOCK_FAILURE,
    error: error
  };
}

function deletedSuccess(data) {
  return {
    type: DELETE_STOCK_SUCCESS,
    data: data
  };
}

function deletedStockFailure(error) {
  return {
    type: DELETE_STOCK_FAILURE,
    error: error
  };
}

function saveFailure(error) {
  return {
    type: SAVE_STOCK_FAILURE,
    error: error
  };
}

function saveSuccess(data) {
  return {
    type: SAVE_STOCK_SUCCESS,
    data: data
  };
}
