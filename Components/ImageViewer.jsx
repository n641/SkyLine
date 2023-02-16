import { StyleSheet, Image, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;
  return (
    <View>
      <Image source={imageSource} style={styles.image} resizeMode={'contain'} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width/2.8 ,
    height: 120,
    borderRadius: 8,
    margin:5
  },
});