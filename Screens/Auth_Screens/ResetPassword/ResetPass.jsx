import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors';
import CustomTF from '../../../Components/CustomeTextFields/CustomTF';

import axios from '../../../Api/axios';

import MainButton from '../../../Components/MainButton';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function ResetPass({ navigation }) {
    const [Code, setCode] = useState()
    const [Password, setPassword] = useState()
    const [ComPassword, setComPassword] = useState()
    const HandleCode = (val) => {
        setCode(val)
    }
    const HandlePass = (val) => {
        setPassword(val)
    }
    const Handlecompass = (val) => {
        setComPassword(val)
    }
    const HandleForgetByMail = async (code, pass) => {
        const ForgetByEmail = `https://skyline-backend.cyclic.app/api/v1/users/resetPassword/${code}`
        const response = await axios.post(ForgetByEmail, JSON.stringify({
            password: pass,
            passwordConfirm: pass
        }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .catch((error) => {
                //////////////////////////////////////validaet code
                console.log(error)
            }
            )

        if (response) {
            console.log(response.data)
            navigation.navigate('AnimatedLogin')
        }
    }

    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>
            <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label={"Code send to you"} width={(width - 50)} required={true} onAddText={HandleCode} text={Code} />
            <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label={"New password"} width={(width - 50)} required={true} onAddText={HandlePass} text={Password} />
            <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label={"confirm password"} width={(width - 50)} required={true} onAddText={Handlecompass} text={ComPassword} />

            <View style={{ alignSelf: 'center', margin: 10 }}>
                <MainButton title={'Reset'} onClick={() => {
                    HandleForgetByMail(Code, Password)
                }} />
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
})