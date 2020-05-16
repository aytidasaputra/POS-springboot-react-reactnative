import {
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTIONS_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  SAVE_TRANSACTION_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SUMMARY_TRANSACTION_YEAR_REQUEST,
  YEAR_TRANSACTIONS_SUCCESS,
  YEAR_TRANSACTIONS_FAILURE
} from "./constants";
import { instanceAxios } from "../utils/apiUtil";

function sleep(delay, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, value);
  });
}

export const deletedById = id => dispatch => {
  dispatch({ type: DELETE_TRANSACTION_REQUEST });
  instanceAxios
    .delete(`transactions/${id}`)
    .then(data => sleep(500, data))
    .then(data => data)
    .then(data => {
      dispatch(deletedSuccess(data));
    })
    .catch(error => {
      dispatch(deletedTransactionFailure(error));
    });
};

export const saveTransactions = ({
  id,
  amount,
  description,
  type
}) => dispatch => {
  dispatch({ type: SAVE_TRANSACTION_REQUEST });

  const request = id
    ? instanceAxios.put(`transactions/${id}`, { id, amount, description, type })
    : instanceAxios.post(`transactions`, { amount, description, type });
  request
    .then(data => sleep(500, data))
    .then(data => data)
    .then(data => {
      dispatch(saveSuccess(data));
    })
    .catch(error => {
      dispatch(saveFailure(error));
    });
};

export const findById = id => dispatch => {
  dispatch({ type: FIND_TRANSACTION_REQUEST });
  instanceAxios
    .get(`transactions/${id}`)
    .then(data => sleep(500, data))
    .then(data => data)
    .then(data => {
      dispatch(findByIdSucces(data));
    })
    .catch(error => {
      dispatch(findByIdFailure(error));
    });
};

export const YearSummary = year => dispatch => {
  dispatch({ type: SUMMARY_TRANSACTION_YEAR_REQUEST });
  instanceAxios
    .get(`transactions/summary/${year}`)
    .then(data => sleep(2000, data))
    .then(data => data)
    .then(data => {
      dispatch(summaryYearSucces(data));
    })
    .catch(error => {
      dispatch(summaryYearFailure(error));
    });
};

export const findAll = ({
  search,
  sort = "asc",
  page = 0,
  size = 10
} = {}) => dispatch => {
  dispatch({ type: FIND_TRANSACTIONS_REQUEST });
  instanceAxios
    .get(`transactions`, {
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

function findByIdSucces(data) {
  return {
    type: FIND_TRANSACTION_SUCCESS,
    data: data
  };
}

function findByIdFailure(error) {
  return {
    type: FIND_TRANSACTION_FAILURE,
    error: error
  };
}

function findAllSucces(data) {
  return {
    type: FIND_TRANSACTIONS_SUCCESS,
    data: data
  };
}

function findAllFailure(error) {
  return {
    type: FIND_TRANSACTIONS_FAILURE,
    error: error
  };
}

function deletedSuccess(data) {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    data: data
  };
}

function deletedTransactionFailure(error) {
  return {
    type: DELETE_TRANSACTION_FAILURE,
    error: error
  };
}

function saveFailure(error) {
  return {
    type: SAVE_TRANSACTION_FAILURE,
    error: error
  };
}

function saveSuccess(data) {
  return {
    type: SAVE_TRANSACTION_SUCCESS,
    data: data
  };
}

function summaryYearSucces(data) {
  return {
    type: YEAR_TRANSACTIONS_SUCCESS,
    data: data
  };
}

function summaryYearFailure(error) {
  return {
    type: YEAR_TRANSACTIONS_FAILURE,
    error: error
  };
}
