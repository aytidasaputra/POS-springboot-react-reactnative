import React, { Component } from "react";
import Header from "../../../component/header";
import MUIDataTable from "mui-datatables";
import { showSummary } from "../../../action/stocks";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { CircularProgress, withStyles } from "@material-ui/core";
import styles from "./styles";

class StockSummary extends Component {
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
          item: ""
        }
      },
      error: null
    };
  }

  onBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/stocks");
  };

  onReload = () => {
    this.reload();
  };

  reload = () => {
    this.props.showSummary(this.state.table);
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
      this.setState({ data: data, total: data.total });
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
    this.setState({ table: { ...table, search: { item: currentPage } } });
  };

  onSearchChange = searchText => {
    const { table } = this.state;
    this.setState({ table: { ...table, search: { item: searchText } } });
  };

  onColumnSortChange = (changedColumn, direction) => {
    const { table } = this.state;
    const sort = direction === "descending" ? "desc" : "asc";
    this.setState({ table: { ...table, sort } });
  };

  render() {
    const { classes, loading } = this.props;
    const { data, total, error, table } = this.state;

    const columns = [
      {
        name: "name",
        label: "Name",
        options: {
          sortDirection: table.sort
        }
      },
      {
        name: "quantity",
        label: "Quantity",
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
            <div style={{ boxSizing: "content-box" }}>
              <MUIDataTable
                error={error}
                title={"Stock Summary"}
                data={!loading ? data : []}
                columns={columns}
                options={options}
              />
            </div>
            <div className={classes.buttonContainer}>
              <button className="ui orange button" onClick={this.onBack}>
                <i class="reply all icon"></i>
                Back
              </button>
            </div>
          </Container>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.showSummary.data || [],
  loading: state.showSummary.loading,
  error: state.showSummary.error
});

const mapDispatchToProps = {
  showSummary
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StockSummary)
);
