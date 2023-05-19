import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image, Text
} from 'react-native'
import React, { useRef , useCallback } from 'react'

import axios from '../../../Api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../../store/actions/auth';


import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import bg from '../../../assets/bg-dark.jpg';
import airplane from '../../../assets/airplane2.png'
import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'
import QRCode from 'react-native-qrcode-svg';

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useState, useEffect } from 'react';

import * as FileSystem from 'expo-file-system';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function FinalBookTicket({ navigation, route }) {
    const auth = useSelector(state => state.Auth.token);
    const userData = useSelector(state => state.Auth.userData);
    const dispatch = useDispatch();
    const getuser = useCallback(() => {
        dispatch(getMe())
    }, [dispatch])
    
    useEffect(() => {
        getuser();
    }, []);
    const { id, seat } = route.params;
    const [Data, setData] = useState()
    const [Directurl, setDirecturl] = useState()

    const data = {
        name: 'Divyesh Barad',
        email: 'divyesh@gmail.com',
        address: 'Rajkot',
    }

    const html = `
    <html>
        <body>
            <h2>Hi ${data.name}</h2>
            <h4>Email: ${data.email}</h4>
            <h4>Address: ${data.address}</h4>
        </body>
    </html>
`;

    const generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false,
        });
        await shareAsync(file.uri);
    }

    var url = `https://skyline-backend.cyclic.app/api/v1/bookings/checkout-session/flights/${id}/${seat[0]}/${userData?._id}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2FmNDMwYTY4NmUxNjM3Y2Y4MmU0MCIsImlhdCI6MTY4MTg1NDU5MiwiZXhwIjoxNjg5NjMwNTkyfQ.qxv6mzBc34gpnx0fC92sFue7VLJ-gFOHp7vUos8VK5o"
    const fetchdataurl = async () => {
        const response = await axios.get(url,
            {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
                withCredentials: true
            })
            .catch(error => {
                console.log(error)
            })
        if (response) {
            setDirecturl(response.data.session.url)
            console.log(response.data.session.url)
        }
    }

    var url2 = `https://skyline-backend.cyclic.app//api/v1/flights/${id}`;
    const fetchData = async () => {
        const resp = await fetch(url2)
        const data = await resp.json();
        setData(data.data.data);
    };

    useEffect(() => {
        fetchData()
        fetchdataurl();
    }, []);


    return (
        <ImageBackground
            source={bg}
            resizeMode='cover'
            style={{
                width: width,
                height: height + 50,
            }}
        >
            <ScrollView >

                <View style={{ marginTop: 20 }} >
                    <AirplaneData navigation={navigation} title='Ticket Detail' />
                </View>

                <View
                    style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

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
                                <Text style={styles.Dtext}>{Data?.fromDate}
                                    <Text> PM</Text>
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
                                <Text style={[styles.Dtext, { fontSize: 15 }]}>{Data?.date.substring(0, 10)}
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
                                <Text style={[styles.text, { color: 'gray' }]}>--</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.Dtext}>Class</Text>
                                <Text style={[styles.text, { color: 'gray' }]}>{Data?.classes}</Text>
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

                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-evenly', width: width }}>

                        <MainButton title='Download' onClick={() => {
                            generatePdf()
                        }} />
                        <MainButton title='Done' onClick={() => {
                            navigation.navigate("PaymentWV", { Directurl: Directurl })
                        }} />

                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
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
    }
})