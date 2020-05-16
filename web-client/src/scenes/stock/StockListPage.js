import React, { Component } from "react";
import Header from "../../component/header";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import {
  findAll as findStocks,
  deletedStockById as deletedById
} from "../../action/stocks";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { CircularProgress, withStyles } from "@material-ui/core";
import styles from "./styles";

class StockListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      table: {
        sort: "asc",
        size: 100,
        page: 0,
        search: {
          id: "",
          quantity: "",
          item: "",
          unit: ""
        }
      },
      error: null
    };
  }

  onReload = () => {
    this.reload();
  };

  reload = () => {
    this.props.findStocks(this.state.table);
  };

  componentDidAddUnit() {
    const { table } = this.state;
  }

  onRowClick = rowData => {
    this.props.history.push(`/stocks/${rowData[0]}`);
  };

  onAdd = () => {
    this.props.history.push(`/stocks/add`);
  };

  componentDidMount() {
    this.reload();
  }

  onChangeRowsPerPage = numbersOfRow => {
    const { table } = this.state;
    this.setState({ table: { ...table, size: numbersOfRow } });
  };

  componentDidUpdate(prevProps, prevState) {
    const { deleteData, deleteError, error, data } = this.props;
    const { table } = this.state;
    console.log(data);

    if (prevProps.data !== data) {
      this.setState({ data: data.list, total: data.total });
    } else if (
      prevState.table !== table ||
      prevProps.deleteData !== deleteData
    ) {
      this.reload();
    } else if (deleteError && prevProps.deleteError !== deleteError) {
      this.setState({ error: deleteError });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  onChangePage = currentPage => {
    const { table } = this.state;
    this.setState({ table: { ...table, search: { name: currentPage } } });
  };

  onSearchChange = searchText => {
    const { table } = this.state;
    this.setState({ table: { ...table, search: { name: searchText } } });
  };

  onColumnSortChange = (changedColumn, direction) => {
    const { table } = this.state;
    const sort = direction === "descending" ? "desc" : "asc";
    this.setState({ table: { ...table, sort } });
  };

  onRowsDelete = rowsDeleted => {
    const { list } = this.props.data;
    const e = list[rowsDeleted.data[0].index];
    this.props.deletedById(e.id);
    return false;
  };

  render() {
    const { classes, loading } = this.props;
    const { data, total, error, table } = this.state;

    const columns = [
      {
        name: "id",
        label: "ID",
        options: {
          sortDirection: table.sort
        }
      },
      {
        name: "item.name",
        label: "Item",
        options: {
          sort: false
        }
      },
      {
        name: "quantity",
        label: "Quantity",
        options: {
          sort: false
        }
      },
      {
        name: "unit.name",
        label: "Unit",
        options: {
          sort: false
        }
      }
    ];

    const options = {
      serverSide: true,
      page: table.page,
      filter: false,
      count: total,
      onRowsDelete: this.onRowsDelete,
      onRowClick: this.onRowClick,
      rowsPerPage: table.size,
      rowsPerPageOptions: [1, 2, 3, 5, 10],
      onChangeRowsPerPage: this.onChangeRowsPerPage,
      onChangePage: this.onChangePage,
      onSearchChange: this.onSearchChange,
      onColumnSortChange: this.onColumnSortChange,
      searchText: table.search.name,
      selectableRows: "single",
      textLabels: {
        body: {
          noMatch: loading ? (
            <CircularProgress />
          ) : (
            "Sorry, no matching records found"
          )
        }
      }
    };
    return (
      <div>
        <Header>
          <Container error={error}>
            <div style={{ float: "left" }}>
              <div
                class="ui button"
                data-inverted=""
                data-tooltip="Add your data"
                data-position="left center"
                onClick={this.onAdd}
                className="ui orange button"
              >
                <i className="plus square outline icon"></i>
                New Stocks
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <div
                data-inverted=""
                data-tooltip="Stock Summary"
                data-position="left center"
                className="ui orange button"
              >
                <i className="plus square outline icon"></i>
                <Link to="/stocks/summary" className={classes.link}>
                  Summary
                </Link>
              </div>
            </div>

            <div style={{ boxSizing: "content-box" }}>
              <MUIDataTable
                error={error}
                title={"Stock List"}
                data={!loading ? data : []}
                columns={columns}
                options={options}
              />
            </div>
            <div className={classes.buttonContainer}>
              <button
                className="ui orange button"
                onClick={this.reload}
                disabled={loading}
              >
                <i className="sync icon"></i>Reload
              </button>
            </div>
          </Container>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deleteData: state.deletedStockById.data,
  deleteError: state.deletedStockById.error,
  data: state.findStocks.data || [],
  loading: state.findStocks.loading || state.deletedStockById.loading,
  error: state.findStocks.error
});

const mapDispatchToProps = {
  findStocks,
  deletedById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StockListPage)
);
