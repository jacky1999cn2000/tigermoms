'use strict';

module.exports = {
  getIphoneType: function(windowSize){
    if(windowSize.width == 414 && windowSize.height == 736){
      return 'iphone6plus';
    }else if (windowSize.width == 375 && windowSize.height == 667) {
      return 'iphone6'
    }else if (windowSize.width == 320 && windowSize.height == 568) {
      return 'iphone5'
    }else if (windowSize.width == 320 && windowSize.height == 480) {
      return 'iphone4'
    }
  },

  getSignInStyleConfig: function(iphoneType){
    switch (iphoneType) {
      case 'iphone6plus':
      case 'iphone6':
        return {
          headerFlex: 0.3,

          contentFlex: 0.7,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.4,
          signinFlex: 0.3,
          spinnerFlex: 0.1,
          signupFlex: 0.2
        };
      case 'iphone5':
        return {
          headerFlex: 0.2,

          contentFlex: 0.8,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.3,
          signinFlex: 0.3,
          spinnerFlex: 0.2,
          signupFlex: 0.2
        };
      case 'iphone4':
        return {
          headerFlex: 0.005,

          contentFlex: 0.995,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.55,
          signinFlex: 0.2,
          spinnerFlex: 0.05,
          signupFlex: 0.2
        };
      default:
        return {
          headerFlex: 0.3,

          contentFlex: 0.7,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.4,
          signinFlex: 0.3,
          spinnerFlex: 0.1,
          signupFlex: 0.2
        };
    }
  },

  getSignUpStyleConfig: function(iphoneType){
    switch (iphoneType) {
      case 'iphone6plus':
      case 'iphone6':
        return {
          headerFlex: 0.2,

          contentFlex: 0.8,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.4,
          signinFlex: 0.3,
          spinnerFlex: 0.1,
          signupFlex: 0.2
        };
      case 'iphone5':
        return {
          headerFlex: 0.1,

          contentFlex: 0.9,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.4,
          signinFlex: 0.3,
          spinnerFlex: 0.1,
          signupFlex: 0.2
        };
      case 'iphone4':
        return {
          headerFlex: 0.005,

          contentFlex: 0.995,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.7,
          signinFlex: 0.1,
          spinnerFlex: 0.05,
          signupFlex: 0.15
        };
      default:
        return {
          headerFlex: 0.2,

          contentFlex: 0.8,
          //content (inputs,spinner,signin,signup)
          inputsFlex: 0.4,
          signinFlex: 0.3,
          spinnerFlex: 0.1,
          signupFlex: 0.2
        };
    }
  },

  getInitProfileStyleConfig: function(iphoneType){
    switch (iphoneType) {
      case 'iphone6plus':
      case 'iphone6':
        return {
          contentOffset: {x:0,y:0}
        };
      case 'iphone5':
        return {
          contentOffset: {x:0,y:20}
        };
      case 'iphone4':
        return {
          contentOffset: {x:0,y:100}
        };
      default:
        return {
          contentOffset: {x:0,y:0}
        };
    }
  }

}
