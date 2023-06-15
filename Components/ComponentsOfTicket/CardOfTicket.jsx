import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import PriceTicket from './PriceTicket';

import Airplane from '../../assets/Airplane.png';
import { useState, useEffect } from 'react';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CardOfTicket({ item, navigation, type }) {

    var allprice = 0;
    if (type == "multiFlight") {
        item.map((e) => {
            allprice = allprice + e.price
        })
    }

    const [AirplaneCompany, setAirplaneCompany] = useState()
    const fetchCompanyAirline = async (id) => {
        const url = `https://skyline-backend.cyclic.app/api/v1/airplaneCompany/${id}`
        const resp = await fetch(url).catch(error => console.log(error));
        const data = await resp.json();
        setAirplaneCompany(data.data.data);
    };

    useEffect(() => {
        if (type == "oneway") {
            fetchCompanyAirline(item.airplaneCompany)
        }
        else if (type == "RoundTrip") {
            fetchCompanyAirline(item.outboundFlight.airplaneCompany)

        } else if (type == "multiFlight") {

            fetchCompanyAirline(item[0].airplaneCompany)

        }
    }, []);

    const Data = type == "RoundTrip" ?
        {
            image: AirplaneCompany?.airplaneCompanyPhoto,
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
            id2: item.returnFlight._id
        }
        : type == "oneway" ? {
            image: AirplaneCompany?.airplaneCompanyPhoto,
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
            image: AirplaneCompany?.airplaneCompanyPhoto,
            From: item[0].from,
            TO: item[0].to,
            date: "16-8-2023",//item[0].date
            gate: item[0].gate,
            sala: 5,
            flights: item,
            price: allprice
        }



    return (
        <TouchableOpacity style={{ alignItems: 'center', margin: 15 }}
            onPress={() => {
                navigation.navigate('DetailsTicket', { item: item, type: type, image: Data.image })
            }}
        >
            <View style={{
                backgroundColor: 'rgba(24,24,24,0.8)',
                borderRadius: 20,
                width: width - 60,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, alignItems: 'flex-start' }}>

                    <PriceTicket price={Data?.price} />
                    {/* <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{
                                uri: Data?.image,
                            }}
                            style={{ width: 90, height: 70, resizeMode: 'contain' }}
                        />
                        <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {Data?.flightNum}</Text>
                    </View> */}
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-evenly', maxWidth: 90 }}>
                        <FontAwesome5 name="share-square" size={24} color="white" />
                        <AntDesign name="hearto" size={24} color="white" />
                    </View>

                </View>

                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', margin: 5  }}>

                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{
                                uri: Data?.image,
                            }}
                            style={{ width: 100, height: 80, resizeMode: 'stretch', borderRadius: 10 }}
                        />
                        {/* <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {Data?.flightNum}</Text> */}
                    </View>

                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View>

                            {(type == "oneway" || type == "RoundTrip") &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.text}> {Data?.From}</Text>
                                    <View style={{ marginTop: 0 }}>
                                        <View >
                                            {
                                                type == "RoundTrip" ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: -10 }}>
                                                        <MaterialCommunityIcons name="airplane-takeoff" size={18} color="white" />
                                                        <Text style={[styles.Stext, { fontSize: 12 }]}> {Data?.dateGo}</Text>
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: -10 }}>
                                                        <AntDesign name="clockcircleo" size={10} color="white" />
                                                        <Text style={[styles.Stext, { fontSize: 12 }]}> {Data?.duration}</Text>
                                                    </View>

                                            }
                                        </View>
                                        <Entypo name="flow-line" size={65} color="white" style={{ transform: [{ rotate: '90deg' }], bottom: 10 }} />
                                    </View>
                                    <Text style={styles.text}>{Data?.TO}</Text>
                                </View>
                            }

                            {/* /////////////////////////////////////RoundTrip//////////////////////////////////////////// */}
                            {
                                type == "RoundTrip" &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.text}> {Data?.TO}</Text>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: -10 }}>
                                            <MaterialCommunityIcons name="airplane-takeoff" size={18} color="white" />
                                            <Text style={[styles.Stext, { fontSize: 12 }]}> {Data?.dateGo}</Text>
                                        </View>
                                        <Entypo name="flow-line" size={65} color="white" style={{ transform: [{ rotate: '90deg' }], bottom: 5 }} />

                                    </View>
                                    <Text style={styles.text}>{Data?.From}</Text>
                                </View>
                            }
                            {/* /////////////////////////////////////////multi des//////////////////////////////////////// */}

                            {
                                type == "multiFlight" &&
                                item.map((e, i) => (
                                    // i > 0 ?
                                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', margin: 0, alignSelf: 'center' }}>
                                        <Text style={styles.text}> {e?.from}</Text>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -10, marginBottom: 0 }}>
                                                <MaterialCommunityIcons name="airplane-takeoff" size={18} color="white" />
                                                <Text style={[styles.Stext, { fontSize: 12 }]}> {e == null ? e?.date?.substring(0, 10) : "9-9-2023"}</Text>
                                            </View>
                                            <Entypo name="flow-line" size={65} color="white" style={{ transform: [{ rotate: '90deg' }], bottom: 20 }} />
                                        </View>
                                        <Text style={styles.text}>{e?.to}</Text>
                                    </View>
                                    //  : null
                                ))

                            }
                            {/* ///////////////////////////////////////////////////////////////////////////////// */}

                        </View>



                    </View>




                </View>

                {
                    (type == "oneway") &&
                    <View style={{ alignItems: 'center', margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={[styles.Stext, { fontSize: 18 , color:'red' }]}> Date :{"\n"}{Data?.date}</Text>
                        <Text style={[styles.Stext, { fontSize: 18 }]}> gate :{"\n"} {Data?.gate}</Text>
                        <Text style={[styles.Stext, { fontSize: 18 }]}> sala :{"\n"} {Data?.sala}</Text>
                    </View>}


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
                width: width - 60,
                height: height / 9

            }}>
                <View style={{ marginVertical: 5 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
                        <View style={styles.containerBtn}>
                            <MaterialCommunityIcons name="bag-suitcase-outline" size={25} color="white" />
                            <Text style={styles.text}> {type == "multiFlight" ? Data.flights[0]?.maxBagPerPerson : Data?.bag} bag</Text>
                        </View>

                        <View style={styles.containerBtn}>
                            <Ionicons name="people-circle" size={25} color="white" />
                            <Text style={styles.text}> {type == "multiFlight" ? Data.flights[0]?.classes : Data?.classs}</Text>
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