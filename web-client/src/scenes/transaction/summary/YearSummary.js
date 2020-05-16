import React, { Component } from "react";
import Header from "../../../component/header";
import MUIDataTable from "mui-datatables";
import { YearSummary } from "../../../action/transactions";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { CircularProgress, withStyles } from "@material-ui/core";
import styles from "./styles";
class YearSummarys extends Component {
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
          year: 2020
        }
      },
      error: null
    };
  }

  onBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/transactions");
  };

  onReload = () => {
    this.reload();
  };

  reload = () => {
    this.props.YearSummary(this.state.table.search.year);
  };

  componentDidMount() {
    this.reload();
  }

  onChangeRowsPerPage = numbersOfRow => {
    const { table } = this.state;
    this.setState({ table: { ...table, size: numbersOfRow } });
  };

  componentDidUpdate(prevProps, prevState) {
    const { error, data } = this.props;

    if (prevProps.data !== data) {
      this.setState({ data: data?.entries, total: data?.total });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  onChangePage = currentPage => {
    const { table } = this.state;
    this.setState({ table: { ...table, search: { year: currentPage } } });
  };

  onSearchChange = searchText => {
    const { table } = this.state;
    this.setState({ table: { ...table, search: { year: searchText } } });
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
        name: "entries.year",
        label: "Year",
        options: {
          sort: false
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
        name: "type",
        label: "Type",
        options: {
          sort: false
        }
      }
    ];

    const options = {
      // serverSide: true,
      // page: table.page,
      // filter: false,
      // count: total,
      rowsPerPage: 1, //table.size,
      rowsPerPageOptions: [1, 10, 25, 50, 100],
      // onChangeRowsPerPage: this.onChangeRowsPerPage,
      // onChangePage: this.onChangePage,
      // onSearchChange: this.onSearchChange,
      // onColumnSortChange: this.onColumnSortChange,
      // searchText: table.search.name,
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
            <div style={{ boxSizing: "content-box" }}>
              <MUIDataTable
                error={error}
                title={"Transaction Summary By Year"}
                data={!loading ? data : []}
                columns={columns}
                options={options}
              />
            </div>
            <div className={classes.buttonContainer}>
              <button className="ui orange button" onClick={this.onBack}>
                <i class="reply all icon"></i>Back
              </button>
            </div>
          </Container>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.findSummaryByYear.data,
  loading: state.findSummaryByYear.loading,
  error: state.findSummaryByYear.error
});

const mapDispatchToProps = {
  YearSummary
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(YearSummarys)
);
