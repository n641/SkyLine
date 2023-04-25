import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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

export default function InfoOfUser({ navigation }) {
    const [PhoneNumber, setPhoneNumber] = useState();
    const [Email, setEmail] = useState()
    const [FirstName, setFirstName] = useState("")
    const [SecondName, setSecondName] = useState("")
    const [Email2, setEmail2] = useState()
    const [PhoneNumber2, setPhoneNumber2] = useState()
    const [isEnabled, setIsEnabled] = useState(false);
    const ref = React.useRef();

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
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.containerKeyboard}
                >
                    <Transitioning.View
                        ref={ref}
                        transition={transition}
                        style={styles.container}
                    >
                        <View style={{
                            alignItems: 'center',
                        }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', width: width, marginLeft: width / 10 , alignSelf:'center' }}>
                                <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                                    navigation.goBack()
                                }} />
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 25, marginLeft: width / 6.5, marginTop: 40 }}>Guest information</Text>
                            </View>

                            <View style={{ justifyContent: 'center', margin: 0 }}>
                                <Text style={[styles.text, { marginBottom: -10 }]}>username</Text>
                                <View style={styles.containerConestInput}>
                                    <Text style={styles.text}>Noha mohammed</Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', margin: 0 }}>
                                <Text style={[styles.text, { marginBottom: -10 }]}>Email</Text>
                                <View style={styles.containerConestInput}>
                                    <Text style={styles.text}>noha67357@gmail.com</Text>
                                </View>
                            </View>


                            <View style={{ alignItems: 'center' }}>
                                <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 87)} required={true} onAddText={HandleEmial} text={Email} />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <PhoneNumberTF placeholder='***********' keyboardType='numeric' label='phone Number' required={true} onAddText={HnadlePhoneNumber} text={PhoneNumber} />
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
                                }}>
                                    <View style={{ alignItems: 'center', margin: 10 }}>
                                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 87)} required={true} onAddText={HandleFirstName} text={FirstName} />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 10 }}>
                                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 87)} required={true} onAddText={HandleSecondName} text={SecondName} />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 10 }}>
                                        <PhoneNumberTF placeholder='***********' keyboardType='numeric' label='phone Number' required={true} onAddText={HnadlePhoneNumber2} text={PhoneNumber2} />
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                                        <CustomTF placeholder="name@example.com" keyboardType="email-address" type="" label="Email" width={(width - 87)} required={true} onAddText={HandleEmial2} text={Email2} />
                                    </View>
                                </View>
                            }

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width, margin: 15 }}>
                                <Text style={[styles.text, { fontSize: 35 }]}>Total</Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.text, { fontSize: 25, color: 'red' }]}>500<Text style={{ fontSize: 25, color: 'white' }}>$</Text></Text>
                                    <Text style={[styles.text, { color: 'gray', fontSize: 14, top: -2 }]}>taxes are include</Text>
                                </View>
                            </View>

                            <View style={{ alignSelf: 'center' }}>
                                <MainButton title={'continue'} onClick={() => { navigation.navigate('Checkout') }} />
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

    },container: {
        // flex: 1,
        // justifyContent: 'center',
        // margin: 10
    },
})