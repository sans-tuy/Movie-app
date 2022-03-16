import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import CardImage from '../cardImage';

const CardArtist = props => {
  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
          }}
        />
      </View>
      <Text style={styles.text}>Anwar Sanusi</Text>
    </View>
  );
};

export default CardArtist;

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: undefined,
    resizeMode: 'stretch',
    flex: 1,
    borderRadius: 10,
  },
  imageWrapper: {
    width: 110,
    height: 160,
    marginTop: 10,
    elevation: 5,
    shadowColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
