'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight
} from 'react-native';

/* components */
import KidDetail from './KidDetail';

/* redux connect */
import { connect } from 'react-redux';

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* actions */
import { changeUserInfoAttributeValues, addUserInfoKidInfo } from '../../../actions/userInfo';

import Icon from 'react-native-vector-icons/FontAwesome';
const kidsIcon = (<Icon name="child" size={30} color="#FF3366" />);
const plusIcon = (<Icon name="plus-circle" size={50} color="#FF3366" />);
const plusIconInactive = (<Icon name="plus-circle" size={50} color="grey" />);

class KidsInfo extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){

    let parentRole = this.props.userInfo.get('gender') == '男' ? '我是一个爸爸' : '我是一个妈妈';
    let kidsList = [];
    this.props.userInfo.get('kidInfoList').toArray().forEach((data, index) => {
      let kidDetail = <KidDetail key={index} index={index} data={data} />
      kidsList.push(kidDetail);
    });

    let kidInfoListView = ( Miscellaneous.isUndefined(this.props.userInfo.get('hasKids')) || this.props.userInfo.get('hasKids') == false) ? (
            <View>
              <View style={styles.kidsInfoContainer}>
                {plusIconInactive}
                <View style={styles.smallTextContainer}>
                  <Text style={styles.smallText}>* 点击+添加孩子信息,更便捷地找到合适的玩伴</Text>
                </View>
              </View>
              <View style={styles.kidsList} />
            </View>
          ) : (
            <View>
              <View style={styles.kidsInfoContainer}>
                <TouchableHighlight
                  style={styles.addButton}
                  underlayColor="transparent"
                  onPress={() => {this.props.dispatch(addUserInfoKidInfo())}}
                >
                  {plusIcon}
                </TouchableHighlight>
                <View style={styles.smallTextContainer}>
                  <Text style={styles.smallText}>* 点击+添加孩子信息,更便捷地找到合适的玩伴</Text>
                </View>
              </View>

              <View style={styles.kidsList}>
                {kidsList}
              </View>
            </View>
          );

    return (
      <View>
        <View style={styles.optionContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              {kidsIcon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>
                {parentRole}
              </Text>
            </View>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['hasKids'],[value]))}}
              value={this.props.userInfo.get('hasKids')} />
          </View>
        </View>

        {kidInfoListView}

      </View>
    );
  }

}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 10
  },
  contentContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  switchContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  textContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textStyle: {
    fontSize: 14,
    color: 'grey'
  },
  kidsInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 10
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    borderRadius: 2
  },
  smallTextContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5
  },
  smallText: {
    fontSize: 10,
    color: 'grey'
  },
  kidsList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 10
  }
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
