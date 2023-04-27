import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from "../Screens/Intro_Screens/SplashScreen";
import AnimatedLogin from '../Screens/Auth_Screens/MainAuthScreens/AnimatedLogin';
import VerifyScreen from '../Screens/Auth_Screens/VerifyScreen';
import BindingAccount from '../Screens/Auth_Screens/BindingAccount';
import mainFPScreen from '../Screens/Auth_Screens/ForgetPasswordScreens/MainFPScreen';
import EnterData from '../Screens/Auth_Screens/ForgetPasswordScreens/EnterData';
import GmailFP from '../Screens/Auth_Screens/ForgetPasswordScreens/GmailFP'
import PhoneNumberFp from '../Screens/Auth_Screens/ForgetPasswordScreens/PhoneNumberFP';

import Home from './TabBarHome';
import CustomDrawer from './CustomDrawer';

import TicketSearch from '../Screens/Home/Tickets/TicketSearch';
import ResultTicketsScreen from '../Screens/Home/Tickets/ResultTicketsScreen';
import DetailsTicket from '../Screens/Home/Tickets/DetailsTicket';
import BookSeatScreen from '../Screens/Home/Tickets/BookSeatScreen';
import FinalBookTicket from '../Screens/Home/Tickets/FinalBookTicket';
import PaymentWV from '../Screens/Home/Tickets/PaymentWV';
import HistoryOfTickets from '../Screens/Home/Tickets/HistoryOfTickets';

import MainProfileScreen from '../Screens/Home/Profile/MainProfileScreen';
import ProfileScreen from '../Screens/Home/Profile/ProfileScreen';

import SearchHotelScreen from '../Screens/Home/Hotels/SearchHotelScreen';
import ResultHotels from '../Screens/Home/Hotels/ResultHotels';
import DetailsHotel from '../Screens/Home/Hotels/DetailsHotel';
import BookRoom from '../Screens/Home/Hotels/BookRoom';
import InfoOfUser from '../Screens/Home/Hotels/InfoOfUser';
import Checkout from '../Screens/Home/Hotels/Checkout';
import MapViews from '../Screens/Home/Hotels/MapView';

import * as Linking from 'expo-linking';
const prefix = Linking.makeUrl('/');

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}  >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="AnimatedLogin" component={AnimatedLogin} />
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
            <Stack.Screen name="BindingAccount" component={BindingAccount} />
            <Stack.Screen name="ResetPassword" component={mainFPScreen} />
            <Stack.Screen name="ResetPasswordByGmail" component={GmailFP} />
            <Stack.Screen name="ResetPasswordByPhone" component={PhoneNumberFp} />
            <Stack.Screen name="EnterData" component={EnterData} />
        </Stack.Navigator>
    )
}

const BookTicketNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}  >
            <Stack.Screen name="TicketSearch" component={TicketSearch} />
            <Stack.Screen name="ResultTicketsScreen" component={ResultTicketsScreen} />
            <Stack.Screen name="DetailsTicket" component={DetailsTicket} />
            <Stack.Screen name="BookSeatScreen" component={BookSeatScreen} />
            <Stack.Screen name="FinalBookTicket" component={FinalBookTicket} />
            <Stack.Screen name="PaymentWV" component={PaymentWV} />
            <Stack.Screen name="HistoryOfTickets" component={HistoryOfTickets} />
        </Stack.Navigator>
    )
}

const BookHotelNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}  >
            <Stack.Screen name="SearchHotelScreen" component={SearchHotelScreen} />
            <Stack.Screen name="ResultHotels" component={ResultHotels} />
            <Stack.Screen name="DetailsHotel" component={DetailsHotel} />
            <Stack.Screen name="BookRoom" component={BookRoom} />
            <Stack.Screen name="InfoOfUser" component={InfoOfUser} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="MapViews" component={MapViews} />
        </Stack.Navigator>
    )
}



const MainNaigator = () => {
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Home: "Home ",
            },
        },
    };
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}  >
                <Stack.Screen name="Home" component={CustomDrawer} />
                <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
                <Stack.Screen name="BookTicketNavigator" component={BookTicketNavigator} />
                <Stack.Screen name="BookHotelNavigator" component={BookHotelNavigator} />
                <Stack.Screen name="MainProfileScreen" component={MainProfileScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainNaigator