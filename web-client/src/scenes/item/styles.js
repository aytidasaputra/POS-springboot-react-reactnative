const styles = theme => ({
  formField: {
    padding: theme.spacing(2)
  },
  formButton: {
    pading: theme.spacing(2),
    diplay: "flex",
    justifyContent: "flext-end"
  },
  buttonContainer: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
});

export default styles;
