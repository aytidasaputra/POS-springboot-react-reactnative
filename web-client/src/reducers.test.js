import reducers from "./reducers";

describe("reducers", () => {
  let state;
  test("reducers", () => {
    state = reducers(
      {
        deletedById: { data: null, loading: false, error: null },
        findUnitById: { data: null, loading: false, error: null },
        findUnits: { data: null, loading: false, error: null },
        saveUnit: { data: null, loading: false, error: null },
        findTransactionsById: { data: null, loading: false, error: null },
        findTransactions: { data: null, loading: false, error: null },
        findSummaryByYear: { data: null, loading: false, error: null },
        saveTransactions: { data: null, loading: false, error: null },
        deletedTransactionsById: { data: null, loading: false, error: null },
        findStocksById: { data: null, loading: false, error: null },
        findStocks: { data: null, loading: false, error: null },
        deletedStockById: { data: null, loading: false, error: null },
        saveStock: { data: null, loading: false, error: null },
        findItemById: { data: null, loading: false, error: null },
        findItems: { data: null, loading: false, error: null },
        deletedItemById: { data: null, loading: false, error: null },
        saveItems: { data: null, loading: false, error: null }
      },
      { type: "FIND_ITEM_REQUEST" }
    );
    expect(state).toEqual({
      deletedById: { data: null, loading: false, error: null },
      findUnitById: { data: null, loading: false, error: null },
      findUnits: { data: null, loading: false, error: null },
      saveUnit: { data: null, loading: false, error: null },
      findTransactionsById: { data: null, loading: false, error: null },
      findTransactions: { data: null, loading: false, error: null },
      findSummaryByYear: { data: null, loading: false, error: null },
      saveTransactions: { data: null, loading: false, error: null },
      deletedTransactionsById: { data: null, loading: false, error: null },
      findStocksById: { data: null, loading: false, error: null },
      findStocks: { data: null, loading: false, error: null },
      deletedStockById: { data: null, loading: false, error: null },
      saveStock: { data: null, loading: false, error: null },
      findItemById: { data: null, loading: true, error: null },
      findItems: { data: null, loading: false, error: null },
      deletedItemById: { data: null, loading: false, error: null },
      saveItems: { data: null, loading: false, error: null }
    });
  });
});
