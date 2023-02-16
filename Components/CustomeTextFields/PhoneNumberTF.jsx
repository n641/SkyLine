import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'

import DropDown from '../DropDown'

import { Entypo } from '@expo/vector-icons';

import Colors from '../../Conestant/Colors';


const { width, height } = Dimensions.get('window');

export default function PhoneNumberTF({  placeholder, keyboardType, label, required, onAddText, text }) {

    const [country, setcountry] = useState()
    const HandleCountry = (text) => {
        setcountry(text)
    }
    const countriesWithFlags = [
        { title: 'Egypt', image: require('../../assets/Egypt.png') },
        { title: 'Canada', image: require('../../assets/Canada.png') },
        { title: 'Australia', image: require('../../assets/Australia.png') },
        { title: 'Brazil', image: require('../../assets/Brazil.png') },
    ];
    return (
        <View>

            <View style={{ justifyContent: 'center'}}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.label}>{label}</Text>
                    {required ? <Text style={styles.astrisk}>*</Text> : null}
                </View>

                <View style={[styles.container]}>
                    <DropDown Text={country} HandleText={HandleCountry} countriesWithFlags={[...countriesWithFlags]}  />
                    <TextInput
                        style={[styles.input,]}
                        onChangeText={onAddText}
                        value={text}
                        placeholder={placeholder}
                        placeholderTextColor={Colors.Hint_text_field}
                        keyboardType={keyboardType}
                    />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 60,
    },
    input: {
        minHeight: 40,
        fontSize: 18,
        fontFamily: "item",
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