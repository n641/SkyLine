import { StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';

import axios from '../../Api/axios';
// import validateEmail from '../../Validatation/validateEmail'
import validatepass from '../../Validatation/validatepass';
import validateUserName from '../../Validatation/validateUserName'

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CAlert from '../../Components/CustomeAlerts/CAlert';
import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomeTextFields/CustomTF';
import DatePickerTF from '../../Components/CustomeTextFields/DatePickerTF';
import Colors from '../../Conestant/Colors'

import Link from '../../Components/Link'
import success from '../../assets/success.png'
import wrong from '../../assets/warning.png'


export default function SignUpScreen({ navigation, DontHaveAcouunt }) {
  const { width } = useWindowDimensions()
  const [FirstName, setFirstName] = useState("")
  const [SecondName, setSecondName] = useState("")
  const [UserName, setUserName] = useState("")

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [Email, setEmail] = useState("")
  const [Pass, setPass] = useState("")
  const [ConformPass, setConformPass] = useState("")
  const [Address, setAddress] = useState("")

  const [visible, setVisible] = useState(false)
  const [title, settitle] = useState("")
  const [AlertLogo, setAlertLogo] = useState(success)

  const [visibleForm, setvisibleForm] = useState(false)
  const [titleForm, settitleForm] = useState("")
  const [AlertLogoForm, setAlertLogoForm] = useState(wrong)

  const [Loading, setLoading] = useState(false)


  const HandleNavigate = (name) => {
    navigation.navigate(name)
  }
  const HandleEmail = (text) => {
    setEmail(text)
  }
  const HandlePass = (text) => {
    setPass(text)
  }
  const HandleConformPass = (text) => {
    setConformPass(text)
  }
  const HandleFirstName = (text) => {
    setFirstName(text)
  }
  const HandleSecondName = (text) => {
    setSecondName(text)
  }
  const HandleUserNmae = (text) => {
    setUserName(text)
  }
  const HandleDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(!show);
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  }
  const HandleAddress = (text) => {
    setAddress(text)
  }

  const HandleError = () => {
    if (FirstName && SecondName && UserName && Date && Email && Pass && ConformPass) {

      const isValidUsername = validateUserName(Pass)
      const isValidEmail = true
      //  validateEmail(Email)
      const isValidpass = validatepass(Pass)


      if (!isValidEmail) {
        settitleForm('Oppsssss....\nPlease provide a valid email')
        setAlertLogoForm(wrong)
        setvisibleForm(true)
        return false

      }
      // else if (!isValidpass) {
      //   settitleForm('Oppsssss....\n Please provide a valid password ')
      //   setAlertLogoForm(wrong)
      //   setvisibleForm(true)
      //   return false

      // }
      //  else if (!isValidUsername) {
      //   settitleForm('Oppsssss....\n Please provide a valid UserName')
      //   setAlertLogoForm(wrong)
      //   setvisibleForm(true)
      //   return false

      // }
      else if (Pass != ConformPass) {
        settitleForm('Waittt....\n Passwords are not the same!')
        setAlertLogoForm(wrong)
        setvisibleForm(true)
        return false
      }
      return true

    } else {
      settitleForm('Waittt....\n please ,sure that all required fields are written')
      setAlertLogoForm(wrong)
      setvisibleForm(true)
      return false
    }
  }

  const signupUrl = '/api/v1/users/signup';
  const HandleSignup = async () => {
    setLoading(true)
    if (HandleError()) {
      const response = await axios.post(signupUrl, JSON.stringify({
        firstName: FirstName,
        lastName: SecondName,
        username: UserName,
        birthDate: date.toJSON().substring(0, 10),
        email: Email,
        password: Pass,
        passwordConfirm: ConformPass,
        address: Address
      }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
        .catch(error => {
          console.log(error)
          if (error.response.status == 404) {  // don't find email
            setvisibleForm(true)
            setLoading(true)
            settitleForm("enter valid email")
          } else if (error.response.status == 401) {
            setvisibleForm(true)
            setLoading(true)
            settitleForm("wrong email ")

          }
        }

        )


      if (response) {
        settitle("register successfully")
        setAlertLogo(success)
        setLoading(false)
        setVisible(true)
      }
    }
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerKeyboard}>
      <ScrollView contentContainerStyle={styles.screen}>

        {/* //////////////////////////////////Custome Alert//////////////////////////////////// */}
        <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
          setvisibleForm(false)
          setLoading(false)

        }} />

        <CAlert visible={visible} icon={AlertLogo} title={title} onClick={() => {
          setVisible(false)
          setLoading(false)
          HandleNavigate('Home')
        }} />

        {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

        <View>

          <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
            <CustomTF placeholder="Noha" keyboardType="default" type="" label="First Name" width={(width / 2 - 60)} required={true} onAddText={HandleFirstName} text={FirstName} />
            <CustomTF placeholder="Mohammed" keyboardType="default" type="" label="Second Name" width={(width / 2 - 60)} required={true} onAddText={HandleSecondName} text={SecondName} />
          </View>

          <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
            <CustomTF placeholder="NohaMohammed123" keyboardType="default" type="" label="User Name" width={(width / 2 - 60)} required={true} onAddText={HandleUserNmae} text={UserName} />
            <DatePickerTF label="Birth Date" width={(width / 2 - 43)} required={true} date={date} mode={mode} show={show} showDatepicker={showDatepicker} onChange={HandleDate} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 80)} required={true} onAddText={HandleEmail} text={Email} />
          </View>

          <View style={{ alignItems: 'center', }}>
            <CustomTF placeholder="*******" keyboardType="default" type="" label="Password" width={(width - 80 - 24)} required={true} icon={true} onAddText={HandlePass} Text={Pass} />
          </View>

          <View style={{ alignItems: 'center', }}>
            <CustomTF placeholder="*******" keyboardType="'default'" type="" label="Confirm-Password" width={(width - 80 - 24)} required={true} icon={true} onAddText={HandleConformPass} text={ConformPass} />
          </View>

          <View style={{ alignItems: 'center', }}>
            <CustomTF placeholder="" keyboardType="'default'" type="" label="Adress" width={(width - 80)} required={false} onAddText={HandleAddress} text={Address} />
          </View>

        </View>

        <View style={{ width: width, marginStart: 20 }}>
          <Link title='Have already acount!' textSize={15} onpress={() => { DontHaveAcouunt() }} />
        </View>


        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <MainButton title="Signup" color={Colors.Button} onClick={() => { HandleSignup() }} loading={Loading} />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.footer}>-- or with --</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="facebook" size={40} color={Colors.face_logo} style={{ marginHorizontal: 15 }} onpress={() => { }} />
            <FontAwesome5 name="google" size={33} color={Colors.Google_logo} style={{ marginHorizontal: 15 }} onpress={() => { }} />
          </View>
        </View>

      </ScrollView >
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.second_dark_screen,

  },
  containerKeyboard: {
    // flex: 1,
    backgroundColor: "black",
  },
  containerLogo: {
    alignItems: 'flex-end'
  },
  footer: {
    fontFamily: 'item',
    color: "white",
    fontSize: 30

  }
})