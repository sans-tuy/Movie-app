import React, {useState} from 'react';
import * as RootNavigation from '../../config/RootNavigation';
import {View, Image, StyleSheet} from 'react-native';

const Star = () => {
  return (
    <View style={{flexDirection: 'row', marginTop: 15}}>
      <Image
        style={styles.star}
        source={require('../../assets/icon/star2.png')}
      />
      <Image
        style={styles.star}
        source={require('../../assets/icon/star2.png')}
      />
      <Image
        style={styles.star}
        source={require('../../assets/icon/star2.png')}
      />
      <Image
        style={styles.star}
        source={require('../../assets/icon/star2.png')}
      />
      <Image
        style={styles.star}
        source={require('../../assets/icon/star1.png')}
      />
    </View>
  );
};

export default Star;

const styles = StyleSheet.create({
  star: {
    width: 20,
    height: 20,
  },
});
