import { combineReducers } from "redux";

import { findUnitById, findUnits, deletedById, saveUnit } from "./units";

import {
  findTransactionsById,
  findTransactions,
  deletedTransactionsById,
  saveTransactions,
  findSummaryByYear
} from "./transactions";

import {
  findStocksById,
  findStocks,
  deletedStockById,
  saveStock,
  showSummary
} from "./stocks";

import { findItemById, findItems, deletedItemById, saveItems } from "./items";

export default combineReducers({
  deletedById,
  findUnitById,
  findUnits,
  saveUnit,
  findTransactionsById,
  findTransactions,
  findSummaryByYear,
  saveTransactions,
  deletedTransactionsById,
  findStocksById,
  findStocks,
  showSummary,
  deletedStockById,
  saveStock,
  findItemById,
  findItems,
  deletedItemById,
  saveItems
});
