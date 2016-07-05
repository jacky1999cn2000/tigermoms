'use strict';

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  MapView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Dimensions,
  ActivityIndicatorIOS,
  Alert
} from 'react-native';

/* redux connect */
import { connect } from 'react-redux';

/* actions */
import { changeUserInfoAttributeValues } from '../../../actions/userInfo';
import { changeAppStateAttributeValues } from '../../../actions/appState';

/* geocoding functions */
import Geocoding from '../../../utils/geocoding';

/* utils */
import Miscellaneous from '../../../utils/miscellaneous';

/* radio buttons */
import { SegmentedControls } from 'react-native-radio-buttons';
const options = [
  '使用邮编定位',
  '使用手机定位'
];

/* adjusting ScrollView's contentOffset for iphone4 */
import StyleConfig from '../../../utils/styleConfig';
const windowSize = Dimensions.get('window');
const iphoneType = StyleConfig.getIphoneType(windowSize);
const styleConfig = StyleConfig.getInitProfileStyleConfig(iphoneType);

class LocationInfo extends React.Component {

  constructor(){
    super(...arguments);
    this.state = {
      //控制信息
      isLoading: false,

      //地图信息
      locationOption: '使用邮编定位',
      zipCode: ''
    }
  }

  render(){
    let spinner = this.state.isLoading ? <ActivityIndicatorIOS size='large'/> : <View/>;
    /*
      如果state里的longitude和latitude被更新,则重新计算 pin 和 mapRegion
    */
    let pin = {
      longitude: 0,
      latitude: 0
    },
    mapRegion = null;

    if(typeof this.props.userInfo.get('latitude') != 'undefined' && typeof this.props.userInfo.get('longitude') != 'undefined'){
      pin = {
        longitude: this.props.userInfo.get('longitude'),
        latitude: this.props.userInfo.get('latitude')
      };
      mapRegion = {
        longitude: this.props.userInfo.get('longitude'),
        latitude: this.props.userInfo.get('latitude'),
        longitudeDelta: 0.5,
        latitudeDelta: 0.5
      }
    }

    // locationView 包括邮编 TextInput 和 TouchableHighlight, 当选择 "使用邮编定位" 时显示
    let locationView = this.state.locationOption == '使用邮编定位' ? (
      <View style={styles.locationViewContainer}>
        <View style={styles.locationViewTextInputContainer}>
          <TextInput
            onChangeText={(zipCode) => this.setState({zipCode})}
            onFocus={() => {this.props.dispatch(changeAppStateAttributeValues(['contentOffset'],[styleConfig.contentOffset]))}}
            onBlur={() => {this.props.dispatch(changeAppStateAttributeValues(['contentOffset'],[{x:0,y:0}]))}}
            autoCapitalize="none"
            placeholder="请输入邮编 (例:94568)"
            placeholderTextColor="gray"
            style={[styles.textInputStyle]}
            value={this.state.zipCode}
          />
        </View>
        <TouchableHighlight
          style={styles.locationViewButton}
          underlayColor="grey"
          onPress={this.getLocationByZipCode.bind(this)}
        >
          <Text style={styles.locationViewButtonText}>
            定位
          </Text>
        </TouchableHighlight>
      </View>
    ) : null;

    // addressView 用来显示 address, 当 this.props.userInfo.get('address') 被更新后显示
    let addressView = Miscellaneous.safelyRenderValue(this.props.userInfo.get('address')) != '' ? (
      <View style={styles.locationViewAddressTextContainer}>
        <Text>
          {this.props.userInfo.get('address')}
        </Text>
      </View>
    ) : null;

    return (
      <View style={this.props.style}>
        <SegmentedControls
          tint= {'#FF3366'}
          options={ options }
          onSelection={this.onLocationOptionSelection.bind(this)}
          selectedOption={this.state.locationOption}
        />
        {locationView}
        <View style={styles.spinner}>
          {spinner}
        </View>
          {addressView}
        <MapView
          region={mapRegion}
          annotations={[pin]}
          style={styles.mapStyle}
        >
        </MapView>
        <View style={styles.mapTextContainer}>
          <Text style={styles.smallText}>定位你居住的城市, 可以让别人更方便地找到你, 同时也让你更方便地找到别人</Text>
        </View>
      </View>
    );
  }

  /*
    当用户选择不同的定位方式时被调用
    当选择"使用手机定位"时,获取当前位置并调用google geocoding得到城市信息
    当选择"使用邮编定位"时,只设置选项,获取城市信息在用户点击"定位"按钮之后
  */
  async onLocationOptionSelection(locationOption){
    if(locationOption == '使用手机定位'){
      this.setState({isLoading: true});
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let result = await Geocoding.getLocationByLatLng(position.coords.latitude,position.coords.longitude);
          let resultJson = await result.json();

          let parsedJson = this.parseGeocodingJson(resultJson);
          this.setState({
            isLoading: false,
            locationOption
          });
          this.props.dispatch(changeUserInfoAttributeValues(
            ['address','city','county','latitude','longitude'],
            [parsedJson.address,parsedJson.city,parsedJson.county,resultJson.results[0].geometry.location.lat,resultJson.results[0].geometry.location.lng]
          ));
        },
        (error) => {this.setState({locationOption}); Alert.alert('无法获取当前位置,请稍后再试或常使用邮编进行定位');},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }else{
      this.setState({
        locationOption
      });
    }
  }

  /*
    在"使用邮编定位"选项下,输入邮编点击"定位"按钮,获取城市信息
  */
  async getLocationByZipCode(){
    if(Miscellaneous.validateZipCode(this.state.zipCode)){
      this.setState({isLoading: true});
      let result = await Geocoding.getLocationByZipCode(this.state.zipCode.trim());
      let resultJson = await result.json();
      let parsedJson = this.parseGeocodingJson(resultJson);

      if(resultJson.status == 'OK'){
        this.setState({
          isLoading: false,
        });
        this.props.dispatch(changeUserInfoAttributeValues(
          ['address','city','county','latitude','longitude'],
          [parsedJson.address,parsedJson.city,parsedJson.county,resultJson.results[0].geometry.location.lat,resultJson.results[0].geometry.location.lng]
        ));
      }else{
        Alert.alert('服务器繁忙,请稍后再试');
      }
    }else{
      Alert.alert('请输入正确的邮编');
    }
  }

  /*
    当使用latlng作为参数来获取geocoding的时候会返回不止一个results,并且每个result的address_components里的信息也不一致
    我们只对city,county,state感兴趣,而且知道包含city信息的那个节点的types里应该是locality或者sublocality
    由此,我们双重遍历resultJson,找到正确的节点返回,然后组装数据(不会全部遍历,基本上第一个result的address_components中就找到了)
  */
  parseGeocodingJson(resultJson){
    let targetNode, index, city, county, state, address;

    for(let result of resultJson.results){
      for(let i=0; i<result.address_components.length; i++){
        if(result.address_components[i].types.indexOf('locality') != -1 || result.address_components[i].types.indexOf('sublocality') != -1){
          targetNode = result;
          index = i;
          break;
        }
      }
    }
    city = targetNode.address_components[index].short_name;
    county = targetNode.address_components[index+1].short_name;
    state = targetNode.address_components[index+2].short_name;
    address = city + ', ' + county + ', ' + state;
    return {
      city: city,
      county: county,
      address: address
    };
  }

}

const styles = StyleSheet.create({
  mapStyle: {
    height: 80,
    marginTop: 10
  },
  mapTextContainer: {
    marginVertical:5
  },
  locationViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  locationViewTextInputContainer: {
    flex: 0.7,
    height: 20,
    marginTop: 15,
    marginBottom: 5,
    marginRight: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  locationViewButton: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#FF3366',
    borderRadius: 2
  },
  locationViewButtonText: {
    color: 'white'
  },
  locationViewAddressTextContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallText: {
    fontSize: 10,
    color: 'grey'
  },
  textInputStyle: {
    flex: 1,
    fontSize: 14
  },
});

LocationInfo = connect(
  state => {
    return { userInfo:state.userInfo };
 },
 dispatch => {
    return { dispatch }
 }
)(LocationInfo)

export default LocationInfo;
