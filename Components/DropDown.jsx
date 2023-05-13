import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

import Colors from '../Conestant/Colors';

const { width } = Dimensions.get('window');

export default function DropDown({ countriesWithFlags, HandleText, Text}) {

    return (
        <View>
            <View >
                <SelectDropdown
                    data={countriesWithFlags}
                    defaultValueByIndex={1}
                    defaultValue={{
                        title: 'Egypt',
                        image: require('../assets/Egypt.png'),
                    }}
                    onSelect={(selectedItem, index) => {
                        HandleText(selectedItem)
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={styles.dropdown3BtnChildStyle}>
                                {Text ? (
                                    <Image source={Text.image} style={styles.dropdown3BtnImage} />
                                ) : (
                                    <Ionicons name="md-earth-sharp" color={'white'} size={30} />
                                )}
                                {/* <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select country'}</Text> */}
                                <FontAwesome name="chevron-down" color={'white'} size={15} />
                            </View>
                        );
                    }}
                    dropdownStyle={styles.dropdown3DropdownStyle}//
                    rowStyle={styles.dropdown3RowStyle}// 
                    renderCustomizedRowChild={(item, index) => {
                        return (
                            <View style={styles.dropdown3RowChildStyle}>
                                <Image source={item.image} style={styles.dropdownRowImage} />
                                {/* <Text style={styles.dropdown3RowTxt}>{item.title}</Text> */}
                            </View>
                        );
                    }}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    dropdown3BtnStyle: {
        width: width / 4.6,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderRadius: 7,
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: -1,
    },
    dropdown3BtnImage: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 10,
        marginHorizontal:5
    },
    dropdown3BtnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 12,
        fontFamily: "item"
    },
    dropdown3DropdownStyle: {
        backgroundColor: 'black',
        borderRadius: 20,
    },
    dropdown3RowStyle: {
        backgroundColor: 'black',
        borderBottomColor: '#444',
        height: 40,
        margin: 2

    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownRowImage: {
        width: 45,
        height: 45,
        resizeMode: 'cover',
        borderRadius: 10
    },
    dropdown3RowTxt: {
        color: 'black',
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 12,
        fontFamily: "item"
    },
    label: {
        fontFamily: 'item',
        fontSize: 20,
        color: "white",
        textAlign: 'left',
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
})