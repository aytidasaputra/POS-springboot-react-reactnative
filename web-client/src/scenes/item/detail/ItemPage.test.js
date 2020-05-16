import React from "react";
import { shallow } from "enzyme";
import ItemPage from "./ItemPage";
import reducers from "../../reducers";

describe("Item Page", () => {
  test("reducers", () => {
    let state;
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
        findStocks: { loading: true, data: null },
        showSummary: { data: null, loading: false, error: null },
        deletedStockById: { data: null, loading: false, error: null },
        saveStock: { data: null, loading: false, error: null },
        findItemById: {
          data: null,
          loading: false,
          error: null,
          saveSucces: null
        },
        findItems: {
          data: null,
          loading: false,
          error: null,
          saveSucces: null
        },
        deletedItemById: {
          data: null,
          loading: false,
          error: null,
          saveSucces: null
        },
        saveItems: { data: null, loading: false, error: null, saveSucces: null }
      },
      {
        type: "FIND_STOCKS_SUCCESS",
        data: {
          list: [
            {
              id: 1,
              quantity: 400,
              item: {
                id: 1,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Indomie Goreng"
              },
              unit: {
                id: 1,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 2,
              quantity: 10,
              item: {
                id: 2,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Indomie Soto"
              },
              unit: {
                id: 2,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 3,
              quantity: 100,
              item: {
                id: 3,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Indomie Panggang"
              },
              unit: {
                id: 3,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 4,
              quantity: 900,
              item: {
                id: 4,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Mie Sedaap Goreng"
              },
              unit: {
                id: 4,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 5,
              quantity: 70,
              item: {
                id: 5,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Mie Sedaap Rebus"
              },
              unit: {
                id: 5,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 6,
              quantity: 900,
              item: {
                id: 6,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Mie Sedaap Tempura"
              },
              unit: {
                id: 6,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 7,
              quantity: 80,
              item: {
                id: 7,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Beras"
              },
              unit: {
                id: 7,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "L",
                description: "Liter"
              }
            },
            {
              id: 8,
              quantity: 90,
              item: {
                id: 8,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Susu"
              },
              unit: {
                id: 8,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "g",
                description: "Gram"
              }
            },
            {
              id: 9,
              quantity: 120,
              item: {
                id: 9,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Kopi Hitam"
              },
              unit: {
                id: 8,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "g",
                description: "Gram"
              }
            },
            {
              id: 10,
              quantity: 20,
              item: {
                id: 10,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Wedang Jahe"
              },
              unit: {
                id: 10,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pack",
                description: "Pack"
              }
            }
          ],
          page: 0,
          size: 100,
          total: 10
        }
      }
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
      findStocks: {
        data: {
          list: [
            {
              id: 1,
              quantity: 400,
              item: {
                id: 1,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Indomie Goreng"
              },
              unit: {
                id: 1,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 2,
              quantity: 10,
              item: {
                id: 2,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Indomie Soto"
              },
              unit: {
                id: 2,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 3,
              quantity: 100,
              item: {
                id: 3,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Indomie Panggang"
              },
              unit: {
                id: 3,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 4,
              quantity: 900,
              item: {
                id: 4,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Mie Sedaap Goreng"
              },
              unit: {
                id: 4,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 5,
              quantity: 70,
              item: {
                id: 5,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Mie Sedaap Rebus"
              },
              unit: {
                id: 5,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 6,
              quantity: 900,
              item: {
                id: 6,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Mie Sedaap Tempura"
              },
              unit: {
                id: 6,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pcs",
                description: "Pieces"
              }
            },
            {
              id: 7,
              quantity: 80,
              item: {
                id: 7,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Beras"
              },
              unit: {
                id: 7,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "L",
                description: "Liter"
              }
            },
            {
              id: 8,
              quantity: 90,
              item: {
                id: 8,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Susu"
              },
              unit: {
                id: 8,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "g",
                description: "Gram"
              }
            },
            {
              id: 9,
              quantity: 120,
              item: {
                id: 9,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Kopi Hitam"
              },
              unit: {
                id: 8,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "g",
                description: "Gram"
              }
            },
            {
              id: 10,
              quantity: 20,
              item: {
                id: 10,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Wedang Jahe"
              },
              unit: {
                id: 10,
                createdDate: "2020-03-12T13:08:28",
                modifiedDate: "2020-03-12T13:08:28",
                name: "Pack",
                description: "Pack"
              }
            }
          ],
          page: 0,
          size: 100,
          total: 10
        },
        loading: false,
        error: null
      },
      showSummary: { data: null, loading: false, error: null },
      deletedStockById: { data: null, loading: false, error: null },
      saveStock: { data: null, loading: false, error: null },
      findItemById: {
        data: null,
        loading: false,
        error: null,
        saveSucces: null
      },
      findItems: { data: null, loading: false, error: null, saveSucces: null },
      deletedItemById: {
        data: null,
        loading: false,
        error: null,
        saveSucces: null
      },
      saveItems: { data: null, loading: false, error: null, saveSucces: null }
    });
  });
  it("alternates text display when the button is clicked", () => {
    const wrapper = shallow(<ItemPage />);

    expect(wrapper).to.have.text("Turn me off");

    wrapper.find("button").simulate("click");

    expect(wrapper).to.have.text("Turn me on");
  });
});
