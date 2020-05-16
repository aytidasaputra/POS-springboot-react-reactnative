import React, { Component } from "react";
import Header from "../../../component/header";
import { TextField, withStyles, CircularProgress } from "@material-ui/core";
import { findStocksById, saveStock } from "../../../action/stocks";
import { findAll as findItems } from "../../../action/items";
import { findAll as findUnits } from "../../../action/units";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import styles from "./styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";

export class StockPage extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      form: {
        id: match.params.id,
        item: "",
        quantity: 0,
        unit: ""
      },
      itemOptions: [],
      unitOptions: [],
      error: null
    };
  }

  onBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/stocks");
  };

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findStocksById(form.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { saveData, data, error, saveError, history, itemsData } = this.props;

    if (prevProps.itemsData !== itemsData) {
      this.setState({ itemOptions: itemsData?.list });
    } else if (prevProps.data != data) {
      this.setState({ form: data });
    } else if (prevProps.saveError !== saveError) {
      this.setState({ error: saveError });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    } else if (saveData && prevProps.saveData !== saveData) {
      history.goBack();
    }
  }

  onChange = event => {
    const { name, value } = event.target;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.saveStock(this.state.form);
    console.log(this.state);
  };

  onItemChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, item: value } });
  };

  onItemOpen = event => {
    this.props.findItems();
  };

  onItemTextChange = event => {
    const { value } = event.target;
    if (value) {
      this.props.findItems({ search: { name: value } });
    } else {
      this.setState({ itemOptions: [] });
    }
  };

  onUnitChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, unit: value } });
  };

  onUnitOpen = event => {
    this.props.findUnits();
  };

  onUnitTextChange = event => {
    const { value } = event.target;
    if (value) {
      this.props.findUnits({ search: { name: value } });
    } else {
      this.setState({ unitOptions: [] });
    }
  };

  render() {
    const {
      classes,
      loading,
      saveError,
      itemsLoading,
      itemsData,
      unitsLoading,
      unitsData
    } = this.props;
    const { form, error } = this.state;
    const unitOptions = !unitsLoading && unitsData ? unitsData.list : [];
    const itemOptions = !itemsLoading && itemsData ? itemsData.list : [];
    const errorData = saveError?.data || {};
    return (
      <div>
        <Header error={error}>
          <Container>
            {!loading ? (
              <form autoComplete="off" onSubmit={this.onSubmit}>
                {form?.id && (
                  <div className={classes.formField}>
                    <TextField
                      id="id"
                      label="ID"
                      value={form.id}
                      name="id"
                      variant="filled"
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                )}
                <div className={classes.formField}>
                  <Autocomplete
                    id="combo-box-demo"
                    className={classes.select}
                    fullWidth
                    autoHighlight
                    options={!itemsLoading ? itemOptions : []}
                    loading={itemsLoading}
                    value={form?.item}
                    onOpen={this.onItemOpen}
                    onChange={this.onItemChange}
                    getOptionSelected={(option, value) => option.id == value.id}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Item"
                        error={true}
                        disabled={itemsLoading}
                        variant="outlined"
                        onChange={this.onItemTextChange}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password"
                        }}
                      />
                    )}
                  />
                </div>
                <div className={classes.formField}>
                  <TextField
                    error={errorData.quantity}
                    helperText={
                      errorData.quantity ? errorData.quantity[0] : null
                    }
                    id="quantity"
                    label="Quantity"
                    value={form?.quantity}
                    name="quantity"
                    variant="filled"
                    onChange={this.onChange}
                    fullWidth
                  />
                </div>
                <div className={classes.formField}>
                  <Autocomplete
                    id="combo-box-demo"
                    className={classes.select}
                    fullWidth
                    autoHighlight
                    options={!unitsLoading ? unitOptions : []}
                    loading={unitsLoading}
                    value={form?.unit}
                    onOpen={this.onUnitOpen}
                    onChange={this.onUnitChange}
                    getOptionSelected={(option, value) => option.id == value.id}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Unit"
                        disabled={unitsLoading}
                        variant="outlined"
                        onChange={this.onUnitTextChange}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password"
                        }}
                      />
                    )}
                  />
                </div>
                <div className={classes.buttonContainer}>
                  <button className="ui orange button" onClick={this.onBack}>
                    <i class="reply all icon"></i>
                    Back
                  </button>
                  <button className="ui orange button" disabled={loading}>
                    <i className="save icon"></i>
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <CircularProgress />
            )}
            <Snackbar
              open={this.state.error}
              autoHideDuration={3000}
              onClose={() => this.setState({ error: false })}
            >
              <Alert
                onClose={() => this.setState({ error: false })}
                elevation={6}
                variant="filled"
                severity="error"
              >
                {error?.message}
              </Alert>
            </Snackbar>
          </Container>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.findStocksById.data,
  loading: state.findStocksById.loading || state.saveStock.loading,
  error: state.findStocksById.error,
  saveData: state.saveStock.data,
  saveError: state.saveStock.error,
  itemsData: state.findItems.data,
  itemsLoading: state.findItems.loading,
  itemsError: state.findItems.error,
  unitsData: state.findUnits.data,
  unitsLoading: state.findUnits.loading,
  unitsError: state.findUnits.error
});

const mapDispatchToProps = {
  findStocksById,
  saveStock,
  findItems,
  findUnits
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StockPage)
);
