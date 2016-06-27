'use strict';

import { combineReducers } from 'redux';
import questions from './questions';

const appReducer = combineReducers({
  questions
});

export default appReducer;
