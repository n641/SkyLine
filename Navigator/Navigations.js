import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from "../Screens/Intro_Screens/SplashScreen";
import StartScreen from '../Screens/Auth_Screens/StartScreen';
import SignInScreen from '../Screens/Auth_Screens/SignInScreen';
import SignUpScreen from '../Screens/Auth_Screens/SignUpScreen';
import VerifyScreen from '../Screens/Auth_Screens/VerifyScreen';
import BindingAccount from '../Screens/Auth_Screens/BindingAccount';
import mainFPScreen from '../Screens/Auth_Screens/ForgetPasswordScreens/MainFPScreen';
import GmailFP from '../Screens/Auth_Screens/ForgetPasswordScreens/GmailFP'
import PhoneNumberFp from '../Screens/Auth_Screens/ForgetPasswordScreens/PhoneNumberFP'
import Home from '../Screens/Home/Home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false , animation:'slide_from_bottom'}}  >
                <Stack.Screen name="SplashScreen" component={SplashScreen}  />
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="Signin" component={SignInScreen} />
                 <Stack.Screen name="Signup" component={SignUpScreen} />
                 <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
                 <Stack.Screen name="BindingAccount" component={BindingAccount} />
                 <Stack.Screen name="ResetPassword" component={mainFPScreen} />
                 <Stack.Screen name="ResetPasswordByGmail" component={GmailFP} />
                 <Stack.Screen name="ResetPasswordByPhone" component={PhoneNumberFp} />

                 <Stack.Screen name="Home" component={Home} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation