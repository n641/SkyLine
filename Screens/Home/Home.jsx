import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Colors from '../../Conestant/Colors';

import { LinearGradient } from "expo-linear-gradient";


export default function Home() {
  return (
    <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.Screen}>
                <Text>noha</Text>
            </LinearGradient>
    
  )
}

const styles = StyleSheet.create({
    Screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})