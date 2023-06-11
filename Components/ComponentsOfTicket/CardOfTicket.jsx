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

export default function CardOfTicket({ item, navigation, type }) {
    const Data = type == "RoundTrip" ?
        {
            image: "https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png",
            flightNum: item.outboundFlight.flightNo,
            From: item.outboundFlight.from,
            TO: item.outboundFlight.to,
            // DateFrom: item.outboundFlight.fromDate,
            // DateTo: item.outboundFlight.toDate,
            duration: "6h 0m",
            dateGo: "6-8-2023",
            dateReturn: "8-8-2023",
            gate: item.outboundFlight.gate,
            sala: "5",
            classs: item.outboundFlight.classes,
            bag: item.outboundFlight.maxBagPerPerson,
            price: item.outboundFlight.price,
            id: item.outboundFlight._id,
        }
        : type == "oneWay" ? {
            image: "https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png",
            flightNum: item.flightNo,
            From: item.from,
            TO: item.to,
            DateFrom: item.fromDate,
            DateTo: item.toDate,
            duration: "6h 0m",
            date: item.date.substring(0, 9),
            gate: item.gate,
            sala: "5",
            classs: item.classes,
            bag: item.maxBagPerPerson,
            price: item.price,
            id: item._id,
        } : {
            image: "https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png",
            flightNum: item.flightNo,
            From: item.from,
            TO: item.to,
            DateFrom: item.fromDate,
            DateTo: item.toDate,
            duration: "6h 0m",
            date: item.date.substring(0, 9),
            gate: item.gate,
            sala: "5",
            classs: item.classes,
            bag: item.maxBagPerPerson,
            price: item.price,
            id: item._id,
        }
    return (
        <TouchableOpacity style={{ alignItems: 'center', margin: 15 }}
            onPress={() => {
                navigation.navigate('DetailsTicket', { item: item, type: type })
            }}
        >
            <View style={{
                backgroundColor: 'rgba(24,24,24,0.8)',
                borderRadius: 20,
                width: width - 80,
                // height: height / 3.3,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 5, alignItems: 'flex-start' }}>

                    <PriceTicket price={Data?.price} />
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{
                                uri: Data?.image,
                            }}
                            style={{ width: 90, height: 70, resizeMode: 'contain' }}
                        />
                        <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {Data?.flightNum}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', maxWidth: 90 }}>
                        <FontAwesome5 name="share-square" size={24} color="white" />
                        <AntDesign name="hearto" size={24} color="white" />
                    </View>

                </View>

                <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: 5 }}>

                    {/* <View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <MaterialCommunityIcons name="airplane-takeoff" size={25} color="white" />
                            <Text style={styles.text}> {Data?.DateFrom}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                            <AntDesign name="clockcircleo" size={15} color="white" />
                            <Text style={styles.Stext}> {Data?.duration}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <MaterialCommunityIcons name="airplane-landing" size={25} color="white" />
                            <Text style={styles.text}> {Data?.DateTo}</Text>
                        </View>

                    </View> */}

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: width - 110, marginTop: 20 }}>

                        <View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text}> {Data?.From}</Text>

                                <View style={{ marginTop: 0 }}>

                                    <View >
                                        {
                                            type == "RoundTrip" ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: -5 }}>
                                                    <MaterialCommunityIcons name="airplane-takeoff" size={18} color="white" />
                                                    <Text style={[styles.Stext, { fontSize: 12 }]}> {Data?.dateGo}</Text>
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: -8 }}>
                                                    <AntDesign name="clockcircleo" size={10} color="white" />
                                                    <Text style={[styles.Stext, { fontSize: 12 }]}> {Data?.duration}</Text>
                                                </View>

                                        }
                                    </View>
                                    <Entypo name="flow-line" size={50} color="white" style={{ transform: [{ rotate: '90deg' }] }} />

                                </View>
                                <Text style={styles.text}>{Data?.TO}</Text>
                            </View>

                            {/* /////////////////////////////////////RoundTrip//////////////////////////////////////////// */}
                            {
                                type == "RoundTrip" &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.text}> {Data?.TO}</Text>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: -5 }}>
                                            <MaterialCommunityIcons name="airplane-takeoff" size={18} color="white" />
                                            <Text style={[styles.Stext, { fontSize: 12 }]}> {Data?.dateGo}</Text>
                                        </View>
                                        <Entypo name="flow-line" size={50} color="white" style={{ transform: [{ rotate: '90deg' }] }} />

                                    </View>
                                    <Text style={styles.text}>{Data?.From}</Text>
                                </View>
                            }
                            {/* ///////////////////////////////////////////////////////////////////////////////// */}
                        </View>


                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.Stext}> {Data?.date}</Text>
                            <Text style={styles.Stext}> gate : {Data?.gate}</Text>
                            <Text style={styles.Stext}> sala : {Data?.sala}</Text>
                        </View>

                    </View>

                </View>



            </View>




            {/* ///////////////////////////////////////////////////////////////// */}

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
                            <Text style={styles.text}> {Data?.bag} bag</Text>
                        </View>

                        <View style={styles.containerBtn}>
                            <Ionicons name="people-circle" size={25} color="white" />
                            <Text style={styles.text}> {Data?.classs}</Text>
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
        fontSize: 17
    },
    Stext: {
        fontFamily: 'item',
        color: 'white',
        fontSize: 15
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