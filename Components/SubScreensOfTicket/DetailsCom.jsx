import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsCom({from,to,timestart,timeEnd,gate,classs,date ,title,flightnum , type}) {
    
    return (
        <View>
            <View style={{ marginTop: 20 }}>
                { type == "RoundTrip"||  type == "multiFlight"?<Text style={[styles.text, { color: 'white', textAlign: 'center' }]}> {title} Flight : {flightnum}</Text>:null}
                <Text style={[styles.text, { color: 'yellow', textAlign: 'center' }]}> {date}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.text, { color: 'yellow' }]}>{from}</Text>
                    <Text style={[styles.text, { color: 'gray' }]}>{timestart} </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.text, { color: 'red' }]}>{to}</Text>
                    <Text style={[styles.text, { color: 'gray' }]}>{timeEnd} </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                <Entypo name="circle" size={30} color="white" />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>-----</Text>
                    <Ionicons name="md-airplane-sharp" size={30} color="white" />
                    <Text style={styles.text}>-----</Text>
                </View>
                <Entypo name="circle" size={30} color="white" />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 15 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Gate</Text>
                    <Text style={[styles.text, { color: 'gray' }]}>{gate}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Seat</Text>
                    <Text style={[styles.text, { color: 'gray' }]}>--</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Class</Text>
                    <Text style={[styles.text, { color: 'gray' }]}>{classs}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'item',
        color: 'white',
        fontSize: 19
    },
    Stext: {
        fontFamily: 'item',
        color: 'white',
        fontSize: 12
    },
})