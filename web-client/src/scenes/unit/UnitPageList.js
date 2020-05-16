import React, { Component } from "react";
import Header from "../../component/header";
import MUIDataTable from "mui-datatables";
import { findAll, deletedById, addUnits } from "../../action/units";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { CircularProgress, withStyles, Backdrop } from "@material-ui/core";
import styles from "./style";

class UnitPageList extends Component {
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
    this.props.history.push(`/units/${rowData[0]}`);
  };

  onAdd = () => {
    this.props.history.push(`/units/add`);
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
        name: "name",
        label: "Name",
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
              className="ui button"
              data-inverted=""
              data-tooltip="Add your data"
              data-position="left center"
              onClick={this.onAdd}
              className="ui orange button"
            >
              <i className="plus square outline icon"></i>
              New Unit
            </div>
            <div style={{ boxSizing: "content-box" }}>
              <MUIDataTable
                error={error}
                title={"Units List"}
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
  deleteData: state.deletedById.data,
  deleteError: state.deletedById.error,
  data: state.findUnits.data || [],
  loading: state.findUnits.loading || state.deletedById.loading,
  error: state.findUnits.error
});

const mapDispatchToProps = {
  findAll,
  deletedById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UnitPageList)
);
