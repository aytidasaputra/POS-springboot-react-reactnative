import React, { Component } from "react";
import { YearSummary } from "../../action/transactions";
import { connect } from "react-redux";
import ZingChart from "zingchart-react";
import { Button } from "semantic-ui-react";
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: "bar",
        "scale-x": {
          values: []
        },
        series: [
          {
            values: []
          }
        ]
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, data } = this.props;

    if (prevProps.data !== data) {
      this.setState({
        ...this.state,
        config: {
          ...this.state.config,
          "scale-x": {
            ...this.state.config["scale-x"],
            values: this.props.data?.entries.map(entry => entry.type)
          },
          series: [
            {
              values: this.props.data?.entries.map(entry => entry.amount)
            }
          ]
        }
      });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  onReload = () => {
    this.reload();
  };

  reload = () => {
    this.props.YearSummary(2020);
  };

  componentDidMount() {
    this.reload();
  }

  render() {
    return (
      <div>
        <ZingChart data={this.state.config} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
