import {
  FIND_ITEM_REQUEST,
  DELETE_ITEM_REQUEST,
  SAVE_ITEM_REQUEST,
  FIND_ITEMS_REQUEST,
} from './constant';

export function save(data) {
  return {
    type: SAVE_ITEM_REQUEST,
    data: data, //kalo ada data tambahan
  };
}

export function deleteById(id) {
  return {
    type: DELETE_ITEM_REQUEST,
    id: id, //kalo ada data tambahan
  };
}

export function findById(id) {
  return {
    type: FIND_ITEM_REQUEST,
    id: id, //kalo ada data tambahan
  };
}

export function findAll(params) {
  return {
    type: FIND_ITEMS_REQUEST,
    params: params, //kalo ada data tambahan
  };
}
