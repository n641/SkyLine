import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';


import { AntDesign } from '@expo/vector-icons';

import Colors from '../Conestant/Colors';
const DatePickerTF = ({ label, required, width, date, mode, show, onChange, showDatepicker }) => {


    return (
        <TouchableOpacity style={{ margin: 10, justifyContent: 'center', height: 30, width: width }}
            onPress={showDatepicker}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>{label}</Text>
                {required ? <Text style={styles.astrisk}>*</Text> : null}
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name="calendar" size={24} color="white" />
                    <Text style={styles.text}>  {date.toJSON().substring(0, 10)}</Text>
                </View>
            </View>
            {show &&
                (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        disabled="spinner"
                        dateFormat='yyyy-mm-dd'
                    />
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 5,
        borderColor: "white",
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        // minHeight: 40,
        fontSize: 18,
        fontFamily: "item",
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: "white"
    },
    label: {
        fontFamily: 'item',
        fontSize: 20,
        color: "white",
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    }
})

export default DatePickerTF