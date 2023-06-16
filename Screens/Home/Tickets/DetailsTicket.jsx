import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    FlatList,
    Text,
    Image,
    StatusBar,
    ScrollView
} from 'react-native'
import React from 'react'

import bg from '../../../assets/bg-dark.jpg';

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'
import DetailsCom from '../../../Components/SubScreensOfTicket/DetailsCom';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DetailsTicket({ navigation, route }) {

    const { item, type ,image } = route.params;
    const num = ["first", "second", "third", "fourth", "fifth"]

    var allprice = 0;
    if (type == "multiFlight") {
        item.map((e) => {
            allprice = allprice + e.price
        })
    }

    const Data = type == "RoundTrip" ?
        {
            image:image,
            flightNum: item.outboundFlight.flightNo,
            From: item.outboundFlight.from,
            TO: item.outboundFlight.to,
            dateGo: "6-8-2023",
            dateReturn: "8-8-2023",
            classs: item.outboundFlight.classes,
            price: item.outboundFlight.price,
            id: item.outboundFlight._id,
            id2:item.returnFlight._id,
            type:type,
            //////////////////go//////////////////////
            TimeFromStart: "08:00 AM", //item.outboundFlight.fromDate
            TimeFromEnd: "19:30 AM", //item.outboundFlight.toDate
            durationGo: "6h 0m",
            gateFrom: item.outboundFlight.gate,
            salaFrom: "5",
            bagFrom: item.outboundFlight.maxBagPerPerson,
            ///////////////////retrun//////////////////////
            TimeToStart: "18:30 AM", //item.returnFlight.toDate
            TimeToEnd: "09:00 AM", //item.returnFlight.toDate
            durationReturn: "6h 0m",
            gateTo: item.returnFlight.gate,
            salaTo: "5",
            bagTo: item.returnFlight.maxBagPerPerson,

        }
        : type == "oneway" ? {
            image: image,
            flightNum: item.flightNo,
            From: item.from,
            TO: item.to,
            DateFrom: item.fromDate,
            DateTo: item.toDate,
            duration: "6h 0m",
            date: item.date.substring(0, 9),
            gate: item.gate,
            sala: "5",
            classs: item.classes,
            bag: item.maxBagPerPerson,
            price: item.price,
            id: item._id,
            type:type,

        } : {
            image: image,
            // flightNum: item.flightNo,
            From: item[0].from,
            TO: item[0].to,
            date: "16-8-2023",//item[0].date
            gate: item[0].gate,
            sala: 5,
            flights: item,
            price: allprice,
            type:type,

        }

        console.log(Data)


    return (
        <ImageBackground
            source={bg}
            resizeMode='cover'
            style={{
                width: width,
                height: height + 50,
            }}
        >
            <StatusBar hidden={true} />

            <ScrollView style={{ marginBottom: 50 }}>

                <View style={{ marginTop: 20 }}>
                    <AirplaneData navigation={navigation} title='Ticket Detail'
                    from ={Data.From} to={Data.TO}  dateDepurture={type == "RoundTrip" ?Data.dateGo : Data.date }  dateReturn={type == "RoundTrip"?Data.dateReturn :"---"}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 15 }}>
                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 20,
                        width: width - 30,
                    }}>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5, alignItems: 'flex-start' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{
                                            uri: Data.image,
                                        }}
                                        style={{ width: 150, height: 100, resizeMode: 'stretch', margin: 10 , borderRadius:10 }}
                                    />
                                    <Text style={{ color: 'white', fontFamily: 'item' }}>Flight Number : {Data.flightNum}</Text>
                                </View>
                            </View>

                            {/* //////////////////////////////////////////////////data go flght////////////////////////////// */}

                            {type == "RoundTrip" && <View style={{ marginTop: 20 }} />}
                            {(type == "oneway" || type == "RoundTrip") &&
                                <DetailsCom
                                    title={"Forward"}
                                    from={Data.From}
                                    to={Data.TO}
                                    timestart={type == "RoundTrip" ? Data.TimeFromStart : Data.DateFrom}
                                    timeEnd ={type == "RoundTrip" ? Data.TimeFromEnd : Data.DateTo}
                                    gate={type == "RoundTrip" ? Data.gateFrom : Data.gate}
                                    class={Data.classs}
                                    date={Data.dateReturn}
                                    type={type}
                                />}
                            {type == "RoundTrip" && <View style={{
                                borderWidth: 1,
                                borderColor: 'white',
                                margin: -1,
                                width: width - 210,
                                alignSelf: 'center',
                                marginTop: 10
                            }} />
                            }

                            {/* //////////////////////////////////////////////////data go flght////////////////////////////// */}

                            {type == "RoundTrip" &&
                                <DetailsCom
                                    title={"Return"}
                                    from={Data.From}
                                    to={Data.TO}
                                    timestart={type == "RoundTrip" ? Data.TimeFromStart : Data.DateFrom}
                                    timeEnd={type == "RoundTrip" ? Data.TimeFromEnd : Data.DateTo}
                                    gate={type == "RoundTrip" ? Data.gateFrom : Data.gate}
                                    classs={Data.classs}
                                    date={Data.dateReturn}
                                    type={type}

                                />}

                            {/* //////////////////////////////////////multi destination//////////////////////////// */}

                            {type == "multiFlight" &&
                                Data.flights.map((e, i) => (
                                    <DetailsCom
                                        key={i}
                                        flightnum={e.flightNo}
                                        title={`${num[i]}`}
                                        from={e.from}
                                        to={e.to}
                                        timestart={"1:00 Am"}
                                        timeEnd={"5:00 Pm"}
                                        gate={e.gate}
                                        classs={e.classes}
                                        date={e.date == null ? "15-5-2023" : e.date.substring(0, 10)}
                                        type={type}

                                    />
                                ))
                            }
                        </View>
                    </View>

                    <View style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        margin: -1,
                        width: width - 100,
                    }} />

                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 15,
                        width: width - 35,

                    }}>
                        <View style={{ marginVertical: 10 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 5 }}>
                                <View>
                                    <View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={styles.text}>Cabin bag : </Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>{type == "multiFlight" ? item[0].maxBagPerPerson : Data.bagFrom} bag</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={styles.text}>luggages : </Text>
                                            <Text style={[styles.text, { color: 'gray' }]}>15KG</Text>
                                        </View>
                                    </View>

                                    <Text style={[styles.text, { textAlign: 'center' }]}>price :
                                        <Text style={[styles.text, { color: 'red' }]}> {Data.price}$</Text>
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 0 }}>
                                    <MainButton title='Confirm' onClick={() => {
                                        if (type == "multiFlight") {
                                            navigation.navigate('FinalBookTicket', { id: Data.id, seat: "A1", Data: Data, type: type ,image:image })

                                        } else {
                                            navigation.navigate('BookSeatScreen', { id: Data.id, Data: Data, type: type ,image:image })
                                        }
                                    }} />
                                </View>

                            </View>

                        </View>

                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'item',
        color: 'white',
        fontSize: 19
    },
    Stext: {
        fontFamily: 'item',
        color: 'white',
        fontSize: 12
    },
    containerBtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})