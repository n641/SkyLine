import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import BottomTF from '../CustomeTextFields/bottomTF';
import MainButton from '../../Components/MainButton';
import CAlert from '../../Components/CustomeAlerts/CAlert'

import { AntDesign } from '@expo/vector-icons';

import wrong from '../../assets/warning.png'

import Colors from '../../Conestant/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function SearchCard({ HandleOpenSheet, persons, navigation, Adults, infants, Child, HandleShowData, show }) {
    const [location, setlocation] = useState(null)
    // IceWare
    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")

    const [Nights, setNights] = useState(null)
    const [headerData, setheaderData] = useState()
    const [date, setdate] = useState()
    const [selectedRange, setRange] = useState(null);

    const HandleLocation = (text) => {
        setlocation(text)
        setheaderData({
            Night: Nights ? Nights : 1, date: selectedRange ? selectedRange?.firstDate : new Date().toString().substring(0, 15),
            date2: selectedRange ? selectedRange?.secondDate : new Date().toString().substring(0, 15)
            , numberOfRooms: 1, persons: Adults + infants + Child
        })
    }

    const validateSubmit = async () => {
        setheaderData({
            Night: Nights ? Nights : 1, date: selectedRange ? selectedRange?.firstDate : new Date().toString().substring(0, 15),
            date2: selectedRange ? selectedRange?.secondDate : new Date().toString().substring(0, 15),
            numberOfRooms: 1, persons: Adults + infants + Child
        })
        if (location != null && Adults != 0) {
            navigation.navigate('ResultHotels', { location: location, headerData: headerData })
        } else {
            settitleForm("must enter location or name of hotel")
            setvisibleForm(true)
        }
    }

    const HandleRangeofDate = (val) => {
        setRange(val)
        setNights(selectedRange != null ? Number(selectedRange?.secondDate.substring(8)) - Number(selectedRange?.firstDate.substring(8)) : 1)
        // console.log(Number(selectedRange?.secondDate.substring(8)) - Number(selectedRange?.firstDate.substring(8)))
        setheaderData({
            Night: Nights ? Nights : 1, date: selectedRange ? selectedRange?.firstDate : new Date().toString().substring(0, 15),
            date2: selectedRange ? selectedRange?.secondDate : new Date().toString().substring(0, 15)
            , numberOfRooms: 1, persons: Adults + infants + Child
        })
    }

    const DataRange = () => {
        return (
            <View style={{ position: "absolute", backgroundColor: 'white', padding: 20, width: width - 20 }}>
                <DateRangePicker
                    onSelectDateRange={(range) => {
                        HandleRangeofDate(range);
                        setdate(range.firstDate + "\n -> \n" + " " + range.secondDate)
                        HandleShowData(false)
                    }}
                    blockSingleDateSelection={true}
                    responseFormat="YYYY-MM-DD"
                    maxDate={moment().add(100, "days")}
                    minDate={moment()}
                    selectedDateContainerStyle={styles.selectedDateContainerStyle}
                    selectedDateStyle={styles.selectedDateStyle}
                />
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => { HandleShowData(false) }} activeOpacity={1}>

            <View style={styles.card}>
                <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
                    setvisibleForm(false)
                }} />

                <Text style={styles.title}>Search </Text>

                <BottomTF location={location} HandleLocation={HandleLocation} icon="location" label="Location" />

                <TouchableOpacity style={{
                    justifyContent: 'center',
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    width: width - 90,
                    marginTop: 20
                }}
                    onPress={() => HandleShowData(!show)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Text style={styles.label}>{"Date"}</Text>
                        {true ? <Text style={styles.astrisk}>*</Text> : null}
                    </View>
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text numberOfLines={3} style={[styles.label, { fontSize: 23, color: 'gray', maxWidth: 150 }]}>{date ? date : moment().toString().substring(0, 15)} </Text>
                            <AntDesign name="calendar" size={24} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginVertical: 30 }}
                    onPress={() => { HandleOpenSheet() }}
                >
                    <View>
                        <View style={styles.cardinput}>
                            <Text style={styles.label}>Guests</Text>
                            <Text style={styles.astrisk}>*</Text>
                        </View>
                        <View style={styles.inputcontaner}>
                            <Text style={styles.text}>{persons}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <MainButton title={'search'} onClick={() => {
                    validateSubmit()
                }} />
                {show &&
                    <DataRange />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height / 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    card: {
        backgroundColor: 'rgba(24,24,24,0.5)',
        width: width - 60,
        borderRadius: 15,
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontFamily: 'item',
        fontSize: 35,
        color: 'white',
        textAlign: 'center'
    },
    label: {
        fontFamily: 'item',
        fontSize: 25,
        color: "white",
        textAlign: 'left',
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
    label: {
        fontFamily: 'item',
        fontSize: 25,
        color: "white",
        textAlign: 'left',
        marginLeft: -5
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
    cardinput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 5,
        marginBottom: -10,
    },
    inputcontaner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 5,
        width: width - 90,
    },
    text: {
        fontFamily: 'item',
        fontSize: 20,
        margin: 5,
        color: 'white',
        marginVertical: 13
    },
    selectedDateContainerStyle: {
        height: 35,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
    },
    selectedDateStyle: {
        fontWeight: "bold",
        color: "white",
    },
})