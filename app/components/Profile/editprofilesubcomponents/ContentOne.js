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
        <BasicInfo />
        <PersonalInfo />
        <LocationInfo />
        <Button step={this.props.step} buttonClick={this.props.buttonClick} />
      </ScrollView>
    );
  }
}

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
