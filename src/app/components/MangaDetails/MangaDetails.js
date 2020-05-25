import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class MangaDetails extends Component {
  constructor (props) {
    super(props)
    this._isMounted = false;
    this.manga = this.props.manga;
    this.navigation = this.props.navigation;
    this.state = {
      data: {
        chapters: [],
      },
      loading: false,
    }
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const data = await this.execute();
    if(this._isMounted) await this.setState({ loading: false, data });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  execute = async () => {
    return await mangaAPI.execute(this.manga.url).then( ({ data }) => data );
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
              onPress={() => { this.navigation.navigate("Reader", {chapter: item, readDirection:(this.state.data.readDirection === "Right to Left")}) }}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={chapter => chapter.title}
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
  object: {
    alignItems: 'center',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default MangaDetails
