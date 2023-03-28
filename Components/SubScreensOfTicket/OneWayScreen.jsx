import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

import { useState } from 'react';

import Colors from '../../Conestant/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

export default function OneWayScreen() {
    const [From, setFrom] = React.useState();
    const [to, setTo] = React.useState();
    const [Class, setClass] = useState()

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [CountriesFrom, setCountriesFrom] = useState([
        'Egypt/Cairo',
        'Egypt/Hurgada',

    ])

    const [CountriesTo, setCountriesTo] = useState([
        'Egypt/Cairo',
        'Egypt/Hurgada',

    ])

    const [Classes, setClasses] = useState([
        'First class',
        'Business',
        'economy'

    ])


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
        <ScrollView style={{ marginVertical: 10 , marginBottom:40 }}>
            <View style={styles.inputContainer}>
                <View
                    style={{ margin: 10 }}>

                    {/* //////////////////////////////////////////////////////// */}

                    <View style={{ marginBottom: -20 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -10 }}>
                            <Text style={styles.label}>From</Text>
                            <Text style={styles.astrisk}>*</Text>
                        </View>

                        <SelectDropdown
                            data={CountriesFrom}

                            onSelect={(selectedItem, index) => {
                                setFrom(selectedItem)
                            }}
                            defaultButtonText={CountriesFrom[0]}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>

                    {/* //////////////////////////////////////////////////////// */}

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                        width: (width - 120)
                    }} />
                    <MaterialCommunityIcons name="swap-vertical-bold" size={45} color="white" />

                </View>

                <View style={{

                    margin: 10
                }} >

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -10, margin: -20 }}>
                        <Text style={styles.label}>To</Text>
                        <Text style={styles.astrisk}>*</Text>
                    </View>

                    <SelectDropdown
                        data={CountriesTo}

                        onSelect={(selectedItem, index) => {
                            setTo(selectedItem)
                        }}
                        defaultButtonText={CountriesTo[0]}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                </View>
            </View>

            {/* //////////////////////////////////Date/////////////////////////////////////////// */}

            <TouchableOpacity style={styles.DateContainer}
                onPress={showDatepicker}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.label}>departure </Text>
                    <Text style={styles.astrisk}>*</Text>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={styles.text}>  {date.toJSON().substring(0, 10)}</Text>
                        <AntDesign name="calendar" size={30} color="white" />
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
            {/* //////////////////////////////////class////////////////////////////////// */}
            <View style={[styles.DateContainer]} >

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3 ,  marginBottom: -15 , marginTop:2 }}>
                    <Text style={styles.label}>To</Text>
                    <Text style={styles.astrisk}>*</Text>
                </View>

                <SelectDropdown
                    data={Classes}

                    onSelect={(selectedItem, index) => {
                        setClass(selectedItem)
                    }}
                    defaultButtonText={Classes[0]}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
            </View>

            {/* ////////////////////////////passengers////////////////////////////// */}

            <View style={[styles.DateContainer]} >

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 10 , margin: -10 }}>
                    <Text style={styles.label}>Passengers</Text>
                    <Text style={styles.astrisk}>*</Text>
                </View>
                

               
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15
    },
    DateContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        marginTop: 25,
        padding: 6
    },
    text: {
        fontFamily: 'item',
        fontSize: 20,
        color: '#fff'
    },
    dropdown1BtnStyle: {
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width:width-100
    },
    dropdown1BtnTxtStyle: {
        textAlign: 'left',
        fontFamily: 'item',
        fontSize: 20,
        color: '#fff'
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
        fontSize: 25,
        color: "gray",
        textAlign: 'left',
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
})