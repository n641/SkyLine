import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../Conestant/Colors';
import { useState } from 'react';

import MainButton from '../../../Components/MainButton'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Checkout({ navigation, route }) {

    const [Rooms, setRooms] = useState(['suprior room', 'single room'])
    const { meals, cancellation, Hoteldata, selecetedRoom, headerData, userInf ,allPrice } = route.params;
    console.log(headerData)
    


    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={{
                flex: 1,
                alignItems: 'center'
            }}>
            <ScrollView>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                        navigation.goBack()
                    }} />
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 30, marginLeft: width / 5.2, fontFamily: 'item', marginTop: 50 }}>Check Out</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.container}>
                        <AntDesign name="home" size={28} color="white" />
                        <Text style={{ fontFamily: 'item', fontSize: 23, marginHorizontal: 10, color: 'white' }}>Hotel</Text>
                    </View>
                    {selecetedRoom.map((e, i) => (
                        <Text key={i} style={{ fontFamily: 'item', fontSize: 23, marginHorizontal: 10, color: 'white' }}>- {e.name}</Text>
                    ))}

                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 15, margin: 15 }} />

                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="nightlight-round" size={26} color="gray" style={{ marginLeft: 10 }} />
                                <Text style={[styles.text, { color: 'gray' }]}>duration</Text>
                            </View>
                            <Text style={[styles.text, { marginLeft: 35 }]}>{headerData.Night} night</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="person" size={26} color="gray" style={{ marginLeft: 10 }} />
                                <Text style={[styles.text, { color: 'gray' }]}>Guests</Text>
                            </View>
                            <Text style={[styles.text, { marginLeft: 35 }]}>{headerData.persons} person</Text>
                        </View>
                    </View>

                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 15, margin: 15 }} />

                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="date-range" size={26} color="gray" style={{ marginLeft: 10 }} />
                                <Text style={[styles.text, { color: 'gray' }]}>Check-in</Text>
                            </View>
                            <Text style={[styles.text, { marginLeft: 35 }]}>{headerData.date}</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="date-range" size={26} color="gray" style={{ marginLeft: 10 }} />
                                <Text style={[styles.text, { color: 'gray' }]}>Check-out</Text>
                            </View>
                            <Text style={[styles.text, { marginLeft: 35 }]}>{headerData.date2}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.container}>
                        <Text style={{ fontFamily: 'item', fontSize: 23, marginHorizontal: 10, color: 'white' }}>Contact info</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 8 }}>
                        <Text style={[styles.text]}>Full name</Text>
                        <Text style={[styles.text, { color: 'gray' }]}>{userInf?.username}</Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 15, margin: 3 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 8 }}>
                        <Text style={[styles.text]}>Phone</Text>
                        <Text style={[styles.text, { color: 'gray' }]}>{userInf?.phone}</Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 15, margin: 3 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 8 }}>
                        <Text style={[styles.text]}>Email</Text>
                        <Text style={[styles.text, { color: 'gray' }]}>{userInf?.email}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.container}>
                        <Text style={{ fontFamily: 'item', fontSize: 23, marginHorizontal: 10, color: 'white' }}>Policy</Text>
                    </View>
                    <Text style={{ fontFamily: 'item', fontSize: 17, marginHorizontal: 10, color: 'white', padding: 5 }}>maximum 02 children/room -
                        children from 6-11 years old :
                        surcharge VND150.000/child when
                        sharing bed with parents .Maximum
                        02 children/room-Extra person:
                        the third person or children from 12
                        years old : full charge 300.000 vnd
                        All arising are paid at the reception.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.container}>
                        <Text style={{ fontFamily: 'item', fontSize: 23, marginHorizontal: 10, color: 'white' }}>Contact info</Text>
                    </View>
                    {selecetedRoom.map((e, i) => (
                       <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 8 }}>
                       <Text style={[styles.text]}>{e.name}</Text>
                       <Text style={[styles.text, { color: 'gray' }]}>{e.price}</Text>
                   </View>
                    ))}
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 8 }}>
                        <Text style={[styles.text]}>Taxes and fees</Text>
                        <Text style={[styles.text, { color: 'gray' }]}>50$</Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 15, margin: 3 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 8 }}>
                        <Text style={[styles.text]}>Total</Text>
                        <Text style={[styles.text, { color: 'red' }]}>{allPrice+50}$</Text>
                    </View>
                </View>

                <View style={{ alignSelf: 'center', margin: 10 }}>
                    <MainButton title={' payment'} onClick={() => {
                        navigation.navigate('WaysOfPay',{ meals: meals, cancellation: cancellation, selecetedRoom: selecetedRoom, Hoteldata: Hoteldata, headerData: headerData })
                     }} />
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    card: {
        borderColor: '#0049D3',
        borderRadius: 15,
        borderWidth: 1,
        width: width - 50,
        backgroundColor: 'black',
        margin: 10,
        paddingBottom: 10,
        marginVertical: 20
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0049D3',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 10
    }, text: {
        fontSize: 20,
        fontFamily: 'item',
        color: 'white',
    }
})