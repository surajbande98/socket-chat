import React from "react";

import { Provider } from "react-redux";

import { Route, Switch } from "react-router-dom";

import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

import LoginComponent from "./containers/Auth/Login/Login";

import SignupComponent from "./containers/Auth/Signup/Signup";
import PostsComponent from './containers/Posts/Post';

import store from "./store/store-config";

//MemoryRouter -> use hiding route in url
const routing = (
  <Provider store={store}>
    <Router>
      {/* <MemoryRouter> */}
      <Switch>
        <Route exact path="/" component={LoginComponent}></Route>
        <Route path="/signup" component={SignupComponent}></Route>
        <Route path="/posts" component={PostsComponent}></Route>
      </Switch>
      {/* </MemoryRouter> */}
    </Router>
  </Provider>
);

export default routing;
