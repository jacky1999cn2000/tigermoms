'use strict';

import React from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import RouteMap from './config/routeMap';

class Route extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
    };
  }

  renderScene = (route, navigator) => {
    const Component = RouteMap[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'editprofile'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Route;
