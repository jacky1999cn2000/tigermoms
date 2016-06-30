'use strict';

var rootUrl = require('../config/appConfig').geocoding;

module.exports = {

  getLocationByZipCode: async function(zipCode){
    let url = `${rootUrl}?address=${zipCode}`;

    try{
      let response = await fetch(url);
      return response;
    }catch(ex){
      console.error(error);
    }
  },

  getLocationByLatLng: async function(lat,lng){
    let url = `${rootUrl}?latlng=${lat},${lng}`;

    try{
      let response = await fetch(url);
      return response;
    }catch(ex){
      console.error(error);
    }
  },
}

/*
  客户端的话不用担心quota
  http://stackoverflow.com/questions/20087969/google-javascript-api-geocoding-limits
*/
