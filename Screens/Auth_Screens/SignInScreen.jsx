import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveToken } from '../../store/actions/auth'

import axios from '../../Api/axios';
// import validateEmail from '../../Validatation/ValidateEmail'
import validatepass from '../../Validatation/validatepass';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CAlert from '../../Components/CustomeAlerts/CAlert';
import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomeTextFields/CustomTF';
import Colors from '../../Conestant/Colors'

import Link from '../../Components/Link'
import success from '../../assets/success.png'
import wrong from '../../assets/warning.png'

export default function SigninScreen({ navigation, DontHaveAcouunt }) {
    const { width } = useWindowDimensions()
    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")

    const [visible, setVisible] = useState(false)
    const [title, settitle] = useState("")
    const [AlertLogo, setAlertLogo] = useState('')

    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")
    const [AlertLogoForm, setAlertLogoForm] = useState(wrong)

    const dispatch = useDispatch();


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

            const isValidEmail = true
            // validateEmail(Email)
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

    const saveAuth = useCallback((token) => {
        // console.log("token in function")
        // console.log(token)
        dispatch(saveToken(token))
    }, [dispatch])

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
                .catch(error => {
                    console.log(error)
                    if (error.response.status == 404) {  // don't find email
                        console.log("enter valid email")
                    }
                }

                )
            // console.log(response.data) //save token

            if (response) {
                // console.log(response.data.token)
                saveAuth(response.data.token)
                settitle("login successfully")
                setAlertLogo(success)
                setVisible(true)
            }

        } else {
            console.log("error")
        }

    }


    const GoogleLogin = '/api/v1/users/auth/google';
    var source;
    const HandleLoginGoogle = async () => {

        const response = await axios.get(GoogleLogin)

        // console.log(response.data) //save token

        if (response) {

        }
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.containerKeyboard}
        // keyboardVerticalOffset={50}

        >
            <ScrollView contentContainerStyle={styles.screen}>

                <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
                    setvisibleForm(false)
                }} />

                <CAlert visible={visible} icon={AlertLogo} title={title} onClick={() => {
                    setVisible(false)
                    HandleNavigate('Home')
                }} />

                <View>

                    <View style={{ alignItems: 'center', }}>
                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 50)} required={true} onAddText={HandleEmail} text={Email} />
                    </View>

                    <View style={{ width: width, marginEnd: 15, alignItems: "flex-end" }}>
                        <Link title='Dont have account?' onpress={() => { DontHaveAcouunt() }} textSize={18} />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <CustomTF placeholder="*******" keyboardType="default" type="" label="Password" width={(width - 50 - 24)} required={true} icon={true} onAddText={HandlePass} text={Pass} />
                    </View>


                    <View style={{ width: width, marginEnd: 10, alignItems: "flex-end" }}>
                        <Link title='Forget the password?' onpress={() => { HandleNavigate('ResetPassword') }} textSize={18} />
                    </View>

                </View>


                <View >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MainButton title="SignIn" color={Colors.Button} onClick={() => { HandleLogin() }} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.footer}>-- or with --</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="facebook" size={40} color={Colors.face_logo} style={{ marginHorizontal: 15 }} />
                            <FontAwesome5 name="google" size={33} color={Colors.Google_logo} style={{ marginHorizontal: 15 }} onPress={() => { HandleLoginGoogle() }} />
                        </View>
                    </View>
                </View>


            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.second_dark_screen,
        justifyContent: 'flex-end',
    },
    containerKeyboard: {
        backgroundColor: Colors.second_dark_screen,
        justifyContent: 'space-evenly',
        overflow: 'hidden'
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
})