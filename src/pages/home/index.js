import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardImage from '../../component/cardImage';
import CardMovie from '../../component/cardMovie';

const Home = ({onDetail}) => {
  useEffect(() => {
    fetch('http://code.aldipee.com/api/v1/movies')
      .then(res => res.json())
      .then(resJson => setData(resJson.results))
      .catch(err => console.log(err));
  }, []);

  const [Data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <View style={{marginTop: 8}}>
        <Text
          style={{color: 'rgb(14,165,233)', fontSize: 20, fontWeight: 'bold'}}>
          Recomended
        </Text>
        <View>
          <ScrollView horizontal contentContainerStyle={styles.scroll}>
            {Data.map((data, index) => (
              <CardImage link={data.poster_path} key={index} />
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
        <ScrollView>
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
        </ScrollView>
      </View>
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
