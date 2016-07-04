'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Header extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <View style={this.props.style}>
        <Text style={styles.headerText}>
          让大家多了解你一点
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    marginTop: 25,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Header;
