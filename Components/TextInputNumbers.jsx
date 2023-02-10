import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'

import MainButton from './MainButton'
import Link from './Link'

export default function TextInputNumbers({ navigation }) {
    const [number1, setnumber1] = useState(0)
    const [number2, setnumber2] = useState(0)
    const [number3, setnumber3] = useState(0)
    const [number4, setnumber4] = useState(0)

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4=useRef();


    const HandleNavigate = (name) => {
        navigation.navigate(name)
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <TextInput
                    style={styles.input}
                    value={number1}
                    maxLength={1}
                    autoFocus={true}
                    onChangeText={(num) =>{ 
                        setnumber1(num)
                        ref_input2.current.focus()
                    }}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    value={number2}
                    maxLength={1}
                    onChangeText={(num) =>{ 
                        setnumber2(num)
                        ref_input3.current.focus()
                    }}
                    ref={ref_input2}
                    keyboardType='numeric'

                />
                <TextInput
                    style={styles.input}
                    value={number3}
                    maxLength={1}
                    onChangeText={(num) =>{ 
                        setnumber3(num)
                        ref_input4.current.focus()
                    }}
                    ref={ref_input3}
                    keyboardType='numeric'

                />
                <TextInput
                    style={styles.input}
                    value={number4}
                    maxLength={1}
                    ref={ref_input4}
                    onChangeText={(num) =>{ 
                        setnumber4(num)
                        // Button Action
                    }}
                    keyboardType='numeric'
                />
            </View>
            <MainButton title="Comfirm" onClick={() => { }}  />
            <View>
                <Link title='Resend?' textSize={20} onpress={() => { HandleNavigate('Signup') }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        color: 'white',
        borderColor: "white",
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "item",
        justifyContent:'center',
        alignItems:'center'
    },
})