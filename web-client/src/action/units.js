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
  SAVE_UNIT_SUCCESS
} from "./constants";
import { instanceAxios } from "../utils/apiUtil";

function sleep(delay, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, value);
  });
}

export const deletedById = id => dispatch => {
  dispatch({ type: DELETE_UNIT_REQUEST });
  instanceAxios
    .delete(`units/${id}`)
    .then(data => sleep(500, data))
    .then(data => data)
    .then(data => {
      dispatch(deletedSuccess(data));
    })
    .catch(error => {
      dispatch(deletedUnitFailure(error));
    });
};

export const saveUnit = ({ id, name, description }) => dispatch => {
  dispatch({ type: SAVE_UNIT_REQUEST });

  const request = id
    ? instanceAxios.put(`units/${id}`, { id, name, description })
    : instanceAxios.post(`units`, { name, description });
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
  dispatch({ type: FIND_UNIT_REQUEST });
  instanceAxios
    .get(`units/${id}`)
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
  dispatch({ type: FIND_UNITS_REQUEST });
  instanceAxios
    .get(`units`, {
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
    type: FIND_UNIT_SUCCESS,
    data: data
  };
}

function findByIdFailure(error) {
  return {
    type: FIND_UNIT_FAILURE,
    error: error
  };
}
function findAllSucces(data) {
  return {
    type: FIND_UNITS_SUCCESS,
    data: data
  };
}

function findAllFailure(error) {
  return {
    type: FIND_UNITS_FAILURE,
    error: error
  };
}

function deletedSuccess(data) {
  return {
    type: DELETE_UNIT_SUCCESS,
    data: data
  };
}

function deletedUnitFailure(error) {
  return {
    type: DELETE_UNIT_FAILURE,
    error: error
  };
}

function saveFailure(error) {
  return {
    type: SAVE_UNIT_FAILURE,
    error: error
  };
}

function saveSuccess(data) {
  return {
    type: SAVE_UNIT_SUCCESS,
    data: data
  };
}
