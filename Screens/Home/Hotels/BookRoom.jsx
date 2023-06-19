import { StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import HeaderOfData from '../../../Components/ComponentsofHotels/HeaderOfData';
import RoomCard from '../../../Components/ComponentsofHotels/RoomCard';
import MainButton from '../../../Components/MainButton';
import CAlert from '../../../Components/CustomeAlerts/CAlert'


import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors'

import wrong from '../../../assets/warning.png'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function BookRoom({ navigation, route }) {
    const { dataid, data, headerData, meals, cancellation } = route.params;

    console.log(dataid)
    const [Loading, setLoading] = useState(true)
    const [Rooms, setRooms] = useState([])
    const [selecetedRoom, setselecetedRoom] = useState([])

    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")

    const url = `https://skyline-backend.cyclic.app/api/v1/hotels/rooms/${dataid}`
    const fetchData = async () => {
        const resp = await fetch(url).catch(error => console.log(error.message));
        const data = await resp.json();
        setRooms(data.Rooms)
        console.log(data)

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const HandleselecetedRoom = (room) => {
        setselecetedRoom([...selecetedRoom, { name: room.name, price: room.price , id : room.id }])
    }
    const HandleDeleteRoom = (room) => {
        const filterSelectedRoom = selecetedRoom.filter((item) => {
            return item.name != room
        })
        setselecetedRoom(filterSelectedRoom)
    }

    const FlatList_Header = () => {
        return (
            <View>
                <View style={{ marginLeft: 15, marginTop: 25, flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                    <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                        navigation.goBack()
                    }} />
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 30, marginLeft: width / 3.92 }}>Hotels</Text>
                </View>
                <HeaderOfData headerData={headerData} />
            </View>
        );
    }
    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={{ flex: 1 }}>

            {Loading &&
                <View style={{
                    width: width,
                    height: height - 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size={70} color={'#00ff00'} />
                </View>
            }

            <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
                setvisibleForm(false)
            }} />

            <FlatList
                data={Rooms}
                ListHeaderComponent={FlatList_Header}
                renderItem={({ item }) => (
                    <RoomCard item={item} HandleselecetedRoom={HandleselecetedRoom} HandleDeleteRoom={HandleDeleteRoom} selecetedRoom={selecetedRoom} />
                )}
                keyExtractor={item => item._id}
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
                        <Text numberOfLines={selecetedRoom.length} style={{ maxWidth: 92, margin: 5 }}>
                            {selecetedRoom.map((item, i) => {
                                return (
                                    <Text key={i} style={[styles.text]}>- {item.name} </Text>
                                )
                            })}
                        </Text>
                    </View>

                    <View style={{ margin: 10 }}>
                        <MainButton title='Done' onClick={() => {
                            if (selecetedRoom.length != 0) {
                                navigation.navigate('InfoOfUser', { meals: meals, cancellation: cancellation, selecetedRoom: selecetedRoom, Hoteldata: data, headerData: headerData })
                            } else {
                                settitleForm("please select Room")
                                setvisibleForm(true)
                            }
                        }} />
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