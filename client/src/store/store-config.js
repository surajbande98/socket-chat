import thunk from "redux-thunk";

import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/root-reducers';

// compose allows us to enhance our own enhancers (dev tool is one kind of enhancer) or middlewares
const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
