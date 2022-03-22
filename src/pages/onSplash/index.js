import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const OnSplash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('MainApp'), 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/icon/iconApp.png')}
            style={styles.logo}
          />
        </View>
        <Text
          style={{color: 'rgb(14,165,233)', fontWeight: 'bold', fontSize: 26}}>
          BajakIn
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            maxWidth: '60%',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Nonton Film favoritmu secara gratis{' '}
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
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: 'contain',
  },
  logoWrapper: {
    width: '50%',
    height: '30%',
    justifyContent: 'flex-start',
  },
  owner: {
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {flex: 1, backgroundColor: '#1f2933'},
});
