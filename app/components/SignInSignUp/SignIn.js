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

import Backend from '../../utils/backend';

const windowSize = Dimensions.get('window');

class Signin extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  async componentWillMount(){
    //let cache = await AsyncStorage.getItem(require('../../config/appConfig').cache);
    let cache = await AsyncStorage.getItem('somethingelse');
    if(cache){
      this.props.navigator.resetTo({name:'app'});
    }
  }

  render(){
    var spinner = this.state.isLoading ?
            ( <ActivityIndicatorIOS
                hidden='true'
                size='large'/> ) :
            ( <View/>);

    return (
        <View style={styles.container}>
          <Image style={styles.bg} source={require('../../images/bg9.jpg')} />
          <View style={styles.header}>
          </View>
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Image style={styles.inputUsername} source={require('../../images/username.png')} />
              <TextInput
                  onChangeText={(username) => this.setState({username})}
                  autoCapitalize="none"
                  style={[styles.input, styles.whiteFont]}
                  placeholder="用户名"
                  placeholderTextColor="#FFF"
                  value={this.state.username}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputPassword} source={require('../../images/password.png')} />
              <TextInput
                  onChangeText={(password) => this.setState({password})}
                  autoCapitalize="none"
                  password={true}
                  style={[styles.input, styles.whiteFont]}
                  placeholder="密码"
                  placeholderTextColor="#FFF"
                  value={this.state.password}
              />
            </View>
            <View style={styles.forgotContainer}>
              <Text style={styles.greyFont}>忘记密码</Text>
            </View>
          </View>
          <View style={styles.spinner}>
            {spinner}
          </View>
          <TouchableHighlight
              underlayColor="white"
              onPress={this.signin.bind(this)}
          >
            <View style={styles.signin}>
              <Text style={styles.whiteFont}>登录</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>没有账户?</Text>
            <TouchableHighlight
                underlayColor="grey"
                onPress={() => {console.log('pressed');}}
            >
            <Text style={styles.whiteFont}> 注册</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }

  async signin(){
    if(!this.state.username.trim() || !this.state.password.trim()){
      Alert.alert('请输入用户名和密码');
      return;
    }
    this.setState({isLoading: true});
    let result = await Backend.signin(this.state.username.trim(),this.state.password.trim());
    let resultJson = await result.json();

    if(result.status != 200){
      this.setState({isLoading: false});
      Alert.alert(resultJson.message);
    }else{
      let cache = {
        userInfo: resultJson
      };
      AsyncStorage.setItem(require('../../config/appConfig').cache, JSON.stringify(cache));
      this.props.navigator.resetTo({name:'app'});
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
      position: 'absolute',
      left: 61,
      top: 12,
      right: 0,
      height: 20,
      fontSize: 14
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

export default Signin;
