import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import OnboardingItem from '../../Components/OnboardingItem/OnboardingItem';
import Colors from '../../Conestant/Colors';

import img from '../../assets/verifyImg.png'

export default function VerifyScreen() {
    const item ={
        image:img,
        title:"Verify your account",
        description:"Open your inbox and return to complete \nyour information to continue",
    }
    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>
            <OnboardingItem item={item} />
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