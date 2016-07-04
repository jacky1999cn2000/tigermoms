'use strict';

import {fromJS, Map} from 'immutable';

const appState = (state = Map({genderModalVisible:false}), action) => {
  switch (action.type) {
    case 'CHANGE_APPSTATE_ATTRIBUTEVALUES':
      for(let i=0; i<action.names.length; i++){
        /*
          don't forget to reassign the return value to state since it's immutable!
          otherwise the new state will be lost, and we just returned the old state back
        */
        state = state.set(action.names[i], action.values[i]);
      }
      return state;
    default:
      return state;
  }
}

export default appState;
