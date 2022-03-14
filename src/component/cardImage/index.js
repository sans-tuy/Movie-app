import {StyleSheet, Image, View, ScrollView} from 'react-native';
import React from 'react';

const CardImage = props => {
  return (
    <View style={styles.imageWrapper}>
      <Image style={styles.image} source={{uri: props.link}} />
    </View>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: undefined,
    resizeMode: 'stretch',
    flex: 1,
    borderRadius: 10,
  },
  imageWrapper: {
    width: 160,
    height: 180,
    marginRight: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: 'red',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
});
