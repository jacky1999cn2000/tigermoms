var rootUrl = require('../config/appConfig').server;

module.exports = {

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
      console.error(error);
    }
  },


}
