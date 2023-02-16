import { StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'


import axios from '../../Api/axios';
import validateEmail from '../../Validatation/validateEmail'
import validatepass from '../../Validatation/validatepass';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CAlert from '../../Components/CustomeAlerts/CAlert';
import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomeTextFields/CustomTF';
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'
import success from '../../assets/success.png'
import wrong from '../../assets/warning.png'

export default function SigninScreen({ navigation }) {
    const { width } = useWindowDimensions()
    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")

    const [visible, setVisible] = useState(false)
    const [title, settitle] = useState("")
    const [AlertLogo, setAlertLogo] = useState('')

    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")
    const [AlertLogoForm, setAlertLogoForm] = useState(wrong)

    const HandleNavigate = (name) => {
        navigation.navigate(name)
    }
    const HandleEmail = (text) => {
        setEmail(text)
    }
    const HandlePass = (text) => {
        setPass(text)
    }


    const HandleError = () => {
        if (Email && Pass) {

            const isValidEmail = validateEmail(Email)
            const isValidpass = validatepass(Pass)

            if (!isValidEmail) {
                settitleForm('Please provide a valid email')
                setAlertLogoForm(wrong)
                setvisibleForm(true)
                return false

            }
            // else if (!isValidpass) { //error with validate
            //     settitleForm('Please provide a valid password')
            //     setAlertLogoForm(wrong)
            //     setvisibleForm(true)
            //     return false
            // }

            return true

        } else {
            settitleForm('Waittt....\n please ,sure that all fields are written ')
            setAlertLogoForm(wrong)
            setvisibleForm(true)
            return false
        }
    }

    const loginUrl = "/api/v1/users/login"
    const HandleLogin = async () => {
        if (HandleError()) {
            const response = await axios.post(loginUrl, JSON.stringify({
                email: Email,
                password: Pass
            }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
                .catch(e => console.log(e))
            console.log(response.data) //save token

            if (response) {
            settitle("login successfully")
            setAlertLogo(success)
            setVisible(true)
            }

        } else {
            console.log("error")
        }

    }

    const GoogleLogin = '/api/v1/users/auth/google';

    const HandleLoginGoogle = async () => {
      
            const response = await axios.get(GoogleLogin)
            
            
            console.log(response) //save token

            // if (response) {
            // settitle("login successfully")
            // setAlertLogo(success)
            // setVisible(true)
            // }

       

    }

    
    return (
        <View style={styles.screen}>

            <ImageBackground source={img} resizeMode="cover" style={styles.backGround} blurRadius={5}>

                {/* //////////////////////////////////Custome Alert//////////////////////////////////// */}
                <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
                    setvisibleForm(false)
                }} />

                <CAlert visible={visible} icon={AlertLogo} title={title} onClick={() => {
                    setVisible(false)
                    HandleNavigate('Home')
                }} />

                {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

                <View style={[styles.containerLogo, { width: width }]}>
                    <Image source={Logo} style={styles.Image} />
                </View>
                <View style={{ marginStart: 15, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name="minus" size={34} color="white" />
                        <FontAwesome name="minus" size={34} color="white" style={{ left: -2 }} />
                        <FontAwesome name="minus" size={34} color="white" style={{ left: -4 }} />
                    </View>
                    <Text style={styles.title}>Sign In</Text>
                </View>
                <View>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 50)} required={true} onAddText={HandleEmail} text={Email} />
                    </View>
                    <View style={{ width: width, marginEnd: 15, alignItems: "flex-end" }}>
                        <Link title='Dont have account?' onpress={() => { HandleNavigate('Signup') }} textSize={18} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CustomTF placeholder="*******" keyboardType="default" type="" label="Password" width={(width - 50 - 24)} required={true} icon={true} onAddText={HandlePass} text={Pass} />
                    </View>

                </View>

                <View style={{ width: width, marginEnd: 10, alignItems: "flex-end" }}>
                    <Link title='Forget the password?' onpress={() => {HandleNavigate('ResetPassword') }} textSize={18} />
                </View>


                <View style={{ marginTop: 30 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MainButton title="SignIn" color={Colors.Button} onClick={() => { HandleLogin() }} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.footer}>-- or with --</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="facebook" size={40} color={Colors.face_logo} style={{ marginHorizontal: 15 }} />
                            <FontAwesome5 name="google" size={33} color={Colors.Google_logo} style={{ marginHorizontal: 15 }} onPress={()=>{HandleLoginGoogle()}}/>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
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
    link: {
        fontFamily: 'item',
        color: Colors.links,
        marginHorizontal: 30,
        fontSize: 18,
    },
    footer: {
        fontFamily: 'item',
        color: "white",
        fontSize: 30

    },
    header: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelBG: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})