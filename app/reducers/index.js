'use strict';

import { combineReducers } from 'redux';
import questions from './questions';
import userInfo from './userInfo';

const appReducer = combineReducers({
  userInfo,
  questions
});

export default appReducer;
