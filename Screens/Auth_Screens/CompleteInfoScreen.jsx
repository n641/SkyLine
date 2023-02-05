import { Dimensions, StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

import MainButton from '../../Components/MainButton'
import CustomTF from '../../Components/CustomTF';
import Colors from '../../Conestant/Colors'

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'
import Link from '../../Components/Link'
const { width } = Dimensions.get('window');

const CompleteInfoScreen = () => {
    // const { width2 } = useWindowDimensions()
    const [PhoneNumber, setPhoneNumber] = useState(0)
    const [country, setcountry] = useState('')
    const HandleNavigate = (name) => {
        navigation.navigate(name)
    }
    const HandlePhoneNumber = (text) => {
        setPhoneNumber(text)
    }

    const countries = [
        'Egypt',
        'Canada',
        'Australia',
        'Ireland',
        'Brazil',
        'Dubai',

    ];
    const countriesWithFlags = [
        { title: 'Egypt', image: require('../../assets/Egypt.png') },
        { title: 'Canada', image: require('../../assets/Canada.png') },
        { title: 'Australia', image: require('../../assets/Australia.png') },
        { title: 'Brazil', image: require('../../assets/Brazil.png') },
    ];

    return (
        <ImageBackground source={img} resizeMode="cover" style={{ flex: 1 }} blurRadius={5}>
            <View style={[styles.containerLogo, { width: width }]}>
                <Image source={Logo} style={styles.Image} />
            </View>
            <View style={{ marginStart: 15, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="minus" size={34} color="white" />
                    <FontAwesome name="minus" size={34} color="white" style={{ left: -2 }} />
                    <FontAwesome name="minus" size={34} color="white" style={{ left: -4 }} />
                </View>
                <Text style={styles.title}>Complete information</Text>
            </View>


            <View style={{}}>
                <View style={{ justifyContent:'center' , alignItems:'center', marginTop:20}}>
                    <SelectDropdown
                        data={countriesWithFlags}
                        defaultValueByIndex={1}
                        defaultValue={{
                            title: 'Egypt',
                            image: require('../../assets/Egypt.png'),
                        }}
                        onSelect={(selectedItem, index) => {
                            setcountry(selectedItem)
                        }}
                        buttonStyle={styles.dropdown3BtnStyle}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            return (
                                <View style={styles.dropdown3BtnChildStyle}>
                                    {selectedItem ? (
                                        <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />//
                                    ) : (
                                        <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
                                    )}
                                    <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select country'}</Text>
                                    <FontAwesome name="chevron-down" color={'#444'} size={18} />
                                </View>
                            );
                        }}
                        dropdownStyle={styles.dropdown3DropdownStyle}//
                        rowStyle={styles.dropdown3RowStyle}// 
                        renderCustomizedRowChild={(item, index) => {
                            return (
                                <View style={styles.dropdown3RowChildStyle}>
                                    <Image source={item.image} style={styles.dropdownRowImage} />
                                    <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={{ alignItems: 'center', marginVertical: 30 }}>
                    <View>
                        <CustomTF placeholder="+01*********" keyboardType="email-address" type="" label="Phone Number" width={(width - 50 -120)} required={true} onAddText={HandlePhoneNumber} />
                    </View>



                </View>
            </View>


        </ImageBackground>



    )
}

export default CompleteInfoScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    containerLogo: {
        alignItems: 'flex-end'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    backGround: {
        flex: 1,
    },
    Image: {
        width: 45,
        height: 54,
        resizeMode: "contain",

    },
    title: {
        fontFamily: 'item',
        fontSize: 35,
        color: "white",
    },

    dropdown3BtnStyle: {
        width: '40%',
        height: 42,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 0,
        borderRadius: 7,
        // borderColor: 'white',

    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: -1,
    },
    dropdown3BtnImage: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius:10
    },
    dropdown3BtnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 12,
        fontFamily:"item"

    },
    dropdown3DropdownStyle: {
        backgroundColor: 'slategray',
        borderRadius:10
    },
    dropdown3RowStyle: {
        backgroundColor: 'slategray',
        borderBottomColor: '#444',
        height: 40,
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    dropdownRowImage: {
        width: 45,
        height: 45,
        resizeMode: 'cover'
    },

    dropdown3RowTxt: {
        color: 'black',
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 12,
        fontFamily:"item"
    },


})