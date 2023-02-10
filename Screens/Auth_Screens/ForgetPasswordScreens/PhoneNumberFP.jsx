import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

import OnboardingItem from '../../../Components/OnboardingItem';
import TextInputNumbers from '../../../Components/TextInputNumbers';
import Link from '../../../Components/Link';
import Colors from '../../../Conestant/Colors';

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import logo from '../../../assets/SMS.png'

const PhoneNumberFP = ({ navigation }) => {
  
  const item = {
    image: logo,
    title: "Verfy PhoneNumber!",
    description: "Please enter the number code send \n your phoneNumber +01*********",
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerKeyboard}>

      <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
        style={styles.linearGradient}>
        <ScrollView>

          <OnboardingItem item={item} />
          <View style={{}}>
            <TextInputNumbers navigation={navigation} />
          </View>

        </ScrollView>

      </LinearGradient>

    </KeyboardAvoidingView>
  )
}

export default PhoneNumberFP

const styles = StyleSheet.create({
    containerKeyboard: {
    flex: 1,
    backgroundColor: "black"
  },
  title: {
    color: "white",
    fontFamily: 'item',
    fontSize: 18
  },
  description: {
    color: Colors.Gray,
    fontFamily: 'item',
    fontSize: 16
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})