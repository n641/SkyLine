import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import CustomTF from '../../../Components/CustomeTextFields/CustomTF';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import HotelCard from '../../../Components/ComponentsofHotels/HotelCard';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function MapViews({ navigation, route }) {
    const { Hotels , headerData } = route.params;

    const mapJson = [

        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1b1b1b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#2c2c2c"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#373737"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3c3c3c"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#3d3d3d"
                }
            ]
        }
    ]

    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        longitude: 148.11,
        latitude: -26.85
    });
    const mapRef = useRef();

    const onRegionChange = (region) => {
        // console.log(region);
    };

    const showLocationsOfInterest = () => {
        return Hotels.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.hotelName}
                    description={item.description}
                // onPress={() => { console.log("nonononon") }}
                >
                    <Callout tooltip>
                        <View style={{
                            backgroundColor: 'rgba(24,24,24,0.5)',
                            maxWidth: 85,
                            borderRadius: 15,
                            alignItems: 'center',
                            margin: 15,
                            padding: 10
                        }}>
                            <Image
                                source={{
                                    uri: item.hotelPhoto
                                }}
                                style={{ width: 70, height: 50 }}
                            />
                            <Text style={{ fontSize: 17, fontFamily: 'item', color: 'white' }}>{item.hotelName}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="location-pin" size={20} color="red" />
                                <Text style={{ fontSize: 16, fontFamily: 'item', color: 'white' }}>{item.city}</Text>
                            </View>

                        </View>
                    </Callout>
                </Marker>
            )
        });
    };

    const takeSnapshotAndShare = async () => {
        const snapshot = await mapRef.current.takeSnapshot({ width: 300, height: 300, result: 'base64' });
        const uri = FileSystem.documentDirectory + "snapshot.png";
        await FileSystem.writeAsStringAsync(uri, snapshot, { encoding: FileSystem.EncodingType.Base64 });
        await shareAsync(uri);
    };

    const [Search, setSearch] = useState()
    const HandleSearch = (val) => {
        setSearch(val)
    }

    return (
        <View style={{ alignItems: 'center' }}>

            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={styles.map}
                customMapStyle={mapJson}
                onRegionChange={onRegionChange}
                initialRegion={{
                    latitude: 15.2,
                    latitudeDelta: 30.2,
                    longitude: 32.2,
                    longitudeDelta: 35.2,
                }}
            >
                {showLocationsOfInterest()}
                <Marker
                    draggable
                    pinColor='orang'
                    coordinate={draggableMarkerCoord}
                    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                />

                {/* <Marker
                    pinColor='orang'
                    coordinate={{ latitude: -30, longitude: 147 }}
                >
                    <Callout>
                        <Text>Count: {count}</Text>
                        <Button title='Increment Count' onPress={() => setCount(count + 1)} />
                    </Callout>
                </Marker> */}

                {/* <Text style={styles.mapOverlay}>Longitude: {draggableMarkerCoord.longitude}, latitude: {draggableMarkerCoord.latitude}</Text> */}
            </MapView>



            <View style={{ position: 'absolute' }}>

                <View style={{ position: 'absolute', top: height - 310 }}>
                    <FlatList
                        data={Hotels}
                        horizontal
                        renderItem={({ item }) => (
                            <HotelCard
                                id={item._id}
                                mainImg={item.hotelPhoto}
                                title={item.hotelName}
                                description={item.description}
                                location={item.city}
                                price={item.price}
                                rate={item.ratingsAverage}
                                navigation={navigation}
                                headerData={headerData}
                            />
                        )}
                        bounces={false}
                        stickyHeaderHiddenOnScroll={false}
                        keyExtractor={item => item.id}
                    />
                    <Button title='Take Snapshot and Share' onPress={takeSnapshotAndShare} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20 }}>
                    <AntDesign name="arrowleft" size={35} color="white" style={{ marginTop: 30 }} onPress={() => {
                        navigation.goBack()
                    }} />
                    <CustomTF placeholder="Enter name of Hotel" keyboardType="email-address" width={(width - 80)} required={false} onAddText={HandleSearch} text={Search} white={true} />
                </View>
                <Text style={{ color: 'black', fontSize: 25 }}>ddd</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
    mapOverlay: {
        position: "absolute",
        bottom: 50,
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 5,
        padding: 16,
        left: "25%",
        width: "50%",
        textAlign: "center"
    }
})