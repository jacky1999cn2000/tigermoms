'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Switch,
  TouchableHighlight,
  MapView,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const wechatIcon = (<Icon name="wechat" size={30} color="#FF3366" />);
const weiboIcon = (<Icon name="weibo" size={30} color="#FF3366" />);
const facebookIcon = (<Icon name="facebook-square" size={30} color="#FF3366" />);

import { SegmentedControls } from 'react-native-radio-buttons';
const options = [
  '使用邮编定位',
  '使用手机定位'
];

import Geocoding from '../../utils/geocoding';
import Miscellaneous from '../../utils/miscellaneous';
import StyleConfig from '../../utils/styleConfig';

const windowSize = Dimensions.get('window');
const iphoneType = StyleConfig.getIphoneType(windowSize);
const styleConfig = StyleConfig.getInitProfileStyleConfig(iphoneType);

class InitProfile extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      step: 1,

      locationOption: '使用邮编定位',
      zipCode: '',
      city: '',
      county:'',
      address: '',
      longitude: null,
      latitude: null,

      contentOffset: {x:0,y:0},
      username: '',
      isContactInfoPrivate: false
    }
  }

  async componentWillMount(){

    let cache = await AsyncStorage.getItem(require('../../config/appConfig').cache);
    //let cache = await AsyncStorage.getItem('somethingelse');
    console.log('cache ',cache);
    let cacheObj = JSON.parse(cache);
    console.log('cacheObj ',cacheObj);
    this.setState({username: cacheObj.userInfo.username});
  }


              // <View style={styles.contactInfoContainer}>
              //   <View style={styles.contactInfoContent}>
              //     <View style={styles.contactInfoContentIcon}>
              //       {wechatIcon}
              //     </View>
              //     <View style={styles.contactInfoContentTextInputContainer}>
              //       <TextInput
              //         placeholder="微信"
              //         placeholderTextColor="gray"
              //         style={styles.textInputStyle}
              //       />
              //     </View>
              //   </View>
              //
              //   <View style={styles.contactInfoSwitchContainer}>
              //     <Switch
              //       onValueChange={(value) => this.setState({isContactInfoPrivate: value})}
              //       value={this.state.isContactInfoPrivate} />
              //       <Text style={styles.imageCaptionText}>
              //          仅好友可见
              //       </Text>
              //   </View>
              // </View>

  render(){
    console.log('city ',this.state.city);
    console.log('county ',this.state.county);
    console.log('address ',this.state.address);
    /*
      如果state里的longitude和latitude被更新,则重新计算 pin 和 mapRegion
    */
    let pin = {
      longitude: 0,
      latitude: 0
    },
    mapRegion = null;
    if(this.state.latitude != null && this.state.longitude != null){
      pin = {
        longitude: this.state.longitude,
        latitude: this.state.latitude
      };
      mapRegion = {
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        longitudeDelta: 0.5,
        latitudeDelta: 0.5
      }
    }

    /*
      sub-components
    */
    // (step1) controlButton 根据 this.state.step == 1 or 2 来决定显示哪个
    let controlButton = this.state.step == 1 ? (
      <View style={styles.controlButtonContainer}>
        <TouchableHighlight
          style={styles.controlButton}
          underlayColor="grey"
          onPress={this.getLocationByZipCode.bind(this)}
        >
          <Text style={styles.mapButtonText}>
            下一步
          </Text>
        </TouchableHighlight>
      </View>
    ) : null;

    // (step1) locationView 包括邮编 TextInput 和 TouchableHighlight, 当选择 "使用邮编定位" 时显示
    let locationView = this.state.locationOption == '使用邮编定位' ? (
      <View style={styles.mapTextInputAndButtonContainer}>
        <View style={styles.mapTextInputContainer}>
          <TextInput
            onChangeText={(zipCode) => this.setState({zipCode})}
            onFocus={() => this.setState({contentOffset:styleConfig.contentOffset})}
            onBlur={() => this.setState({contentOffset:{x:0,y:0}})}
            autoCapitalize="none"
            placeholder="请输入邮编 (例:94568)"
            placeholderTextColor="gray"
            style={[styles.textInputStyle]}
            value={this.state.zipCode}
          />
        </View>
        <TouchableHighlight
          style={styles.mapButton}
          underlayColor="grey"
          onPress={this.getLocationByZipCode.bind(this)}
        >
          <Text style={styles.mapButtonText}>
            定位
          </Text>
        </TouchableHighlight>
      </View>
    ) : null;

    // (step1) addressView 用来显示 address, 当 this.state.address 被更新后显示
    let addressView = this.state.address.trim() != '' ? (
      <View style={styles.addressTextContainer}>
        <Text>
          {this.state.address}
        </Text>
      </View>
    ) : null;

    /*
      main-components
    */
    // 统一的header
    let header = (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          让大家多了解你一点
        </Text>
      </View>
    );

    // content 根据 this.state.step 来决定显示哪个
    let content = this.state.step == 1 ? (
      <ScrollView
        style={styles.content}
        contentOffset={this.state.contentOffset}
      >
        <View style={styles.basicInfoAndImageContainer}>
          <TouchableHighlight
            underlayColor="white"
            onPress={()=>{console.log('pressed');}}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../images/bg3.jpg')} />
              <View style={styles.imageCaption}>
                <Text style={styles.smallText}>
                  编辑
                </Text>
              </View>
            </View>
          </TouchableHighlight>


          <View style={styles.basicInfoContainer}>
            <View style={styles.basicInfo}>
              <Text style={styles.textStyle}>
                {this.state.username}
              </Text>
            </View>
            <View style={styles.basicInfo}>
              <TextInput
                placeholder="请输入昵称 (required)"
                placeholderTextColor="gray"
                style={styles.textInputStyle}
              />
            </View>
            <View style={styles.basicInfo}>
              <TouchableHighlight
                underlayColor="white"
                onPress={()=>{console.log('pressed');}}
              >
                <Text style={[styles.textStyle,{color:'gray'}]}>
                  请选择身份 (required)
                </Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>

        <View style={styles.personalIntroContainer}>
          <TextInput
            placeholder="用一段话介绍一下你自己 (optional)"
            placeholderTextColor="gray"
            multiline={true}
            style={[styles.textInputStyle]}
          />
        </View>

        <View style={styles.locationInfoContainter}>
          <SegmentedControls
            tint= {'#FF3366'}
            options={ options }
            onSelection={this.onLocationOptionSelection.bind(this)}
            selectedOption={this.state.locationOption}
          />
          {locationView}
          {addressView}
          <MapView
            region={mapRegion}
            annotations={[pin]}
            style={styles.mapStyle}
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          >
          </MapView>
          <View style={styles.mapTextContainer}>
            <Text style={styles.smallText}>定位你居住的城市, 可以让别人更方便地找到你, 同时也让你更方便地找到别人</Text>
          </View>
        </View>
        {controlButton}
      </ScrollView>
    ) : null;

    return (
        <View style={styles.container}>
          {header}
          {content}
        </View>
    );
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

  async onLocationOptionSelection(locationOption){
    if(locationOption == '使用手机定位'){
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let result = await Geocoding.getLocationByLatLng(position.coords.latitude,position.coords.longitude);
          let resultJson = await result.json();

          let parsedJson = this.parseGeocodingJson(resultJson);
          this.setState({
            address: parsedJson.address,
            city: parsedJson.city,
            county: parsedJson.county,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            locationOption
          });
        },
        (error) => {console.log('error here');},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }else{
      this.setState({
        locationOption
      });
    }
  }

  async getLocationByZipCode(){
    if(Miscellaneous.validateZipCode(this.state.zipCode)){
      let result = await Geocoding.getLocationByZipCode(this.state.zipCode.trim());
      let resultJson = await result.json();
      let parsedJson = this.parseGeocodingJson(resultJson);

      if(resultJson.status == 'OK'){
        this.setState({
          address: parsedJson.address,
          city: parsedJson.city,
          county: parsedJson.county,
          latitude: resultJson.results[0].geometry.location.lat,
          longitude: resultJson.results[0].geometry.location.lng
        });
      }else{
        Alert.alert('请确认输入正确的邮编后再试');
      }
    }else{
      Alert.alert('请输入正确的邮编');
    }
  }

  onRegionChangeComplete(){
    console.log('onRegionChangeComplete');
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  // container (header, content)
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3366'
  },
  headerText: {
    marginTop: 25,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    flex: 0.9
  },

  // content (basicInfoAndImageContainer,personalIntro)
  basicInfoAndImageContainer: {
    flexDirection: 'row'
  },
  personalIntroContainer: {
    height: 30,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  locationInfoContainter: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },

  contactInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10
  },
  kidsInfoContainer: {

  },

  controlButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: '#FF3366',
    borderRadius: 2,
    borderColor: 'red',
    borderWidth: 1
  },

  /*
    basicInfoAndImageContainer (imageContainer,basicInfoContainer)
  */
  imageContainer: {
    flex: 0.3
  },
  basicInfoContainer:{
    flex: 0.7
  },

  // imageContainer (image, imageCaption)
  image: {
    height: 100,
    width: 100,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    resizeMode: 'cover',
    borderRadius: 50
  },
  imageCaption: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallText: {
    fontSize: 10,
    color: 'grey'
  },

  // basicInfoContainer (basicInfo)
  basicInfo: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 5,
    marginHorizontal: 8,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  textStyle: {
    color: 'black',
    fontSize: 14
  },
  textInputStyle: {
    flex: 1,
    fontSize: 14
  },

  /*
    contactInfoContainer (contactInfoContent, contactInfoSwitchContainer)
  */
  contactInfoContent: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  contactInfoSwitchContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // contactInfoContent (contactInfoContentIcon, contactInfoContentTextInput)
  contactInfoContentIcon: {
    marginLeft: 5,
    marginRight: 5
  },
  contactInfoContentTextInputContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },

  // contactInfoSwitchContainer
  contactInfoHeaderText: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  /*
    locationInfoContainter (mapStyle, mapTextInputAndButtonContainer, addressTextContainer)
  */
  mapStyle: {
    height: 80,
    marginTop: 10
  },
  mapTextInputAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  addressTextContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // mapTextInputAndButtonContainer (mapTextInputContainer, mapButton)
  mapTextInputContainer: {
    flex: 0.7,
    height: 20,
    marginTop: 15,
    marginBottom: 5,
    marginRight: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  mapButton: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#FF3366',
    borderRadius: 2
  },
  mapButtonText: {
    color: 'white'
  },
  mapTextContainer: {
    marginVertical:5
  },

  /*
    controlButtonContainer
  */
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,

  }
})

export default InitProfile;
