import { withTheme } from "@material-ui/core";

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
  link: {
    color: "white"
  }
});

export default styles;
