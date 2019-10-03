/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, } from 'react-native';

import {Text, Container, Content, Thumbnail} from 'native-base';

const Index: () => React$Node = () => {
  return (
    <Container>
      <Content>
        <Thumbnail large source={require('./src/Oke.jpg')} />
      </Content>
    </Container>
  );
};
export default Index;
