import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import CardImage from '../cardImage';

const CardArtist = props => {
  return (
    <View>
      <CardImage />
      <Text>Anwar SAnusi</Text>
    </View>
  );
};

export default CardArtist;

const styles = StyleSheet.create({});
