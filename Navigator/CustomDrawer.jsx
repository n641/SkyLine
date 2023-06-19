import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native';
import axios from '../Api/axios';

import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../store/actions/auth';

import home from '../assets/home.png';
import Hotel from '../assets/hotelicon.png';
import Ticket from '../assets/ticketicon.png';
import chat from '../assets/chat.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';

import Colors from '../Conestant/Colors';
import Home from '../Screens/Home/Home';

export default function CustomDrawer({ navigation }) {
    const datauser = useSelector(state => state.Auth.userData);
    // const auth = useSelector(state => state.Auth.token);
    // console.log("auth in screen " + auth)

    const [currentTab, setCurrentTab] = useState("Home");
    const [showMenu, setShowMenu] = useState(false);
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();

    const getuser = useCallback(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getuser();
    }, [dispatch]);

    const HandleSetShowMenu = (val) => {
        setShowMenu(val)
    }

    let encoded = encodeURI(datauser?.userPhoto ? datauser?.userPhoto : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />

            <View style={{ justifyContent: 'flex-start', padding: 15, marginTop: 15 }}>
                <Image
                    source={{
                        uri: encoded
                    }}
                    style={{
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
                }}>{datauser?.firstName} {datauser?.lastName}</Text>

                <TouchableOpacity onPress={() => { navigation.navigate("MainProfileScreen") }}>
                    <Text style={{
                        marginTop: 6,
                        color: 'white'
                    }}>View Profile</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {/* <View>
                        <Text>nnnnn</Text>
                    </View> */}
                    {
                        // Tab Bar Buttons....
                    }

                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Tickets", Ticket)}
                    {TabButton(currentTab, setCurrentTab, "Hotels", Hotel)}
                    {TabButton(currentTab, setCurrentTab, "Support", chat)}

                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, "LogOut", logout, navigation)}
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


const TabButton = (currentTab, setCurrentTab, title, image, navigation) => {
    return (

        <TouchableOpacity onPress={() => {
            if (title == "LogOut") {
                navigation.navigate('AuthNavigator')
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