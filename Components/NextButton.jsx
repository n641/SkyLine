import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import Svg, { G, Circle } from 'react-native-svg'

export default function NextButton({ percentage, scrollTo, scrollX }) {

    const [progress, setProgress] = useState(0)

    const size = 144;
    const strakeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strakeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    var progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (tovalue) => {
        return Animated.timing(progressAnimation, {
            tovalue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        // animation(percentage)
        var strockDashoffset = circumference - (circumference * percentage) / 100;
        setProgress(strockDashoffset)
    }, [percentage])

    // useEffect(() => {
    //     progressAnimation.addListener((value) => {
    //         var strockDashoffset = circumference - (circumference * value.value) / 100;
    //         if (progressRef?.current) {
    //             progressRef.current.setNativeProps({
    //                 strockDashoffset
    //             })
    //         }
    //     }, [percentage]);
    //     return () => {
    //         progressAnimation.removeAllListeners()
    //     }
    // }, [])

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={center}>

                    <Circle stroke="black" cx={center} cy={center} r={radius} strokeWidth={strakeWidth} />
                    <Circle stroke="blue"
                        ref={progressRef}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strakeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                    />

                </G>

            </Svg>
            <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 30
    }
})