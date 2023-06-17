import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import CAlert from '../../../Components/CustomeAlerts/CAlert'
import wrong from '../../../assets/warning.png'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors';

import CustomTF from '../../../Components/CustomeTextFields/CustomTF';
import PhoneNumberTF from '../../../Components/CustomeTextFields/PhoneNumberTF';
import MainButton from '../../../Components/MainButton';

import { Transition, Transitioning, color } from 'react-native-reanimated';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='slide-left' durationMs={200} />
    </Transition.Together>
);

export default function InfoOfUser({ navigation, route }) {
    const { meals, cancellation, Hoteldata, selecetedRoom, headerData } = route.params;
    
    console.log(selecetedRoom)

    const userData = useSelector(state => state.Auth.userData);

    const [PhoneNumber, setPhoneNumber] = useState(userData?.phone ? userData?.phone : null);
    const [Email, setEmail] = useState(userData?.email)
    const [FirstName, setFirstName] = useState(userData?.username)

    const [SecondName, setSecondName] = useState(null)
    const [Email2, setEmail2] = useState(null)
    const [PhoneNumber2, setPhoneNumber2] = useState(null)

    const [isEnabled, setIsEnabled] = useState(false);

    const [visibleForm, setvisibleForm] = useState(false)
    const [titleForm, settitleForm] = useState("")
    const ref = React.useRef();

    var allPrice = (Hoteldata.price * headerData.Night) + cancellation.price;
    meals.map((e) => {
        allPrice = allPrice + e.price
    })

    selecetedRoom.map((e) => {
        allPrice = allPrice + (e.price * headerData.Night)
    })

    const HandleFirstName = (text) => {
        setFirstName(text)
    }
    const HandleSecondName = (text) => {
        setSecondName(text)
    }
    const HandleEmial2 = (val) => {
        setEmail2(val)
    }
    const HnadlePhoneNumber2 = (text) => {
        setPhoneNumber2(text)
    }
    const toggleSwitch = () => {
        ref.current.animateNextTransition();
        setIsEnabled(previousState => !previousState)
    };
    const HnadlePhoneNumber = (text) => {
        setPhoneNumber(text)
    }
    const HandleEmial = (val) => {
        setEmail(val)
    }
    return (

        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={{
                flexGrow: 1
            }}>
            <ScrollView >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                    style={styles.containerKeyboard}
                >
                    <Transitioning.View
                        ref={ref}
                        transition={transition}
                        style={styles.container}
                    >

                        <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
                            setvisibleForm(false)
                        }} />
                        <View style={{
                            alignItems: 'center',
                        }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', width: width, marginLeft: width / 10, alignSelf: 'center' }}>
                                <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                                    navigation.goBack()
                                }} />
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 25, marginLeft: width / 6.5, marginTop: 40 }}>Guest information</Text>
                            </View>

                            <View style={{ justifyContent: 'center', margin: 0 }}>
                                <Text style={[styles.text, { marginBottom: -10 }]}>username</Text>
                                <View style={styles.containerConestInput}>
                                    <Text style={styles.text}>{FirstName}</Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', margin: 0 }}>
                                <Text style={[styles.text, { marginBottom: -10 }]}>Email</Text>
                                <View style={styles.containerConestInput}>
                                    <Text style={styles.text}>{Email}</Text>
                                </View>
                            </View>



                            <View style={{ marginTop: 20 }}>
                                <PhoneNumberTF placeholder={userData?.phone ? userData?.phone : "***********"} keyboardType='numeric' label='phone Number' required={true} onAddText={HnadlePhoneNumber} text={PhoneNumber} />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width, marginTop: 25 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.text, { fontSize: 25 }]}>Book For Other</Text>
                                </View>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>

                            {isEnabled &&
                                <View style={{
                                    alignItems: 'center',
                                }}
                                >
                                    <View style={{ alignItems: 'center', margin: 10 }}>
                                        <CustomTF placeholder="example" keyboardType="username" type="" label="username" width={(width - 87)} required={true} onAddText={HandleSecondName} text={SecondName} />
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 87)} required={true} onAddText={HandleEmial2} text={Email2} />
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                                        <PhoneNumberTF placeholder='***********' keyboardType='numeric' label='phone Number' required={true} onAddText={HnadlePhoneNumber2} text={PhoneNumber2} />
                                    </View>

                                </View>
                            }

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width, margin: 15 }}>
                                <Text style={[styles.text, { fontSize: 35 }]}>Total</Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.text, { fontSize: 25, color: 'red' }]}>{allPrice}<Text style={{ fontSize: 25, color: 'white' }}>$</Text></Text>
                                    <Text style={[styles.text, { color: 'gray', fontSize: 14, top: -2 }]}>taxes are include</Text>
                                </View>
                            </View>

                            <View style={{ alignSelf: 'center' }}>
                                <MainButton title={'continue'} onClick={() => {
                                    const userInf = isEnabled ? {
                                        username: SecondName,
                                        phone: PhoneNumber2,
                                        email: Email2,
                                    } : {
                                        username: FirstName,
                                        phone: PhoneNumber,
                                        email: Email,
                                    }
                                    if ((PhoneNumber != null && isEnabled == false) || (SecondName != null && PhoneNumber2 != null && Email2 != null)) {
                                        navigation.navigate('Checkout', { allPrice: allPrice, userInf: userInf, Hoteldata: Hoteldata, selecetedRoom: selecetedRoom, headerData: headerData, meals: meals, cancellation: cancellation })
                                    } else {
                                        settitleForm("Please complete tyout information")
                                        setvisibleForm(true)
                                    }
                                }} />
                            </View>
                        </View>

                    </Transitioning.View>
                </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    containerConestInput: {
        borderColor: '#545151',
        borderWidth: 1,
        width: width - 68,
        marginVertical: 15,
        padding: 5,
        backgroundColor: '#545151',
        borderRadius: 8
    },
    text: {
        fontFamily: 'item',
        fontSize: 18,
        color: 'white'
    },
    containerKeyboard: {
        overflow: 'hidden',

    }, container: {
        // flex: 1,
        // justifyContent: 'center',
        // margin: 10
    },
})