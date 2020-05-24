import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class LoadPage extends Component {
  constructor(props){
    super(props);
    this.page = this.props.page;
    this.state = {
      data:{
      },
      loading: false,
    }
  }

  componentDidMount = async () => {
    const data = await this.execute();
    await this.setState({ loading: false, data });
  }

  execute = async () => {
    return await mangaAPI.execute(this.page.url).then( ({ data }) => data );
  }

  render() {
    return !this.state.loading ? (
      <Text>Test</Text>
    ) : (
      <Text>Text</Text>
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

export default LoadPage
