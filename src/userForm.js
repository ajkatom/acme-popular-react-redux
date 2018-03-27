import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { createUser, updateUser } from "./store";
import { connect } from "react-redux";
class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      rating: "0"
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState(user) {
    this.setState({ name: user.name, rating: user.rating });
  }
  onChangeName(ev) {
    this.setState({ name: ev.target.value });
  }
  onChangeRating(ev) {
    this.setState({ rating: ev.target.value });
  }

  render() {
    const { users, match, history } = this.props;
    const id = match.params.id * 1;

    return (
      <div>
        {!id ? (
          <div>
            <h1>Create User</h1>
            <input defaultValue="" onChange={this.onChangeName} />
            <input
              defaultValue="0"
              type="number"
              onChange={this.onChangeRating}
            />
          </div>
        ) : users.length ? (
          users.map(user => {
            if (user.id === id) {
              if (!this.state.name || !this.state.rating)
                this.changeState(user);
              return (
                <div key={user.id}>
                  <h1>{user.name}</h1>
                  <input
                    defaultValue={user.name}
                    onChange={this.onChangeName}
                  />
                  <input
                    defaultValue={user.rating}
                    type="number"
                    onChange={this.onChangeRating}
                  />
                </div>
              );
            }
          })
        ) : null}

        {id ? (
          <button
            onClick={() => {
              this.props.updateUser(this.state, id);
              history.push("/api/users");
            }}
          >
            update
          </button>
        ) : (
          <button
            onClick={() => {
              this.props.createUser(this.state);
              history.push("/api/users");
            }}
          >
            create
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: state => {
      dispatch(createUser(state));
    },
    updateUser: (state, id) => {
      dispatch(updateUser(state, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
