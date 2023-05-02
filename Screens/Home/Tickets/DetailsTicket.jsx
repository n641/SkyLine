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

    const { Data } = route.params;
    const image = Data.image;
    const flightNum = Data.flightNum
    const From = Data.From
    const TO = Data.TO
    const DateFrom = Data.DateFrom
    const DateTo = Data.DateTo
    const duration = Data.duration
    const date = Data.date
    const gate = Data.gate
    const sala = Data.sala
    const classs = Data.classs
    const bag = Data.bag
    const price = Data.price
    const id = Data.id
    const Seats = Data.Seats

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
                        navigation.navigate('DetailsTicket', { id: id })
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 20,
                        width: width - 80,
                        height: height / 1.5,
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5, alignItems: 'flex-start' }}>

                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={{
                                        uri: image,
                                    }}
                                    style={{ width: 150, height: 100, resizeMode: 'stretch', margin: 10 }}
                                />
                                <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {flightNum}</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>1{DateFrom} PM</Text>
                                <Text style={[styles.text, { color: 'gray' }]}>{From}</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>{DateTo} PM</Text>
                                <Text style={[styles.text, { color: 'gray' }]}>{TO}</Text>
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

                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: 40, alignItems: 'center', marginBottom: 10 }}>
                                <Text style={styles.text}>Cabin bag : </Text>
                                <Text style={[styles.text, { color: 'gray' }]}>{bag}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 40, alignItems: 'center' }}>
                                <Text style={styles.text}>luggages : </Text>
                                <Text style={[styles.text, { color: 'gray' }]}>15KG</Text>
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
                        borderRadius: 15,
                        width: width - 80,
                        height: height / 7

                    }}>
                        <View style={{ marginVertical: 10 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
                                <View>
                                    <Text style={styles.text}>price :
                                        <Text style={[styles.text, { color: 'red' }]}> {price}$</Text>
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 10 }}>
                                    <MainButton title='Confirm' onClick={() => {
                                        navigation.navigate('BookSeatScreen', { id: id })
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