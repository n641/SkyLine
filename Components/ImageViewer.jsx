import { StyleSheet, Image, Dimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ImageViewer({ placeholderImageSource, selectedImage, HideEditicon, local }) {
  
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  let encoded = encodeURI(placeholderImageSource);
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : 
    validURL(encoded) ? { uri: encoded }   :
     placeholderImageSource 
     
  return (
    <View>
      {local ? 
      <Image source={
        imageSource
      }
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