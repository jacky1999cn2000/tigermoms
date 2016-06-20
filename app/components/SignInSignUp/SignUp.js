'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  AsyncStorage,
  ActivityIndicatorIOS,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const errorIcon = (<Icon name="exclamation-circle" size={10} color="red" />);
const checkIcon = (<Icon name="check-circle" size={10} color="green" />);

import Backend from '../../utils/backend';

const windowSize = Dimensions.get('window');

class SignUp extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      username: '',
      password: '',
      password2: '',
      usernameValid: false,
      passwordValid: false,
      password2Valid: false,
      usernameChecked: false,
      isLoading: false,
      isChecking: false
    }
  }

  render(){
    let spinner = this.state.isLoading ? <ActivityIndicatorIOS size='large'/> : <View/>;
    let smallspinner = <ActivityIndicatorIOS size='small'/>

    let errorIndicator = <View style={styles.icon}>{errorIcon}</View>;
    let checkIndicator = <View style={styles.icon}>{checkIcon}</View>;

    let usernameIndicator = this.state.username.trim() == '' ? null : this.state.isChecking ? smallspinner : this.state.usernameValid ? checkIndicator : errorIndicator;
    let passwordIndicator = this.state.password.trim() == '' ? null : this.state.passwordValid ? checkIndicator : errorIndicator;
    let password2Indicator = this.state.password2.trim() == '' ? null : this.state.password2Valid ? checkIndicator : errorIndicator;

    return (
        <View style={styles.container}>
          <Image style={styles.bg} source={require('../../images/bg3.jpg')} />
          <View style={styles.header}>
          </View>
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Image style={styles.inputUsername} source={require('../../images/username.png')} />
              <TextInput
                  onChangeText={(username) => {
                    this.setState({
                      username,
                      usernameChecked: false,
                      usernameValid: this.validateEmail(username)
                    })
                  }}
                  onBlur={this.check.bind(this)}
                  autoCapitalize="none"
                  autoFocus={true}
                  style={[styles.input, styles.whiteFont]}
                  placeholder="用户名(电子邮件)"
                  placeholderTextColor="#FFF"
                  value={this.state.username}
              />
              {usernameIndicator}
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputPassword} source={require('../../images/password.png')} />
              <TextInput
                  onChangeText={(password) => {
                    if(password != this.state.password2){
                      this.setState({
                        password,
                        passwordValid: !password.trim() == '',
                        password2Valid: false
                      });
                    }else{
                      this.setState({
                        password,
                        passwordValid: !password.trim() == '',
                        password2Valid: !password.trim() == ''
                      });
                    }
                  }}
                  autoCapitalize="none"
                  password={true}
                  style={[styles.input, styles.whiteFont]}
                  placeholder="输入密码"
                  placeholderTextColor="#FFF"
                  value={this.state.password}
              />
              {passwordIndicator}
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputPassword} source={require('../../images/password.png')} />
              <TextInput
                  onChangeText={(password2) => {
                    if(password2 != this.state.password){
                      this.setState({
                        password2,
                        password2Valid: false
                      });
                    }else{
                      this.setState({
                        password2,
                        password2Valid: !password2.trim() == '',
                      });
                    }
                  }}
                  autoCapitalize="none"
                  password={true}
                  style={[styles.input, styles.whiteFont]}
                  placeholder="确认密码"
                  placeholderTextColor="#FFF"
                  value={this.state.password2}
              />
              {password2Indicator}
            </View>
          </View>
          <View style={styles.spinner}>
            {spinner}
          </View>
          <TouchableHighlight
              underlayColor="white"
              onPress={this.signup.bind(this)}
          >
            <View style={styles.signin}>
              <Text style={styles.whiteFont}>注册</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>已有账户?</Text>
            <TouchableHighlight
                underlayColor="grey"
                onPress={() => {this.props.navigator.pop();}}
            >
            <Text style={styles.whiteFont}> 登录</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  async check(){
    if(this.state.usernameValid){
      this.setState({isChecking: true});
      let result = await Backend.check(this.state.username.trim());
      let resultJson = await result.json();
      console.log('resultJson.length',resultJson.length);
      if(resultJson.length == 0){
        this.setState({
          isChecking: false,
          usernameChecked: true
        });
      }else{
        this.setState({
          isChecking: false,
          usernameChecked: false,
          usernameValid: false
        });
        Alert.alert('用户名(邮箱) \'' + this.state.username + '\' 已经注册过.' )
      }
    }
  }

  async signup(){
    if(this.state.usernameValid && this.state.passwordValid && this.state.password2Valid && this.state.usernameChecked){
      this.setState({isLoading: true});
      let result = await Backend.signup(this.state.username.trim(),this.state.password.trim());
      let resultJson = await result.json();

      if(result.status != 200){
        this.setState({isLoading: false});
        Alert.alert(resultJson.message);
      }else{
        Alert.alert('注册成功,请登录');
        this.props.navigator.pop();
      }
    }else{
      Alert.alert('请输入合乎要求的用户名和密码');
      return;
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
    },
    header: {
      flex: .5,
      backgroundColor: 'transparent'
    },
    inputs: {
      marginTop: 10,
      marginBottom: 10,
      flex: .25
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderBottomColor: '#CCC',
      borderColor: 'transparent'
    },
    inputPassword: {
      marginLeft: 15,
      width: 20,
      height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    input: {
      flex: 1,
      marginLeft: 15,
      height: 20,
      fontSize: 14
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20
    },
    signin: {
      backgroundColor: '#FF3366',
      padding: 20,
      alignItems: 'center'
    },
    signup: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    spinner: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      marginBottom: 10
    }
})

export default SignUp;
