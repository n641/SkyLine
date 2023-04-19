import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native'
import React, { useState, useEffect } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import bg from '../../../assets/bg-dark.jpg';

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function BookSeatScreen({ navigation, route }) {

    const { id } = route.params;
    // console.log(id)

    let SelectedSeats = [];

    const [Row1, setRow1] = useState([  //right side
        // { id: 'A1', empty: true, selected: false },
        // { id: 'B1', empty: false, selected: false },
        // { id: 'A2', empty: true, selected: false },
        // { id: 'B2', empty: true, selected: false },
        // { id: 'A3', empty: true, selected: false },
        // { id: 'B3', empty: false, selected: false },
        // { id: 'A2', empty: true, selected: false },
        // { id: 'B4', empty: true, selected: false },
        // { id: 'A5', empty: false, selected: true },
        // { id: 'B5', empty: true, selected: false },
        // { id: 'A6', empty: true, selected: false },
        // { id: 'B6', empty: false, selected: true },

    ])

    const [Row2, setRow2] = useState([ //left side
        // { id: 'C1', empty: false, selected: false },
        // { id: 'D1', empty: true, selected: false },
        // { id: 'E1', empty: false, selected: false },
        // { id: 'C2', empty: false, selected: true },
        // { id: 'D2', empty: true, selected: false },
        // { id: 'E2', empty: false, selected: false },
        // { id: 'C3', empty: true, selected: false },
        // { id: 'A2', empty: true, selected: false },
        // { id: 'E3', empty: true, selected: false },
        // { id: 'C4', empty: true, selected: false },
        // { id: 'D4', empty: false, selected: false },
        // { id: 'E4', empty: true, selected: false },
        // { id: 'A2', empty: true, selected: false },
        // { id: 'D5', empty: true, selected: false },
        // { id: 'E5', empty: true, selected: false },
        // { id: 'C6', empty: true, selected: false },
        // { id: 'D6', empty: false, selected: true },
        // { id: 'E6', empty: true, selected: false },
    ])


    const onSelectedRow1 = index => {
        let tempRow = [];
        tempRow = Row1;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true
                } else {
                    item.selected = true;
                    item.empty = false
                }
            }
        });

        let tempSeats = [];

        tempRow.map(item => {
            tempSeats.push(item);
        })
        setRow1(tempSeats)
    }

    const onSelectedRow2 = index => {
        let tempRow = [];
        tempRow = Row2;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true
                } else {
                    item.selected = true;
                    item.empty = false
                }
            }
        });

        let tempSeats = [];

        tempRow.map(item => {
            tempSeats.push(item);
        })
        setRow2(tempSeats)
    }

    const getSelectedSeats = () => {
        SelectedSeats = [];
        Row1.map(item => {
            if (item.selected == true) {
                SelectedSeats.push(item.id)
            }
        })
        Row2.map(item => {
            if (item.selected == true) {
                SelectedSeats.push(item.id)
            }
        })

        return SelectedSeats

    }
    getSelectedSeats()
    // console.log(...SelectedSeats)


    // ////////////////////////////////////////////////
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/flights/${id}`);
        const data = await resp.json();
        // setTickets(data.data);
        if (data.data.length != 0) {
            setLoading(false);
        }

        // console.log(data)

        setRow1(data.data.data.Seats.Row1)
        setRow2(data.data.data.Seats.Row2)
    };

    useEffect(() => {
        fetchData();
    }, []);
    // ///////////////////////////////////////////////

    return (
        <ImageBackground
            source={bg}
            resizeMode='cover'
            style={{
                width: width,
                height: height + 50,
            }}
        >
            {loading &&
                <View style={{
                    width: width,
                    height: height,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color={'#00ff00'} />
                </View>
            }

            <View>
                <View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                        <View style={{ marginTop: 20 }}>
                            <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
                                navigation.goBack()
                            }} />
                        </View>
                        <View style={{
                            alignItems: 'center',
                            marginTop: height / 11,
                            marginStart: width / 5.5,

                        }}>
                            <Text style={[styles.title, { textAlign: 'center' }]}>Choose Seat</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* //////////////////////////////////////////////////////////////////////////// */}

            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }} >

                <View style={styles.plane} >

                    <View style={styles.planeplaner} >
                        <Image
                            source={{
                                uri: 'https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png',
                            }}
                            style={{ width: width, height: height / 8.5, resizeMode: 'contain' }}
                        />
                        <Text style={styles.text}> 11 avalible seats</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                            <View style={{ borderColor: 'white', borderWidth: 2, width: 25, height: 25, borderRadius: 4, backgroundColor: 'white' }} />
                            <Text style={styles.Dtext}>avalible</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 2 }}>
                            <View style={{ borderColor: 'gray', borderWidth: 2, width: 25, height: 25, borderRadius: 4, backgroundColor: 'gray' }} />
                            <Text style={styles.Dtext}>not available</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                            <View style={{ borderColor: '#00A7CC', borderWidth: 2, width: 25, height: 25, borderRadius: 4, backgroundColor: '#00A7CC' }} />
                            <Text style={styles.Dtext}>reserved</Text>
                        </View>

                    </View>

                    {/* //////////////////////////////////////////////////////////////////////// */}

                    <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <Text style={[styles.Dtext, { marginHorizontal: 15, fontSize: 20, fontWeight: 'bold' }]}>A</Text>
                        <Text style={[styles.Dtext, { marginHorizontal: 15, fontSize: 20, fontWeight: 'bold' }]}>B</Text>
                        <Text style={[styles.Dtext, { marginHorizontal: 18, fontSize: 20 }]}> </Text>
                        <Text style={[styles.Dtext, { marginHorizontal: 15, fontSize: 20, fontWeight: 'bold' }]}>C</Text>
                        <Text style={[styles.Dtext, { marginHorizontal: 15, fontSize: 20, fontWeight: 'bold' }]}>D</Text>
                        <Text style={[styles.Dtext, { marginHorizontal: 15, fontSize: 20, fontWeight: 'bold' }]}>E</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <FlatList
                                data={Row1}
                                numColumns={2}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            if (item.selected == false && item.empty == false) {
                                                alert('already booked')
                                            } else {
                                                onSelectedRow1(index)
                                            }
                                        }}>
                                            {item.empty == false && item.selected == true ?
                                                (
                                                    <View style={{ marginHorizontal: 5, margin: 5 }}>
                                                        <MaterialIcons name="event-seat" size={30} color="#00A7CC" />
                                                    </View>
                                                ) : item.empty == true && item.selected == false ?
                                                    (
                                                        <View style={{ marginHorizontal: 5, margin: 5 }}>

                                                            <MaterialIcons name="event-seat" size={30} color="white" />
                                                        </View>

                                                    ) : item.empty == false && item.selected == false ?
                                                        (
                                                            <View style={{ marginHorizontal: 5, margin: 5 }}>

                                                                <MaterialIcons name="event-seat" size={30} color="gray" />
                                                            </View>

                                                        ) : null
                                            }
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                        <View style={{ marginHorizontal: 20, justifyContent: 'space-around' }}>
                            <Text style={[styles.Dtext, { marginVertical: 7, fontSize: 20 }]}>1</Text>
                            <Text style={[styles.Dtext, { marginVertical: 7, fontSize: 20, fontWeight: 'bold' }]}>2</Text>
                            <Text style={[styles.Dtext, { marginVertical: 7, fontSize: 20, fontWeight: 'bold' }]}>3</Text>
                            <Text style={[styles.Dtext, { marginVertical: 7, fontSize: 20, fontWeight: 'bold' }]}>4</Text>
                            <Text style={[styles.Dtext, { marginVertical: 7, fontSize: 20, fontWeight: 'bold' }]}>5</Text>
                            <Text style={[styles.Dtext, { marginVertical: 7, fontSize: 20, fontWeight: 'bold' }]}>6</Text>
                        </View>

                        {/* ///////////left */}
                        <View>
                            <FlatList
                                data={Row2}
                                numColumns={3}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            if (item.selected == false && item.empty == false) {
                                                alert('already booked')
                                            } else {
                                                onSelectedRow2(index)
                                            }
                                        }}>
                                            {item.empty == false && item.selected == true ?
                                                (
                                                    <View style={{ marginHorizontal: 5, margin: 5 }}>
                                                        <MaterialIcons name="event-seat" size={30} color="#00A7CC" />
                                                    </View>
                                                ) : item.empty == true && item.selected == false ?
                                                    (
                                                        <View style={{ marginHorizontal: 5, margin: 5 }}>

                                                            <MaterialIcons name="event-seat" size={30} color="white" />
                                                        </View>

                                                    ) : item.empty == false && item.selected == false ?
                                                        (
                                                            <View style={{ marginHorizontal: 5, margin: 5 }}>

                                                                <MaterialIcons name="event-seat" size={30} color="gray" />
                                                            </View>

                                                        ) : null
                                            }
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                    </View>

                </View>

            </View>


            {/* </ScrollView> */}

            <View style={{
                backgroundColor: 'black',
                width: width,
                height: height,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <View>
                        <Text style={[styles.Dtext, { marginTop: 5, fontSize: 25 }]}>Selected Seat</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {SelectedSeats.map((item, i) => {
                                return (
                                    <Text key={i} style={[styles.Dtext]}>{item} , </Text>
                                )
                            })}
                        </View>

                    </View>
                    <MainButton title='Done' onClick={() => {
                        navigation.navigate('FinalBookTicket',{id:id})
                    }} />
                </View>
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'item',
        color: "white",
        fontSize: 30,

    },
    plane: {
        backgroundColor: 'rgba(24,24,24,0.8)',
        borderRadius: 10,
        width: width - 60,
        height: height / 1.4,
        borderTopRightRadius: 500,
        borderTopLeftRadius: 500,
        borderCurve: 'continuous',
        alignItems: 'center',
        margin: 5
    },
    planeplaner: {
        backgroundColor: 'gray',
        borderRadius: 30,
        width: width - 150,
        height: height / 5.5,
        borderTopRightRadius: 150,
        borderTopLeftRadius: 150,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'item',
        fontSize: 20,
        marginTop: 10
    },
    Dtext: {
        fontFamily: 'item',
        fontSize: 18,
        color: 'white',
    }

})