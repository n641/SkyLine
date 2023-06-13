import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image, Text
} from 'react-native'
import React, { useRef, useCallback } from 'react'

import axios from '../../../Api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../../store/actions/auth';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import bg from '../../../assets/bg-dark.jpg';
import airplane from '../../../assets/airplane2.png'
import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'
import QRCode from 'react-native-qrcode-svg';

import FinalTicketStyle from '../../../Components/SubScreensOfTicket/FinalTicket';

import SelectDropdown from 'react-native-select-dropdown';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useState, useEffect } from 'react';

import * as FileSystem from 'expo-file-system';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function FinalBookTicket({ navigation, route }) {
    const auth = useSelector(state => state.Auth.token);
    const userData = useSelector(state => state.Auth.userData);
    const theme = useSelector(state => state.Auth.theme)

    const dispatch = useDispatch();
    const getuser = useCallback(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getuser();
    }, []);
    const { id, seat, Data, type } = route.params;
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
            // setDirecturl(response.data.session.url)
            // console.log(response.data.session.url)
        }
    }

    useEffect(() => {
        // fetchdataurl();
    }, []);


    const num = ["first Flight", "second Flight", "third Flight", "fourth Flight", "fifth Flight"]
    var dataOfRound = ["Forword ticket", "Return ticket"]
    if (type == "multiFlight") {
        dataOfRound = []
        Data.flights.map((e, i) => {
            dataOfRound.push(num[i])
        })
    }
    const [TicketNum, setTicketNum] = useState(dataOfRound)
    const [selectTicket, setselectTicket] = useState(dataOfRound[0])

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


                {/* //////////////////////////////////////////////////////// */}
                {
                    (type == "multiFlight" || type == "RoundTrip") &&
                    <View style={{ alignSelf: 'center', marginBottom: 10 }} >

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginTop: 10 }}>
                            <Text style={styles.label}>ticket</Text>
                        </View>
                        <View style={[styles.DateContainer]} >

                            <SelectDropdown
                                data={dataOfRound}

                                onSelect={(selectedItem, index) => {
                                    setselectTicket(selectedItem)
                                }}
                                defaultButtonText={dataOfRound[0]}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'black'} size={18} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                            />

                        </View>
                    </View>
                }
                {/* ///////////////////////////oneway/////////////////// */}
                {type == "oneway" &&
                    <FinalTicketStyle Data={
                        {
                            flightNo: Data.flightNum,
                            from: Data.From,
                            to: Data.TO,
                            time: "1:00 Am",
                            date: Data.DateFrom,
                            gate: Data.gateFrom,
                            seat: seat[0],
                            class: Data.classs
                        }
                    } />
                }


                {/* ///////////////////////////round/////////////////// */}

                {type == "RoundTrip" && <View>
                    {
                        selectTicket == "Forword ticket" ?
                            <FinalTicketStyle Data={
                                {
                                    flightNo: Data.flightNum,
                                    from: Data.From,
                                    to: Data.TO,
                                    time: Data.TimeFromStart,
                                    date: Data.dateGo,
                                    gate: Data.gateFrom,
                                    seat: seat[0],
                                    class: Data.classs
                                }
                            } />
                            :
                            <FinalTicketStyle Data={
                                {
                                    flightNo: Data.flightNum,
                                    from: Data.TO,
                                    to: Data.From,
                                    time: Data.TimeToStart,
                                    date: Data.dateReturn,
                                    gate: Data.gateTo,
                                    seat: seat[0],
                                    class: Data.classs
                                }
                            } />
                    }
                </View>
                }

                {/* ///////////////////////////multi////////////////////////// */}
                {type == "multiFlight" &&

                    Data.flights.map((e, i) => (
                        selectTicket == num[i] ?
                            <FinalTicketStyle key={i} Data={
                                {
                                    flightNo: Data.flights[i].flightNo,
                                    from: Data.flights[i].from,
                                    to: Data.flights[i].to,
                                    time: "10:00 Am",
                                    date: Data.flights[i].date == null ? "15-5-2023" : e.date.substring(0, 10),
                                    gate: Data.flights[i].gate,
                                    seat: seat,
                                    class: Data.classes
                                }
                            } /> : null
                    ))
                }



                {/* ///////////////////////////////////////////////////// */}
                < View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

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
        </ImageBackground >
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
    DateContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        width: width - 150,
        backgroundColor: 'white'

    }, dropdown1BtnStyle: {
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width: width - 150,
    },
    dropdown1BtnTxtStyle: {
        textAlign: 'left',
        fontFamily: 'item',
        fontSize: 23,
        color: 'black'
    },
    dropdown1DropdownStyle: {
        backgroundColor: 'black',
        justifyContent: 'center',
        borderRadius: 15,
    },
    dropdown1RowStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderBottomColor: 'black',

    },
    dropdown1RowTxtStyle: {
        color: 'white',
        textAlign: 'left',
        fontFamily: 'item',
        fontSize: 19,
    },
    label: {
        fontFamily: 'item',
        fontSize: 20,
        color: "white",
        textAlign: 'left',
    },
})