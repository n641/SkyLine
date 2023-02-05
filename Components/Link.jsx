import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'

import Colors from '../Conestant/Colors'

export default function Link({title , textSize , onpress}) {
  return (
    <TouchableOpacity onPress={onpress}>
      <Text style={[styles.title, {fontSize: textSize}]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    title: {
        fontFamily: "item",
        fontSize: 30,
        color: Colors.links,
        textDecorationLine:'underline line',
        margin:10
    }
})