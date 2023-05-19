import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Animated from 'react-native-reanimated';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors'
import HotelBG from '../../../assets/HotelBG.jpg'
import SearchCard from '../../../Components/ComponentsofHotels/SearchCard';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function SearchHotelScreen({ navigation }) {
    const [IsOpen, setIsOpen] = useState(true)
    const bottomSheetModalRef = useRef(null);
    const [Adults, setAdults] = useState(1);
    const [Child, setChild] = useState(0);
    const [infants, setinfants] = useState(0)
    const [persons, setpersons] = useState(`Adults: ${Adults} , childreen: ${Child} , infant: ${infants}`)
    const [show, setShow] = useState(false);
    const HandleShowData = (val) => {
        setShow(val)
    }
    
    const snapPoints = useMemo(() => ["25%", "45%"], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    }, []);
    const handleSheetChanges = useCallback((index) => {
        setpersons(`Adults: ${Adults} , childreen: ${Child} , infant: ${infants}`)
    }, [Adults, infants, Child]);

    return (

        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>

            <TouchableOpacity onPress={()=>{HandleShowData(false)}} activeOpacity={1}>
                <ImageBackground
                    source={HotelBG}
                    resizeMode='cover'
                    style={{
                        width: width,
                        height: height / 2.8,
                    }} />


                <View style={{ left: 15, position: 'absolute', top: height / 20 }}>
                    <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                        navigation.goBack()
                    }} />
                </View>

                <SearchCard Child={Child} infants={infants}  HandleShowData={HandleShowData} show={show} HandleOpenSheet={handlePresentModalPress} IsOpen={IsOpen} navigation={navigation} persons={persons} Adults={Adults} />
            </TouchableOpacity>
            <BottomSheetModalProvider>
                <Animated.View style={styles.container}>
                    <BottomSheetModal
                        backgroundStyle={{
                            backgroundColor: 'rgba(24,24,24,1)',
                        }}
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onDismiss={() => {
                            setIsOpen(false)
                            handleSheetChanges()
                        }}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Fontisto name="person" size={35} color="white" style={{ margin: 10, marginRight: 15 }} />
                                    <View style={{ marginHorizontal: 5 }}>
                                        <Text style={{ fontSize: 25, color: 'white', fontFamily: 'item' }}>Adults</Text>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'item' }}>Above 12 years</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={[styles.button, { backgroundColor: Adults == 0 ? "gray" : "blue" }]}>
                                        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'item', textAlign: 'center' }} onPress={() => {
                                            Adults == 0 ? null : setAdults(Adults - 1)
                                        }}>-</Text>
                                    </View>
                                    <Text style={{ fontSize: 35, color: Adults == 0 ? "gray" : "white", fontFamily: 'item', margin: 10, paddingHorizontal: 10 }}>{Adults}</Text>
                                    <View style={styles.button}>
                                        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'item', textAlign: 'center' }} onPress={() => {
                                            Adults > 5 ? null : setAdults(Adults + 1)
                                        }}>+</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
                            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Fontisto name="person" size={35} color="white" style={{ margin: 10, marginRight: 25 }} />
                                    <View style={{ marginHorizontal: 5 }}>
                                        <Text style={{ fontSize: 25, color: 'white', fontFamily: 'item' }}>Child</Text>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'item' }}>2-12 years</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={[styles.button, { backgroundColor: Child == 0 ? "gray" : "blue" }]}>
                                        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'item', textAlign: 'center' }} onPress={() => {
                                            Child == 0 ? null : setChild(Child - 1)
                                        }}>-</Text>
                                    </View>
                                    <Text style={{ fontSize: 35, color: Child == 0 ? "gray" : "white", fontFamily: 'item', margin: 10, paddingHorizontal: 10 }}>{Child}</Text>
                                    <View style={styles.button}>
                                        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'item', textAlign: 'center' }} onPress={() => {
                                            Child > 5 ? null : setChild(Child + 1)
                                        }}>+</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />

                            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Fontisto name="person" size={35} color="white" style={{ margin: 10, marginRight: 25 }} />
                                    <View style={{ marginHorizontal: 5 }}>
                                        <Text style={{ fontSize: 25, color: 'white', fontFamily: 'item' }}>infants</Text>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'item' }}>2-12 years</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={[styles.button, { backgroundColor: infants == 0 ? "gray" : "blue" }]}>
                                        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'item', textAlign: 'center' }} onPress={() => {
                                            infants == 0 ? null : setinfants(infants - 1)
                                        }}>-</Text>
                                    </View>
                                    <Text style={{ fontSize: 35, color: infants == 0 ? "gray" : "white", fontFamily: 'item', margin: 10, paddingHorizontal: 10 }}>{infants}</Text>
                                    <View style={styles.button}>
                                        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'item', textAlign: 'center' }} onPress={() => {
                                            infants > 5 ? null : setinfants(infants + 1)
                                        }}>+</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </BottomSheetModal>
                </Animated.View>
            </BottomSheetModalProvider>

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    button: {
        borderRadius: 25,
        backgroundColor: 'blue',
        height: 50,
        width: 40,
        elevation: 12,
        shadowColor: 'white',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})