import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class ListManga extends Component {
  constructor (props) {
    super(props)
    this.navigation = this.props.navigation;
    this.state = {
      data:{
        data:[]
      },
      page:1,
      loading: true,
    }
  }

  componentDidMount = () => {
    this.search();
  }

  componentWillUnmount = () => {
    this.setState({ loading: false, data: { data: [] } });
  };

  search = async () => {
    this.setState({ loading: true, data: { data: [] } });
    await mangaAPI.search("mangareader", `page=${this.state.page}`).then(
      ({ data }) => this.setState({ loading: false, data })
    );
  }

  nextPage = async () => {
    const page = this.state.page + 1;
    await this.setState({ page: page });
    await this.search();
  }

  prevPage = async () => {
    const page = this.state.page - 1;
    await this.setState({ page: page });
    await this.search();
  }

  render() {

    const Manga = this.state.data.data.map((manga)=>{
      return (
        <TouchableOpacity style={styles.object} resizeMode="contain" onPress={() => { this.navigation.navigate("Manga", {manga: manga}) }}>
          <Image style={styles.image} source={{uri: manga.thumb}} />
          <Text>{manga.name}</Text>
        </TouchableOpacity>
      )
    });

    return !this.state.loading ? (
      <View >
        <View >
          <Button
            onPress={this.nextPage}
            title="Next Page"
            color="#841584" />
          <Button
            onPress={this.prevPage}
            title="Previous Page"
            color="#841584" />
        </View>
        <View style={styles.list} >
          { Manga }
        </View>
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
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
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
