import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import MainButton from '../../Components/MainButton'
import { useState } from 'react';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function RoomCard({ item , HandleselecetedRoom , HandleDeleteRoom , selecetedRoom}) {
    const [icon, seticon] = useState('circle')
    
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Image
                        style={styles.logo}
                        source={{
                            uri: item.mainImg
                        }}
                        resizeMode='cover'
                    />
                    <View style={{ alignItems: 'flex-start', marginHorizontal: 8 }}>
                        <Text style={styles.title}> {item.name}</Text>
                        <Text style={[styles.title, { color: 'gray', fontSize: 18 }]}> {item.space}m</Text>
                    </View>
                </View>
                {icon=='circle' ?
                    <Entypo name="circle" size={30} color="white" onPress={()=>{
                        seticon('checkcircleo')
                        HandleselecetedRoom(item.name)
                    }} />
                    :
                    <AntDesign name="checkcircleo" size={30} color="green" onPress={()=>{
                        seticon('circle')
                        HandleDeleteRoom(item.name)
                    }} />

                }
            </View>

            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 20, marginVertical: 10 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, margin: 10 }}>
                <Ionicons name="ios-person" size={24} color="white" />
                <Text style={[styles.title, { marginHorizontal: 10 }]}>
                    {item.persons.adults} adults
                    {item.persons.child != 0 ? " , " : null}
                    {item.persons.child != 0 ? item.persons.child : null}{item.persons.child != 0 ? " child" : null}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, margin: 10 }}>
                <Ionicons name="md-bed" size={24} color="white" />
                <Text style={[styles.title, { marginHorizontal: 10 }]}>
                    {item.Beds.bigBed != 0 ? item.Beds.bigBed : null}{item.Beds.bigBed != 0 ? " Bed" : null}
                    {item.Beds.bigBed != 0 ? " , " : null}
                    {item.Beds.bed} adults
                </Text>
            </View>

            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 20, marginVertical: 10 }} />

            {
                item.facilities.map((e, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="checkcircleo" size={20} color="green" style={{ marginHorizontal: 10 }} />
                        <Text style={[styles.title, { fontSize: 18 }]}>{e}</Text>
                    </View>
                ))
            }
            {
                item.notfacilities.map((e, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="closecircleo" size={20} color="red" style={{ marginHorizontal: 10 }} />
                        <Text style={[styles.title, { fontSize: 18 }]}>{e}</Text>
                    </View>
                ))
            }

            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 20, marginVertical: 10 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={[styles.title, { fontSize: 20 , textAlign:'left' , width:width-70 }]}>
                    <Text style={[styles.title, { color: 'blue', fontSize: 28 }]}>{item.price}</Text>$  /room/night
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(24,24,24,0.5)',
        width: width - 30,
        borderRadius: 15,
        // height: height / 2,
        margin: 15,
        padding: 10
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 7
    },
    title: {
        fontFamily: 'item',
        fontSize: 20,
        color: 'white'
    }
})