import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import Colors from '../Conestant/Colors'

export default function MainButton({ title, onClick }) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: Colors.Button,
        padding: 5,
        elevation: 7,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        maxWidth: 170,
        minWidth: 170,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    title: {
        fontFamily: "item",
        fontSize: 32,
        color: "white"
    }
})