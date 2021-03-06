import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Users from "./users";

const Nav = ({ users }) => {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/api/users">Users ({users.length})</NavLink>
      </li>
      <li>
        Most Popular User is:{users.length
          ? users.map((user, index) => {
              const max = Math.max.apply(Math, users.map(user => user.rating));
              if (user.rating >= max) {
                return (
                  <NavLink key={user.id} to={`/api/users/${user.id}`}>
                    {" "}
                    {user.name},
                  </NavLink>
                );
              }
            })
          : " "}
      </li>
      <li>
        <NavLink to="/api/users/:id">Create User </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps)(Nav);
