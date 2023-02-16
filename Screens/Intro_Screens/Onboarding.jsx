import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList, Animated } from 'react-native'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../Conestant/Colors';

import Sliders from '../../Conestant/Data/Sliders';
import OnboardingItem from '../../Components/OnboardingItem/OnboardingItem';
import Paginator from '../../Components/OnboardingItem/Paginator';
import NextButton from '../../Components/OnboardingItem/NextButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const Onboarding = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentIndex < Sliders.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
        } else {
            navigation.navigate('StartScreen')
        }
    }

    return (

        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.linearGradient}>
            <View style={{ flex: 3 }}>

                <FlatList
                    data={Sliders}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={Sliders} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / Sliders.length)} />

        </LinearGradient>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


})