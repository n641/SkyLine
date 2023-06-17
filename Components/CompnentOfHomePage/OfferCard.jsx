import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

import MainButton from '../MainButton'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function OfferCard({ item, navigation }) {
    return (
        <View style={{ margin: 10, borderRadius: 10, marginTop: 10 }}>
            <Image source={{
                uri: item?.imag
            }} resizeMode="stretch" style={styles.image} />
            <LinearGradient colors={['rgba(98,98,98,0.5)', 'rgba(80,80,80,0.8)', '#1A1A1A']}
                style={{ position: 'absolute', width: width - 40, top: 105, borderRadius: 15 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                        <Text style={[styles.text, { marginBottom: -20 }]}>{item.title}</Text>
                        <Text style={[styles.text, { lineHeight: 84, fontSize: 15 }]}>{item.descreption}</Text>
                    </View>
                    <View style={{ alignSelf: 'center', marginRight: 20 }}>
                        <MainButton title={'Book'} onClick={() => {
                            if (item.id == 1) {
                                navigation.navigate('BookTicketNavigator')
                            } else {
                                navigation.navigate('BookHotelNavigator')
                            }
                        }} />
                    </View>

                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        width: width - 40,
        height: 200,
        justifyContent: 'flex-end',
        borderRadius: 15
    },
    text: {
        color: '#081839',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'justify',
        marginHorizontal: 10,
    },
})