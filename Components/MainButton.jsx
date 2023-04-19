import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React from 'react'

import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring } from 'react-native-reanimated'


import Colors from '../Conestant/Colors'
const { height, width } = Dimensions.get('window')

export default function MainButton({ title, onClick }) {
    const formButtonSize = useSharedValue(1);

    const formBottunAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: formButtonSize.value }]
        }
    })

    return (

        <Animated.View style={[styles.container,formBottunAnimatedStyle]}>
            <Pressable onPress={() => {
                formButtonSize.value = withSequence(withSpring(1.5), withSpring(1))
                onClick()
            }} >
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: Colors.Button,
        padding: 5,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        maxWidth: width/1.6,
        minWidth: width / 2.6,
        maxHeight: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    title: {
        fontFamily: "item",
        fontSize: width / 15,
        color: "white",
    }
})