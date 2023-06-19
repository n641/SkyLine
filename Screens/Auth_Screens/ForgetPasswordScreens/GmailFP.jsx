import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

import OnboardingItem from '../../../Components/OnboardingItem/OnboardingItem';
import TextInputNumbers from '../../../Components/CustomeTextFields/TextInputNumbers';
import Link from '../../../Components/Link';
import Colors from '../../../Conestant/Colors';
import axios from '../../../Api/axios';

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import logo from '../../../assets/email.png'
import { useEffect } from 'react';


const GmailFP = ({ navigation, route }) => {
  const { type, number } = route.params;


  const item = {
    image: logo,
    title: `Verfy ${type} `,
    description: `Please enter the number code send \n to your ${type} `,
  }

  const SendVerfyCodeForPhone = async (number) => {
    const url = `https://skyline-backend.cyclic.app/api/v1/users/phone/send-otp`
    const response = await axios.post(url, JSON.stringify({
      countryCode: 20,
      phoneNumber: `${number}`
    }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
      .catch(error => {
        //////////////////////////////////////validaet phone
        console.log(error)
      })
  }
  useEffect(() => {
    if (type == "phone") {
      SendVerfyCodeForPhone(number)
    }
  }, [])

  const VerfiyOtpOfPhone = async (code) => {
    const url = `https://skyline-backend.cyclic.app/api/v1/users/phone/verify-otp`
    const response = await axios.post(url, JSON.stringify({
      countryCode: 20,
      phoneNumber: `${number}`,
      otpCode: code
    }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
      .catch(error => {
        console.log(error)
      })
    if (response) {
      navigation.navigate('MainProfileScreen')
    }
    console.log(response)
  }
  useEffect(() => {
    if (type == "phone") {
      SendVerfyCodeForPhone(number)
    }
  }, [])

  const HandleDone = () => {
    if (type == "phone") {
    }
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
            <TextInputNumbers navigation={navigation} type={type} HandleDone={VerfiyOtpOfPhone} />
          </View>

        </ScrollView>

      </LinearGradient>

    </KeyboardAvoidingView>
  )
}
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
});

export default GmailFP