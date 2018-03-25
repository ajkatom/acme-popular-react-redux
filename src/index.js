import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import Main from "./main";

const root = document.getElementById("root");

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  root
);
