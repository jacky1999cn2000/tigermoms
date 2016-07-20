'use strict';

import {fromJS, Map} from 'immutable';

const appState = (state = Map({
  genderModalVisible:false,
  kidAgeModalVisible:false,
  kidGenderModalVisible:false,
  kidInfoListIndex:0, //indicates当前是在编辑 userinfo.kidInfoList 中的哪个 kidInfo
  contentOffset:{x:0,y:0}
}), action) => {
  switch (action.type) {
    case 'CHANGE_APPSTATE_ATTRIBUTEVALUES':
      for(let i=0; i<action.names.length; i++){
        state = state.set(action.names[i], action.values[i]);
      }
      return state;
    default:
      return state;
  }
}

export default appState;
