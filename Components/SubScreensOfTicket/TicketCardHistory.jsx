import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';

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


export default function TicketCardHistory({ Tickets }) {

    const [currentIndex, setCurrentIndex] = React.useState(null);
    const ref = React.useRef();

    const FlatList_Header = () => {
        return (
            <View >
                <Text style={styles.header}>Booked Tickets</Text>
            </View>
        );
    }

    const renderItem = ({ item, index }) => {
        return (
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={styles.container}
            >
                <View style={{ backgroundColor: 'rgba(24,24,24,0.8)', flexGrow: 1, borderRadius: 10, }}>

                    <TouchableOpacity onPress={() => {
                        ref.current.animateNextTransition();
                        setCurrentIndex(index === currentIndex ? null : index);
                    }}
                        style={styles.cardContainer}
                        activeOpacity={0.9}>

                        <View style={styles.constainerofHeadercard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{
                                        uri: "https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png",
                                    }}
                                    style={{ width: 50, height: 40, resizeMode: 'contain', marginHorizontal: 5 }}
                                />
                                <Text style={[styles.title, { marginLeft: 5 }]}>{item.flightNo}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={[styles.title]}>
                                    price: <Text style={[styles.title, { color: 'red' }]}>{item.price}</Text>$
                                </Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                            <View>

                                <Text style={[styles.title, { color: 'gray' }]}>
                                    from:  <Text style={[styles.title, { color: 'white' }]}>{item.from}</Text>
                                </Text>

                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.title, { color: 'gray' }]}>
                                        Departure
                                    </Text>
                                    <Text style={[styles.title, { color: 'white' }]}>{item.date.substring(0, 10)}</Text>
                                </View>
                            </View>
                            <Ionicons name="airplane" size={28} color="white" />

                            <View>
                                <Text style={[styles.title, { color: 'gray' }]}>
                                    to:  <Text style={[styles.title, { color: 'white' }]}>{item.to}</Text>
                                </Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.title, { color: 'gray' }]}>
                                        return
                                    </Text>
                                    <Text style={[styles.title, { color: 'white' }]}>{item.returndatee ? item.datee.substring(0, 12) : "--"}</Text>
                                </View>
                            </View>

                        </View>

                        {index === currentIndex &&
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 5, width: width / 1.2 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.title, { color: 'gray' }]}>Gate</Text>
                                            <Text style={[styles.title]}>{item.gate}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.title, , { color: 'gray' }]}>Seat</Text>
                                            <Text style={[styles.title]}>{item.Seats}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.title, { color: 'gray' }]}>Class</Text>
                                            <Text style={[styles.title]}>{item.classes}</Text>
                                        </View>
                                    </View>



                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: item.payment == "success" ? 'green' : 'red', borderRadius: 5, padding: 2 }}>
                                    <Text style={[styles.title]}>
                                        <Text style={[styles.title, { color: 'white', fontSize: 15 }]}>{item.payment == "success" ? " success Pay" : "NotPay"}</Text>
                                    </Text>
                                </View>
                            </View>

                        }

                    </TouchableOpacity>

                </View >

            </Transitioning.View >
        );
    }

    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
        >
            <FlatList
                data={Tickets}
                renderItem={renderItem}
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