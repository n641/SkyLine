import { StyleSheet, Text, View, TextInput, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'

import Colors from '../Conestant/Colors';
import { Entypo } from '@expo/vector-icons';


export default function CustomTF({ placeholder, keyboardType, type, label, required, width , icon }) {
    const [text, onChangeText] = useState(type);
    const [click, setclick] = useState(true);

    const HandleOnpress =()=>{
        setclick(!click)
    }
    return (
        <View style={{ margin: 10, justifyContent: 'center', height: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>{label}</Text>
                {required ? <Text style={styles.astrisk}>*</Text> : null}
            </View>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, { width: width }]}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.Hint_text_field}
                    keyboardType='default'
                    secureTextEntry={!click}
                />
              {icon?<Entypo name={click?"eye":"eye-with-line"} size={24} color="white" onPress={()=>{HandleOnpress()}}/>:null}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 5,
        borderColor: "white",
        borderRadius: 7,
        alignItems: 'center',
        flexDirection:'row'
    },
    input: {
        minHeight: 40,
        fontSize: 18,
        fontFamily: "item",
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    label: {
        fontFamily: 'item',
        fontSize: 20,
        color: "white",
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    }
})