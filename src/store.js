import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const initState = {
  users: [],
  ers: ""
};

const GET_USERS = "GET_USERS";
const CREATE_USER = "CREATE_USER";
const DELETE_USER = "DELETE_USER";
const UPDATE_USER = "UPDATE_USER";
const ERROR_HANDELING = "ERROR_HANDELING";
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
const createUser = user => {
  return dispatch => {
    return axios
      .post("/api/users", user)
      .then(res => res.data)
      .then(userData => {
        dispatch({
          type: CREATE_USER,
          userData
        });
      })
      .catch(error => {
        const { status } = error.response;

        if (error.response) {
          dispatch({
            type: ERROR_HANDELING,
            status
          });
        }
      });
  };
};
const updateUser = (user, id) => {
  return dispatch => {
    return axios
      .put(`/api/users/${id}`, user)
      .then(res => res.data)
      .then(userData => {
        dispatch({
          type: UPDATE_USER,
          userData
        });
      })
      .catch(error => {
        const { status } = error.response;

        if (error.response) {
          dispatch({
            type: ERROR_HANDELING,
            status
          });
        }
      });
  };
};

const incramentRating = user => {
  user.rating++;
  return dispatch => {
    return axios
      .put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(userData => {
        dispatch({
          type: UPDATE_USER,
          userData
        });
      });
  };
};

const decramentRating = user => {
  user.rating--;
  return dispatch => {
    return axios
      .put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(userData => {
        dispatch({
          type: UPDATE_USER,
          userData
        });
      });
  };
};

const userReducer = (state = initState, action) => {
  const { users } = state;
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
    case CREATE_USER:
      state = Object.assign({}, state, {
        users: [...users, action.userData],
        ers: ""
      });
      break;
    case UPDATE_USER:
      let index = users.findIndex(user => user.id === action.userData.id * 1);
      state = Object.assign({}, state, {
        users: [
          ...users.slice(0, index),
          action.userData,
          ...users.slice(index + 1)
        ],
        ers: ""
      });
      break;
    case ERROR_HANDELING:
      state = Object.assign({}, state, { ers: action.status });
      break;
  }
  return state;
};

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;
export {
  listUsers,
  deleteUser,
  createUser,
  updateUser,
  incramentRating,
  decramentRating
};
