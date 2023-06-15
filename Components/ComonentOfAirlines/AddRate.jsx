import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AddRate({ handleRate, Rate }) {
    const [DefaultRate, setDefaultRate] = useState(1)
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])
    const starFilled = <AntDesign name="star" size={30} color="yellow" />
    const Starconer = <AntDesign name="staro" size={30} color="yellow" />


    const Customeraet = () => {
        return (
            <View style={styles.customeRatingBar}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => {
                                    setDefaultRate(item)
                                    handleRate(item)
                                }}

                            >
                                {
                                    item <= DefaultRate ?
                                        starFilled : Starconer
                                }
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
        )
    }
    return (
        <View>
            <Text style={styles.textStyle}>AddRate</Text>
            <Customeraet />
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23, 
        color: 'white',
        margin:10
    },
    customeRatingBar: {
        justifyContent: 'center',
        flexDirection: 'row',
    }
})