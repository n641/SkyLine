import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../Api/axios';

import ImageViewer from '../ImageViewer';
import Colors from '../../Conestant/Colors';

import defaultImg from '../../assets/UploadImg.png'


const { width, height } = Dimensions.get('window');

export default function UploadImgTF({ placeholder, label, required, selectedImage, setSelectedImage, HideEditicon, id }) {

    const PlaceholderImage = defaultImg
    const auth = useSelector(state => state.Auth.token);


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 2],
            quality: 1,
        });

        var url = ''
        if (id == "front") {
            url = 'https://skyline-backend.cyclic.app/api/v1/users/uploadIDFront'
        } else if (id == "back") {
            url = 'https://skyline-backend.cyclic.app/api/v1/users/uploadIDBack'

        }

        const uploadPhoto = async (result) => {

            let localUri = result.assets[0].uri;
            let formData = new FormData();
            formData.append('image', {
                uri: localUri,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            });

            const respoce = await axios.patch(url, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${auth}` },
                    withCredentials: true

                }
            ).catch(err => {
                console.log(err);
            });
        }

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            if (id == "front" || id == "back") {
                uploadPhoto(result)
            }
        } else {
            alert("You did not select any image.");
        }
    };



    return (
        <View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.label}>{label}</Text>
                {required ? <Text style={styles.astrisk}>*</Text> : null}
            </View>

            <View style={styles.ContainerImg}>
                <TouchableOpacity onPress={() => { pickImageAsync() }}>
                    <ImageViewer placeholderImageSource={placeholder ? placeholder : PlaceholderImage} selectedImage={selectedImage} HideEditicon={HideEditicon} />
                </TouchableOpacity>
                <Text style={styles.uploadText}>Upload Img</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'item',
        fontSize: 20,
        color: "white",
        textAlign: 'left',
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
    uploadText: {
        fontFamily: 'item',
        color: 'white',
        fontSize: 20
    },
    ContainerImg: {
        alignItems: 'center',
        marginTop: 10,
        // borderColor: 'white',
        // borderWidth: 1,
        borderStyle: 'dashed',
        width: width / 2.2,
        justifyContent: 'center'
    }

})