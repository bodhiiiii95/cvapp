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
      CardOneOpacity: new Animated.Value(0),
      CardTwoOpacity: new Animated.Value(0),
      CardThreeOpacity: new Animated.Value(0.0),
      OpeningTextOpacity: new Animated.Value(0),
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
    this.setState({ProfPicDisabledClick:true})
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.ImageScale,{
          toValue:0.4,
          duration:1000
        }),
        Animated.timing(this.state.ImagePositionY,{
          toValue:-(height+85),
          duration:1000
        }),
        Animated.timing(this.state.OpacityText,{
          toValue:0,
          duration:1000,
        }),
      ]),
      Animated.timing(this.state.OpeningTextOpacity,{
        toValue:1,
        duration:500
      }),
      Animated.timing(this.state.CardThreeOpacity,{
        toValue:0.6,
        duration:250
      }),
      Animated.timing(this.state.CardTwoOpacity,{
        toValue:0.8,
        duration:250
      }),
      Animated.timing(this.state.CardOneOpacity,{
        toValue:1,
        duration:250
      })
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

          {/* bottom background */}
          <ImageBackground style={{flex:1, width:width, justifyContent:'center', alignItems:'center'}} source={require('./src/bg2.jpg')}>
            
            <Animated.View style={{opacity:this.state.OpeningTextOpacity, width:width/1.2}}>  
              <Text style={{fontSize:30, fontWeight:'bold', color:'white', transform:[{translateY:(height/10)-50}], textAlign:'center' }}>BODHI JAYA</Text>
              <Text style={{color:'white', fontWeight:'300', textAlign:'center', transform:[{translateY:(height/10)-40}] }}>
                Hello, I'm an software engineer & server administrator who passionate in building and 
                maintaning world class software for server and mobile. High willing to learn.
                I create front end software with React Native, and backend with various programming language.
              </Text>
            </Animated.View>
          </ImageBackground>
          {/* bottom background */}

          {/* top backgroud */}
          <View style={{flex:0.7, width:width}}>
          </View>
          {/* top backgroud */}

          {/* content */}
          <View style={{position:'absolute', alignItems:'center', justifyContent:'center'}}>

            {/* card */}
            <View style={{borderRadius:10, flex:1, width:width/1.2, height:height/2, backgroundColor:'transparent'}}>
              <Animated.View style={{position:'absolute', borderRadius:2, flex:1, width:(width/1.2)-20, height:height/3, backgroundColor:'white', elevation:6, top:(height/3)-25, left:(width/10)-26, opacity:this.state.CardThreeOpacity }}>

              </Animated.View>
              <Animated.View style={{position:'absolute', borderRadius:2, flex:1, width:(width/1.2)-10, height:height/3, backgroundColor:'white', elevation:8, top:(height/3)-20, left:(width/10)-31, opacity:this.state.CardTwoOpacity }}>

              </Animated.View>
              <Animated.View style={{position:'absolute', borderRadius:2, flex:1, width:width/1.2, height:height/3, backgroundColor:'white', elevation:10, top:(height/3)-15, opacity:this.state.CardOneOpacity}}>

              </Animated.View>
            </View>
            {/* card */}

            {/* Welcome and photo position*/}
            <View style={{position:'absolute', flex:1, width:width}}>
              <Animated.View style={{flex:1, opacity:this.state.OpacityText, alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontFamily:'chrolinr', fontSize:60, color:'white'}}> WELCOME </Text>
                </View>
              </Animated.View>
              
              
              <Animated.View style={{flex:1, opacity:this.state.OpacityImage, transform:[{scale:this.state.ImageScale},{translateY:this.state.ImagePositionY}, {translateX:this.state.ImagePositionX}], alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.ProfilePicClicked()} disabled={this.state.ProfPicDisabledClick}>
                  <Image source={require('./src/Oke.jpg')} style={styles.Image} />
                </TouchableOpacity> 
              </Animated.View>
            </View>
            {/* Welcome and photo position*/}
            
            
          </View>
          {/* content */}

        </View>
        {/* container */}
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
