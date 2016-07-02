'use strict';

var rootUrl = require('../config/appConfig').server;

module.exports = {

  check: async function(username){
    let url = `${rootUrl}/user/check/` + username;

    try{
      let response = await fetch(url,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });
      return response;
    }catch(ex){
      console.error(ex);
    }
  },

  signup: async function(username,password){
    let url = `${rootUrl}/user/signup`;

    try{
      let response = await fetch(url,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username: username,
          password: password
        })
      });
      return response;
    }catch(ex){
      console.error(ex);
    }
  },

  signin: async function(username,password){
    let url = `${rootUrl}/user/signin`;

    try{
      let response = await fetch(url,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username: username,
          password: password
        })
      });
      return response;
    }catch(ex){
      console.error(ex);
    }
  }

}
