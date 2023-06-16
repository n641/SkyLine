import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import CardHistoryStyle from './CardHistoryStyle'
import tic from '../../assets/ticketbg.png'

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Transition, Transitioning, color } from 'react-native-reanimated';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);


export default function TicketCardHistory({ Tickets, navigation }) {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const HandlecurrentIndex = (val) => {
        setCurrentIndex(val)
    }
    const ref = React.useRef();

    const FlatList_Header = () => {
        return (
            <View >
                <Text style={styles.header}>Booked Tickets</Text>
            </View>
        );
    }

    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
        >
            <FlatList
                data={Tickets}
                renderItem={({ item, index }) =>
                    <CardHistoryStyle
                        navigation={navigation}
                        item={item}
                        index={index}
                        currentIndex={currentIndex}
                        HandlecurrentIndex={HandlecurrentIndex}
                        reff={ref}
                    />
                }
                keyExtractor={item => item._id}
                ListHeaderComponent={FlatList_Header}
            />
        </Transitioning.View>
    )
}

const styles = StyleSheet.create({
    constainerofHeadercard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        margin: 5
    },
    header: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontFamily: 'item'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    cardContainer: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 38,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
    },
    body: {
        fontSize: 20,
        lineHeight: 20 * 1.5,
        textAlign: 'center',
    },
    subCategoriesList: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'item',
        fontSize: 17,
        color: 'white'
    }
})