import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { Checkbox, RadioButton } from 'react-native-paper';

import MainButton from '../MainButton';
import Colors from '../../Conestant/Colors';
import RateCard from './RateCard';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const MaxHeight = height

export default function DetailsBottomSheet({ navigation, data }) {
    // console.log(data)
    const cancellationPolicy = [
        {
            text: "Non-refundable",
            value: 'first',
            price: 0
        }, {
            text: "partially refundable",
            value: 'second',
            price: 15
        },
    ]
    const AdditionalServices = [
        {
            text: "BreackFast",
            value: 'first',
            price: 0
        }, {
            text: "Lunch",
            value: 'second',
            price: 15
        },
        {
            text: "Dinner",
            value: 'second',
            price: 15
        },
        {
            text: "Snacks",
            value: 'second',
            price: 15
        },
    ]
    const [checkedradio, setCheckedradio] = React.useState('first');
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);


    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>

            {/* <ScrollView > */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 5 }}>
                <View >
                    <Text style={[styles.title, { maxWidth: 200 }]}>{data.hotelName}</Text>

                </View>
                <View style={{ marginTop: 10 }}>
                    <RateCard rate={2} />
                    <Text style={[styles.text, { color: 'red' }]}>{data.price}</Text>
                    <Text style={[styles.description]}> /night</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                        <Entypo name="location-pin" size={20} color="red" />
                        <Text style={styles.text}>{data.city}</Text>
                    </View>
                </View>
            </View>

            <Text style={[styles.title, { fontSize: 23, marginHorizontal: 15, marginTop: 5, marginBottom: 10 }]}>Summary</Text>
            <Text style={[styles.text, { fontSize: 15, marginHorizontal: 15, color: 'gray' }]}>{data.description}</Text>

            <Text style={[styles.title, { fontSize: 23, margin: 15, marginTop: 10 }]}>Amenities & facilities</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginHorizontal: 10, margin: 10 }}>

                <View style={{ alignItems: 'center' }}>
                    <AntDesign name="wifi" size={28} color="white" />
                    <Text style={[styles.title, { fontSize: 17, marginHorizontal: 15, marginTop: 5, marginBottom: 0 }]}>Wifi</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="white" />
                    <Text style={[styles.title, { fontSize: 15, marginHorizontal: 15, marginTop: 5, marginBottom: 0 }]}>Kitchen</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Ionicons name="boat" size={28} color="white" />
                    <Text style={[styles.title, { fontSize: 15, marginHorizontal: 15, marginTop: 5, marginBottom: 0 }]}>sea view</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Entypo name="air" size={28} color="white" />
                    <Text style={[styles.title, { fontSize: 15, marginHorizontal: 15, marginTop: 5, marginBottom: 0 }]}>AC</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons name="cup" size={28} color="white" />
                    <Text style={[styles.title, { fontSize: 15, marginHorizontal: 15, marginTop: 5, marginBottom: 0 }]}>Bar</Text>
                </View>

            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', margin: 10, marginHorizontal: 30 }} />

            <View >
                <Text style={[styles.title, { fontSize: 25, marginHorizontal: 15, marginTop: 10 }]}>Cancellation policy</Text>
            </View>

            <View style={{ marginHorizontal: 20, margin: 10 }}>
                {
                    cancellationPolicy.map((e, i) => {
                        return (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value={e.value}
                                        status={checkedradio === e.value ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setCheckedradio(e.value)
                                        }}
                                    />
                                    <Text style={styles.text}>{e.text}</Text>
                                </View>
                                <Text style={styles.text}>+{e.price}$</Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', margin: 10, marginHorizontal: 30 }} />

            <View>
                <Text style={[styles.title, { fontSize: 25, marginHorizontal: 10, marginTop: 5 }]}>Additional services</Text>
            </View>

            <View style={{ marginHorizontal: 20, margin: 10 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked1 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked1(!checked1);
                            }}
                        />
                        <Text style={styles.text}>{AdditionalServices[0].text}</Text>
                    </View>
                    <Text style={styles.text}>+{AdditionalServices[0].price}$</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                        />
                        <Text style={styles.text}>{AdditionalServices[1].text}</Text>
                    </View>
                    <Text style={styles.text}>+{AdditionalServices[1].price}$</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked3 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked3(!checked3);
                            }}
                        />
                        <Text style={styles.text}>{AdditionalServices[2].text}</Text>
                    </View>
                    <Text style={styles.text}>+{AdditionalServices[2].price}$</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked3 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked3(!checked3);
                            }}
                        />
                        <Text style={styles.text}>{AdditionalServices[3].text}</Text>
                    </View>
                    <Text style={styles.text}>+{AdditionalServices[3].price}$</Text>
                </View>

            </View>

            <View style={{ alignSelf: 'center', margin: 15 }}>
                <MainButton title={'Book'} onClick={() => {
                    navigation.navigate('BookRoom',{data:data._id})
                }} />
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        marginVertical: 5,
        margin: -5
    },
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontFamily: 'item',
        color: 'white',
    },
    text: {
        fontSize: 15,
        fontFamily: 'item',
        color: 'white',
    }, description: {
        fontSize: 14,
        fontFamily: 'item',
        color: 'white',
        maxWidth: height / 3
    },
})