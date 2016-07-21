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
import KidAgeModal from './KidAgeModal';
import KidGenderModal from './KidGenderModal';
import Button from './Button';

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
        <KidAgeModal style={this.props.style} />
        <KidGenderModal style={this.props.style} />
        <ContactInfo />
        <KidsInfo />
        <Button step={this.props.step} buttonClick={this.props.buttonClick} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
