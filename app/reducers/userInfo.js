'use strict';

import {fromJS, List, Map} from 'immutable';

const userInfo = (state = Map({kidInfoList:List()}), action) => {
  switch (action.type) {
    case 'GET_USERINFO':
      return fromJS(action.userinfo);
    case 'CHANGE_USERINFO_ATTRIBUTEVALUES':
      for(let i=0; i<action.names.length; i++){
        state = state.set(action.names[i], action.values[i]);
      }
      return state;
    case 'ADD_USERINFO_KIDINFO':
      return state.set('kidInfoList',kidInfoList(state.get('kidInfoList'),action));
    case 'REMOVE_USERINFO_KIDINFO':
      return state.set('kidInfoList',kidInfoList(state.get('kidInfoList'),action));
    case 'EDIT_USERINFO_KIDINFO':
      return state.set('kidInfoList',kidInfoList(state.get('kidInfoList'),action));
    default:
      return state;
  }
}

const kidInfoList = (state, action) => {
  switch (action.type) {
    case 'ADD_USERINFO_KIDINFO':
      return state.push(fromJS({
        year: '2014',
        gender: '女孩'
      }));
    case 'REMOVE_USERINFO_KIDINFO':
      return state.delete(action.index);
    case 'EDIT_USERINFO_KIDINFO':
      return state.set(action.index, state.get(action.index).set(action.attribute,action.value));
    default:
      return state;
  }
}

export default userInfo;
