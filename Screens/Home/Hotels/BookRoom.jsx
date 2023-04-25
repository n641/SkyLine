import { StyleSheet, Text, View, Dimensions, FlatList, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import HeaderOfData from '../../../Components/ComponentsofHotels/HeaderOfData';
import RoomCard from '../../../Components/ComponentsofHotels/RoomCard';
import MainButton from '../../../Components/MainButton'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function BookRoom({ navigation }) {
    const [Rooms, setRooms] = useState([
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'suprior Room',
            space: '240',
            persons: { adults: 2, child: 2 },
            Beds: { bed: 2, bigBed: 1 },
            facilities: ['free wifi', 'Breack fast', 'sea view', 'master path room', 'kitchen'],
            notfacilities: ['partially refundable'],
            price: 150,
            seleted: false
        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'triple Room',
            space: '240',
            persons: { adults: 2, child: 2 },
            Beds: { bed: 2, bigBed: 1 },
            facilities: ['free wifi', 'Breack fast', 'gardien view', 'kitchen'],
            notfacilities: ['partially refundable'],
            price: 150,
            seleted: true
        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'double Room',
            space: '140',
            persons: { adults: 1, child: 1 },
            Beds: { bed: 2, bigBed: 0 },
            facilities: ['free wifi', 'Breack fast', 'sea view', 'kitchen'],
            notfacilities: ['partially refundable'],
            price: 150,
            seleted: false
        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'double Room',
            space: '140',
            persons: { adults: 1, child: 1 },
            Beds: { bed: 2, bigBed: 0 },
            facilities: ['free wifi', 'Breack fast', 'sea view'],
            notfacilities: ['partially refundable'],
            price: 150,
            seleted: false
        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'single Room',
            space: '100',
            persons: { adults: 1, child: 0 },
            Beds: { bed: 1, bigBed: 0 },
            facilities: ['free wifi', 'Breack fast'],
            notfacilities: ['partially refundable'],
            price: 150,
            seleted: false
        },
    ])
    const [selecetedRoom, setselecetedRoom] = useState([])
    const HandleselecetedRoom = (room) => {
        setselecetedRoom([...selecetedRoom, { room }])
    }
    const HandleDeleteRoom = (room) => {
        const filterSelectedRoom = selecetedRoom.filter((item) => {
            return item.room != room
        })
        setselecetedRoom(filterSelectedRoom)
    }
    // console.log(selecetedRoom)

    const FlatList_Header = () => {
        return (
            <View>
                <View style={{ marginLeft: 15, marginTop: 25, flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                    <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                        navigation.goBack()
                    }} />
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 , marginLeft:width/3.5 }}>Hotels</Text>

                    {/* <FontAwesome5 name="filter" size={24} color="white" /> */}

                </View>
                <HeaderOfData />
            </View>
        );
    }
    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={{ flex: 1 }}>

            <FlatList
                data={Rooms}
                ListHeaderComponent={FlatList_Header}
                renderItem={({ item }) => (
                    <RoomCard item={item} HandleselecetedRoom={HandleselecetedRoom} HandleDeleteRoom={HandleDeleteRoom} selecetedRoom={selecetedRoom} />
                )}
            //   keyExtractor={item => item.id}
            />

            <View style={{
                backgroundColor: 'rgba(24,24,24,5)',
                width: width,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', maxWidth: width }}>
                    <View>
                        <Text style={[{ color: 'white', marginTop: 5, fontSize: 25 }]}>Selected Rooms</Text>
                            <Text numberOfLines={selecetedRoom.length} style={{ maxWidth: 92, margin:5 }}>
                                {selecetedRoom.map((item, i) => {
                                    return (
                                        <Text key={i} style={[styles.text]}>- {item.room} </Text>
                                    )
                                })}
                            </Text>
                    </View>

                    <View style={{ margin: 10 }}>
                        <MainButton title='Done' onClick={() => { navigation.navigate('InfoOfUser')}} />
                    </View>

                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: 'blue',
    }
})