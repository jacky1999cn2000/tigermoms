'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator
} from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome'
// import Feed from './Feed'

class App extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      selectedTab: 'feed'
    };
  }

  render(){
    return(
      <View>
        <Text>
          APP
        </Text>
      </View>
    );
  }

}

export default App;
