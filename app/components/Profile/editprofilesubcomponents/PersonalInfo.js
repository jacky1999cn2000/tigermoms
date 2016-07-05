'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* actions */
import { changeUserInfoAttributeValues } from '../../../actions/userInfo';

class PersonalInfo extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <View style={this.props.style}>
        <TextInput
          placeholder="用一句话介绍一下你自己 (选填)"
          placeholderTextColor="gray"
          multiline={true}
          style={[styles.textInputStyle]}
          onChangeText={(value) => {this.props.dispatch(changeUserInfoAttributeValues('introduction',value))}}
          autoCapitalize="none"
          value={Miscellaneous.safelyRenderValue(this.props.userInfo.get('introduction'))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    fontSize: 14
  }
});

PersonalInfo = connect(
  state => {
    return { userInfo:state.userInfo };
 },
 dispatch => {
    return { dispatch }
 }
)(PersonalInfo)

export default PersonalInfo;