import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class MangaDetails extends Component {
  constructor (props) {
    super(props)
    this.url = this.props.manga.url
    this.state = {
      data: {
        chapters: [],
      },
      loading: true,
    }
  }

  execute = async () => {
    this.setState({ loading: true, data: { chapters: [] } });
    await mangaAPI.execute(this.url).then(
      ({ data }) => this.setState({ loading: false, data })
    );
  }

  componentDidMount = async () => {
    await this.execute();
  }

  render() {
    const Chapters = this.state.data.chapters.map((chapter)=>{
      /* style={styles.object} */
      // onPress={() => { this.navigation.navigate("Reader" }}
      // work from here
      return (
        <TouchableOpacity >
          <Text>{chapter.title}</Text>
        </TouchableOpacity>
      )
    });

    return !this.state.loading ? (
      <View>
        { Chapters }
      </View>
    ) : (
      <Loading />
    )
  }
}

export default MangaDetails
