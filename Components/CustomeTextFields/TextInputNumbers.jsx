import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'

import MainButton from '../MainButton'
import Link from '../Link'

export default function TextInputNumbers({ navigation, HandleResend, HandleDone , Loading }) {
    const [number1, setnumber1] = useState(0)
    const [number2, setnumber2] = useState(0)
    const [number3, setnumber3] = useState(0)
    const [number4, setnumber4] = useState(0)
    const [number5, setnumber5] = useState(0)
    const [number6, setnumber6] = useState(0)

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();


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
                    onChangeText={(num) => {
                        setnumber1(num)
                        ref_input2.current.focus()
                    }}
                    keyboardType='numeric'
                />

                <TextInput
                    style={styles.input}
                    value={number2}
                    maxLength={1}
                    onChangeText={(num) => {
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
                    onChangeText={(num) => {
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
                    onChangeText={(num) => {
                        setnumber4(num)
                        ref_input5.current.focus()
                    }}
                    ref={ref_input4}
                    keyboardType='numeric'

                />

                <TextInput
                    style={styles.input}
                    value={number5}
                    maxLength={1}
                    onChangeText={(num) => {
                        setnumber5(num)
                        ref_input6.current.focus()
                    }}
                    ref={ref_input5}
                    keyboardType='numeric'

                />

                <TextInput
                    style={styles.input}
                    value={number6}
                    maxLength={1}
                    ref={ref_input6}
                    onChangeText={(num) => {
                        setnumber6(num)
                    }}
                    keyboardType='numeric'
                />
            </View>
            <MainButton loading={Loading} title="Comfirm" onClick={() => { 
                let code = ''+number1+number2+number3+number4+number5+number6
                HandleDone(code) }} />
            <View>
                <Link title='Resend?' textSize={20} onpress={() => { HandleResend() }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        color: 'white',
        borderColor: "white",
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "item",
        justifyContent: 'center',
        alignItems: 'center'
    },
})