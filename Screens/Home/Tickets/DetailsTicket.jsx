import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    FlatList,
    Text,
    Image,
    StatusBar,
    ScrollView
} from 'react-native'
import React from 'react'

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import bg from '../../../assets/bg-dark.jpg';

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DetailsTicket({ navigation, route }) {

    const { item, type } = route.params;
    const Data = type == "RoundTrip" ?
        {
            image: "https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png",
            flightNum: item.outboundFlight.flightNo,
            From: item.outboundFlight.from,
            TO: item.outboundFlight.to,
            dateGo: "6-8-2023",
            dateReturn: "8-8-2023",
            classs: item.outboundFlight.classes,
            price: item.outboundFlight.price,
            id: item.outboundFlight._id,
            //////////////////go//////////////////////
            TimeFromStart: "08:00 AM", //item.outboundFlight.fromDate
            TimeFromEnd: "19:30 AM", //item.outboundFlight.toDate
            durationGo: "6h 0m",
            gateFrom: item.outboundFlight.gate,
            salaFrom: "5",
            bagFrom: item.outboundFlight.maxBagPerPerson,
            ///////////////////retrun//////////////////////
            TimeToStart: "18:30 AM", //item.returnFlight.toDate
            TimeToEnd: "09:00 AM", //item.returnFlight.toDate
            durationReturn: "6h 0m",
            gateTo: item.returnFlight.gate,
            salaTo: "5",
            bagTo: item.returnFlight.maxBagPerPerson,

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
        <ImageBackground
            source={bg}
            resizeMode='cover'
            style={{
                width: width,
                height: height + 50,
            }}
        >
            <StatusBar hidden={true} />

            <ScrollView style={{ marginBottom: 50 }}>

                <View style={{ marginTop: 20 }}>
                    <AirplaneData navigation={navigation} title='Ticket Detail' />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 15 }}
                    onPress={() => {
                        // navigation.navigate('DetailsTicket', { id: id })
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 20,
                        width: width - 50,
                    }}>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5, alignItems: 'flex-start' }}>

                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{
                                            uri: Data.image,
                                        }}
                                        style={{ width: 150, height: 100, resizeMode: 'stretch', margin: 10 }}
                                    />
                                    <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {Data.flightNum}</Text>
                                </View>

                            </View>



                            {/* //////////////////////////////////////////////////data go flght////////////////////////////// */}

                            {type == "RoundTrip" && <View style={{ marginTop: 20 }} >
                                <Text style={[styles.text, { color: 'white', textAlign: 'center' }]}> Forword Flight</Text>
                                <Text style={[styles.text, { color: 'yellow', textAlign: 'center' }]}> {Data.dateGo}</Text>
                            </View>}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: 'yellow' }]}>{Data.From}</Text>
                                    <Text style={[styles.text, { color: 'gray' }]}>{type == "RoundTrip" ? Data.TimeFromStart : Data.DateFrom} </Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: 'red' }]}>{Data.TO}</Text>
                                    <Text style={[styles.text, { color: 'gray' }]}>{type == "RoundTrip" ? Data.TimeFromEnd : Data.DateTo}</Text>
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
                                    <Text style={[styles.text, { color: 'gray' }]}>{type == "RoundTrip" ? Data.gateFrom : Data.gate}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.text}>Seat</Text>
                                    <Text style={[styles.text, { color: 'gray' }]}>--</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.text}>Class</Text>
                                    <Text style={[styles.text, { color: 'gray' }]}>{Data.classs}</Text>
                                </View>
                            </View>

                            {type == "RoundTrip" && <View style={{
                                borderWidth: 1,
                                borderColor: 'white',
                                margin: -1,
                                width: width - 210,
                                alignSelf: 'center',
                                marginTop: 10
                            }} />
                        }

                            {/* //////////////////////////////////////////////////data go flght////////////////////////////// */}
                            {type == "RoundTrip" &&
                                <View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={[styles.text, { color: 'white', textAlign: 'center' }]}> Return Flight</Text>
                                        <Text style={[styles.text, { color: 'yellow', textAlign: 'center' }]}> {Data.dateReturn}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.text, { color: 'yellow' }]}>{Data.TO}</Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>{Data.TimeToStart} </Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.text, { color: 'red' }]}>{Data.From}</Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>{Data.TimeToStart} </Text>
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
                                            <Text style={[styles.text, { color: 'gray' }]}>{Data.gateFrom}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.text}>Seat</Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>--</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.text}>Class</Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>{Data.classs}</Text>
                                        </View>
                                    </View>
                                </View>

                            }

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
                        borderRadius: 15,
                        width: width - 55,

                    }}>
                        <View style={{ marginVertical: 10 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 5 }}>
                                <View>
                                    <View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={styles.text}>Cabin bag : </Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>{Data.bagFrom} bag</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={styles.text}>luggages : </Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>15KG</Text>
                                        </View>
                                    </View>

                                    <Text style={[styles.text , {textAlign:'center'}]}>price :
                                        <Text style={[styles.text, { color: 'red' }]}> {Data.price}$</Text>
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 0 }}>
                                    <MainButton title='Confirm' onClick={() => {
                                        navigation.navigate('BookSeatScreen', {id: Data.id , Data:Data , type:type})
                                    }} />
                                </View>

                            </View>

                        </View>

                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
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