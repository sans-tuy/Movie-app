import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import * as RootNavigation from '../../config/RootNavigation';

const OnSplash = () => {
  useEffect(() => {
    setTimeout(() => RootNavigation.navigate('Home'), 3000);
  });

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/icon/popcorn.gif')}
            style={styles.logo}
          />
        </View>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
          Movie Watch
        </Text>
      </View>
      <View style={styles.owner}>
        <Text style={{color: 'white'}}>Created with love by Sanusi</Text>
      </View>
    </View>
  );
};

export default OnSplash;

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  logoWrapper: {
    width: '80%',
    height: '80%',
    justifyContent: 'flex-start',
  },
  owner: {
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {flex: 1, backgroundColor: 'rgba(255, 153, 153, 255)'},
});
