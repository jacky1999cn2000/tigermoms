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
  DeviceEventEmitter,
  LayoutAnimation,
  AsyncStorage,
  ActivityIndicatorIOS,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const wechatIcon = (<Icon name="wechat" size={30} color="#FF3366" />);

import Backend from '../../utils/backend';

const windowSize = Dimensions.get('window');

class SignIn extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      visibleHeight: windowSize.height,
    }
  }

  async componentWillMount(){
    this.keyboardDidShowListener = DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));

    //let cache = await AsyncStorage.getItem(require('../../config/appConfig').cache);
    let cache = await AsyncStorage.getItem('somethingelse');
    if(cache){
      this.props.navigator.resetTo({name:'app'});
    }
  }

  componentWillUnmount(){
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow(e){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    let visibleHeight = windowSize.height - e.endCoordinates.height
    this.setState({visibleHeight:visibleHeight})
  }

  keyboardDidHide(e){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({
      visibleHeight: windowSize.height
    })
  }

  render(){
    let headerFlex = this.state.visibleHeight == windowSize.height ? 0.5 : 0.1;

    let spinner = this.state.isLoading ? <ActivityIndicatorIOS size='large'/> : <View/>;

    return (
        <View style={[styles.container, {height:this.state.visibleHeight}]}>
          <Image style={styles.bg} source={require('../../images/bg9.jpg')} />

          <View style={[styles.header,{flex: headerFlex}]}>
          </View>

          <View style={styles.content}>
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

              <View style={styles.wechat}>
                <Text style={styles.greyFont}>微信登录   </Text>
                <TouchableHighlight
                    underlayColor="grey"
                    onPress={() => {this.props.navigator.push({name:'signup'});}}
                >
                  {wechatIcon}
                </TouchableHighlight>
              </View>

              <View style={styles.register}>
                <Text style={styles.greyFont}>没有账户?</Text>
                <TouchableHighlight
                    underlayColor="grey"
                    onPress={() => {this.props.navigator.push({name:'signup'});}}
                >
                <Text style={styles.whiteFont}> 注册</Text>
                </TouchableHighlight>
              </View>

            </View>
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
    bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
    },

    /* * * * * * * * * * * * */
    //container (header, content)
    container: {
      backgroundColor: 'transparent'
    },
    /* * * * * * * * * * * * */

    /* * * * * * * * * * * * */
    header: {
      backgroundColor: 'transparent'
    },
    //content (inputs,spinner,signin,signup)
    content: {
      flex: .5
    },
    /* * * * * * * * * * * * */

    /* * * * * * * * * * * * */
    inputs: {
      flex: .3,
      marginTop: 20,
      marginBottom: 10
    },
    spinner: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      marginBottom: 10
    },
    signin: {
      flex: .3,
      backgroundColor: '#FF3366',
      padding: 20,
      alignItems: 'center'
    },
    //signup (wechat,register)
    signup: {
      flex: .2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    /* * * * * * * * * * * * */

    /* * * * * * * * * * * * */
    wechat: {
      flex: .5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    register: {
      flex: .5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    /* * * * * * * * * * * * */

    /* * * * * * * * * * * * */
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
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
    /* * * * * * * * * * * * */
})

export default SignIn;
