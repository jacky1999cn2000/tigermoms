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
  Dimensions,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const wechatIcon = (<Icon name="wechat" size={30} color="#FF3366" />);
const weiboIcon = (<Icon name="weibo" size={30} color="#FF3366" />);
const facebookIcon = (<Icon name="facebook-square" size={30} color="#FF3366" />);


const windowSize = Dimensions.get('window');

class InitProfile extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      step: 1,
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

    //let content = this.state.step == 1 ?

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              让大家多了解你一点
            </Text>
          </View>

          <ScrollView style={styles.content}>
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
                    placeholder="请输入昵称"
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
                      请选择身份
                    </Text>
                  </TouchableHighlight>
                </View>

              </View>
            </View>

            <View style={styles.personalIntroContainer}>
              <TextInput
                placeholder="个人简介 (用一段话介绍一下你自己吧)"
                placeholderTextColor="gray"
                multiline={true}
                style={[styles.textInputStyle]}
              />
            </View>

            <View style={styles.kidsInfoContainer}>
            </View>
          </ScrollView>

        </View>
    );
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
  contactInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    // borderColor: 'red',
    // borderWidth: 1
  },
  kidsInfoContainer: {

  },

  // basicInfoAndImageContainer (imageContainer,basicInfoContainer)
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

  // contactInfoContainer (contactInfoContent, contactInfoSwitchContainer)
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

  contactInfoSwitchContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactInfoHeaderText: {
    fontSize: 12,
    fontWeight: 'bold'
  }
})

export default InitProfile;
