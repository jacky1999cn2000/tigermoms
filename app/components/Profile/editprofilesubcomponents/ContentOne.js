'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native';

/* components */
import BasicInfo from './BasicInfo';
import PersonalInfo from './PersonalInfo';
import LocationInfo from './LocationInfo';
import Button from './Button';
import RoleModal from './RoleModal';

/* redux connect */
import { connect } from 'react-redux';

class ContentOne extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <ScrollView
        style={this.props.style}
        contentOffset={this.props.appState.get('contentOffset')}
      >
        <RoleModal style={this.props.style} />
        <BasicInfo style={styles.basicInfoStyle} />
        <PersonalInfo style={styles.personalInfoStyle} />
        <LocationInfo style={styles.locationInfoStyle} />
        <Button style={styles.buttonStyle} nextStep={this.props.nextStep} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  basicInfoStyle: {
    flexDirection: 'row'
  },
  personalInfoStyle: {
    height: 30,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  locationInfoStyle: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: '#FF3366',
    borderRadius: 2
  }
});

ContentOne = connect(
  state => {
    console.log('ContentOne redux state',state);
    return { userInfo:state.userInfo, appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(ContentOne)

export default ContentOne;
