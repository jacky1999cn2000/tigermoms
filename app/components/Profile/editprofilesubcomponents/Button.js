'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

class Button extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){

    let buttonText = this.props.step == 1 ? '下一步' : '进 入';

    return (
      <TouchableHighlight
        style={styles.componentContainer}
        underlayColor="grey"
        onPress={this.onClick.bind(this)}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      </TouchableHighlight>
    );
  }

  onClick(){
    this.props.buttonClick();
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginVertical: 50,
    marginHorizontal: 20,
    backgroundColor: '#FF3366',
    borderRadius: 2
  },
  buttonText: {
    color: 'white'
  }
});

export default Button;
