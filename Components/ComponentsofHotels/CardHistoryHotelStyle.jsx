import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

import RateCard from './RateCard'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function CardHistoryHotelStyle({ item }) {
    console.log(item)
    return (
        <View style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 8,
            margin: 10,
            padding: 5,
        }}>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.img,
                        }}
                        resizeMode='stretch'
                    />
                    <View style={{ margin: 10 }}>
                        <Text style={[styles.text]}>{item.name}</Text>
                        <RateCard rate={item.rate} />
                        <Text style={[styles.text, { color: 'red' }]}>Total price : {item.price}$</Text>

                    </View>
                </View>


                <View style={{ backgroundColor: item.payment == true ? 'green' : 'red', borderRadius: 5, padding: 5, alignSelf: 'flex-start' }}>
                    <Text style={[styles.title]}>
                        <Text style={[styles.title, { color: 'white', fontSize: 14 }]}>{item.payment == true ? "Paied" : "NotPay"}</Text>
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