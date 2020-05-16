import ItemListPage from "../scenes/item";
import ItemPage from "../scenes/item/detail";
import UnitListPage from "../scenes/unit";
import UnitPage from "../scenes/unit/detail";
import TransactionListPage from "../scenes/transaction";
import YearSummmary from "../scenes/transaction/summary/YearSummary";
import MonthSummmary from "../scenes/transaction/summary/MonthSummary";
import DaySummmary from "../scenes/transaction/summary/DaySummary";
import TransactionPage from "../scenes/transaction/detail";
import StockListPage from "../scenes/stock";
import StockSummary from "../scenes/stock/summary/StockSummary";
import StockPage from "../scenes/stock/detail";
import Home from "../scenes/home";
import ErrorPage from "../scenes/error";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/items/add",
    component: ItemPage
  },
  {
    path: "/items/:id",
    component: ItemPage
  },
  {
    path: "/items",
    component: ItemListPage
  },
  {
    path: "/units/add",
    component: UnitPage
  },
  {
    path: "/units/:id",
    component: UnitPage
  },
  {
    path: "/units",
    component: UnitListPage
  },
  {
    path: "/transactions/year",
    component: YearSummmary
  },
  {
    path: "/transactions/month",
    component: MonthSummmary
  },
  {
    path: "/transactions/days",
    component: DaySummmary
  },
  {
    path: "/transactions/add",
    component: TransactionPage
  },
  {
    path: "/transactions/:id",
    component: TransactionPage
  },
  {
    path: "/transactions",
    component: TransactionListPage
  },
  {
    path: "/stocks/add",
    component: StockPage
  },
  {
    path: "/stocks/summary",
    component: StockSummary
  },
  {
    path: "/stocks/:id",
    component: StockPage
  },
  {
    path: "/stocks",
    component: StockListPage
  },
  {
    path: "*",
    component: ErrorPage,
    props: {
      code: 404
    }
  }
];

export default routes;
