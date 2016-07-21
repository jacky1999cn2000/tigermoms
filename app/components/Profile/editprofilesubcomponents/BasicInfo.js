'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* actions */
import { changeUserInfoAttributeValues } from '../../../actions/userInfo';
import { changeAppStateAttributeValues } from '../../../actions/appState';

class BasicInfo extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    let gender = (Miscellaneous.isUndefined(this.props.userInfo.get('gender')) || this.props.userInfo.get('gender') == '请选择性别') ? '请选择性别 (必填)' : this.props.userInfo.get('gender');
    let genderStyle = gender == '请选择性别 (必填)' ? {color:'gray'} : {color:'black'};

    return (
      <View>
        <View style={styles.componentContainer}>

          <TouchableHighlight
            underlayColor="white"
            onPress={()=>{console.log('pressed');}}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../../images/bg3.jpg')} />
              <View style={styles.imageCaption}>
                <Text style={styles.smallText}>
                  编辑
                </Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={styles.basicInfoContainer}>
            <View style={styles.basicInfo}>
              <Text style={styles.textStyle}>
                {this.props.userInfo.get('username')}
              </Text>
            </View>
            <View style={styles.basicInfo}>
              <TextInput
                placeholder="请输入昵称 (必填)"
                placeholderTextColor="gray"
                style={styles.textInputStyle}
                onChangeText={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['nickname'],[value]))}}
                autoCapitalize="none"
                value={Miscellaneous.safelyRenderValue(this.props.userInfo.get('nickname'))}
              />
            </View>
            <View style={styles.basicInfo}>
              <TouchableHighlight
                underlayColor="white"
                onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['genderModalVisible'],[!this.props.appState.get('genderModalVisible')]))}}
              >
                <Text style={[styles.textStyle,genderStyle]}>
                  {gender}
                </Text>
              </TouchableHighlight>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    flexDirection: 'row'
  },
  // imageContainer (image, imageCaption)
  imageContainer: {
    flex: 0.3
  },
  image: {
    height: 100,
    width: 100,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    resizeMode: 'cover',
    borderRadius: 50
  },
  imageCaption: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallText: {
    fontSize: 10,
    color: 'grey'
  },

  // basicInfoContainer (basicInfo)
  basicInfoContainer:{
    flex: 0.7
  },
  basicInfo: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 5,
    marginHorizontal: 8,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
    width: 500
  },
  textInputStyle: {
    flex: 1,
    fontSize: 14
  }
});

BasicInfo = connect(
  state => {
    return { userInfo:state.userInfo, appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(BasicInfo)

export default BasicInfo;
