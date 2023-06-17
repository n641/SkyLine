import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

import RateCard from './RateCard'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function CardHistoryHotelStyle({ item }) {
    console.log(item)
    console.log("/////////////////////////////////////////////////////////////")

    return (
        <View style={{
            // borderWidth: 1,
            // borderColor: 'white',
            backgroundColor:'rgba(30,30,30,0.4)',
            borderRadius: 8,
            margin: 10,
            padding: 10,
        }}>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.hotel.hotelPhoto,
                        }}
                        resizeMode='stretch'
                    />
                    <View style={{ margin: 10 }}>
                        <Text style={[styles.text]}>{item.hotel.hotelName}</Text>
                        <RateCard rate={1} />
                        <Text style={[styles.text, { color: 'red' }]}>Total price : {item.price}$</Text>
                        <Text style={[styles.text]}>Created at : {item.createdAt.toString().substring(0,10)}</Text>

                    </View>
                </View>


                <View style={{position:'absolute', left:width/1.8, backgroundColor: item.paymentStatus == true ? 'green' : 'red', borderRadius: 5, padding: 5, alignSelf: 'flex-start' }}>
                    <Text style={[styles.title]}>
                        <Text style={[styles.title, { color: 'white', fontSize: 15 }]}>{item.paymentStatus == true ? "success pay" : "failed pay"}</Text>
                    </Text>
                </View>
            </View>

            <View style={{
                borderWidth: 0.5,
                borderColor: 'white',
                margin: -1,
                width: width - 100,
                alignSelf: 'center',
                marginVertical: 5
            }} />
            <Text style={[styles.text, { alignSelf: 'center' }]}>{"Rooms"}</Text>

            {
                item.room.map((e, i) => (
                    <View key={i}>
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, margin: 10 }}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    marginHorizontal: 10
                                }}
                                source={{
                                    uri: item.room.roomPhoto,
                                }}
                                resizeMode='stretch'
                            />
                            <View>
                                <Text style={[[styles.text , {fontSize:17}]]}>{e.name}</Text>
                                <Text style={[styles.text, {fontSize:17}]}>{e.space} m</Text>
                                <Text style={[styles.text, { color: 'red' , fontSize:16}]}>price : {e.price}$</Text>
                            </View>

                        </View>
                        { i!=item.room.length-1 &&  
                        <View style={{
                            borderWidth: 0.5,
                            borderColor: 'white',
                            margin: -1,
                            width: width - 180,
                            alignSelf: 'center',
                            marginVertical: 5
                        }} />}
                    </View>
                ))
            }




        </View>
    )
}

const styles = StyleSheet.create({
    card: {

        flexDirection: 'row',
        alignItems: 'center',
        Width: width - 100,
    },
    tinyLogo: {
        width: 80,
        height: 80,
        borderRadius: 8
    },
    text: {
        fontSize: 19,
        color: 'white',
        fontFamily: 'item'
    }
})