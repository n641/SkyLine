import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import Navigation from "./Navigator/Navigations";

import { useFonts } from 'expo-font';

import SigninScreen from './Screens/Home/Tickets/FinalBookTicket'
import {  GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [fontsLoaded] = useFonts({
    item: require('./assets/fonts/Itim-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'small'} color={'blue'} />;
  }

  return (
    <GestureHandlerRootView style={{flex:1}}>
     <Navigation />
      {/* <SigninScreen /> */}
     </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
