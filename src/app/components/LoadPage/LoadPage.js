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
    this.updateUrls = this.props.updateUrls;
    this.pageUrls = this.props.pageUrls;
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
    if(this._isMounted && data) await this.setState({ loading: false, data });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  execute = async () => {
    if(!this.pageUrls[this.page.number]){
      const res = await mangaAPI.execute(this.page.url).then( ({ data }) => data );
      this.updateUrls(parseInt(this.page.number), res.image.url);
      return res;
    }
  }

  render() {
    // console.log(typeof(this.state.image.url));
    const url = this.state.data.image.url || this.pageUrls[this.page.number] || undefined;
    return !this.state.loading && url ? (
      <Image
        style={[styles.image, {height:(Math.round(Dimensions.get('window').height) - this.headerHeight)}]}
        source={{uri: url}}
        resizeMode='contain' />
    ) : (
      <Loading height={(Math.round(Dimensions.get('window').height) - this.headerHeight)} width={objectWidth} />
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
