import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from '../../Api/axios';

import { LinearGradient } from "expo-linear-gradient";
import OnboardingItem from '../../Components/OnboardingItem/OnboardingItem';
import Colors from '../../Conestant/Colors';
import TextInputNumbers from '../../Components/CustomeTextFields/TextInputNumbers';

import { useSelector, useDispatch } from 'react-redux';

import success from '../../assets/success.png'
import wrong from '../../assets/warning.png'
import CAlert from '../../Components/CustomeAlerts/CAlert';


import img from '../../assets/verifyImg.png'
import { useState } from 'react';

export default function VerifyNewEmail({ navigation, route }) {
    const { email } = route.params;

    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")
    const [AlertLogoForm, setAlertLogoForm] = useState(wrong)

    const [visibleDone, setvisibleDone] = useState(false)
    const [TitleDone, setTitleDone] = useState()


    const [Loading, setLoading] = useState(false)

    const auth = useSelector(state => state.Auth.token);
    // console.log(auth)

    const HandleCodeAgain = async () => {
        const SendCode = "https://skyline-backend.cyclic.app/api/v1/users/resendVerifyOTP"
        const response = await axios.patch(SendCode, JSON.stringify({
            email: email,
        }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .catch((error) => {
                console.log(error.message)
                settitleForm(error.message)
                setAlertLogoForm(wrong)
                setvisibleForm(true)
            })

        if (response) {
            console.log(response.data)
            settitleForm("code id resend to your email")
            setAlertLogoForm(success)
            setvisibleForm(true)
        }
        setLoading(false)
    }

    const HandleSendOtp = async (code) => {
        const sendOtp = `https://skyline-backend.cyclic.app/api/v1/users/verify/${code}`
        const response = await axios.patch(sendOtp,
            {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
                withCredentials: true
            }
        )
            .catch((error) => {
                console.log(error.message)
                settitleForm(error.message)
                setAlertLogoForm(wrong)
                setvisibleForm(true)
            })
        if (response) {
            console.log(response.data)
            setTitleDone("done verfiy")
            setvisibleDone(true)
            setAlertLogoForm(success)
        }
        setLoading(false)
    }

    const HandleDone = (code) => {
        setLoading(true)
        HandleSendOtp(code)
    }
    const HandleResend = () => {
        setLoading(true)
        HandleCodeAgain()
    }


    const item = {
        image: img,
        title: "Verify your account",
        description: "you will receive code , copy it and paste down to verfiy email",
    }

    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>
            {/* ///////////////////////////////////// */}
            <CAlert visible={visibleForm} icon={AlertLogoForm} title={titleForm} onClick={() => {
                setvisibleForm(false)
                setLoading(false)
            }} />

            <CAlert visible={visibleDone} icon={AlertLogoForm} title={TitleDone} onClick={() => {
                setvisibleDone(false)
                setLoading(false)
                navigation.navigate("Home")
            }} />
            {/* ////////////////////////////////// */}
            <OnboardingItem item={item} />
            <View>
                <TextInputNumbers navigation={navigation} HandleResend={HandleResend} HandleDone={HandleDone} Loading={Loading} />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})