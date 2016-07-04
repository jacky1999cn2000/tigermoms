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
    console.log('modal: this.props.appState.genderModalVisible: ',this.props.appState.get('genderModalVisible'));
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.appState.get('genderModalVisible')}
        onRequestClose={() => {this.props.dispatch(changeAppStateAttributeValues(['genderModalVisible'],[!this.props.appState.get('genderModalVisible')]))}}
      >
        <View style={[this.props.style, styles.container]}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>
              我是一个:
            </Text>
            <Picker
              selectedValue={Miscellaneous.safelyRenderValue(this.props.userInfo.get('gender'))}
              onValueChange={(value) => {this.props.dispatch(changeUserInfoAttributeValues(['gender'],[value]))}}>
              <Picker.Item label="男生" value="男生" />
              <Picker.Item label="女生" value="女生" />
            </Picker>

            <TouchableHighlight
              onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['genderModalVisible'],[!this.props.appState.get('genderModalVisible')]))}}
              underlayColor="#a9d9d4">
              <View style={styles.closeButtonContainer}>
                <Text style={styles.title}>关闭</Text>
              </View>
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
  closeButtonContainer: {
    justifyContent:'center',
    height: 30,
    alignItems:'center'
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
