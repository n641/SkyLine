import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import ImageViewer from '../ImageViewer';
import RateCard from '../ComponentsofHotels/RateCard'




export default function CardOfAirline({ navigation, item }) {
    const Data = {
        id: item._id,
        backGroundImage: "https://cdn.vox-cdn.com/thumbor/qQsnFfJ1-P1LDZChtOdWCjFzJxY=/0x0:2700x1800/1200x800/filters:focal(635x773:1067x1205)/cdn.vox-cdn.com/uploads/chorus_image/image/71932492/SFD_rendering.0.jpg",
        airplaneName: item.airplaneName,
        airplaneCompanyPhoto: item.airplaneCompanyPhoto,
        rate: 3,
        flights: item.flights,
        comments: [{  
            id: "63e3bb71d0a261ffd47544bf",
            rate: 3,
            comment: "this very good airbort",
            date:"03-5-2023"
        }, {
            id: "6468e0e8d59e276db835499d",
            rate: 4.5,
            comment: "this very good airbort",
            date:"03-5-2023"
        },
        {
            id: "63e3bb71d0a261ffd47544bf",
            rate: 5,
            comment: "this very good airbort",
            date:"03-5-2023"
        }
    ]
        ,description:item.description

    }

    return (
        <TouchableOpacity style={styles.card}
            onPress={() => { navigation.navigate("DetialsCompany", { Data: Data }) }}
        >
            <View style={styles.container}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: Data.airplaneCompanyPhoto,
                    }}
                />
                <View>
                    <Text style={styles.Headtitle}>{Data.airplaneName}</Text>
                    <View style={{ margin: 10 }}>
                        <RateCard rate={Data?.rate} />
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        padding: 10,
        marginVertical: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }, Headtitle: {
        fontSize: 18,
        fontFamily: 'item',
        textAlign: 'center',
        color: 'white'
    },
    tinyLogo:
    {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginRight: 10
    }

})