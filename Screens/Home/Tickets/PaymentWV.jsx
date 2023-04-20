import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from "react-native";

import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function PaymentWV({ navigation, route }) {

    const { Directurl } = route.params;

    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')

    const webviewRef = useRef(null)

    const backButtonHandler = () => {
        navigation.navigate('HistoryOfTickets')
    }
    const frontButtonHandler = () => {
        // if (webviewRef.current) webviewRef.current.goForward()
        navigation.navigate('Home')

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                ref={webviewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack)
                    setCanGoForward(navState.canGoForward)
                    setCurrentUrl(navState.url)
                }}
                source={{ uri: Directurl }}
            />

            <View style={styles.tabBarContainer}>
                {/* <TouchableOpacity style={styles.btn1} onPress={backButtonHandler}>
                    <Text style={styles.button}>Back</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.btn1} onPress={frontButtonHandler}>
                    <AntDesign name="home" size={24} color="white" />
                    <Text style={styles.button}>Home</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    tabBarContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'absolute',
        top: height - 67,
        margin: 10
    },
    button: {
        color: 'white',
        fontSize: 18
    },
    btn1: {
        flexDirection: 'row',
        backgroundColor: '#355b8d',
        padding: 10,
        borderRadius: 15,
        justifyContent:'space-around',
        width:130

    }
})