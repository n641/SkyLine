import { StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CAlert from '../../Components/CAlert';
import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomTF';
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'
import success from '../../assets/success.png'
import wrong from '../../assets/warning.png'


const ResetPasswordScreen = () => {
    const { width } = useWindowDimensions()
    const [Email, setEmail] = useState("")

    const HandleEmail = (text) => {
        setEmail(text)
    }
    const HandleNavigate = (name) => {
        navigation.navigate(name)
    }

    return (
        <View style={styles.screen}>

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
                    <Text style={styles.title}>Forget password</Text>
                </View>
                <Text style={styles.subtitle}>will send email with verification code to {'->'}</Text>

                <View>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 50)} required={true} onAddText={HandleEmail} text={Email} />
                    </View>

                </View>

                <View style={{ width: width, marginStart:-10, alignItems: "flex-end" , marginTop:5 }}>
                    <Link title='Sign in?' onpress={() => { HandleNavigate('Signin') }} textSize={20} />
                </View>


                <View style={{ marginTop: 10 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MainButton title="Send" color={Colors.Button} onClick={() => { }} />
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
    subtitle: {
        fontFamily: 'item',
        fontSize: 20,
        color: Colors.Google_logo,
        textAlign: 'center',
        maxWidth:'90%',
        marginHorizontal:20
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


export default ResetPasswordScreen