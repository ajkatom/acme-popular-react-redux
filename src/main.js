import React, { Component } from "react";
import Nav from "./nav";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { listUsers } from "./store";
import Users from "./users";
import { connect } from "react-redux";
import UserForm from "./userForm";

class Main extends Component {
  componentDidMount() {
    this.props.listUsers();
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/api/users" exact render={() => <Users />} />
            <Route
              path="/api/users/:id"
              exact
              render={({ match, history }) => (
                <UserForm history={history} match={match} />
              )}
            />
          </Switch>
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
