import React, { useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';



import { LinearGradient } from "expo-linear-gradient";
import { Audio } from 'expo-av';

import Colors from "../../Conestant/Colors";

import Logo from '../../assets/logo-light.png'
import Onboarding from "./Onboarding";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SplashScreen = ({ navigation }) => {


    //play sound in background

    const [sound, setSound] = React.useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/Sound/intro.mp3')
        );
        setSound(sound);

        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;

    }, [sound]);


    // Make icon animated

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down Both logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    useEffect(() => {
        // playSound()
        // Starting Animation after 500ms....
        setTimeout(() => {
            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non-safe Area Devices...
                        toValue: -Dimensions.get('window').height,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.35
                        toValue: 0.2,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: (windowWidth / 2.5),
                            y: (Dimensions.get('window').height) / 1.7

                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 1500);

    }, [])


    return (

        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }} >
            <StatusBar hidden={true}/>
            <LinearGradient colors={[Colors.first_dark_splash, Colors.second_dark_splash, Colors.second_dark_splash, Colors.fourth_dark_splash]}
                style={styles.linearGradient}>

                <Animated.View style={{
                    flex: 1,
                    zIndex: 1,
                    transform: [
                        { translateY: startAnimation }
                    ]
                }}>
                    <Animated.View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Animated.Image source={Logo} style={{
                            width: 400,
                            height: 280,
                            marginBottom: 20,
                            borderRadius: 50,
                            resizeMode: "contain",
                            transform: [
                                { translateX: moveLogo.x },
                                { translateY: moveLogo.y },
                                { scale: scaleLogo },

                            ]
                        }}>
                        </Animated.Image>
                    </Animated.View>
                </Animated.View>
                <Text style={{textAlign:'center' , color:'white' , fontSize:19 , fontFamily:'item'}}>V1.0.1</Text>

            </LinearGradient>


            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.04)',
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>

                <Onboarding navigation={navigation} />

            </Animated.View>
        </View >

    )

}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    tinyLogo: {
        width: windowWidth / 2.5,
        height: windowHeight / 2.5,
    },
});
export default SplashScreen