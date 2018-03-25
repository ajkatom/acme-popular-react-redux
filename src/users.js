import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { deleteUser } from "./store";
import { connect } from "react-redux";

const Users = ({ users }) => {
  return (
    <ul>
      {users.map(user => {
        return (
          <li key={user.id}>
            <Link to={"/api/userForm"}>{user.name}</Link>
            <button value={user.id} onClick={deleteUser(user.id)}>
              DELETE
            </button>
            <br />
            <button value="+">+</button> {user.rating}{" "}
            <button value="+">-</button>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
