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
import { editUserInfoKidInfo } from '../../../actions/userInfo';
import { changeAppStateAttributeValues } from '../../../actions/appState';

class KidAgeModal extends React.Component {

  constructor(){
    super(...arguments);
  }

  render(){

    let index = this.props.appState.get('kidInfoListIndex');
    let year = this.props.userInfo.get('kidInfoList').size > index ? this.props.userInfo.get('kidInfoList').get(index).get('year') : '2015';

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.appState.get('kidAgeModalVisible')}
        onRequestClose={() => {this.props.dispatch(changeAppStateAttributeValues(['kidAgeModalVisible'],[!this.props.appState.get('kidAgeModalVisible')]))}}
      >
        <View style={[this.props.style, styles.container]}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={year}
              onValueChange={(value) => {this.props.dispatch(editUserInfoKidInfo(index,'year',value))}}>
              <Picker.Item label="2005" value="2005" />
              <Picker.Item label="2006" value="2006" />
              <Picker.Item label="2007" value="2007" />
              <Picker.Item label="2008" value="2008" />
              <Picker.Item label="2009" value="2009" />
              <Picker.Item label="2010" value="2010" />
              <Picker.Item label="2011" value="2011" />
              <Picker.Item label="2012" value="2012" />
              <Picker.Item label="2013" value="2013" />
              <Picker.Item label="2014" value="2014" />
              <Picker.Item label="2015" value="2015" />
              <Picker.Item label="2016" value="2016" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2025" value="2025" />
            </Picker>

            <TouchableHighlight
              onPress={() => {this.props.dispatch(changeAppStateAttributeValues(['kidAgeModalVisible'],[!this.props.appState.get('kidAgeModalVisible')]))}}
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

KidAgeModal = connect(
  state => {
    return { userInfo:state.userInfo, appState:state.appState };
 },
 dispatch => {
    return { dispatch }
 }
)(KidAgeModal)

export default KidAgeModal;
