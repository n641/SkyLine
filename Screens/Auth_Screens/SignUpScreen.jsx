import { StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'

import axios from '../../Api/axios';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomTF';
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'




export default function SignUpScreen({ navigation }) {
  const { width } = useWindowDimensions()
  const [FirstName, setFirstName] = useState("")
  const [SecondName, setSecondName] = useState("")
  const [UserName, setUserName] = useState("")
  const [Date, setDate] = useState()
  const [Email, setEmail] = useState("")
  const [Pass, setPass] = useState("")
  const [ConformPass, setConformPass] = useState("")
  const [Address, setAddress] = useState("")

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
  const HandleDate = (text) => {
    setDate(text)
  }
  const HandleAddress = (text) => {
    setAddress(text)
  }

  const signupUrl = '/api/v1/users/signup';
  const HandleSignup = async () => {
    const response = await axios.post(signupUrl, JSON.stringify({
        firstName:FirstName,
        lastName:SecondName,
        username:UserName,
        birthDate:Date,
        email: Email,
        password: Pass,
        passwordConfirm:ConformPass,
        // address:Address
    }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
    .catch(e=>console.log(response))
    // console.log(response.data)

    // if(response){
        //navigate
        // console.log()
    // }
}


  return (
    <ScrollView style={styles.screen}>
      <ImageBackground source={img} resizeMode="cover" style={styles.backGround} blurRadius={5}>

        <View style={[styles.containerLogo, { width: width }]}>
          <Image source={Logo} style={styles.Image} />
        </View>
        <View style={{ marginStart: 15, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="minus" size={34} color="white" />
            <FontAwesome name="minus" size={34} color="white" style={{ left: -2 }} />
            <FontAwesome name="minus" size={34} color="white" style={{ left: -4 }} />
          </View>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View>
          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <CustomTF placeholder="Noha" keyboardType="default" type="" label="First Name" width={(width / 2 - 40)} required={true} onAddText={HandleFirstName}  text={FirstName}/>
            <CustomTF placeholder="Mohammed" keyboardType="default" type="" label="Second Name" width={(width / 2 - 40)} required={true} onAddText={HandleSecondName} text={SecondName} />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <CustomTF placeholder="NohaMohammed123" keyboardType="default" type="" label="User Name" width={(width / 2 - 40)} required={true} onAddText={HandleUserNmae} text={UserName} />
            <CustomTF placeholder="YYYY-MM-DD" keyboardType="default" type="" label="Birth Date" width={(width / 2 - 40)} required={true} onAddText={HandleDate} text={Date} />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 50)} required={true} onAddText={HandleEmail} text={Email} />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <CustomTF placeholder="*******" keyboardType="default" type="" label="Password" width={(width - 50 - 24)} required={true} icon={true} onAddText={HandlePass} Text={Pass} />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <CustomTF placeholder="*******" keyboardType="'default'" type="" label="Confirm-Password" width={(width - 50 - 24)} required={true} icon={true} onAddText={HandleConformPass} text={ConformPass} />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <CustomTF placeholder="" keyboardType="'default'" type="" label="Adress" width={(width - 50)} required={false} onAddText={HandleAddress} text={Address} />
          </View>
        </View>

        <View style={{ width: width, alignItems: 'flex-end', marginRight: 15 }}>
          <Link title='Have already acount!' textSize={18} onpress={() => { HandleNavigate('Signin') }} />
        </View>


        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <MainButton title="Signup" color={Colors.Button} onClick={() => { HandleSignup() }} />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.footer}>-- or with --</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="facebook" size={40} color={Colors.face_logo} style={{ marginHorizontal: 15 }} onpress={() => { }} />
            <FontAwesome5 name="google" size={30} color={Colors.Google_logo} style={{ marginHorizontal: 15 }} onpress={() => { }} />
          </View>
        </View>

      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  containerLogo: {
    alignItems: 'flex-end'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  backGround: {
    flex: 1,
  },
  Image: {
    width: 45,
    height: 54,
    resizeMode: "contain",

  },
  title: {
    fontFamily: 'item',
    fontSize: 50,
    color: "white",
  },
  footer: {
    fontFamily: 'item',
    color: "white",
    fontSize: 30

  }
})