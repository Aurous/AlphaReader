import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Loading from '../Loading';
import * as mangaAPI from '../../../service/manga/api';

class LoadPage extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.page = this.props.page;
    this.headerHeight = this.props.headerHeight;
    this.state = {
      data:{
        image:{
          url:undefined,
        }
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
    return await mangaAPI.execute(this.page.url).then( ({ data }) => data );
  }

  render() {
    return !this.state.loading && this.state.data.image.url ? (
      <Image
        style={[styles.image, {height:(Math.round(Dimensions.get('window').height) - this.headerHeight)}]}
        source={{uri: this.state.data.image.url}}
        resizeMode='contain' />
    ) : (
      <Loading />
    )
  }
}

const objectWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  image: {
    width: objectWidth,
  },
});

export default LoadPage
