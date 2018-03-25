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
          ? users.map(user => {
              if (user.rating === Object.values(users[0])[2]) {
                return (
                  <NavLink key={user.id} to="/api/userForm">
                    {" "}
                    {user.name},
                  </NavLink>
                );
              }
            })
          : " "}
      </li>
      <li>
        <NavLink to="/api/userForm">Create User </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps)(Nav);
