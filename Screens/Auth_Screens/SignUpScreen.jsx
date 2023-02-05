import { StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomTF';
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'


export default function SignUpScreen() {
  const { width } = useWindowDimensions()
  return (
    <ScrollView style={styles.screen}>
      <ImageBackground source={img} resizeMode="cover" style={styles.backGround} blurRadius={5}>

        <View style={[styles.containerLogo, { width: width }]}>
          <Image source={Logo} style={styles.Image} />
        </View>
        <View style={{ marginStart: 15, justifyContent: 'center' }}>
          <FontAwesome name="minus" size={34} color="white" />
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View>
          <View style={{ flexDirection: 'row' , marginVertical:20 }}>
            <CustomTF placeholder="Noha" keyboardType="default" type="" label="First Name" width={(width / 2 - 30 )} required={true} />
            <CustomTF placeholder="Mohammed" keyboardType="default" type="" label="Second Name" width={(width / 2 - 30 )} required={true} />
          </View>
          <View style={{ flexDirection: 'row' , marginVertical:20}}>
            <CustomTF placeholder="NohaMohammed123" keyboardType="default" type="" label="User Name" width={(width / 2 - 30 )} required={true} />
            <CustomTF placeholder="DD/MM/YYYY" keyboardType="default" type="" label="Birth Date" width={(width / 2 - 30 )} required={true} />
          </View>
          <View style={{ alignItems: 'center' , marginVertical:20}}>
            <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 50)} required={true} />
          </View>
          <View style={{ alignItems: 'center' , marginVertical:20}}>
            <CustomTF placeholder="*******" keyboardType="default" type="" label="Password" width={(width - 50 - 24)} required={true} icon={true} />
          </View>
          <View style={{ alignItems: 'center' , marginVertical:20}}>
            <CustomTF placeholder="*******" keyboardType="'default'" type="" label="Confirm-Password" width={(width - 50 - 24)} required={true} icon={true} />
          </View>
          <View style={{ alignItems: 'center' , marginVertical:20}}>
            <CustomTF placeholder="" keyboardType="'default'" type="" label="Adress" width={(width - 50)} required={false} />
          </View>
        </View>

        <View style={{ width: width , alignItems:'flex-end', marginRight:15 }}>
          <Link title='Have already acount!' textSize={18} onpress={()=>{}}/>
        </View>


        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <MainButton title="Signup" color={Colors.Button} onClick={() => { HandleNavigate('Signup') }} />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.footer}>-- or with --</Text>
          <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}>
          <MaterialIcons name="facebook" size={40} color={Colors.face_logo}  style={{marginHorizontal:15}}/>
          <FontAwesome5 name="google" size={40} color={Colors.Google_logo}  style={{marginHorizontal:15}}/>
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
    fontSize: 35

  }
})