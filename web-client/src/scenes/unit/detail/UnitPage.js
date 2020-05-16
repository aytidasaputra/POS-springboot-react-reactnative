import React, { Component } from "react";
import Header from "../../../component/header";
import { TextField, withStyles, CircularProgress } from "@material-ui/core";
import { findById, saveUnit } from "../../../action/units";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import styles from "./styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "./Confirm.css";

export class UnitPage extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      form: {
        id: match.params.id,
        name: "",
        description: ""
      },
      error: false,
      open: false
    };
  }

  onBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/units");
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
    this.props.saveUnit(this.state.form);
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
                    error={errorData.name}
                    helperText={errorData.name ? errorData.name[0] : null}
                    id="name"
                    label="Name"
                    value={form?.name}
                    name="name"
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
  data: state.findUnitById.data,
  loading: state.findUnitById.loading || state.saveUnit.loading,
  error: state.findUnitById.error,
  editData: state.saveUnit.data,
  editError: state.saveUnit.error
});

const mapDispatchToProps = {
  findById,
  saveUnit
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UnitPage)
);
