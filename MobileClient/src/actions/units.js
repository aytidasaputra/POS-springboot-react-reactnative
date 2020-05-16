import {
  FIND_UNIT_REQUEST,
  DELETE_UNIT_REQUEST,
  SAVE_UNIT_REQUEST,
  FIND_UNITS_REQUEST,
} from './constant';

export function save(data) {
  return {
    type: SAVE_UNIT_REQUEST,
    data: data,
  };
}

export function deleteById(id) {
  return {
    type: DELETE_UNIT_REQUEST,
    id: id,
  };
}

export function findById(id) {
  return {
    type: FIND_UNIT_REQUEST,
    id: id,
  };
}

export function findAll(params) {
  return {
    type: FIND_UNITS_REQUEST,
    params: params,
  };
}
