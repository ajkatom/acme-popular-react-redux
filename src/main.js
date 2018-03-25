import React, { Component } from "react";
import Nav from "./nav";
import { HashRouter as Router, Route } from "react-router-dom";
import { listUsers } from "./store";
import Users from "./users";
import { connect } from "react-redux";

class Main extends Component {
  componentDidMount() {
    this.props.listUsers();
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/api/users" exact render={() => <Users />} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listUsers: () => dispatch(listUsers())
  };
};

export default connect(null, mapDispatchToProps)(Main);
