import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Animated from 'react-native-reanimated';

import { AntDesign } from '@expo/vector-icons';

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors'
import HotelBG from '../../../assets/HotelBG.jpg'
import SearchCard from '../../../Components/ComponentsofHotels/SearchCard';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function SearchHotelScreen({ navigation }) {
    const [IsOpen, setIsOpen] = useState(true)
    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ["25%", "40%"], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    }, []);
    const handleSheetChanges = useCallback((index) => {

    }, []);

    return (

        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>

            <ImageBackground
                source={HotelBG}
                resizeMode='cover'
                style={{
                    width: width,
                    height: height / 2.8,
                }} />


            <View style={{ left: 15, position: 'absolute', top: height / 20 }}>
                <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
                    navigation.goBack()
                }} />
            </View>

            <SearchCard HandleOpenSheet={handlePresentModalPress(!IsOpen)} IsOpen={IsOpen} navigation={navigation} />
{IsOpen&&
            <BottomSheetModalProvider>
                <Animated.View style={styles.container}>
                    <BottomSheetModal
                        backgroundStyle={{
                            backgroundColor: 'rgba(24,24,24,1)',
                        }}
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onDismiss={() => {
                            setIsOpen(false)
                            handleSheetChanges()
                        }}
                    >

                    </BottomSheetModal>
                </Animated.View>
            </BottomSheetModalProvider>
        }

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
})