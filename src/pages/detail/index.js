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
import Share from 'react-native-share';
import CardArtist from '../../component/cardArtist';
import {useNetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import Genres from '../../component/genres';

const Detail = props => {
  const [Data, setData] = useState([]);
  const [actor, setactor] = useState([]);
  const [genres, setgenres] = useState([]);
  const [result, setResult] = useState('');
  const netInfo = useNetInfo();
  const [loading, setLoading] = useState(true);

  const checkInternet = () =>
    netInfo.isConnected !== true
      ? showMessage({
          message: 'please connect your internet',
          type: 'connection error',
          backgroundColor: 'red',
          color: 'white',
        })
      : null;

  useEffect(() => {
    checkInternet();
    axios
      .get(`http://code.aldipee.com/api/v1/movies/${props.idUser}`)
      .then(res => [
        setData(res.data),
        setactor(res.data.credits.cast),
        setgenres(res.data.genres),
      ])
      .then(() => setLoading(false))
      .catch(err =>
        showMessage({
          message: 'cannot connect to server',
          type: 'server error',
          backgroundColor: 'red',
          color: 'white',
        }),
      );
  }),
    [];

  function getErrorString(error, defaultValue) {
    let e = defaultValue || 'Something went wrong. Please try again';
    if (typeof error === 'string') {
      e = error;
    } else if (error && error.message) {
      e = error.message;
    } else if (error && error.props) {
      e = error.props;
    }
    return e;
  }

  const shareSingleImage = async () => {
    const shareOptions = {
      title: 'Share url',
      url: 'link url : ' + Data.poster_path,
      failOnCancel: false,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: Data.backdrop_path,
          }}>
          <View style={styles.navigation}>
            <TouchableOpacity
              onPress={() => RootNavigation.navigateHome('Home')}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/icon/back-button.png')}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/icon/love.png')}
              />
              <TouchableOpacity onPress={shareSingleImage}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/icon/sharing.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.cardImage}
              source={{
                uri: Data.poster_path,
              }}
            />
            <View>
              <Text style={{fontWeight: 'bold'}}>Title </Text>
              <Text style={{maxWidth: '75%'}}> {Data.title} </Text>
              <Text style={{fontWeight: 'bold', paddingTop: 5}}>
                Vote Count
              </Text>
              <Text> {Data.vote_count}</Text>
              <Text style={{fontWeight: 'bold', paddingTop: 5}}>
                Date Release
              </Text>
              <Text> {Data.release_date} </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{marginHorizontal: 10, marginTop: 85}}>
          <Text style={styles.subtitle}>Genres</Text>
          <View style={styles.genres}>
            {genres.map((genre, index) => (
              <Genres key={index} genre={genre.name} />
            ))}
          </View>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text style={styles.subtitle}>Sinopsis</Text>
          <Text style={{color: 'white', marginBottom: 16}}>
            {Data.overview}
          </Text>
          <Text style={styles.subtitle}>Actor/Artist</Text>
        </View>
        <View style={styles.scroll}>
          {actor.map((data, index) => (
            <CardArtist
              key={index}
              profil={data.profile_path}
              originalName={data.original_name}
              charName={data.character}
            />
          ))}
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
    width: '85%',
    padding: '2%',
    position: 'absolute',
    bottom: -85,
    left: '8%',
  },
  cardImage: {
    width: '50%',
    height: '100%',
    marginRight: '2%',
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
  genres: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
});
