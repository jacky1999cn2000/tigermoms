'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* actions */
import { getUserInfoFromServer, changeUserInfoAttributeValues } from '../../actions/userInfo'

/* subcomponents */
import Header from './editprofilesubcomponents/Header';
import ContentOne from './editprofilesubcomponents/ContentOne';
import ContentTwo from './editprofilesubcomponents/ContentTwo';

/* utils */
import Miscellaneous from '../../utils/miscellaneous';

class EditProfile extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      //控制信息
      step: 2,

    }
  }

  async componentWillMount(){
    /*
      this.props.route.init=true: 在Signup之后进入EditProfile时
      this.props.route.init=false: 在Profile点击'编辑'进入EditProfile时
    */

    //let cache = await AsyncStorage.getItem('somethingelse');
    let cache = await AsyncStorage.getItem(require('../../config/appConfig').cache);
    let cacheObj = JSON.parse(cache);

    //如果this.props.route.init=false,则不是初始化,那么从server上取得完整的userInfo
    //否则的话只需要把username更新一下即可(userInfo会用默认的{})
    //if(!this.props.route.init){
    if(false){
      this.props.dispatch(getUserInfoFromServer('jacky@gmail.com'));
    }else{
      this.props.dispatch(changeUserInfoAttributeValues(['username'],[cacheObj.userInfo.username]));
    }
  }

  render(){
    let content = this.state.step == 1 ?
      <ContentOne style={styles.content} step={this.state.step} buttonClick={this.buttonClick.bind(this)} /> :
      <ContentTwo style={styles.content} step={this.state.step} buttonClick={this.buttonClick.bind(this)} />;

    return (
        <View style={styles.container}>
          <Header style={styles.header} />
          {content}
        </View>
    );
  }

  buttonClick(){
    if(this.state.step == 1){
      if (Miscellaneous.isUndefined(this.props.userInfo.get('nickname'))) {
        Alert.alert('请填写昵称');
      }else if (
        Miscellaneous.isUndefined(this.props.userInfo.get('gender')) ||
        this.props.userInfo.get('gender') == '请选择性别') {
        Alert.alert('请选择性别');
      }else if (
        Miscellaneous.isUndefined(this.props.userInfo.get('address')) ||
        Miscellaneous.isUndefined(this.props.userInfo.get('city')) ||
        Miscellaneous.isUndefined(this.props.userInfo.get('county')) ||
        Miscellaneous.isUndefined(this.props.userInfo.get('longitude')) ||
        Miscellaneous.isUndefined(this.props.userInfo.get('latitude'))
      ){
        Alert.alert('请通过邮编或手机定位居住城市');
      }else{
        this.setState({step:2});
      }
    }else{
      this.props.navigator.resetTo({name:'app'});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3366'
  },
  content: {
    flex: 0.9
  }
});

EditProfile = connect(
  state => {
    return { userInfo:state.userInfo };
  },
  dispatch => {
    return { dispatch }
  }
)(EditProfile)

export default EditProfile;
