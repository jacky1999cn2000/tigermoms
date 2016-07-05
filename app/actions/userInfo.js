'use strict';

import { TYPES } from './types';
var rootUrl = require('../config/appConfig').server;

export const getUserInfo = (userinfo) => {
  return {
    type: TYPES.GET_USERINFO,
    userinfo
  };
}

export function getUserInfoFromServer(username){
  let url = `${rootUrl}/userinfo/data/${username}`;
  return function(dispatch){
    return fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch(getUserInfo(json));
    })
    .catch(err => {
      console.log('err: ',err);
    });
  }
}

export const changeUserInfoAttributeValues = (names,values) => {
  return {
    type: TYPES.CHANGE_USERINFO_ATTRIBUTEVALUES,
    names,
    values
  };
}