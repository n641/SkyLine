import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

import { Transition, Transitioning } from 'react-native-reanimated';


const transition = (
    <Transition.Together>
        <Transition.In type='slide-top' durationMs={500} />
        <Transition.Change />
        <Transition.Out type='slide-right' durationMs={500} />
    </Transition.Together>
);


export default function HeaderOfData() {
    const [open, setopen] = useState(false)
    const [icon, seticon] = useState("arrow-down-circle")
    const ref = useRef();

    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
            style={{ flex: 1 }}
        >
            <Animated.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="date-range" size={28} color="white" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.text}>15/3/2023</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="nightlight-round" size={24} color="white" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.text}>3</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="door-open" size={24} color="white" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.text}>3</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="person" size={24} color="white" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.text}>3</Text>
                </View>

                <Feather name={icon} size={24} color="white" onPress={() => {
                    ref.current.animateNextTransition();
                    setopen(!open)
                    if (open) {
                        seticon("arrow-down-circle")
                    } else {
                        seticon("arrow-up-circle")

                    }
                }} />

            </Animated.View>

            {open &&
                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }}>
                    <Text style={styles.text}>Date of check-in : <Text> 15/3/2023 </Text></Text>
                    <Text style={[styles.text , {marginTop:5}]}>Number of rooms : <Text> 3 </Text></Text>
                    <Text style={[styles.text , {marginTop:5}]}>number of nights : <Text> 3 </Text></Text>
                    <Text style={[styles.text , {marginTop:5}]}>number of nights : </Text>
                    <Text style={styles.text}> Adults:2 , childreen:0 , infant:2 </Text>

                </View>
            }
        </Transitioning.View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontFamily: 'item',
        color: 'white',
        marginHorizontal: 5
    }
})