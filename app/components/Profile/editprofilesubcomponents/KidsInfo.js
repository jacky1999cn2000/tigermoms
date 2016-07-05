'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Switch,
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

import Icon from 'react-native-vector-icons/FontAwesome';
const kidsIcon = (<Icon name="child" size={30} color="#FF3366" />);

class KidsInfo extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <View>
        <View style={styles.kidsInfoContainer}>
          <View style={styles.kidsInfoContent}>
            <View style={styles.kidsInfoContentIcon}>
              {kidsIcon}
            </View>
            <View style={styles.kidsInfoContentTextInputContainer}>
              <Text style={styles.textStyle}>
                我是一个 爸爸 | 妈妈
              </Text>
            </View>
          </View>

          <View style={styles.kidsInfoSwitchContainer}>
            <Switch
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['hasKids'],[value]))}}
              value={this.props.userInfo.get('hasKids')} />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  kidsInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 10
  },
  kidsInfoContent: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  kidsInfoSwitchContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  kidsInfoContentIcon: {
    marginLeft: 5,
    marginRight: 5
  },
  kidsInfoContentTextInputContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // borderWidth: 1,
    // borderBottomColor: '#CCC',
    // borderColor: 'transparent'
  },
  textStyle: {
    fontSize: 14,
    color: 'grey'
  },
});

KidsInfo = connect(
  state => {
    return { userInfo:state.userInfo };
 },
 dispatch => {
    return { dispatch }
 }
)(KidsInfo)

export default KidsInfo;
