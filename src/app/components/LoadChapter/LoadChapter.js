import React, { Component } from 'react'
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import LoadPage from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class LoadChapter extends Component {
  constructor(props){
    super(props);
    this.chapter = this.props.chapter;
    this.state = {
      data:{
        pageCount:0,
        pages:[],
      },
      loading: false,
    }
  }

  componentDidMount = async () => {
    const data = await this.execute();
    await this.setState({ loading: false, data });
  }

  execute = async () => {
    return await mangaAPI.execute(this.chapter.url).then( ({ data }) => data );
  }

  render() {
    return !this.state.loading ? (
      <View>
        <FlatList
          data={this.state.data.pages}
          renderItem={({ item }) => {
            console.log("test", item);
            return(<LoadPage page={item} />)
            }}
          keyExtractor={item => item.number}
          ListHeaderComponent={this.header}
          />
        <Text>Test</Text>
      </View>
    ) : (
      <Text>Test</Text>
    )
  }
}

// const objectWidth = Dimensions.get('window').width;
// const objectHeight = Dimensions.get('window').height;
//
// const styles = StyleSheet.create({
//   image: {
//     width: objectWidth,
//     height: objectHeight,
//     resizeMode: 'contain',
//   },
// });

export default LoadChapter
