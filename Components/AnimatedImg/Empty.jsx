import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';

import empty from '../../assets/lotties/106964-shake-a-empty-box.json'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Empty() {
    const animationRef = useRef(null)
    useEffect(() => {
        animationRef.current?.play()

        // Or set a specific startFrame and endFrame with:
        // animationRef.current?.play(30, 120);
    }, [])
    return (
        <View style={styles.card}>
            <Lottie
                ref={animationRef}
                source={empty}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        top: height / 2.8,
        position: 'absolute',
        backgroundColor: 'rgba(24,24,24,0.5)',
        height: height / 1.7,
        width: width - 40,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15
    }
})