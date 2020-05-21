import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class MangaDetails extends Component {
  constructor (props) {
    super(props)
    this.manga = this.props.manga;
    this.navigation = this.props.navigation;
    this.state = {
      data: {
        chapters: [],
      },
      loading: false,
    }
  }

  execute = async () => {
    this.setState({ loading: true, data: { chapters: [] } });
    await mangaAPI.execute(this.manga.url).then(
      ({ data }) => this.setState({ loading: false, data })
    );
  }

  componentDidMount = async () => {
    await this.execute();
  }

  header = () => {
    return (
      <View>
        <Image style={styles.image} source={{uri: this.manga.thumb}} />
        <Text>{this.manga.name}</Text>
        <Text>{this.manga.chapters}</Text>
        <Text>{this.manga.genre}</Text>
      </View>
    )
  }

  render() {
    return !this.state.loading ? (
      <View>
        <FlatList
          data={this.state.data.chapters}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.title}
              style={styles.object}
              resizeMode="contain"
              onPress={() => { this.navigation.navigate("Reader", {chapter: item}) }}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={this.header}
          />
      </View>
    ) : (
      <Loading />
    )
  }
}

const objectWidth = Math.round(Dimensions.get('window').width / 3);
const objectHeight = Math.round(Math.round(Dimensions.get('window').width / 80) * (125 / 4));

const styles = StyleSheet.create({
  image: {
    width: objectWidth,
    height: objectHeight,
    resizeMode: 'contain',
  },

});

export default MangaDetails
