import { StyleSheet, Text, View, TextInput, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'

import Colors from '../../Conestant/Colors';
import { Entypo } from '@expo/vector-icons';


export default function CustomTF({ placeholder, keyboardType, label, required, width , icon , onAddText , text , onPressIn , onPressOut }) {
    const [click, setclick] = useState(true);

    const HandleOnpress =()=>{
        setclick(!click)
    }

    return (
        <View style={{ justifyContent: 'center',marginHorizontal:15}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>{label}</Text>
                {required ? <Text style={styles.astrisk}>*</Text> : null}
            </View>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, { width: width }]}
                    onChangeText={onAddText}
                    value={text}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.Hint_text_field}
                    keyboardType={keyboardType}
                    secureTextEntry={!click}
                    onPressIn={onPressIn}
                    onEndEditing={onPressOut}
                />
              {icon?<Entypo name={!click?"eye-with-line":"eye"} size={24} color="white" onPress={()=>{HandleOnpress()}}/>:null}

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
        justifyContent: 'flex-end',
        color:"white"
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