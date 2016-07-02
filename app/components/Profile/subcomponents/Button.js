'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';
//
// /* utils */
// import Miscellaneous from '../../../utils/miscellaneous';
//
// /* actions */
// import { changeAttributeValues } from '../../../actions/userInfo';

class Button extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <TouchableHighlight
        style={this.props.style}
        underlayColor="grey"
        onPress={this.onClick.bind(this)}
      >
        <Text style={styles.buttonText}>
          下一步
        </Text>
      </TouchableHighlight>
    );
  }

  onClick(){
    this.props.nextStep();
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white'
  }
});

Button = connect(
  state => {
    console.log('redux state',state);
    return { userInfo:state.userInfo };
 },
 dispatch => {
    return { dispatch }
 }
)(Button)

export default Button;
