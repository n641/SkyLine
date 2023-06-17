import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import { Checkbox, RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import MainButton from '../../../Components/MainButton';

import Colors from '../../../Conestant/Colors';

import VisaCard from '../../../assets/VisaCard.png'
import cash from '../../../assets/cash.png'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function WaysOfPay({ navigation, route }) {
    const { meals, cancellation, Hoteldata, selecetedRoom, headerData, userInf, allPrice } = route.params;
    //fetch api of payment
    const PaymentMetho = [
        {
            text: "Credit Card",
            value: 'first',
            price: 0,
            img: VisaCard
        }, {
            text: "Cash",
            value: 'second',
            price: 15,
            img: cash

        },
    ]
    const [checkedradio, setCheckedradio] = React.useState('first');

    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={{
                flex: 1,
                // alignItems: 'center'
            }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 20 }}>
                <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                    navigation.goBack()
                }} />
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 30, marginLeft: width / 15, fontFamily: 'item', marginTop: 50 }}>Payment method</Text>
            </View>

            {
                PaymentMetho.map((e, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={styles.card}>
                                <Image
                                    style={{
                                        width: 80,
                                        height: 58,
                                        borderRadius: 15,
                                        margin: 5
                                    }}
                                    source={e.img}
                                    resizeMode='stretch'
                                />
                                <Text style={styles.text}>{e.text}</Text>

                                <RadioButton
                                    value={e.value}
                                    status={checkedradio === e.value ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setCheckedradio(e.value)
                                    }}
                                />
                            </View>
                        </View>
                    )
                })
            }
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                <MainButton title={"Done"} onClick={() => {
                    if (checkedradio == 'first') {
                        navigation.navigate('PaymentWV', { Directurl: '' })
                    } else {
                        navigation.navigate('Home')
                    }
                }} />
            </View>


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: width - 40,
        margin: 10,
        borderRadius: 8,
        marginLeft: 20
    }, logo: {
        width: 50,
        height: 50,
        borderRadius: 7
    }, text: {
        fontSize: 25,
        fontFamily: 'item',
        color: 'white',
    },
})