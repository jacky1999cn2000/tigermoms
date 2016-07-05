'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* components */
import ContactInfo from './ContactInfo';
import KidsInfo from './KidsInfo';

class ContentTwo extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <ScrollView
        style={this.props.style}
        contentOffset={this.props.contentOffset}
      >
        <ContactInfo />
        <KidsInfo />
      </ScrollView>
    );
  }
}

ContentTwo = connect(
  state => {
    console.log('ContentTwos redux state',state);
    return { userInfo:state.userInfo, appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(ContentTwo)

export default ContentTwo;
