import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const initState = {
  users: []
};

const GET_USERS = "GET_USERS";
const CREATE_USER = "CREATE_USER";
const DELETE_USER = "DELETE_USER";
const UPDATE_USER = "UPDATE_USER";

const listUsers = () => {
  return dispatch => {
    return axios
      .get("/api/users")
      .then(res => res.data)
      .then(users => {
        dispatch({
          type: GET_USERS,
          users
        });
      });
  };
};
const deleteUser = id => {
  return dispatch => {
    return axios.delete(`/api/users/${id}`).then(() => {
      dispatch({
        type: DELETE_USER,
        id
      });
    });
  };
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS:
      state = Object.assign({}, state, { users: action.users });
      state.users.sort((userA, userB) => {
        return userB.rating - userA.rating;
      });
      break;
    case DELETE_USER:
      state = Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.id * 1)
      });
      break;
    // case CREATE_USER:
    //   return Object.assign({}, state, { users: action.users });
    //   break;
    // case UPDATE_USER:
    //   return Object.assign({}, state, { users: action.users });
    //   break;
  }
  return state;
};
const store = createStore(userReducer, applyMiddleware(thunk));

export default store;
export { listUsers, deleteUser };
