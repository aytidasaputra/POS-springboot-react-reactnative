import React, { Component } from "react";
import { Icon, Menu, Segment, Sidebar, Header } from "semantic-ui-react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import styles from "./style";
export default class SidebarExampleSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: true,
      alertShow: false,
      visible: true,
      error: false
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error != error) {
      this.setState({ alertShow: true });
    }
  }

  hideAlert = () => {
    this.setState({ alertShow: false });
  };

  handleSidebarHide = () => this.setState({ visible: false });
  handleSidebarToggle = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));

  render() {
    const { children, error } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <div className="header-top">
          <div className="ui inverted menu">
            <Link
              className="active red item"
              onClick={this.handleSidebarToggle}
              to="#"
            >
              <div>
                <Icon name="tasks" />
              </div>
            </Link>
          </div>
        </div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item id="menu" as={Link} to="/">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/items">
              <Icon name="folder open outline" />
              Items
            </Menu.Item>
            <Menu.Item as={Link} to="/units">
              <Icon name="folder open outline" />
              Units
            </Menu.Item>
            <Menu.Item as={Link} to="/transactions">
              <Icon name="folder open outline" />
              Transactions
            </Menu.Item>
            <Menu.Item as={Link} to="/stocks">
              <Icon name="folder open outline" />
              Stocks
            </Menu.Item>
          </Sidebar>
          <div
            className="header-header"
            style={{
              width: this.state.visible ? "calc(100% - 200px)" : "100%",
              transform: `translateX(${50 + (this.state.visible ? 150 : 0)}px)`,
              transition: "all .5s ease"
            }}
          >
            <h1>
              Web <Badge color="secondary">Application</Badge>
            </h1>
          </div>
          <Sidebar.Pusher className="main-header">
            <Snackbar
              open={this.state.error}
              autoHideDuration={3000}
              onClose={() => this.setState({ error: false })}
            >
              <Alert
                onClose={this.hideAlert}
                elevation={6}
                variant="filled"
                severity="error"
              ></Alert>
            </Snackbar>
            <Segment
              basic
              style={{
                width: this.state.visible ? "calc(100% - 150px)" : "100%",
                transform: `translateX(${this.state.visible ? 150 : 0}px)`,
                transition: "all .5s ease"
              }}
            >
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <div className="footer">
          <div className="ui inverted black vertical footer segment">
            <div className="ui center aligned container">
              <h6>
                &copy; Copyright 2020 | All rights reserved | Aditya Saputra
              </h6>
              <a href="https://www.linkedin.com/in/aditya-saputra-6a847b170/">
                <i className="facebook square icon big"></i>
              </a>
              <a href="https://www.linkedin.com/in/aditya-saputra-6a847b170/">
                <i className="twitter square icon big"></i>
              </a>
              <a href="https://github.com/adityasaputra-skom">
                <i className="linkedin square icon big"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  error: PropTypes.Object
};
