import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import React from 'react'

import Animated, { useAnimatedStyle, useAnimatedGestureHandler, useSharedValue, useAnimatedProps, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';


const width = Dimensions.get('window').width - 40;
const MaxWidth = width - 20 / 2 + 6

export default function InputRange({ min, max, steps, title, onValueChange }) {

    const xKnob1 = useSharedValue(0)
    const scaleKnob1 = useSharedValue(1)
    const xKnob2 = useSharedValue(MaxWidth)
    const scaleKnob2 = useSharedValue(1)

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

    const gesterHandler1 = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = xKnob1.value
        },
        onActive: (event, ctx) => {
            scaleKnob1.value = 1.3
            xKnob1.value = ctx.startX + event.translationX < 0 ? 0 :
                ctx.startX + event.translationX > xKnob2.value ?
                    xKnob2.value : ctx.startX + event.translationX
        },
        onEnd: () => {
            scaleKnob1.value = 1
            runOnJS(onValueChange)({ min: xKnob1.value, max: xKnob2.value });
        }
    })

    const gesterHandler2 = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = xKnob2.value
        },
        onActive: (event, ctx) => {
            scaleKnob2.value = 1.3
            xKnob2.value = ctx.startX + event.translationX < xKnob1.value ? xKnob1.value :
                ctx.startX + event.translationX > MaxWidth ?
                    MaxWidth : ctx.startX + event.translationX
        },
        onEnd: () => {
            scaleKnob2.value = 1
            runOnJS(onValueChange)({ min: Math.round((min + (xKnob1.value / MaxWidth) * (max - min)) / steps) * steps, max: Math.round((min + (xKnob2.value / MaxWidth) * (max - min)) / steps) * steps });
        }
    })

    const styleLine = useAnimatedStyle(() => {
        return {
            backgroundColor: 'orange',
            height: 3,
            marginTop: -3,
            borderRadius: 3,
            width: xKnob2.value - xKnob1.value,
            transform: [{ translateX: xKnob1.value }]
        }
    })

    const styleKnob1 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: xKnob1.value
                },
                {
                    scale: scaleKnob1.value
                }
            ]
        }
    })

    const styleKnob2 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: xKnob2.value
                },
                {
                    scale: scaleKnob2.value
                }
            ]
        }
    })

    const propsLabel1 = useAnimatedProps(() => {
        return {
            text: `${Math.round((min + (xKnob1.value / MaxWidth) * (max - min)) / steps) * steps}`
        }
    })

    const propsLabel2 = useAnimatedProps(() => {
        return {
            text: `${Math.round((min + (xKnob2.value / MaxWidth) * (max - min)) / steps) * steps}`
        }
    })

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rangeContainer}>
                <View style={styles.labelContainer}>
                    <AnimatedTextInput defaultValue={'0'} editable={false} style={styles.label} animatedProps={propsLabel1} />
                    <AnimatedTextInput defaultValue={'0'} editable={false} style={styles.label} animatedProps={propsLabel2} />
                </View>
                <View style={styles.track} />
                <Animated.View style={styleLine} />
                <PanGestureHandler onGestureEvent={gesterHandler1}>
                    <Animated.View style={[styles.knob, styleKnob1]} />
                </PanGestureHandler>
                <PanGestureHandler onGestureEvent={gesterHandler2}>
                    <Animated.View style={[styles.knob, styleKnob2]} />
                </PanGestureHandler>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#eee',
        borderTopWidth: 1,
        borderColor: '#cccdb2',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    title: {
        color: '#777',
        fontSize: 12
    },
    rangeContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderColor: 'cccdb2',
        borderBottomWidth: 1
    },
    labelContainer: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18
    },
    label: {
        color: '#333',
        fontSize: 12
    },
    track: {
        height: 3,
        backgroundColor: '#cccdb2',
        borderRadius: 3
    },
    knob: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 10,
        borderColor: '#9c44dc',
        borderWidth: 2,
        backgroundColor: '#fff',
        marginTop: 45,
        marginLeft: 8
    }
})