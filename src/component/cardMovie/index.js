import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as RootNavigation from '../../config/RootNavigation';
import axios from 'axios';

const CardMovie = props => {
  const [Data, setData] = useState([]);

  const getApi = async () => {
    try {
      const post = await axios.get(
        `http://code.aldipee.com/api/v1/movies/${props.idMovie}`,
      );
      setData(post.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{uri: props.link}} />
      </View>
      <View style={styles.right}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontWeight: 'bold', color: '#50d71e', fontSize: 17}}>
          {props.title}
        </Text>
        <View style={styles.detail}>
          <Text style={styles.desc}>{props.date}</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {Data.map((data, index) => (
              <Text style={styles.genre} key={index}>
                {data.name}
              </Text>
            ))}
          </View>

          <View style={styles.rating}>
            <Image
              style={styles.star}
              source={require('../../assets/icon/star.png')}
            />
            <Text style={styles.desc}>{props.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            RootNavigation.navigate('Detail', {IdUser: props.idMovie})
          }
          style={styles.button}>
          <Text style={styles.textButton}>Show More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardMovie;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#334155',
    width: '100%',
    height: 180,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#94a3b8',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  imageWrapper: {
    width: '35%',
    height: '100%',
    padding: 2,
  },
  button: {
    backgroundColor: 'rgb(75,85,99)',
    borderRadius: 8,
    width: 90,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  textButton: {
    color: 'rgb(14,165,233)',
    padding: 4,
  },
  right: {
    marginLeft: 8,
    flex: 1,
    position: 'relative',
    paddingTop: '2%',
  },
  desc: {
    fontSize: 14,
    color: 'white',
  },
  star: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genre: {
    padding: 4,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    borderRadius: 4,
    marginRight: 8,
    marginVertical: 6,
  },
});
