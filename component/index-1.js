/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, ImageBackground, Image, Dimensions, Animated, TouchableOpacity } from 'react-native';

import {Text, Container, Content, Thumbnail} from 'native-base';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Index extends React.Component {

  constructor(props){
    super(props)
    this.state={
      OpacityImage: new Animated.Value(0),
      OpacityText: new Animated.Value(0),
      ImagePositionY: new Animated.Value(0),
      ImageScale: new Animated.Value(1),
      ProfPicDisabledClick: true,
      ImagePositionX: new Animated.Value(0),
    }
  }

  AnimationView = () => {
    Animated.parallel([
      Animated.timing(this.state.OpacityText,{
        toValue:1,
        duration:2000,
      }),
      Animated.timing(this.state.OpacityImage,{
        toValue:1,
        duration:2000,
      })
    ]).start(() => this.setState({ProfPicDisabledClick:false}));
  }

  ProfilePicClicked = () => {
    Animated.parallel([
      Animated.timing(this.state.ImageScale,{
        toValue:0.4,
        duration:1000
      }),
      Animated.timing(this.state.ImagePositionY,{
        toValue:-(height+75),
        duration:1000
      }),
      Animated.timing(this.state.OpacityText,{
        toValue:0,
        duration:1000,
      }),
    ]).start()
  }

  componentDidMount(){
    this.AnimationView();
  }

  render(){
    return(
      <Container>
        <StatusBar hidden />
        {/* container */}
        <View style={styles.Container}>
          <View style={{width:width/3, height:height/3, backgroundColor:'yellow'}}></View>
          <View style={{width:width/3, height:height/3, backgroundColor:'aqua'}}></View>
          <View style={{position:'absolute', width:width, height:height/3, backgroundColor:'pink'}}>
            <View style={{top:100, left:100 ,position:'absolute', width:width/3, height:height/4, backgroundColor:'red'}}></View>
            <View style={{top:50, left:50 ,position:'absolute', width:width/3, height:height/5, backgroundColor:'blue'}}></View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:height,
    width:width,
  },
  Image:{
    borderRadius:height,
    height:height/3,
    width:height/3,
  }
})
export default Index;
