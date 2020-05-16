import React, { Component } from "react";
import Header from "../../component/header";
import MUIDataTable from "mui-datatables";
import { findAll, deletedById } from "../../action/transactions";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CircularProgress, withStyles } from "@material-ui/core";
import styles from "./style";

class TransactionListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: 0,
      table: {
        sort: "asc",
        size: 20,
        page: 0,
        search: {
          name: ""
        }
      },
      error: null
    };
  }

  onReload = () => {
    this.reload();
  };

  reload = () => {
    this.props.findAll(this.state.table);
  };

  onRowClick = rowData => {
    this.props.history.push(`/transactions/${rowData[0]}`);
  };

  onAdd = () => {
    this.props.history.push(`/transactions/add`);
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
        name: "amount",
        label: "Amount",
        options: {
          sort: false
        }
      },
      {
        name: "description",
        label: "Description",
        options: {
          sort: false
        }
      },
      {
        name: "type",
        label: "Type",
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
      rowsPerPageOptions: [5, 10, 25, 50, 100],
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
        <Header error={error}>
          <Container>
            <div
              // className={classes.buttonTransactions}
              style={{ float: "left" }}
              data-inverted=""
              data-tooltip="Add your data"
              data-position="left center"
              onClick={this.onAdd}
              className="ui orange button"
            >
              <i className="plus square outline icon"></i>
              New Transactions
            </div>
            <div className={classes.buttonSummary}>
              <div class="ui button">
                <Link to="/transactions/year"> Year Summary</Link>
              </div>
              <div class="ui button">
                <Link to="/transactions/month">Month Summary</Link>
              </div>
              <div class="ui button">
                <Link to="/transactions/days">Day Summary</Link>
              </div>
            </div>
            <div class="ui divider"></div>
            <div style={{ boxSizing: "content-box" }}>
              <MUIDataTable
                error={error}
                title={"Transaction List"}
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
  deleteData: state.deletedTransactionsById.data,
  deleteError: state.deletedTransactionsById.error,
  data: state.findTransactions.data || [],
  loading:
    state.findTransactions.loading || state.deletedTransactionsById.loading,
  error: state.findTransactions.error
});

const mapDispatchToProps = {
  findAll,
  deletedById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(TransactionListPage)
);
