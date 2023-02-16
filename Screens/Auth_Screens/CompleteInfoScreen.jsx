import { Dimensions, StyleSheet, Text, View, ImageBackground, Image, useWindowDimensions, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';

import PhoneNumberTF from '../../Components/CustomeTextFields/PhoneNumberTF';
import UploadImgTF from '../../Components/CustomeTextFields/UploadImgTF';
import VerfiyIdTF from '../../Components/CustomeTextFields/VerfiyIdTF';
import PaymentTF from '../../Components/CustomeTextFields/PaymentTF';
import MainButton from '../../Components/MainButton';

import img from '../../assets/bg3.png'
import Logo from '../../assets/logo-light.png'

const { width } = Dimensions.get('window');

const CompleteInfoScreen = () => {
    const [PhoneNumber, setPhoneNumber] = useState(0)
    const [selectedPersonalImage, setSelectedPersonalImage] = useState(null);
    const [selectedFrontId, setSelectedFrontId] = useState(null);
    const [selectedBackId, setSelectedBackId] = useState(null);

    const [typeOfId, settypeOfId] = useState()

    const HandletypeOfId = (type) => {
        settypeOfId(type)
    }
    const HandlePhoneNumber = (number) => {
        setPhoneNumber(number)
    }
    const HandlePersonalImg = (img) => {
        setSelectedPersonalImage(img)
    }
    const HandleFrontId = (img) => {
        setSelectedFrontId(img)
    }
    const HandleBackId = (img) => {
        setSelectedBackId(img)
    }

    return (
        <ImageBackground source={img} resizeMode="cover" style={{ flex: 1 }} blurRadius={5} >
            <ScrollView>

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

                <View style={{ margin: 10, justifyContent: 'center' }}>

                    <View style={{ margin: 10, alignItems: 'center' }}>
                        <UploadImgTF label="Choose Image" selectedImage={selectedPersonalImage} setSelectedImage={HandlePersonalImg} />
                    </View>

                    <View style={{ margin: 20 }} >
                        <PhoneNumberTF required={true} placeholder="+10*********" keyboardType="numeric" type="" label="Phone Number" onAddText={HandlePhoneNumber} text={PhoneNumber} />
                    </View>

                    <View>
                        <PaymentTF />
                    </View>

                    <View>
                        <VerfiyIdTF HandleText={HandletypeOfId} text={typeOfId} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>

                        <View>
                            <UploadImgTF required={true} label="Upload Front ID" selectedImage={selectedFrontId} setSelectedImage={HandleFrontId} />
                        </View>

                        <View>
                            <UploadImgTF required={true} label="Upload back ID" selectedImage={selectedBackId} setSelectedImage={HandleBackId} />
                        </View>

                    </View>

                </View>
                <View style={{ width: width, alignItems: 'center', justifyContent: 'center' }}>
                    <MainButton title={'Save'} onClick={() => { }} />
                </View>
            </ScrollView>

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

})