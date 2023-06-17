import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'

import React from 'react'
import CardHistoryHotelStyle from './CardHistoryHotelStyle';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CarcHistoryHotel({ Hotels, navigation }) {
    const FlatList_Header = () => {
        return (
            <View >
                <Text style={styles.header}>Booked Hotels</Text>
            </View>
        );
    }
    return (
        <View>
            <FlatList
                data={Hotels}
                renderItem={({ item, index }) =>
                    <CardHistoryHotelStyle
                        navigation={navigation}
                        item={item}
                        index={index}
                    />
                }
                // keyExtractor={item => item._id}
                ListHeaderComponent={FlatList_Header}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontFamily: 'item'
    },
})