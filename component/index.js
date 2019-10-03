/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Image, Dimensions, Animated, TouchableOpacity } from 'react-native';

import {Text, Container, Content, Thumbnail} from 'native-base';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Index extends React.Component {

  constructor(props){
    super(props)
    this.state={
      OpacityImage: new Animated.Value(0),
      OpacityText: new Animated.Value(0),
      ImagePosition: new Animated.Value(0),
      ImageScale: new Animated.Value(1),
    }
  }

  AnimationView = () => {
    Animated.sequence([
      Animated.timing(this.state.OpacityText,{
        toValue:1,
        duration:2000,
      }),
      Animated.timing(this.state.OpacityImage,{
        toValue:1,
        duration:2000,
      })
    ]).start();
  }

  ProfilePicClicked = () => {
    Animated.parallel([
      Animated.timing(this.state.ImageScale,{
        toValue:0.5,
        duration:500
      }),
      Animated.timing(this.state.ImagePosition,{
        toValue:-height/1.5,
        duration:500
      }),
      Animated.timing(this.state.OpacityText,{
        toValue:0,
        duration:500,
      }),
    ]).start()
  }

  componentDidMount(){
    this.AnimationView();
  }

  render(){
    return(
      <Container>
        <View style={styles.Container}>

          <Animated.View style={{flex:1, opacity:this.state.OpacityText}}>

            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>
              <Text style={{fontFamily:'chrolinr', fontSize:50}}>WELCOME</Text>
            </View>

          </Animated.View>
          
          <Animated.View style={{flex:2, opacity:this.state.OpacityImage, backgroundColor:'blue', alignItems:'center'}}>
            <Animated.View style={{transform:[{scale:this.state.ImageScale},{translateY:this.state.ImagePosition}], alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.ProfilePicClicked()}>
                <Image source={require('./src/Oke.jpg')} style={styles.Image} />
              </TouchableOpacity> 
            </Animated.View>
          </Animated.View>

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
    width:width
  },
  Image:{
    borderRadius:height,
    height:height/3,
    width:height/3,
  }
})
export default Index;
