import React, {useState} from 'react';
import * as RootNavigation from '../../config/RootNavigation';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const Genres = props => {
  return (
    <View style={styles.genre}>
      <Text style={styles.genreText}>{props.genre} </Text>
    </View>
  );
};

export default Genres;

const styles = StyleSheet.create({
  genre: {
    backgroundColor: 'grey',
    marginRight: '4%',
    padding: '1%',
    borderRadius: 5,
  },
  genreText: {
    color: 'white',
  },
});
