import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';
import BottomTF from '../CustomeTextFields/bottomTF';
import MainButton from '../../Components/MainButton';

import { AntDesign } from '@expo/vector-icons';

import Colors from '../../Conestant/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function SearchCard({HandleOpenSheet , IsOpen , navigation}) {
    const [location, setlocation] = useState()
    const HandleLocation = (text) => {
        setlocation(text)
    }

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const HandleDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(!show);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Search </Text>

                <BottomTF text={location} settext={HandleLocation} icon="location" label="Location" />

                <TouchableOpacity style={{
                    justifyContent: 'center',
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    width: width - 90,
                    marginTop: 20
                }}
                    onPress={showDatepicker}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Text style={styles.label}>{"label"}</Text>
                        {true ? <Text style={styles.astrisk}>*</Text> : null}
                    </View>
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.label, { fontSize: 23, color: 'gray' }]}>  {date.toJSON().substring(0, 10)}</Text>
                            <AntDesign name="calendar" size={24} color="white" />
                        </View>
                    </View>
                    {show &&
                        (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                onChange={HandleDate}
                                disabled="spinner"
                                dateFormat='yyyy-mm-dd'
                            />
                        )
                    }
                </TouchableOpacity>

                <TouchableOpacity style={{ marginVertical: 30 }}
                onPress={()=>{HandleOpenSheet(!IsOpen)}}
                >
                    <View>
                        <View style={styles.cardinput}>
                            <Text style={styles.label}>persons</Text>
                            <Text style={styles.astrisk}>*</Text>
                        </View>
                        <View style={styles.inputcontaner}>
                            <Text style={styles.text}>Adults:2 , childreen:0 , infant:2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <MainButton title={'search'} onClick={() => {navigation.navigate('ResultHotels') }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height / 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
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
    }
})