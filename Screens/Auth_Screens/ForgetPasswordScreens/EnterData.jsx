import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import axios from '../../../Api/axios';
import { LinearGradient } from "expo-linear-gradient";

import CustomTF from '../../../Components/CustomeTextFields/CustomTF'
import logo from '../../../assets/enterData.png'

import Colors from '../../../Conestant/Colors';
import OnboardingItem from '../../../Components/OnboardingItem/OnboardingItem';
import MainButton from '../../../Components/MainButton';
import { useState } from 'react';
import PhoneNumberTF from '../../../Components/CustomeTextFields/PhoneNumberTF';
import CAlert from '../../../Components/CustomeAlerts/CAlert';

import wrong from '../../../assets/warning.png'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function EnterData({ navigation, route }) {
    const { type } = route.params;


    const [Data, setData] = useState()
    const [Phone, setPhone] = useState()

    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")
    const [AlertLogoForm, setAlertLogoForm] = useState(wrong)
    const [navigat, setnavigat] = useState(type == "recoverbyMail" ? "ResetPasswordByGmail" : "ResetPasswordByPhone")

    const HandlePhone = (t) => {
        setPhone(t)
    }

    const HandleData = (text) => {
        setData(text)
    }

    // const navigat = type == "recoverbyMail" ? "ResetPasswordByGmail" : "ResetPasswordByPhone";

    const ForgetByEmail = "https://skyline-backend.cyclic.app/api/v1/users/forgotPassword"
    const HandleForgetByMail = async () => {
        console.log('send mail');

        const response = await axios.post(ForgetByEmail, JSON.stringify({
            email: Data,
        }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .catch((error) => {
                if (error.message == "Network Error") {
                    console.log("errr")
                }
                else if (error.response.status == 404) {  // don't find email
                    console.log("enter valid email")
                    settitleForm("enter valid email")
                    setvisibleForm(true)
                }
                // console.log(error.response.status)
            }
            )

        if (response && visibleForm == false) {
            console.log(response.data)
            navigation.navigate(navigat)
        }
    }

    const ForgetByPhoneNumber = "https://skyline-backend.cyclic.app/api/v1/users/forgotPassword"
    const HandleForgetByPhoneNumber = async () => {
        console.log('send phone');
        const response = await axios.post(ForgetByPhoneNumber, JSON.stringify({
            phoneNumber: Phone,
        }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .catch((error) => {
                if (error.message == "Network Error") {
                    console.log("errr")
                }
                else if (error.response.status == 404) {  // don't find email
                    console.log("enter valid email")
                    settitleForm("enter valid email")
                    setvisibleForm(true)
                }
                // console.log(error.response.status)
            })

        if (response && visibleForm == false) {
            console.log(response.data)
            navigation.navigate(navigat)
        }


    }


    const item = {
        image: logo,
        title: type == "recoverbyMail" ? "Enter your Email" : "Enter your Phone number",
        description: type == "recoverbyMail" ? "we will send email to your email to reset your password" : "we will send Sms to your phone number to reset your password",
    }
    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>

            {/* //////////////////////////////////////////////////// */}

            <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
                setvisibleForm(false)
            }} />

            {/* //////////////////////////////////////////////////// */}

            <OnboardingItem item={item} />
            <View style={styles.container}>
                {
                    type == "recoverbyMail" ?
                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label={"Email"} width={(width - 50)} required={true} onAddText={HandleData} text={Data} />
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: width }}>
                            <PhoneNumberTF placeholder='***********' keyboardType='numeric' label='phone Number' required={true} onAddText={HandlePhone} text={Phone} />
                        </View>
                }
                <View style={{ width: width, alignItems: 'center', marginVertical: 20 }}>
                    <MainButton title='Send' onClick={() => {
                        type == "recoverbyMail" ? HandleForgetByMail() : HandleForgetByPhoneNumber();
                        // if (visibleForm != true) {
                        //     navigation.navigate(navigat)
                        // }
                    }} />
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
        height: height / 3.5
    }
})