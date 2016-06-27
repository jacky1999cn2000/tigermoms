'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Route from './components/Navigator/Route';

let store = applyMiddleware(thunk)(createStore)(reducers);

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}
