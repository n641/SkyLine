import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

import { Entypo } from '@expo/vector-icons';

import mapmark from '../../../assets/map-mark.png'
import MainButton from '../../../Components/MainButton'
import RateCard from '../../../Components/ComponentsofHotels/RateCard';

import HotelCard from '../../../Components/ComponentsofHotels/HotelCard';
export default function MapViews({ navigation }) {
    const [Hotels, setHotels] = useState([
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            title: 'IceLand',
            description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
            location: "Ne'ma bay",
            price: 250,
            rate: 4.5,
            id: 2,
            locations: {
                latitude: 30.2,
                longitude: 31.28
            },

        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            title: 'IceLand',
            description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
            location: "Ne'ma bay",
            price: 250,
            rate: 2.5,
            id: 3,
            locations: {
                latitude: 30.2,
                longitude: 32
            },

        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            title: 'IceLand',
            description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
            location: "Ne'ma bay",
            price: 250,
            rate: 4.5,
            id: 4,
            locations: {
                latitude: -27.2,
                longitude: 145
            },

        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            title: 'IceLand',
            description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
            location: "Ne'ma bay",
            price: 250,
            rate: 4.5,
            id: 5,
            locations: {
                latitude: 30.2,
                longitude: 35
            },

        },
        {
            mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            title: 'IceLand',
            description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
            location: "Ne'ma bay",
            price: 250,
            rate: 4.5,
            id: 1,
            locations: {
                latitude: 32.2,
                longitude: 32
            },
        },
    ])
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

    const [count, setCount] = useState(0);
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
                    coordinate={item.locations}
                    title={item.title}
                    description={item.description}
                    onPress={() => { console.log("nonononon") }}
                // image={mapmark}
                // style={{width:10,height:10}}

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
                                    uri: item.mainImg
                                }}
                                style={{ width: 70, height: 50 }}
                            />
                            <Text style={{ fontSize: 17, fontFamily: 'item', color: 'white' }}>{item.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="location-pin" size={20} color="red" />
                                <Text style={{ fontSize: 16, fontFamily: 'item', color: 'white' }}>{item.location}</Text>
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

    return (
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
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
                {/* <Marker
                    draggable
                    pinColor='orang'
                    coordinate={draggableMarkerCoord}
                    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                /> */}

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

            <View style={{ position: 'absolute', }}>
                <FlatList
                    data={Hotels}
                    horizontal
                    renderItem={({ item }) => (
                        <HotelCard
                            mainImg={item.mainImg}
                            title={item.title}
                            description={item.description}
                            location={item.location}
                            price={item.price}
                            rate={item.rate}
                            navigation={navigation}
                        />
                    )}
                    bounces={false}
                    stickyHeaderHiddenOnScroll={false}
                    keyExtractor={item => item.id}
                />
                <Button title='Take Snapshot and Share' onPress={takeSnapshotAndShare} />
            </View>

            <StatusBar style="dark" />
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