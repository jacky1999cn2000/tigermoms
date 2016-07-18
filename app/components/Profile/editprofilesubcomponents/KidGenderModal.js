'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Modal,
  Picker,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* actions */
import { changeUserInfoAttributeValues } from '../../../actions/userInfo';
import { changeAppStateAttributeValues } from '../../../actions/appState';

class KidGenderModal extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.appState.get('kidGenderModalVisible')}
        onRequestClose={() => {this.props.dispatch(changeAppStateAttributeValues(['kidGenderModalVisible'],[!this.props.appState.get('kidGenderModalVisible')]))}}
      >
        <View style={[this.props.style, styles.container]}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={"男孩"}
              onValueChange={(value) => {}}>
              <Picker.Item label="男孩" value="男孩" />
              <Picker.Item label="女孩" value="女孩" />
            </Picker>

            <TouchableHighlight
              onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['kidGenderModalVisible'],[!this.props.appState.get('kidGenderModalVisible')]))}}
              underlayColor="grey"
              style={styles.confirmButton}
              >
              <Text style={styles.title,{color:'white'}}>确认</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.4)'
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  confirmButton: {
    justifyContent:'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: '#FF3366',
    borderRadius: 2
  }

});

KidGenderModal = connect(
  state => {
    return { userInfo:state.userInfo, appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(KidGenderModal)

export default KidGenderModal;
