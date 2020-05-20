import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as mangaAPI from '../../../service/manga/api';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 75,
    height: 100,
    resizeMode: 'stretch',
  },
});

class ListManga extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:{
        data:[]
      },
      loading: true,
    }
  }

  componentDidMount() {
    this.search();
  }

  search = async () => {
    await mangaAPI.search("mangareader").then(
      ({ data }) => this.setState({ loading: false, data })
    );
    console.log(this.state.data);
  }

  render() {

    const Manga = this.state.data.data.map((manga)=>{
      return (
        <View>
          <Text>{manga.name}</Text>
          <Text>{manga.chapters}</Text>
          <Text>{manga.genre}</Text>
          <Image style={styles.stretch} source={{uri: manga.thumb}} />
        </View>
      )
    });

    return !this.state.loading ? (
      <View>
      <Text>{this.state.loading || ""}</Text>
      <Button
        onPress={this.search}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button" />
      { Manga }
      </View>
    ) : (
      <Text> Loading... </Text>
    )
  }
}

export default ListManga;
