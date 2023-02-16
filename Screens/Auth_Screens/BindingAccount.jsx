import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import OnboardingItem from '../../Components/OnboardingItem/OnboardingItem';
import Colors from '../../Conestant/Colors';

import img from '../../assets/onBinding.png'
import MainButton from '../../Components/MainButton';

export default function BindingAccount() {
    const {width} = useWindowDimensions()
    const item ={
        image:img,
        title:"Account on binding",
        description:"when your account is verified ,will send you an email",
    }
    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>
            <OnboardingItem item={item} />
            <View style={{width:width , alignItems:'flex-end'}}>
                <MainButton title='Go to Home >' onClick={()=>{}}/>
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