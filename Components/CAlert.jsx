import { View, Text , useWindowDimensions , StyleSheet , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import CustomeAnimated from './CustomeAnimated'

const CAlert = ({ visible, icon ,onClick , title }) => {
    const { width } = useWindowDimensions()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 500, top: width / 2 }}>
            <CustomeAnimated visible={visible}>
                <View style={{ alignItems: 'center' }}>
                    {/*  */}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{ height: 70, width: 70, marginVertical: 5 }}
                    />
                </View>

                <Text style={{ marginVertical: 15, fontSize: 20, textAlign: 'center' }}>
                    {title}
                </Text>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClick}>
                        <Image
                            source={require('../assets/ok.png')}
                            style={{ height: 50, width: 120 }}
                        />
                    </TouchableOpacity>
                </View>
            </CustomeAnimated>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})

export default CAlert