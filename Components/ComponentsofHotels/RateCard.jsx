import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function RateCard({ rate }) {
    let stars = Array(Math.floor(rate)).fill(0)
    let notstar = Array(Math.floor(5-rate)).fill(0)
    return (
        <View style={styles.containerstarts}>
            {
                stars.map((e , i) => (
                    <AntDesign key={i} name="star" size={20} color="yellow" />
                ))
            }
            {
                rate / Math.floor(rate) != 0 ?
                    <FontAwesome5 name="star-half-alt" size={20} color="yellow" />
                    : null
            }
            {
                notstar.map((e , i) => (
                    <AntDesign key={i} name="staro" size={20} color="yellow" />
                ))
            }
            <Text style={{color:'white' , fontFamily:'item' , marginHorizontal:5 , alignSelf:'center'}}>{rate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerstarts: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center'
    }
})