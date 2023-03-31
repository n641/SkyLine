import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView
} from 'react-native'
import React from 'react'

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import bg from '../../../assets/bg-dark.jpg';

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function FinalBookTicket({ navigation }) {
    return (
        <ImageBackground
            source={bg}
            resizeMode='cover'
            style={{
                width: width,
                height: height + 50,
            }}
        >
            <ScrollView >

                <View >
                    <AirplaneData navigation={navigation} title='Ticket Detail' />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' , marginBottom:50}}>

                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 20,
                        width: width - 80,
                        height: height / 1.5,
                    }}>

                    </View>

                    <View style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        margin: -1,
                        width: width - 130,
                    }} />

                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 15,
                        width: width - 80,
                        height: height / 4

                    }}></View>

                    <View style={{flexDirection:'row' , margin:10 , justifyContent:'space-evenly' , width:width}}>

                        <MainButton title='Download' onClick={()=>{}} />
                        <MainButton title='Done' onClick={()=>{}}/>

                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})