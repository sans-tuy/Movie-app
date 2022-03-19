import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as RootNavigation from '../../config/RootNavigation';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import CardImage from '../../component/cardImage';
import CardMovie from '../../component/cardMovie';
import {useNetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

const Home = ({onDetail}) => {
  const netInfo = useNetInfo();
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const checkInternet = () =>
    netInfo.isConnected !== true
      ? showMessage({
          message: 'please connect your internet',
          type: 'connection error',
          backgroundColor: 'red', // background color
          color: 'white',
        })
      : null;

  useEffect(() => {
    checkInternet();
    axios
      .get('http://code.aldipee.com/api/v1/movies')
      .then(res => res.data)
      .then(resJson => setData(resJson.results))
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

  return (
    <View style={styles.container}>
      <SkeletonContent
        containerStyle={{flex: 1, width: '100%'}}
        isLoading={loading}
        boneColor="#121212"
        highlightColor="#333333"
        animationDirection="horizontalLeft"
        layout={[
          {width: 220, height: 20, marginBottom: 6, marginTop: 10},
          {
            flexDirection: 'row',
            marginRight: 10,
            children: [
              {
                width: 160,
                height: 120,
                marginBottom: 10,
                marginRight: 20,
              },
              {
                width: 160,
                height: 120,
                marginBottom: 10,
              },
              {
                width: 160,
                height: 120,
                marginBottom: 10,
              },
            ],
          },
          {width: 220, height: 20, marginBottom: 6},
          {width: '100%', height: 180, marginBottom: 6},
          {width: '100%', height: 180, marginBottom: 6},
          {width: '100%', height: 180, marginBottom: 6},
          {width: '100%', height: 180, marginBottom: 6},
        ]}
        animationType="pulse">
        <View style={{marginTop: 8}}>
          <Text
            style={{
              color: 'rgb(14,165,233)',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Recomended
          </Text>
          <View>
            <ScrollView horizontal contentContainerStyle={styles.scroll}>
              {Data.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    RootNavigation.navigate('Detail', {IdUser: data.id})
                  }>
                  <CardImage link={data.poster_path} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={{marginTop: 8, marginBottom: 20, flex: 1}}>
          <Text
            style={{
              marginBottom: 10,
              color: 'rgb(14,165,233)',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Latest Upload
          </Text>
          {Data.map((data, index) => (
            <CardMovie
              title={data.original_title}
              link={data.poster_path}
              deskripsi={data.overview}
              date={data.release_date}
              rating={data.vote_average}
              idMovie={data.id}
              key={data.id}
            />
          ))}
        </View>
      </SkeletonContent>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#1f2933',
    flex: 1,
  },
});
