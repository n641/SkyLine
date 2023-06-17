import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function BoxOfCategories({ title , HandleNavigate , routename }) {
    return (
        <TouchableOpacity onPress={()=>{
            HandleNavigate(routename)
        }}>
            {/* rgba(30,30,30,0.8) */}
            <LinearGradient
            //  colors={['#01479D', 'rgba(217,217,217,0.79)', '#0E2E6D']}
             colors={['rgba(30,30,30,0.8)', 'rgba(30,30,30,0.8)', 'rgba(30,30,30,0.8)']}

                style={{
                    justifyContent: 'center',
                    borderRadius: 10,
                    width: 60,
                    height:70,
                    marginVertical: 28,
                    marginHorizontal: 12,

                    // marginLeft: 40
                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                    {title=='Ticket'?
                    <MaterialCommunityIcons name="airplane-takeoff" size={40} color="white" /> :
                    title=='Hotel'?
                    <FontAwesome name="hotel" size={35} color="white" />:
                    title=='Agency'?
                    <FontAwesome name="bank" size={40} color="white" /> :
                    <FontAwesome5 name="taxi" size={40} color="white" />
                    }
                    <Text style={styles.text}>{title}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'item',
        color: "white",
        fontSize: 16,
    }
})