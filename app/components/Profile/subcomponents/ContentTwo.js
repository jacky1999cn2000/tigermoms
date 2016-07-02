'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native';

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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

export default ContentTwo;
