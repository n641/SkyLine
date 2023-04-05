import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import PriceTicket from './PriceTicket';

import Airplane from '../../assets/Airplane.png';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CardOfTicket({ image, flightNum, From, TO, DateFrom, DateTo, duration, date, gate, sala, classs, bag, price, navigation ,id , Seats }) {
    const Data = {
        image: image ,
        flightNum: flightNum ,
        From:From ,
        TO:TO ,
        DateFrom: DateFrom ,
        DateTo: DateTo ,
        duration:duration ,
        date:date ,
        gate: gate ,
        sala:sala ,
        classs: classs ,
        bag:bag ,
        price:price,
        id:id,
        Seats:Seats
    }
    console.log(Seats)
    return (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 15 }}
            onPress={() => {
                navigation.navigate('DetailsTicket', {Data:Data })
            }}
        >
            <View style={{
                backgroundColor: 'rgba(24,24,24,0.8)',
                borderRadius: 20,
                width: width - 80,
                height: height / 3.3,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, alignItems: 'flex-start' }}>

                    <PriceTicket price={price} />
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{
                                uri: image,
                            }}
                            style={{ width: 90, height: 70, resizeMode: 'contain' }}
                        />
                        <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {flightNum}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', maxWidth: 80 }}>
                        <FontAwesome5 name="share-square" size={24} color="white" />
                        <AntDesign name="hearto" size={24} color="white" />
                    </View>

                </View>

                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', margin: 10 }}>

                    <View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <MaterialCommunityIcons name="airplane-takeoff" size={25} color="white" />
                            <Text style={styles.text}> {DateFrom}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                            <AntDesign name="clockcircleo" size={15} color="white" />
                            <Text style={styles.Stext}> {duration}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <MaterialCommunityIcons name="airplane-landing" size={25} color="white" />
                            <Text style={styles.text}> {DateTo}</Text>
                        </View>

                    </View>

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}> {From}</Text>
                        </View>
                        <Entypo name="flow-line" size={50} color="white" />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>{TO}</Text>
                        </View>
                    </View>

                    <View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.Stext}> {date}3</Text>
                            <Text style={styles.Stext}> gate : {gate}</Text>
                            <Text style={styles.Stext}> sala : {sala}</Text>

                        </View>

                    </View>

                </View>

            </View>

            <View style={{
                borderWidth: 1,
                borderColor: 'white',
                margin: -1,
                width: width - 130,
            }} />

            <View style={{
                backgroundColor: 'rgba(24,24,24,0.8)',
                borderRadius: 20,
                width: width - 80,
                height: height / 9

            }}>
                <View style={{ marginVertical: 5 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
                        <View style={styles.containerBtn}>
                            <MaterialCommunityIcons name="bag-suitcase-outline" size={25} color="white" />
                            <Text style={styles.text}> {bag} bag</Text>
                        </View>

                        <View style={styles.containerBtn}>
                            <Ionicons name="people-circle" size={25} color="white" />
                            <Text style={styles.text}> {classs}</Text>
                        </View>
                    </View>

                </View>

            </View>
        </TouchableOpacity>
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
    containerBtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})