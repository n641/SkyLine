import { StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomTF';
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'

export default function SigninScreen({ navigation }) {
    const { width } = useWindowDimensions()
    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")

    const HandleNavigate = (name) => {
        navigation.navigate(name)
    }
    const HandleEmail = (text)=>{
        setEmail(text)
    }
    const HandlePass = (text)=>{
        setPass(text)
    }
    
    return (
        <View style={styles.screen}>
            <ImageBackground source={img} resizeMode="cover" style={styles.backGround} blurRadius={5}>

                <View style={[styles.containerLogo, { width: width }]}>
                    <Image source={Logo} style={styles.Image} />
                </View>
                <View style={{ marginStart: 15, justifyContent: 'center' }}>
                    <FontAwesome name="minus" size={34} color="white" />
                    <Text style={styles.title}>Sign In</Text>
                </View>

                <View>

                    <View style={{ alignItems: 'center' }}>
                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 50)} required={true} onAddText={HandleEmail} />
                    </View>
                    <View style={{ width: width, marginEnd: 15, alignItems: "flex-end" }}>
                        <Link title='Dont have account?' onpress={() => { HandleNavigate('Signup') }} textSize={18} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CustomTF placeholder="*******" keyboardType="default" type="" label="Password" width={(width - 50 - 24)} required={true} icon={true} onAddText={HandlePass} />
                    </View>

                </View>

                <View style={{ width: width, marginEnd: 10, alignItems: "flex-end" }}>
                    <Link title='Forget the password?' onpress={() => { }} textSize={18} />
                </View>


                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MainButton title="Signup" color={Colors.Button} onClick={() => { HandleNavigate('Signup') }} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.footer}>-- or with --</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name="facebook" size={40} color={Colors.face_logo} style={{ marginHorizontal: 15 }} />
                        <FontAwesome5 name="google" size={30} color={Colors.Google_logo} style={{ marginHorizontal: 15 }} />
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
        // textDecorationLine:'li'

    },
    footer: {
        fontFamily: 'item',
        color: "white",
        fontSize: 30

    }
})