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

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* actions */
import { removeUserInfoKidInfo } from '../../../actions/userInfo';
import { changeAppStateAttributeValues } from '../../../actions/appState';

import Icon from 'react-native-vector-icons/FontAwesome';
const heartIcon = (<Icon name="heart" size={20} color="#FF3366" />);
const boyIcon = (<Icon name="mars" size={20} color="#FF3366" />);
const girlIcon = (<Icon name="venus" size={20} color="#FF3366" />);
const removeIcon = (<Icon name="minus-circle" size={20} color="#cc0000" />);

class KidDetail extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    let genderIcon = this.props.data.get('gender') == '男孩' ? boyIcon : girlIcon;

    return (
      <View style={styles.kidDetail}>
        <View style={styles.iconContainer}>
          {heartIcon}
        </View>
        <View style={styles.kidDetailTextContainer}>
          <Text style={styles.textStyle}>
            我的孩子出生于
          </Text>
        </View>
        <View style={styles.kidDetailButtonContainer}>
          <TouchableHighlight
            style={styles.kidDetailButton}
            underlayColor="grey"
            onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['kidAgeModalVisible','kidInfoListIndex'],[!this.props.appState.get('kidAgeModalVisible'),this.props.index]))}}
          >
            <Text style={styles.textStyle, {color:'white'}}>
              {this.props.data.get('year')}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.kidDetailTextContainer}>
          <Text style={styles.textStyle}>
            是一个
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {genderIcon}
        </View>
        <View style={styles.kidDetailButtonContainer}>
          <TouchableHighlight
            style={styles.kidDetailButton}
            underlayColor="grey"
            onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['kidGenderModalVisible','kidInfoListIndex'],[!this.props.appState.get('kidGenderModalVisible'),this.props.index]))}}
          >
            <Text style={styles.textStyle, {color:'white'}}>
              {this.props.data.get('gender')}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.removeIconContainer}>
          <TouchableHighlight
            style={[styles.kidDetailButton,{backgroundColor:"transparent"}]}
            underlayColor="grey"
            onPress={() => {this.props.dispatch(removeUserInfoKidInfo(this.props.index))}}
          >
            {removeIcon}
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  onClick(){
    this.props.nextStep();
  }
}

const styles = StyleSheet.create({
  kidDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  kidDetailTextContainer: {
    flex: 0.4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  kidDetailButtonContainer: {
    flex: 0.1,
    height: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  kidDetailButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#FF3366',
    borderRadius: 2
  },
  textStyle: {
    fontSize: 14,
    color: 'grey'
  },
  removeIconContainer: {
    marginLeft: 10,
    marginRight: 5
  },
});

KidDetail = connect(
  state => {
    return { userInfo:state.userInfo,appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(KidDetail)

export default KidDetail;
