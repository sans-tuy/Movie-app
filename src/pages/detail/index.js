import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as RootNavigation from '../../config/RootNavigation';
import CardArtist from '../../component/cardArtist';
import BackIcon from '../../assets/icon/back.svg';
import LoveIcon from '../../assets/icon/Heart.svg';
import ShareIcon from '../../assets/icon/Send.svg';

const Detail = props => {
  const [data, setdata] = useState();
  const [idMovie, setidMovie] = useState(props.idUser);

  useEffect(() => {
    fetch('http://code.aldipee.com/api/v1/movies')
      .then(res => res.json())
      .then(resJson => resJson.results)
      .then(res => res.filter(el => (el.id == idMovie ? setdata(el) : null)))
      .catch(err => console.log(err));
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
          }}>
          <View style={styles.navigation}>
            <TouchableOpacity
              style={{backgroundColor: 'white'}}
              onPress={() => RootNavigation.navigateHome('Home')}>
              <BackIcon width={27} height={27} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <View style={{backgroundColor: 'white', marginRight: 8}}>
                <LoveIcon width={27} height={27} />
              </View>
              <View style={{backgroundColor: 'white'}}>
                <ShareIcon width={27} height={27} />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.cardImage}
              source={{
                uri: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
              }}
            />
            <View>
              <Text>{console.log(data.title)} </Text>
              <Text>Tagline</Text>
              <Text>Release Date</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{marginHorizontal: 10, marginTop: 85}}>
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
          <Text style={styles.subtitle}>Sinopsis</Text>
          <Text style={{color: 'white', marginBottom: 16}}>
            "Peter Parker is unmasked and no longer able to separate his normal
            life from the high-stakes of being a super-hero. When he asks for
            help from Doctor Strange the stakes become even more dangerous,
            forcing him to discover what it truly means to be Spider-Man."
          </Text>
          <Text style={styles.subtitle}>Actor/Artist</Text>
        </View>
        <View style={styles.scroll}>
          <CardArtist />
          <CardArtist />
          <CardArtist />
          <CardArtist />
          <CardArtist />
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2933',
  },
  ImageBackgroundWrapper: {
    width: '100%',
    height: '30%',
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '70%',
    width: '80%',
    padding: '4%',
    position: 'absolute',
    bottom: -85,
    left: '10%',
  },
  cardImage: {
    width: '50%',
    height: '100%',
    marginRight: '5%',
  },
  genres: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
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
    color: 'rgb(14,165,233)',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  imageBackground: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  scroll: {
    marginHorizontal: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
});
