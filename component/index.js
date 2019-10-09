/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, Modal, StyleSheet, ScrollView, PanResponder ,View, StatusBar, 
  Image, Dimensions, Animated, TouchableOpacity, TouchableHighlight, 
  TouchableWithoutFeedback ,Button, Linking} from 'react-native';

import {Text, Container, Content, Thumbnail} from 'native-base';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const SkillModalXPos = width/2 -((width-(width-20)));
const SkillModalYPos = height/4;
const CreditBoxMargin = height/30;
const ContactBoxMargin = height/60;
let FirstPanMoveY, SecondPanMoveY;

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
      MenuImageWidth:0,
      MenuImageHeight:0,
      ImageBorderHeight:0,
      ImageBorderWidth:0,
      EducationModalShow:false,
      SkillModalShow:false,
      ExpModalShow:false,
      ModalBGClickDisable:true,
      SkillModalHeight: new Animated.Value(0),
      SkillModalWidth: new Animated.Value(30),
      SkillModalYPos : new Animated.Value(SkillModalYPos),
      SkillModalXPos : new Animated.Value(SkillModalXPos),
      ExpScaleModal : new Animated.Value(0),
      SkillTextOpacity : new Animated.Value(0),
      BarFull : 0,
      ReactNativeSkill : new Animated.Value(0),
      PHPSkill : new Animated.Value(0),
      PythonSkill : new Animated.Value(0),
      LinuxSkill : new Animated.Value(0),
      SlidingPanOpacity : new Animated.Value(0),
      BoxPositionY : new Animated.ValueXY({x:0,y:height/1.2}),
      MenuClickDisabled : true,
      SlidingEnabled : false,
      SlidingPanOpenStatus : false,
    }
  }

  GetMenuImageSize = (e) => {
    this.setState({
      MenuImageHeight:e.nativeEvent.layout.height,
      MenuImageWidth:e.nativeEvent.layout.width
    })
  }

  GetBorderImageSize = (e) => {
    this.setState({
      ImageBorderHeight:e.nativeEvent.layout.height,
      ImageBorderWidth:e.nativeEvent.layout.width
    })
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
      }),
      Animated.timing(this.state.SlidingPanOpacity,{
        toValue:1,
        duration:250
      })
    ]).start(() => {this.setState({MenuClickDisabled:false, SlidingEnabled:true})})
  }

  ModalDismiss = (e) => {
    this.setState({ModalBGClickDisable:true}, ()=>{
      if(e === 'skill'){
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this.state.ReactNativeSkill,{
              toValue:0,
              duration:750
            }),
            Animated.timing(this.state.PHPSkill,{
              toValue:0,
              duration:750
            }),
            Animated.timing(this.state.PythonSkill,{
              toValue:0,
              duration:750,
            }),
            Animated.timing(this.state.LinuxSkill,{
              toValue:0,
              duration:750,
            })
          ]),
          Animated.timing(this.state.SkillTextOpacity,{
            toValue:0,
            duration:750
          }),
          Animated.parallel([
            Animated.timing(this.state.SkillModalWidth,{
              toValue:30,
              duration:500
            }),
            Animated.timing(this.state.SkillModalXPos,{
              toValue:SkillModalXPos,
              duration:500
            })
          ]),
          Animated.parallel([
            Animated.timing(this.state.SkillModalHeight,{
              toValue:0,
              duration:500
            }),
            Animated.timing(this.state.SkillModalYPos,{
              toValue:SkillModalYPos,
              duration:500
            })
          ])
        ]).start(() => {this.setState({SkillModalShow:false})});
      }
      else if(e === 'edu'){
        this.setState({
          EducationModalShow:false
        })
      }
      else if(e === 'exp'){
        Animated.timing(this.state.ExpScaleModal,{
          toValue:0,
          duration:500
        }).start(() => {this.setState({ExpModalShow:false})})
      }
    })
  }

  MenuImageClicked = (e) => {
    if(e === 'skill'){
      this.setState({
        SkillModalShow:true
      })
    }
    else if(e === 'edu'){
      this.setState({
        EducationModalShow:true,
        ModalBGClickDisable:false
      })
    }
    else if(e === 'exp'){
      this.setState({
        ExpModalShow:true
      })
    }
  }

  SkillModalShowAnimated = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.SkillModalHeight,{
          toValue:height/2,
          duration:500
        }),
        Animated.timing(this.state.SkillModalYPos,{
          toValue:0,
          duration:500
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.SkillModalWidth,{
          toValue:width-20,
          duration:500
        }),
        Animated.timing(this.state.SkillModalXPos,{
          toValue:0,
          duration:500
        })
      ]),
      Animated.timing(this.state.SkillTextOpacity,{
        toValue:1,
        duration:750
      }),
      Animated.parallel([
        Animated.timing(this.state.ReactNativeSkill,{
          toValue:75,
          duration:750
        }),
        Animated.timing(this.state.PHPSkill,{
          toValue:55,
          duration:750,
        }),
        Animated.timing(this.state.PythonSkill,{
          toValue:50,
          duration:750,
        }),
        Animated.timing(this.state.LinuxSkill,{
          toValue:45,
          duration:750,
        })
      ])
    ]).start(() => {this.setState({ModalBGClickDisable:false})});
  }

  ExpModalShowAnimated = () => {
    Animated.timing(this.state.ExpScaleModal,{
      toValue:1,
      duration:500
    }).start(() => {this.setState({ModalBGClickDisable:false})})
  }

  InstagramClicked = () => {
    Linking.openURL('instagram://user?username=bodhiiiii95');
  }

  LinkedinClicked = () => {
    Linking.openURL('linkedin://profile/in/bodhi-jaya-231bba136')
  }

  componentDidMount(){
    this.AnimationView();
  }

  render(){
    let ReactNativePercentage = this.state.ReactNativeSkill.interpolate({
      inputRange:[0, 100],
      outputRange:[0, this.state.BarFull],
      extrapolate:'clamp',
    })

    let PHPPercentage = this.state.PHPSkill.interpolate({
      inputRange:[0,100],
      outputRange:[0, this.state.BarFull],
      extrapolate:'clamp'
    })

    let PythonPercentage = this.state.PythonSkill.interpolate({
      inputRange:[0,100],
      outputRange:[0, this.state.BarFull],
      extrapolate:'clamp'
    })

    let LinuxPercentage = this.state.LinuxSkill.interpolate({
      inputRange:[0,100],
      outputRange:[0, this.state.BarFull],
      extrapolate:'clamp'
    })

    let YPOS = this.state.BoxPositionY.y.interpolate({
      inputRange:[0,100],
      outputRange:[98,533],
      extrapolate:'clamp'
    })

    const SlidingMenu = PanResponder.create({
      onStartShouldSetPanResponder : (e, GestureState) => true,
      onStartShouldSetPanResponderCapture : (e, GestureState) => {
        return !(GestureState.dx === 0 && GestureState.dy === 0)
      },
      onMoveShouldSetPanResponder : (e, GestureState) => true,
      onMoveShouldSetPanResponderCapture : (e, GestureState) => true,

      onPanResponderGrant : (e,GestureState) =>{
        if(this.state.SlidingEnabled === false){

        }
        else{
          this.state.BoxPositionY.setOffset({y:this.state.BoxPositionY.y._value})
          this.state.BoxPositionY.setValue({y:0})
          FirstPanMoveY=GestureState.y0;
        }
      },
      onPanResponderMove : (e, GestureState) => {
        if(this.state.SlidingEnabled === false){

        }
        else{
          //this.state.BoxPositionY.y.setValue(GestureState.dy);
          //console.log(this.state.BoxPositionY.y._value)

          
          if(this.state.BoxPositionY.y._value > 0 && this.state.SlidingPanOpenStatus === false){
            ;
          }
          else if(this.state.BoxPositionY.y._value < 0 && this.state.SlidingPanOpenStatus === true){
            ;
          }
          else if(this.state.BoxPositionY.y._value >= -431 && this.state.SlidingPanOpenStatus === false){
            Animated.event([
              null,
              {dy:this.state.BoxPositionY.y}
            ])(e, GestureState)
          }
          else if(this.state.BoxPositionY.y._value >= 0 && this.state.SlidingPanOpenStatus === true){
            Animated.event([
              null,
              {dy:this.state.BoxPositionY.y}
            ])(e, GestureState)
          }
          else{
            ;
          }
          
          /*this.state.BoxPositionY.y._value >= -200 && this.state.SlidingPanOpenStatus === false ?
          Animated.event([
            null,
            {dy:this.state.BoxPositionY.y}
          ])(e, GestureState)
          :
          console.log(this.state.BoxPositionY.y._value)*/
        }
      },
      onPanResponderTerminationRequest : (e, GestureState) => true,
      onPanResponderRelease : (e, GestureState) => {
        this.state.BoxPositionY.flattenOffset();
        SecondPanMoveY = GestureState.moveY
        let DeltaPanMoveY = SecondPanMoveY - FirstPanMoveY;

        if(Math.abs(DeltaPanMoveY) > 60 && this.state.SlidingPanOpenStatus === true){
          if(this.state.BoxPositionY.y._value < 99){
            Animated.timing(this.state.BoxPositionY.y,{
              toValue:98,
              duration:100
            }).start()
          }
          else{
            this.setState({SlidingPanOpenStatus:false}, () => {
              Animated.timing(this.state.BoxPositionY.y,{
                toValue:533,
                duration:500
              }).start()
            })
          }
        }
        else if(Math.abs(DeltaPanMoveY) > 60 && this.state.SlidingPanOpenStatus === false){
          this.setState({SlidingPanOpenStatus:true}, () => {
            Animated.timing(this.state.BoxPositionY.y,{
              toValue:98,
              duration:500
            }).start()
          })
        }
        else if(Math.abs(DeltaPanMoveY) < 60 && this.state.SlidingPanOpenStatus === false){
          Animated.timing(this.state.BoxPositionY.y,{
            toValue:533,
            duration:500
          }).start()
        }
        else if(Math.abs(DeltaPanMoveY) < 60 && this.state.SlidingPanOpenStatus === true){
          Animated.timing(this.state.BoxPositionY.y,{
            toValue:98,
            duration:500
          }).start()
        }
        else{

        }
      }
    })

    return(
      <Container>
        <StatusBar hidden />
        {/* container */}
        <View style={styles.Container}>

          {/* bottom background */}
          <View style={{flex:1, width:width, justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>
            
            <Animated.View style={{opacity:this.state.OpeningTextOpacity, width:width/1.2}}>  
              <Text style={{fontSize:30, fontWeight:'bold', color:'white', transform:[{translateY:(height/10)-50}], textAlign:'center' }}>BODHI JAYA</Text>
              <Text style={{color:'white', fontWeight:'300', textAlign:'center', transform:[{translateY:(height/10)-40}] }}>
                Hello, I'm an software engineer & server administrator who passionate in building and 
                maintaning world class software for server and mobile. High willing to learn.
                I create front end software with React Native, and backend with various programming language.
              </Text>
            </Animated.View>
          </View>
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
              <Animated.View style={{flex:1, flexDirection:'column', position:'absolute', borderRadius:2, flex:1, width:width/1.2, height:height/3, backgroundColor:'white', elevation:10, top:(height/3)-15, opacity:this.state.CardOneOpacity}}>
                <View style={{flex:1, flexDirection:'row'}}>
                  {/* Menul */}
                  <View onLayout={(event) => this.GetBorderImageSize(event)} style={{flex:1, backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity disabled={this.state.MenuClickDisabled} onPress={() => this.MenuImageClicked('edu')}>
                      <View onLayout={(event) => this.GetMenuImageSize(event)} style={{justifyContent:'center', alignItems:'center', backgroundColor:'transparent', margin:10, width:this.state.ImageBorderHeight-50, height:this.state.ImageBorderHeight-50, borderWidth:4, borderRadius:10, borderColor:'black'}}>
                        <Image style={{margin:25, width:this.state.MenuImageWidth-20, height:this.state.MenuImageHeight-20}} source={require('./src/MenuLogo/edu.png')}/>
                      </View>
                    </TouchableOpacity>
                    <Text>Education</Text>
                  </View>

                  <View onLayout={(event) => this.GetBorderImageSize(event)} style={{flex:1, backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity disabled={this.state.MenuClickDisabled} onPress={() => this.MenuImageClicked('skill')}>
                      <View onLayout={(event) => this.GetMenuImageSize(event)} style={{justifyContent:'center', alignItems:'center', backgroundColor:'transparent', margin:10, width:this.state.ImageBorderHeight-50, height:this.state.ImageBorderHeight-50, borderWidth:4, borderRadius:10, borderColor:'black'}}>
                        <Image style={{margin:25, width:this.state.MenuImageWidth-20, height:this.state.MenuImageHeight-20}} source={require('./src/MenuLogo/skill.png')}/>
                      </View>
                    </TouchableOpacity>
                    <Text>Skill</Text>
                  </View>

                  <View onLayout={(event) => this.GetBorderImageSize(event)} style={{flex:1, backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity disabled={this.state.MenuClickDisabled} onPress={() => this.MenuImageClicked('exp')}>
                      <View onLayout={(event) => this.GetMenuImageSize(event)} style={{justifyContent:'center', alignItems:'center', backgroundColor:'transparent', margin:10, width:this.state.ImageBorderHeight-50, height:this.state.ImageBorderHeight-50, borderWidth:4, borderRadius:10, borderColor:'black'}}>
                        <Image style={{margin:25, width:this.state.MenuImageWidth-20, height:this.state.MenuImageHeight-20}} source={require('./src/MenuLogo/exp.png')}/>
                      </View>
                    </TouchableOpacity>
                    <Text>Experience</Text>
                  </View>
                  {/* Menul */}
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Button title='DOWNLOAD FULL CV' color='black'/>
                </View>
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
                <TouchableHighlight style={styles.Image} onPress={()=>this.ProfilePicClicked()} disabled={this.state.ProfPicDisabledClick}>
                  <Image source={require('./src/Oke.jpg')} style={styles.Image} />
                </TouchableHighlight> 
              </Animated.View>
              
            </View>
            {/* Welcome and photo position*/}
            
            
          </View>
          {/* content */}

          {/* Education Modal */}
            <Modal transparent={true} animationType='slide' visible={this.state.EducationModalShow}>
              <TouchableWithoutFeedback disabled={this.state.ModalBGClickDisable} onPress={() => this.ModalDismiss('edu')}>
                <View style={{opacity:0.8, width:width, height:height, backgroundColor:'grey', justifyContent:'center', alignItems:'center'}}>
                
                </View>
              </TouchableWithoutFeedback>
              <View style={{position:'absolute', width:width-20, height:height/2, backgroundColor:'white', left:(width-(width-20))/2, top:height/4, borderRadius:20}}>
                <View style={{flexDirection:'row', margin:10}}>
                  <View style={{flex:1}}>
                    <Text>1.</Text>
                  </View>
                  <View style={{flex:10}}>
                    <Text>(2013 - 2017) Bachelor degree of Computer Science Universitas Multimedia Nusantara</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                  <View style={{flex:1}}>
                    <Text>2.</Text>
                  </View>
                  <View style={{flex:10}}>
                    <Text>(2010 - 2013) BPK PENABUR BANDAR LAMPUNG High School</Text>
                  </View>
                </View>
              </View>
            </Modal>
          {/* Education Modal */}

          {/* Skill Modal */}
          <Modal transparent={true} animationType='fade' visible={this.state.SkillModalShow} onShow={()=>this.SkillModalShowAnimated()}>
              <TouchableWithoutFeedback disabled={this.state.ModalBGClickDisable} onPress={() => this.ModalDismiss('skill')}>
                <View style={{opacity:0.8, width:width, height:height, backgroundColor:'grey', justifyContent:'center', alignItems:'center'}}>
                
                </View>
              </TouchableWithoutFeedback>
              <Animated.View style={{position:'absolute', width:this.state.SkillModalWidth, height:this.state.SkillModalHeight, backgroundColor:'white', left:(width-(width-20))/2, top:height/4, borderRadius:20, transform:[{translateY:this.state.SkillModalYPos},{translateX:this.state.SkillModalXPos}] }}>
                <Animated.View style={{alignItems:'center', flexDirection:'row', margin:10, opacity:this.state.SkillTextOpacity}}>
                  <View style={{flex:2}}>
                    <Text>React Native :</Text>
                  </View>
                  <View onLayout={(event) => {this.setState({BarFull:event.nativeEvent.layout.width})}} style={{flex:3, height:10, backgroundColor:'grey', borderRadius:10}}>
                    <Animated.View style={{height:10, width:ReactNativePercentage, backgroundColor:'black', borderRadius:100}}>

                    </Animated.View>
                  </View>
                </Animated.View>

                <Animated.View style={{alignItems:'center', flexDirection:'row', margin:10, opacity:this.state.SkillTextOpacity}}>
                  <View style={{flex:2}}>
                    <Text>PHP :</Text>
                  </View>
                  <View style={{flex:3, height:10, backgroundColor:'grey', borderRadius:100}}>
                    <Animated.View style={{width:PHPPercentage, height:10, backgroundColor:'black', borderRadius:100}}>

                    </Animated.View>
                  </View>
                </Animated.View>

                <Animated.View style={{alignItems:'center', flexDirection:'row', margin:10, opacity:this.state.SkillTextOpacity}}>
                  <View style={{flex:2}}>
                    <Text>Python :</Text>
                  </View>
                  <View style={{flex:3, height:10, backgroundColor:'grey', borderRadius:100}}>
                    <Animated.View style={{width:PythonPercentage, height:10, backgroundColor:'black', borderRadius:100}}>

                    </Animated.View>
                  </View>
                </Animated.View>

                <Animated.View style={{alignItems:'center', flexDirection:'row', margin:10, opacity:this.state.SkillTextOpacity}}>
                  <View style={{flex:2}}>
                    <Text>Linux :</Text>
                  </View>
                  <View style={{flex:3, height:10, backgroundColor:'grey', borderRadius:100}}>
                    <Animated.View style={{width:LinuxPercentage, height:10, backgroundColor:'black', borderRadius:100}}>

                    </Animated.View>
                  </View>
                </Animated.View>

              </Animated.View>
            </Modal>
          {/* Skill Modal */}

          {/* Exp Modal */}
          <Modal transparent={true} animationType='fade' visible={this.state.ExpModalShow} onShow={() => this.ExpModalShowAnimated()}>
              <TouchableWithoutFeedback disabled={this.state.ModalBGClickDisable} onPress={() => this.ModalDismiss('exp')}>
                <View style={{opacity:0.8, width:width, height:height, backgroundColor:'grey', justifyContent:'center', alignItems:'center'}}>
                
                </View>
              </TouchableWithoutFeedback>
              <Animated.View style={{position:'absolute', width:width-20, height:height/2, backgroundColor:'white', left:(width-(width-20))/2, top:height/4, borderRadius:20, transform:[{scale:this.state.ExpScaleModal}] }}>
                <View style={{flexDirection:'row', margin:10}}>
                  <View style={{flex:1}}>
                    <Text>1.</Text>
                  </View>
                  <View style={{flex:10}}>
                    <Text>(2018 - now) SAP Basis, System Admin, Software Engineer at PT. Charoen Pokphand Indonesia</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                  <View style={{flex:1}}>
                    <Text>2.</Text>
                  </View>
                  <View style={{flex:10}}>
                    <Text>(Sept 2017 - Dec 2017) Network Engineer at Mastersystem Infotama</Text>
                  </View>
                </View>
              </Animated.View>
            </Modal>
          {/* Exp Modal */}

          {/* Drag UP View */}
          <Animated.View {...SlidingMenu.panHandlers} style={{alignItems:'center', position:'absolute', backgroundColor:'white', width:width, height:height/1.2, borderRadius:20, borderRadius:10, elevation:15, opacity:this.state.SlidingPanOpacity, transform:[{translateY:this.state.BoxPositionY.y}] }}>
            {
              this.state.SlidingPanOpenStatus ?
              <Image source={require('./src/SlideView/up.png')} style={{width:width/9, height:width/9, transform:[{rotate:'90deg'}] }} />
              :
              <Image source={require('./src/SlideView/up.png')} style={{width:width/9, height:width/9, transform:[{rotate:'270deg'}] }} />
            }
            
            <Text style={{marginTop:height/20, textAlign:'center'}}>Credit design idea thanks to https://www.uplabs.com/users/vikrammali</Text>
            <Text style={{marginTop:CreditBoxMargin, textAlign:'center'}}>Image & Logo credit, Thanks to search from google</Text>
            <Text style={{marginTop:CreditBoxMargin, textAlign:'center'}}>This app is free to use and open source, you can clone it from https://github.com/bodhiiiii95/cvapp</Text>
            <Text style={{marginTop:CreditBoxMargin, textAlign:'center'}}>You can reach me via : </Text>
            <View style={{width:width-20, elevation:10, backgroundColor:'white', borderRadius:10}} >
              <View style={{flexDirection:'row', marginTop:CreditBoxMargin}}>
                <View style={{flex:1, alignItems:'center'}}>
                  <TouchableWithoutFeedback onPress={() => this.InstagramClicked()} >
                    <Image source={require('./src/SlideView/ig.png')} style={{width:this.state.MenuImageWidth-20, height:this.state.MenuImageHeight-20}} />
                  </TouchableWithoutFeedback>
                  <Text style={{fontSize:11}}>ID : bodhiiiii95</Text>
                </View>

                <View style={{flex:1, alignItems:'center'}}>
                  <TouchableWithoutFeedback onPress={() => this.LinkedinClicked()} >
                    <Image source={require('./src/SlideView/linkedin.png')} style={{width:this.state.MenuImageWidth-20, height:this.state.MenuImageHeight-20}} />
                  </TouchableWithoutFeedback>
                  <Text style={{fontSize:11}}>ID : bodhi-jaya-231bba136</Text>
                </View>
              </View>
              <Text style={{marginTop:ContactBoxMargin, textAlign:'center'}}>Mobile Phone : +62 812 9020 1285</Text>
              <Text style={{marginTop:ContactBoxMargin, textAlign:'center'}}>Whatsapp : +62 812 9020 1285</Text>
            </View>
            
          </Animated.View>
          {/* Drag Up View */}

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
