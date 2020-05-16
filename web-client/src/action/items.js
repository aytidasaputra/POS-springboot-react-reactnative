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
} from "./constants";
import { instanceAxios } from "../utils/apiUtil";

function sleep(delay, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, value);
  });
}

export const deletedById = id => dispatch => {
  dispatch({ type: DELETE_ITEM_REQUEST });
  instanceAxios
    .delete(`items/${id}`)
    .then(data => sleep(500, data))
    .then(data => {
      dispatch(deletedSuccess(data));
    })
    .catch(error => {
      dispatch(deletedItemFailure(error));
    });
};

export const saveItems = ({ id, name }) => dispatch => {
  dispatch({ type: SAVE_ITEM_REQUEST });

  const request = id
    ? instanceAxios.put(`items/${id}`, { id, name })
    : instanceAxios.post(`items`, { name });
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

export const findItemById = id => dispatch => {
  dispatch({ type: FIND_ITEM_REQUEST });
  instanceAxios
    .get(`items/${id}`)
    .then(data => sleep(500, data))
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
  dispatch({ type: FIND_ITEMS_REQUEST });
  instanceAxios
    .get(`items`, {
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
    type: FIND_ITEM_SUCCESS,
    data: data
  };
}

function findByIdFailure(error) {
  return {
    type: FIND_ITEM_FAILURE,
    error: error
  };
}
function findAllSucces(data) {
  return {
    type: FIND_ITEMS_SUCCESS,
    data: data
  };
}

function findAllFailure(error) {
  return {
    type: FIND_ITEMS_FAILURE,
    error: error
  };
}

function deletedSuccess(data) {
  return {
    type: DELETE_ITEM_SUCCESS,
    data: data
  };
}

function deletedItemFailure(error) {
  return {
    type: DELETE_ITEM_FAILURE,
    error: error
  };
}

function saveFailure(error) {
  return {
    type: SAVE_ITEM_FAILURE,
    error: error
  };
}

function saveSuccess(data) {
  return {
    type: SAVE_ITEM_SUCCESS,
    data: data
  };
}
