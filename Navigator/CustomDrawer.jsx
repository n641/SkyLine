import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";

import { Fontisto } from '@expo/vector-icons';

import profile from '../assets/profile.png';
import home from '../assets/home.png';
import Hotel from '../assets/hotelicon.png';
import Ticket from '../assets/ticketicon.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';


import Colors from '../Conestant/Colors';
import Home from '../Screens/Home/Home';
import HistoryOfTickets from '../Screens/Home/Tickets/HistoryOfTickets';

const windowWidth = Dimensions.get('window').height;

export default function CustomDrawer({navigation}) {
    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);


    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

    const HandleSetShowMenu = (val) => {
        setShowMenu(val)
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ justifyContent: 'flex-start', padding: 15 , marginTop:15 }}>
                <Image source={profile} style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    marginTop: 8
                }}></Image>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
                }}>Jenna Ezarik</Text>

                <TouchableOpacity onPress={()=>{navigation.navigate("MainProfileScreen")}}>
                    <Text style={{
                        marginTop: 6,
                        color: 'white'
                    }}>View Profile</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {
                        // Tab Bar Buttons....
                    }

                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Tickets", Ticket)}
                    {TabButton(currentTab, setCurrentTab, "Hotels", Hotel)}
                    {TabButton(currentTab, setCurrentTab, "Settings", settings)} 

                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
                </View>

            </View>


            <Home
                showMenu={showMenu}
                scaleValue={scaleValue}
                offsetValue={offsetValue}
                closeButtonOffset={closeButtonOffset}
                menu={menu}
                HandleSetShowMenu={(val) => {
                    HandleSetShowMenu(val)
                }}
                close={close}
                currentTab={currentTab}
                navigation={navigation}
            />

        </SafeAreaView>
    )
}


const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (

        <TouchableOpacity onPress={() => {
            if (title == "LogOut") {
                // logout...
            } else {
                setCurrentTab(title)
            }
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 15
            }}>

                <Image source={image} style={{
                    width: 30, height: 30,
                    tintColor: currentTab == title ? "#5359D1" : "white"
                }}></Image>

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#5359D1" : "white"
                }}>{title}</Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.second_dark_splash,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
})