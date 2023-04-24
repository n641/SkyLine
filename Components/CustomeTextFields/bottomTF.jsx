import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import React from 'react'

import Colors from '../../Conestant/Colors'
import { MaterialIcons } from '@expo/vector-icons';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function BottomTF({location, HandleLocation,icon,label}) {
    return (
        <View>
            <View style={styles.cardinput}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.astrisk}>*</Text>
            </View>
            <View style={styles.inputcontaner}>
                <TextInput
                    style={[{
                        width: width - 130,
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 25,
                        margin: 10,

                    }]}
                    onChangeText={HandleLocation}
                    value={location}
                    placeholder='Enter your location'
                    placeholderTextColor={'gray'}
                />
                {icon === "location" ?
                    <MaterialIcons name="my-location" size={24} color="white" />
                    : null
                 } 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'item',
        fontSize: 25,
        color: "white",
        textAlign: 'left',
        marginLeft:-5
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
    cardinput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 10,
        marginBottom: -10,
    },
    inputcontaner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 5,
        width: width - 90,
    }
})