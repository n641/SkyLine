import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from "react-native";

import { WebView } from 'react-native-webview';

export default function PaymentWV({ navigation, route }) {

    const { Directurl } = route.params;

    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')

    const webviewRef = useRef(null)

    const backButtonHandler = () => {
        navigation.navigate('Home')
    }
    const frontButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goForward()
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
                <TouchableOpacity onPress={backButtonHandler}>
                    <Text style={styles.button}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={frontButtonHandler}>
                    <Text style={styles.button}>Forward</Text>
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
        justifyContent: 'space-around',
        backgroundColor: '#355b8d'
    },
    button: {
        color: 'white',
        fontSize: 24
    }
})