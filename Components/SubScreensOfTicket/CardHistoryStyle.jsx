import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Transition, Transitioning, color } from 'react-native-reanimated';
import { useState, useEffect } from 'react';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);

export default function CardHistoryStyle({ item, index, currentIndex, HandlecurrentIndex, reff }) {

    // console.log(item)
    const price = item.price
    const type = item.type
    const paymentStatus = item.paymentStatus
    const seatId = item.seatId
    const airplaneCompany = item.flight[0].airplaneCompany
    const dateDeparture = "1-7-2023"
    const dateReturn = "9-7-2023"
    const NumFlights = item.flight.length

    const [AircompanyPhoto, setAircompanyPhoto] = useState()

    const fetchData = async () => {
        const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/airplaneCompany/${airplaneCompany}`);
        const data = await resp.json();
        setAircompanyPhoto(data.data.data.airplaneCompanyPhoto)
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log("////////////////////////////////////////////////////////////////////////////////////////")
    var Data = [];

    item.flight.map((e) => {
        Data.push({
            flightNo: e.flightNo,
            from: e.from,
            to: e.to,
            gate: e.gate,
            classes: e.classes,
            maxBagPerPerson: e.maxBagPerPerson
        })
    })
    console.log(Data)
    console.log(price)
    console.log(type)
    console.log(paymentStatus)
    console.log(seatId)
    console.log(NumFlights)


    return (
        <Transitioning.View
            ref={reff}
            transition={transition}
            style={styles.container}
        >
            <View style={{ backgroundColor: 'rgba(24,24,24,0.5)', flexGrow: 1, borderRadius: 10, }}>

                <TouchableOpacity onPress={() => {
                    reff.current.animateNextTransition();
                    HandlecurrentIndex(index === currentIndex ? null : index);
                }}
                    style={styles.cardContainer}
                    activeOpacity={0.9}>

                    <View style={styles.constainerofHeadercard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{
                                    uri: AircompanyPhoto,
                                }}
                                style={{ width: 50, height: 35, resizeMode: 'stretch', marginHorizontal: 5, borderRadius: 10 }}
                            />
                            {/* <Text style={[styles.title, { marginLeft: 5 }]}>{item}</Text> */}
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={[styles.title]}>
                                price: <Text style={[styles.title, { color: 'red' }]}>{price}</Text>$
                            </Text>
                        </View>
                    </View>


                    {
                        Data.map((e, i) => (
                            <View style={{margin:5}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                                    <View>
                                        <Text style={[styles.title, { color: 'gray' }]}>
                                            from:  <Text style={[styles.title, { color: 'white' }]}>{e.from}</Text>
                                        </Text>

                                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                            <Text style={[styles.title, { color: 'gray' }]}>
                                                Departure
                                            </Text>
                                            <Text style={[styles.title, { color: 'white' }]}>{dateDeparture}</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="airplane" size={28} color="white" />

                                    <View>
                                        <Text style={[styles.title, { color: 'gray' }]}>
                                            to:  <Text style={[styles.title, { color: 'white' }]}>{e.to}</Text>
                                        </Text>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                            <Text style={[styles.title, { color: 'gray' }]}>
                                                return
                                            </Text>
                                            <Text style={[styles.title, { color: 'white' }]}>{type == "round-trip" ? dateReturn : "--"}</Text>
                                        </View>
                                    </View>


                                </View>

                                {/* ////////////////////////////////////////// */}
                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 5, width: width / 1.2 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.title, { color: 'gray' }]}>Gate</Text>
                                                <Text style={[styles.title]}>{e.gate}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.title, , { color: 'gray' }]}>Seat</Text>
                                                <Text style={[styles.title]}>{seatId}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.title, { color: 'gray' }]}>Class</Text>
                                                <Text style={[styles.title]}>{e.classes}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.title, { color: 'gray' }]}>Fligt num</Text>
                                                <Text style={[styles.title]}>{e.flightNo}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                {/* ////////////////////////////////////////// */}
                                {type != "one-way" && NumFlights > 1 && i < NumFlights - 1 && <View style={{
                                    borderWidth: 0.5,
                                    borderColor: 'white',
                                    margin: -1,
                                    width: width - 210,
                                    alignSelf: 'center',
                                    marginVertical: 15
                                }} />}



                            </View>
                        ))

                    }

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: paymentStatus == true ? 'green' : 'red', borderRadius: 5, padding: 2 }}>
                        <Text style={[styles.title]}>
                            <Text style={[styles.title, { color: 'white', fontSize: 15 }]}>{paymentStatus == true ? " success Pay" : "NotPay"}</Text>
                        </Text>
                    </View>

                    {index === currentIndex &&
                        <View>


                        </View>
                    }

                </TouchableOpacity>

            </View >

        </Transitioning.View >
    )
}

const styles = StyleSheet.create({
    constainerofHeadercard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        margin: 5
    },
    header: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontFamily: 'item'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 20
    },
    cardContainer: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 38,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
    },
    body: {
        fontSize: 20,
        lineHeight: 20 * 1.5,
        textAlign: 'center',
    },
    subCategoriesList: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'item',
        fontSize: 17,
        color: 'white'
    }
})