import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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

  render() {
    const Chapters = this.state.data.chapters.map((chapter)=>{
      // add style
      return (
        <TouchableOpacity key={chapter.title} style="" onPress={() => { this.navigation.navigate("Reader", {chapter: chapter}) }}>
          <Text>{chapter.title}</Text>
        </TouchableOpacity>
      )
    });

    return !this.state.loading ? (
      <View>
        <View>
          <Image style={styles.image} source={{uri: this.manga.thumb}} />
          <Text>{this.manga.name}</Text>
          <Text>{this.manga.chapters}</Text>
          <Text>{this.manga.genre}</Text>
        </View>
        { Chapters }
      </View>
    ) : (
      <Loading />
    )
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const listWidth = width;
const objectWidth = Math.round(listWidth / 3);
const objectHeight = Math.round(Math.round(width / 80) * (125 / 4));

const styles = StyleSheet.create({
  image: {
    width: objectWidth,
    height: objectHeight,
    resizeMode: 'contain',
  },

});

export default MangaDetails
