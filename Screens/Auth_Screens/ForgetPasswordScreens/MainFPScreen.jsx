import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import OnboardingItem from '../../../Components/OnboardingItem';
import Link from '../../../Components/Link';
import Colors from '../../../Conestant/Colors';

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import logo from '../../../assets/forgetPass.png'

const MainFPScreen = ({navigation}) => {

    const HandleNavigate = (name) => {
        navigation.navigate(name)
      }
     
    const item = {
        image: logo,
        title: "Forget Password?",
        description: "Don't worry !, we will help you \n recover your password",
    }

    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>
            <OnboardingItem item={item} />

            <View style={{ marginTop: -50 }}>
                <TouchableOpacity style={styles.container} onPress={()=>{HandleNavigate('ResetPasswordByGmail')}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Send your Email</Text>
                        <MaterialIcons name="email" size={20} color="black" style={{ marginStart: 10 }} />
                    </View>
                    <Text style={styles.description}>We will send new password to your email:</Text>
                    <Text style={styles.description}>Example@gmail.com</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} onPress={()=>{HandleNavigate('ResetPasswordByPhone')}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Send your PhoneNumber</Text>
                        <Entypo name="phone" size={20} color="black" style={{ marginStart: 10 }} />
                    </View>
                    <Text style={styles.description}>We will send new password to your Phone:</Text>
                    <Text style={styles.description}>Phone Number :+01*********</Text>
                </TouchableOpacity>
            </View>

           

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        // backgroundColor:"white"
    },
    title: {
        color: "white",
        fontFamily: 'item',
        fontSize: 18
    },
    description: {
        color: Colors.Gray ,
        fontFamily: 'item',
        fontSize: 16
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default MainFPScreen