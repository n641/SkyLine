import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function HotelOfferCard({ item, navigation }) {

    const headerData = {
        Night: 1,
        date: new Date(),
        date2: new Date(),
        numberOfRooms: 1,
        persons: 1,
    }
    return (
        <TouchableOpacity style={{ marginHorizontal: 10 , marginBottom:10 }}
            onPress={() => {
                navigation.navigate('BookHotelNavigator')
            }}
        >
            <Image
                source={{
                    uri: item?.hotelPhoto
                }} resizeMode="stretch" style={styles.image}
            />
            <View style={{ position: 'absolute', justifyContent: 'space-around', top: 140, margin: 10, height: 65, width: 130, borderRadius: 10, backgroundColor: 'rgba(30,30,30,0.8)' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 120 }}>
                    <Text style={{ fontSize: item.hotelName.length < 15 ? width / 25 : width / 35, color: 'white' }}>{item.hotelName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="star" size={12} color="yellow" />
                        <Text style={{ fontSize: 12, margin: 2, color: 'white', fontFamily: 'item' }}>{item?.ratingsAverage}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                    <Entypo name="location-pin" size={12} color="red" />
                    <Text style={{ fontSize: 12, margin: 2, color: 'white', fontFamily: 'item' }}>{item?.country}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    {/* <Entypo name="location-pin" size={12} color="red" /> */}
                    <Text style={{ fontSize: 10, margin: 2, color: 'red', fontFamily: 'item' }}>{item?.price}$ / Night</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 230,
        borderRadius: 30,
    },
})