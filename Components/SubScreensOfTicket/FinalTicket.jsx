import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image, Text
} from 'react-native'
import React, { useRef, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../store/actions/auth';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import airplane from '../../assets/airplane2.png'
import QRCode from 'react-native-qrcode-svg';


import SelectDropdown from 'react-native-select-dropdown';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useState, useEffect } from 'react';

import * as FileSystem from 'expo-file-system';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function FinalTicketStyle({Data}) {
  return (
    <View
    style={{ alignSelf:'center'}}>

    <View style={{
        backgroundColor: 'rgba(24,24,24,0.8)',
        borderRadius: 20,
        width: width - 80,
        height: height / 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    }}>

        <Image
            source={{
                uri: 'https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png',
            }}
            style={{ width: width, height: height / 8.5, resizeMode: 'contain' }}
        />

        {/* //row1     */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View>
                <Text style={[styles.text, { color: 'gray', marginVertical: 3 }]}>BOM</Text>
                <Text style={[styles.text, { color: 'white', marginVertical: 3 }]}>{Data?.from}</Text>
            </View>

            <View>
                <Image
                    source={airplane}
                    resizeMode='contain'
                    style={{
                        width: width / 3.3,
                        height: (height / 11) + 50,
                        margin: 10
                    }}
                />
            </View>

            <View>
                <Text style={[styles.text, { color: 'gray', marginVertical: 3 }]}>DXp</Text>
                <Text style={[styles.text, { color: 'white', marginVertical: 3 }]}>{Data?.to}</Text>
            </View>

        </View>

        {/* //row2     */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width / 1.4 }}>

            <View style={{
                backgroundColor: '#4F4C4C',
                borderRadius: 10,
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 1
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6 }}>
                    <AntDesign name="clockcircleo" size={15} color="white" style={{ marginHorizontal: 4 }} />
                    <Text style={styles.Dtext}>Time</Text>
                </View>
                <Text style={styles.Dtext}>{Data?.time}
                    {/* <Text> PM</Text> */}
                </Text>
            </View>


            <View style={{
                backgroundColor: '#4F4C4C',
                borderRadius: 10,
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 4
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6 }}>
                    <MaterialIcons name="date-range" size={17} color="white" style={{ marginHorizontal: 4 }} />
                    <Text style={styles.Dtext}>Date</Text>
                </View>
                <Text style={[styles.Dtext, { fontSize: 15 }]}>{Data?.date?.substring(0, 10)}
                </Text>
            </View>
        </View>

        {/* //row3     */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 30, width: width / 1.2 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.Dtext}>Gate</Text>
                <Text style={[styles.text, { color: 'gray' }]}>{Data?.gate}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.Dtext}>Seat</Text>
                <Text style={[styles.text, { color: 'gray' }]}>{Data.seat}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.Dtext}>Class</Text>
                <Text style={[styles.text, { color: 'gray' }]}>{Data?.class}</Text>
            </View>
        </View>
        {/* //row4     */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.Dtext}>Flight Num :
                <Text style={[styles.text, { color: 'gray' }]}> {Data?.flightNo}</Text>
            </Text>
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
        height: height / 4,
        alignItems: 'center',
        justifyContent: 'center'

    }}>

        <QRCode
            value="exp://192.168.1.4:19000/--/Home"
            logoSize={100}
            logoBackgroundColor='#00ff00'
        />

    </View>

</View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'item',
        fontSize: 20,
    },
    Dtext: {
        fontFamily: 'item',
        fontSize: 18,
        color: 'white',
    },
})