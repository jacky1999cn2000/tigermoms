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
  },

  createUserInfo: async function(username,nickname,gender,city,county,address,longitude,latitude,kidInfoList,
  introduction,wechat,weibo,facebook,isWechatPrivate,isWeiboPrivate,isFacebookPrivate,hasKids){
    let url = `${rootUrl}/userinfo/create`;

    try{
      let response = await fetch(url,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username: username,
          nickname: nickname,
          gender: gender,
          city: city,
          county: county,
          address: address,
          longitude: longitude,
          latitude: latitude,
          kidInfoList: kidInfoList,
          introduction: introduction,
          wechat: wechat,
          weibo: weibo,
          facebook: facebook,
          isWechatPrivate: isWechatPrivate,
          isWeiboPrivate: isWeiboPrivate,
          isFacebookPrivate: isFacebookPrivate,
          hasKids: hasKids
        })
      });
      return response;
    }catch(ex){
      console.error(ex);
    }
  }

}
