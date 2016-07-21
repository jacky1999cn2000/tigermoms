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

class RoleModal extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.appState.get('genderModalVisible')}
        onRequestClose={() => {this.props.dispatch(changeAppStateAttributeValues(['genderModalVisible'],[!this.props.appState.get('genderModalVisible')]))}}
      >
        <View style={[this.props.style, styles.container]}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={Miscellaneous.safelyRenderValue(this.props.userInfo.get('gender'))}
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['gender'],[value]))}}>
              <Picker.Item label="请选择性别" value="请选择性别" />
              <Picker.Item label="男" value="男" />
              <Picker.Item label="女" value="女" />
            </Picker>

            <TouchableHighlight
              onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['genderModalVisible'],[!this.props.appState.get('genderModalVisible')]))}}
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
    padding: 20,
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

RoleModal = connect(
  state => {
    return { userInfo:state.userInfo, appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(RoleModal)

export default RoleModal;
