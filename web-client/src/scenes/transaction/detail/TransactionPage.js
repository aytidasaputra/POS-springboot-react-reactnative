import React, { Component } from "react";
import Header from "../../../component/header";
import { TextField, withStyles, CircularProgress } from "@material-ui/core";
import { findById, saveTransactions } from "../../../action/transactions";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import styles from "./styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export class TransactionPage extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      form: {
        id: match.params.id,
        amount: "",
        description: "",
        type: ""
      },
      error: false
    };
  }

  onBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/transactions");
  };

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findById(form.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { editData, data, error, editError, history } = this.props;

    if (prevProps.data != data) {
      this.setState({ form: data });
    } else if (prevProps.editError !== editError) {
      this.setState({ error: editError });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    } else if (editData && prevProps.editData !== editData) {
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
    this.props.saveTransactions(this.state.form);
    console.log(this.state);
  };

  render() {
    const { classes, loading, editError } = this.props;
    const { form, error } = this.state;
    const errorData = editError?.data || {};
    return (
      <div>
        <Header>
          <Container>
            {!loading ? (
              <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                {form?.id && (
                  <div className={classes.formField}>
                    <TextField
                      id="id"
                      label="ID"
                      value={form?.id}
                      name="id"
                      variant="filled"
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                )}
                <div className={classes.formField}>
                  <TextField
                    error={errorData.amount}
                    helperText={errorData.amount ? errorData.amount[0] : null}
                    id="amount"
                    label="amount"
                    value={form?.amount}
                    name="amount"
                    variant="filled"
                    onChange={this.onChange}
                    fullWidth
                  />
                </div>
                <div className={classes.formField}>
                  <TextField
                    error={errorData.type}
                    helperText={errorData.type ? errorData.type[0] : null}
                    id="type"
                    label="type"
                    value={form?.type}
                    name="type"
                    variant="filled"
                    onChange={this.onChange}
                    fullWidth
                  />
                </div>
                <div className={classes.formField}>
                  <TextField
                    id="description"
                    label="Description"
                    value={form?.description}
                    name="description"
                    variant="filled"
                    onChange={this.onChange}
                    fullWidth
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
              autoHideDuration={1000}
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
  data: state.findTransactionsById.data,
  loading: state.findTransactionsById.loading || state.saveTransactions.loading,
  error: state.findTransactionsById.error,
  editData: state.saveTransactions.data,
  editError: state.saveTransactions.error
});

const mapDispatchToProps = {
  findById,
  saveTransactions
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);
