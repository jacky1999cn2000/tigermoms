'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* actions */
import { changeUserInfoAttributeValues } from '../../../actions/userInfo';

import Icon from 'react-native-vector-icons/FontAwesome';
const wechatIcon = (<Icon name="wechat" size={30} color="#FF3366" />);
const weiboIcon = (<Icon name="weibo" size={30} color="#FF3366" />);
const facebookIcon = (<Icon name="facebook-square" size={30} color="#FF3366" />);

class ContactInfo extends React.Component {

  constructor(){
    super(...arguments);
    this.state = {
      wechat: ''
    }
  }

  render(){
    return (
      <View>
        <View style={styles.contactInfoContainer}>
          <View style={styles.contactInfoContent}>
            <View style={styles.contactInfoContentIcon}>
              {wechatIcon}
            </View>
            <View style={styles.contactInfoContentTextInputContainer}>
              <TextInput
                onChangeText={(wechat) => {this.props.dispatch(changeUserInfoAttributeValues(['wechat'],[wechat]))}}
                autoCapitalize="none"
                placeholder="微信(选填)"
                placeholderTextColor="gray"
                style={styles.textInputStyle}
                value={Miscellaneous.safelyRenderValue(this.props.userInfo.get('wechat'))}
              />
            </View>
          </View>

          <View style={styles.contactInfoSwitchContainer}>
            <Switch
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['isWechatPrivate'],[value]))}}
              value={this.props.userInfo.get('isWechatPrivate')} />
            <Text style={styles.smallText}>
               仅好友可见
            </Text>
          </View>
        </View>

        <View style={styles.contactInfoContainer}>
          <View style={styles.contactInfoContent}>
            <View style={styles.contactInfoContentIcon}>
              {weiboIcon}
            </View>
            <View style={styles.contactInfoContentTextInputContainer}>
              <TextInput
                onChangeText={(weibo) => {this.props.dispatch(changeUserInfoAttributeValues(['weibo'],[weibo]))}}
                autoCapitalize="none"
                placeholder="微博(选填)"
                placeholderTextColor="gray"
                style={styles.textInputStyle}
                value={Miscellaneous.safelyRenderValue(this.props.userInfo.get('weibo'))}
              />
            </View>
          </View>

          <View style={styles.contactInfoSwitchContainer}>
            <Switch
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['isWeiboPrivate'],[value]))}}
              value={this.props.userInfo.get('isWeiboPrivate')} />
            <Text style={styles.smallText}>
               仅好友可见
            </Text>
          </View>
        </View>

        <View style={styles.contactInfoContainer}>
          <View style={styles.contactInfoContent}>
            <View style={styles.contactInfoContentIcon}>
              {facebookIcon}
            </View>
            <View style={styles.contactInfoContentTextInputContainer}>
              <TextInput
                onChangeText={(facebook) => {this.props.dispatch(changeUserInfoAttributeValues(['facebook'],[facebook]))}}
                autoCapitalize="none"
                placeholder="Facebook(选填)"
                placeholderTextColor="gray"
                style={styles.textInputStyle}
                value={Miscellaneous.safelyRenderValue(this.props.userInfo.get('facebook'))}
              />
            </View>
          </View>

          <View style={styles.contactInfoSwitchContainer}>
            <Switch
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['isFacebookPrivate'],[value]))}}
              value={this.props.userInfo.get('isFacebookPrivate')} />
            <Text style={styles.smallText}>
               仅好友可见
            </Text>
          </View>
        </View>

        <View style={styles.contactTextContainer}>
          <Text style={styles.smallText}>
            * 若设置为仅好友可见,则对方必须是你的好友才可以看到对应的联系方式
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contactInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 10
  },
  contactInfoContent: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  contactInfoSwitchContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // contactInfoContent (contactInfoContentIcon, contactInfoContentTextInput)
  contactInfoContentIcon: {
    marginLeft: 5,
    marginRight: 5
  },
  contactInfoContentTextInputContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  contactTextContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 10
  },
  contactSmallText: {
    marginTop: 2,
    fontSize: 10,
    color: 'grey'
  },
  textInputStyle: {
    flex: 1,
    fontSize: 14
  },
  smallText: {
    fontSize: 10,
    color: 'grey'
  }
});

ContactInfo = connect(
  state => {
    return { userInfo:state.userInfo };
 },
 dispatch => {
    return { dispatch }
 }
)(ContactInfo)

export default ContactInfo;
