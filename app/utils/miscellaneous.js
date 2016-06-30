'use strict';

module.exports = {

  validateEmail: function(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  validateZipCode: function(zipCode){
    let re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return re.test(zipCode);
  },

}
