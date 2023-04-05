import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { useFonts } from 'expo-font';

import Navigation from "./Navigator/Navigations";
import SigninScreen from './Screens/Home/Tickets/FinalBookTicket'

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AuthReducer from './store/reducers/auth'


const rootreducer = combineReducers({
  Auth: AuthReducer,
})

const store = createStore(rootreducer, applyMiddleware(ReduxThunk));

export default function App() {

  const [fontsLoaded] = useFonts({
    item: require('./assets/fonts/Itim-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'small'} color={'blue'} />;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
        {/* <SigninScreen /> */}
      </GestureHandlerRootView>
    </Provider>
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
