'use strict';

import {fromJS, Map} from 'immutable';

const userInfo = (state = Map(), action) => {
  switch (action.type) {
    case 'GET_USERINFO':
      return fromJS(action.userinfo);
    case 'CHANGE_USERINFO_ATTRIBUTEVALUES':
      for(let i=0; i<action.names.length; i++){
        /*
          don't forget to reassign the return value to state since it's immutable!
          otherwise the new state will be lost, and we just returned the old state back
        */
        console.log('name ',action.names[i]);
        console.log('value ',action.values[i]);
        state = state.set(action.names[i], action.values[i]);
      }
      return state;
    default:
      return state;
  }
}

export default userInfo;
