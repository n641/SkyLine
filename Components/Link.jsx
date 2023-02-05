import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Colors from '../Conestant/Colors'

export default function Link({title , textSize}) {
  return (
    <View>
      <Text style={[styles.title, {fontSize: textSize}]}>{title}</Text>
    </View>
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