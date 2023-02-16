import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import Navigation from "./Navigator/Navigations";

import { useFonts } from 'expo-font';

import SigninScreen from './Screens/Auth_Screens/CompleteInfoScreen'

export default function App() {

  const [fontsLoaded] = useFonts({
    item: require('./assets/fonts/Itim-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'small'} color={'blue'} />;
  }

  return (
    <Navigation />
    // <SigninScreen/>
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
