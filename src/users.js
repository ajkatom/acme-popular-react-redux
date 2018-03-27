import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { deleteUser, incramentRating, decramentRating } from "./store";
import { connect } from "react-redux";

const Users = ({ users, deleteUser, incramentRating, decramentRating }) => {
  return (
    <ul>
      {users.map(user => {
        return (
          <li key={user.id}>
            <Link to={`/api/users/${user.id}`}>{user.name}</Link>
            <button value={user.id} onClick={() => deleteUser(user.id)}>
              DELETE
            </button>
            <br />
            <button value="+" onClick={() => incramentRating(user)}>
              +
            </button>{" "}
            {user.rating}{" "}
            <button value="-" onClick={() => decramentRating(user)}>
              -
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: id => {
      dispatch(deleteUser(id));
    },
    incramentRating: user => {
      dispatch(incramentRating(user));
    },
    decramentRating: user => {
      dispatch(decramentRating(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
