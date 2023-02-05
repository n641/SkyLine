import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React from 'react'

import MainButton from '../../Components/MainButton'
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'



export default function StartScreen({ navigation }) {

    const HandleNavigate = (name) => {
        navigation.navigate(name)
    }

    return (
        <View style={styles.screen}>
            <ImageBackground source={img} resizeMode="cover" style={styles.backGround} blurRadius={4}>
                <View style={styles.container}>

                    <Image source={Logo} style={styles.Image} />

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MainButton title="Login" color={Colors.Button} onClick={() => { HandleNavigate("Signin") }} />
                        <MainButton title="Signup" color={Colors.Button} onClick={() => {HandleNavigate('Signup')}} />
                        <Link title="continue as guest ->" textSize={30} onpress={() => { }} />
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
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    backGround: {
        flex: 1,
        justifyContent: 'center',
    },
    Image: {
        width: 246,
        height: 234,
        marginBottom: 20,
        borderRadius: 50,
        resizeMode: "contain",
    }

})