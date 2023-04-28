import { StyleSheet, Image, Dimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ImageViewer({ placeholderImageSource, selectedImage, HideEditicon, local }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;
    let encoded = encodeURI(placeholderImageSource);
  return (
    <View>
      {local ? 
      <Image source={{
        uri: encoded
      }}
         style={styles.image} resizeMode={'cover'} />
       : 
         <Image source={imageSource} style={styles.image} resizeMode={'cover'} /> 
       }
      {HideEditicon && <View>
        <MaterialCommunityIcons name="book-edit" size={30} color="white" style={{ backgroundColor: 'black', borderRadius: 5, position: 'absolute', top: -35, left: 10 }} />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5
  },
});