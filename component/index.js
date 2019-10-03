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
        toValue:-height,
        duration:1000
      }),
      Animated.timing(this.state.OpacityText,{
        toValue:0,
        duration:1000,
      }),
      Animated.timing(this.state.ImagePositionX,{
        toValue:-width/1.2,
        duration:1000
      })
    ]).start()
  }

  componentDidMount(){
    this.AnimationView();
  }

  render(){
    return(
      <Container>
        <ImageBackground blurRadius={1} source={require('./src/background.jpg')} style={styles.Container}>

          <Animated.View style={{flex:1, opacity:this.state.OpacityText, alignItems:'center'}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontFamily:'chrolinr', fontSize:60, color:'white'}}> WELCOME </Text>
            </View>
          </Animated.View>
          
          <View style={{flex:2, alignItems:'center'}}>
            <Animated.View style={{opacity:this.state.OpacityImage, transform:[{scale:this.state.ImageScale},{translateY:this.state.ImagePositionY}, {translateX:this.state.ImagePositionX}], alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.ProfilePicClicked()} disabled={this.state.ProfPicDisabledClick}>
                <Image source={require('./src/Oke.jpg')} style={styles.Image} />
              </TouchableOpacity> 
            </Animated.View>
          </View>

        </ImageBackground>
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
