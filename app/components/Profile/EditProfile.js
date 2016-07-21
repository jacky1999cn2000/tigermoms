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
import Backend from '../../utils/backend';

class EditProfile extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      //控制信息
      step: 1,

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

  async buttonClick(){
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
      if(!Miscellaneous.isUndefined(this.props.userInfo.get('hasKids')) && this.props.userInfo.get('hasKids') && this.props.userInfo.get('kidInfoList').size == 0){
        let parentRole = this.props.userInfo.get('gender') == '男' ? '我是一个爸爸' : '我是一个妈妈';
        Alert.alert('请添加孩子的信息,或者请将\'' + parentRole + '\'选项关闭');
      }else{
        //required
        let username = this.props.userInfo.get('username');
        let nickname = this.props.userInfo.get('nickname');
        let gender = this.props.userInfo.get('gender');
        let city = this.props.userInfo.get('city');
        let county = this.props.userInfo.get('county');
        let address = this.props.userInfo.get('address');
        let longitude = this.props.userInfo.get('longitude');
        let latitude = this.props.userInfo.get('latitude');
        let kidInfoList = JSON.stringify(this.props.userInfo.get('kidInfoList').toJSON());

        //optional
        let introduction = Miscellaneous.isUndefined(this.props.userInfo.get('introduction')) ? ' ' : this.props.userInfo.get('introduction');
        let wechat = Miscellaneous.isUndefined(this.props.userInfo.get('wechat')) ? ' ' : this.props.userInfo.get('wechat');
        let weibo = Miscellaneous.isUndefined(this.props.userInfo.get('weibo')) ? ' ' : this.props.userInfo.get('weibo');
        let facebook = Miscellaneous.isUndefined(this.props.userInfo.get('facebook')) ? ' ' : this.props.userInfo.get('facebook');
        let isWechatPrivate = Miscellaneous.isUndefined(this.props.userInfo.get('isWechatPrivate')) ? false : this.props.userInfo.get('isWechatPrivate');
        let isWeiboPrivate = Miscellaneous.isUndefined(this.props.userInfo.get('isWeiboPrivate')) ? false : this.props.userInfo.get('isWeiboPrivate');
        let isFacebookPrivate = Miscellaneous.isUndefined(this.props.userInfo.get('isFacebookPrivate')) ? false : this.props.userInfo.get('isFacebookPrivate');
        let hasKids = Miscellaneous.isUndefined(this.props.userInfo.get('hasKids')) ? false : this.props.userInfo.get('hasKids');

        let result = await Backend.createUserInfo(username,nickname,gender,city,county,address,longitude,latitude,kidInfoList,
                      introduction,wechat,weibo,facebook,isWechatPrivate,isWeiboPrivate,isFacebookPrivate,hasKids);
        let resultJson = await result.json();

        if(result.status != 200){
          //this.setState({isLoading: false});
          Alert.alert(resultJson.message);
        }else{
          this.props.navigator.resetTo({name:'app'});
        }

      }
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
