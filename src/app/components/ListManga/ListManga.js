import React, { Component } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class ListManga extends Component {
  constructor (props) {
    super(props)
    this._isMounted = false;
    this.onEndReachedCalledDuringMomentum = true;
    this.navigation = this.props.navigation;
    this.page = 1;
    this.state = {
      data:{
        data:[],
      },
      pagination:{
        page: 1,
      },
      loading: true,
    }
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const data = await this.search();
    if(this._isMounted) await this.setState({ loading: false, data });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  search = async () => {
    return await mangaAPI.search("mangareader", `page=${this.page}`).then( ({data}) => data );
  }

  onEndReached = async ({ distanceFromEnd }) => {
    if(!this.onEndReachedCalledDuringMomentum){
      this.page++;
      const next = await this.search();
      const data = this.state.data.data.concat(next.data);
      this.setState({data: { data }, pagination: { page: this.page } });
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  render() {
    return !this.state.loading ? (
      <View style={styles.list} >
        <FlatList
          data={this.state.data.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              style={styles.object}
              resizeMode="contain"
              onPress={() => { this.navigation.navigate("Manga", {manga: item}) }}>
              <Image
                style={styles.image}
                source={{uri: item.thumb}} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={manga => manga.name}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          />
      </View>
    ) : (
      <Loading />
    );
  }
}

const objectWidth = Math.round(Dimensions.get('window').width / 3);
const objectHeight = Math.round(Math.round(Dimensions.get('window').width / 80) * (125 / 4));

const styles = StyleSheet.create({
  object: {
    paddingTop: '1%',
    paddingBottom: '1%',
    width: objectWidth,
    alignItems: 'center',
  },
  image: {
    width: objectWidth,
    height: objectHeight,
    resizeMode: 'contain',
  },
});

export default ListManga;
