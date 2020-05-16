import React, { Component } from "react";
import Header from "../../../component/header";
import { TextField, withStyles, CircularProgress } from "@material-ui/core";
import { findItemById, saveItems } from "../../../action/items";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import styles from "./styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export class ItemPage extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      // ada component yang membutuhkan state tapi dia doang yang butuh.
      form: {
        id: match.params.id,
        name: ""
      },
      error: false
    };
  }

  onBack = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/items");
  };

  onsave() {
    this.props.history.push("items");
  }

  componentDidMount() {
    // metode yang dipanggil setelah komponen dipasang (dirender)
    const { form } = this.state;
    if (form.id) {
      this.props.findItemById(form.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // untuk dijalankan ketika halaman di render ulang atau di refresh
    const { saveData, data, error, saveError, history } = this.props;

    if (prevProps.data != data) {
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
    // fungsi untuk menangi perubahan
    const { name, value } = event.target;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  };

  onSubmit = event => {
    // untuk menangani ketika data itu disubmit
    event.preventDefault();
    this.props.saveItems(this.state.form);
    console.log(this.state);
  };

  render() {
    // menampilkan
    const { classes, loading, saveError } = this.props;
    const { form, error } = this.state;
    const errorData = saveError?.data || {};
    return (
      <div>
        <Header error={error}>
          <Container>
            {!loading ? ( //jika tidak loading maka tampilkan
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
                <div className={classes.buttonContainer}>
                  <button className="ui orange button" onClick={this.onBack}>
                    <i class="reply all icon"></i>
                    Back
                  </button>
                  <button
                    className="ui orange button"
                    type="submit"
                    disabled={loading}
                  >
                    <i className="save icon"></i>
                    Save
                  </button>
                </div>
              </form>
            ) : (
              // else maka tampilkan
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

const mapStateToProps = (
  state // state yang ada direducer dilempar untuk dijadikan props.
) => (
  console.log(state),
  {
    data: state.findItemById.data,
    loading: state.findItemById.loading || state.saveItems.loading,
    error: state.findItemById.error,
    saveSucces: state.saveItems.saveSucces,
    saveData: state.saveItems.data,
    saveError: state.saveItems.error
  }
);

const mapDispatchToProps = {
  // fungsi yang ngedispatch actionnya untuk dipakai
  findItemById,
  saveItems
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);
