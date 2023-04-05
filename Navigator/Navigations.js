import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from "../Screens/Intro_Screens/SplashScreen";
import AnimatedLogin from '../Screens/Auth_Screens/MainAuthScreens/AnimatedLogin';
import VerifyScreen from '../Screens/Auth_Screens/VerifyScreen';
import BindingAccount from '../Screens/Auth_Screens/BindingAccount';
import mainFPScreen from '../Screens/Auth_Screens/ForgetPasswordScreens/MainFPScreen';
import GmailFP from '../Screens/Auth_Screens/ForgetPasswordScreens/GmailFP'
import PhoneNumberFp from '../Screens/Auth_Screens/ForgetPasswordScreens/PhoneNumberFP'
import Home from './TabBarHome';
import CustomDrawer from './CustomDrawer'
import TicketSearch from '../Screens/Home/Tickets/TicketSearch';
import ResultTicketsScreen from '../Screens/Home/Tickets/ResultTicketsScreen';
import DetailsTicket from '../Screens/Home/Tickets/DetailsTicket';
import BookSeatScreen from '../Screens/Home/Tickets/BookSeatScreen';
import FinalBookTicket from '../Screens/Home/Tickets/FinalBookTicket';


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
        </Stack.Navigator>
    )
}

const MainNaigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}  >
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
                <Stack.Screen name="Home" component={CustomDrawer} />
                <Stack.Screen name="TicketSearch" component={TicketSearch} />
                <Stack.Screen name="ResultTicketsScreen" component={ResultTicketsScreen} />
                <Stack.Screen name="DetailsTicket" component={DetailsTicket} />
                <Stack.Screen name="BookSeatScreen" component={BookSeatScreen} />
                <Stack.Screen name="FinalBookTicket" component={FinalBookTicket} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainNaigator