'use strict';

import {fromJS, List, Map} from 'immutable';

const questions = (state = Map({ data:List(), startIndex:0, hasMore:true }), action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default questions;
