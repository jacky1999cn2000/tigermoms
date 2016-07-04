'use strict';

import { combineReducers } from 'redux';
import questions from './questions';
import userInfo from './userInfo';
import appState from './appState';

const appReducer = combineReducers({
  userInfo,
  questions,
  appState
});

export default appReducer;
