import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';

import loading from '../../assets/lotties/9965-loading-spinner.json'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Loading() {
    const animationRef = useRef(null)
    useEffect(() => {
        animationRef.current?.play()

        // Or set a specific startFrame and endFrame with:
        // animationRef.current?.play(30, 120);
    }, [])
    return (
            <Lottie
                ref={animationRef}
                source={loading}
            />
    )
}

const styles = StyleSheet.create({
    card: {
        position:'absolute',
        backgroundColor: 'rgba(24,24,24,0.5)',
    }
})