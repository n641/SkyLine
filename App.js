import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import Navigation from "./Navigator/Navigations";

import { useFonts } from 'expo-font';

import VerifyScreen from './Screens/Auth_Screens/VerifyScreen';


export default function App() {

  const [fontsLoaded] = useFonts({
    item: require('./assets/fonts/Itim-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'small'} color={'blue'} />;
  }

  return (
    // <Navigation />
    <VerifyScreen/>
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
