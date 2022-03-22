import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as RootNavigation from '../../config/RootNavigation';
import Share from 'react-native-share';
import CardArtist from '../../component/cardArtist';
import {useNetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import Genres from '../../component/genres';
import Star from '../../component/star';

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

  const getApi = async () => {
    try {
      const post = await axios.get(
        `http://code.aldipee.com/api/v1/movies/${props.idUser}`,
      );
      setData(post.data);
      setactor(post.data.credits.cast);
      setgenres(post.data.genres);
      setLoading(false);
    } catch (err) {
      showMessage({
        message: 'cannot connect to server',
        type: 'server error',
        backgroundColor: 'red',
        color: 'white',
      });
    }
  };

  useEffect(() => {
    checkInternet();
    getApi();
  }, []);

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

  const shareMovie = async () => {
    const shareOptions = {
      title: 'Share url',
      url: 'link url : ' + Data.homepage,
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
      {loading && (
        <ActivityIndicator
          size="large"
          style={{AlignItems: 'center', height: 900}}
        />
      )}

      {!loading && (
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
                <TouchableOpacity onPress={shareMovie}>
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
              <View style={{width: '60%'}}>
                <Text style={styles.title}> {Data.title} </Text>
                <View style={{marginBottom: '2%'}}>
                  <Text style={styles.text}> {Data.tagline} </Text>
                </View>
                <View style={styles.rightCard}>
                  <Text style={{color: '#50d71e', fontWeight: 'bold'}}>
                    Vote
                  </Text>
                  <Text style={styles.text}> {Data.vote_average} / 10</Text>
                </View>
                <View style={styles.rightCard}>
                  <Text style={{color: '#50d71e', fontWeight: 'bold'}}>
                    Length
                  </Text>
                  <Text style={styles.text}> {Data.runtime} hrs </Text>
                </View>
                <View style={styles.rightCard}>
                  <Text style={{color: '#50d71e', fontWeight: 'bold'}}>
                    Release date
                  </Text>
                  <Text style={styles.text}> {Data.release_date} </Text>
                </View>
                <View style={styles.rightCard}>
                  <Text style={{color: '#50d71e', fontWeight: 'bold'}}>
                    Status
                  </Text>
                  <Text style={styles.text}> {Data.status}</Text>
                </View>
                <Star />
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
      )}
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
    flexDirection: 'row',
    width: '94%',
    padding: '2%',
    position: 'absolute',
    bottom: -85,
    left: '3%',
    backgroundColor: '#334155',
    elevation: 20,
    shadowColor: '#94a3b8',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardImage: {
    width: '38%',
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
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    maxWidth: '85%',
    color: 'rgb(14,165,233)',
  },
  text: {
    color: 'white',
  },
  rightCard: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  star: {
    width: 20,
    height: 20,
  },
});
