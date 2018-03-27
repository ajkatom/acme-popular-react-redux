import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { deleteUser, incramentRating, decramentRating } from "./store";
import { connect } from "react-redux";

const Users = ({
  ers,
  users,
  deleteUser,
  incramentRating,
  decramentRating
}) => {
  return (
    <div>
      <h1>{ers ? "you are not allowed to create duplicates" : ""}</h1>

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
    </div>
  );
};

const mapStateToProps = ({ users, ers }) => {
  return {
    users,
    ers
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
