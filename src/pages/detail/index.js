import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardArtist from '../../component/cardArtist';

const Detail = props => {
  const [data, setdata] = useState();

  useEffect(() => {
    fetch('http://code.aldipee.com/api/v1/movies')
      .then(res => res.json())
      .then(resJson => setdata(resJson.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.ImageBackgroundWrapper}>
        <Image
          style={styles.imageBackground}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
          }}
        />
        <View style={styles.navigation}>
          <Image
            style={styles.backButton}
            source={require('../../assets/icon/backButton.png')}
          />
          <View>
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
              }}
            />
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
              }}
            />
          </View>
        </View>
        {/* <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{
              uri: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
            }}
          />
          <View>
            <Text>Judul</Text>
            <Text>Tagline</Text>
            <Text>Release Date</Text>
          </View>
        </View> */}
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.subtitle}>Genres</Text>
        <View style={styles.genres}>
          <View style={styles.genre}>
            <Text style={styles.genreText}>Action</Text>
          </View>
          <View style={styles.genre}>
            <Text style={styles.genreText}>Scifi</Text>
          </View>
          <View style={styles.genre}>
            <Text style={styles.genreText}>Adventure</Text>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.subtitle}>Synopsis</Text>
        <Text>{JSON.stringify(props.id)}</Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.subtitle}>Actor/Artist</Text>
        <View>
          <CardArtist />
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1f2933',
  },
  ImageBackgroundWrapper: {
    // flex: 1,
    width: '100%',
    height: '30%',
    backgroundColor: 'red',
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '48%',
    width: '80%',
    padding: '4%',
    position: 'absolute',
    bottom: 0,
  },
  cardImage: {
    width: '50%',
    height: '100%',
    marginRight: '5%',
  },
  genres: {
    flexDirection: 'row',
  },
  genre: {
    backgroundColor: 'grey',
    marginRight: '4%',
    padding: '1%',
    borderRadius: 5,
  },
  genreText: {
    color: 'white',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  navigation: {
    flexDirection: 'row',
  },
  backButton: {
    width: 20,
    height: 20,
  },
  imageBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});
