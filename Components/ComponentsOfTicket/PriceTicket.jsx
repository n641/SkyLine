import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PriceTicket({price}) {
  return (
    <View style={{
        borderBottomRightRadius:15,
        borderTopLeftRadius:15,
        backgroundColor:'gray',
        padding:10,
        margin:10,
        maxHeight:40
    }}>
      <Text>{price}$</Text>
    </View>
  )
}

const styles = StyleSheet.create({})