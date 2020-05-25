import React, { Component } from 'react'
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import LoadPage from '../../components/LoadPage';
import * as mangaAPI from '../../../service/manga/api';
import { HeaderHeightContext } from '@react-navigation/stack';

class LoadChapter extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.chapter = this.props.chapter;
    this.isManga = this.props.isManga;
    this.state = {
      data:{
        pageCount:0,
        pages:[],
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
    return await mangaAPI.execute(this.chapter.url).then( ({ data }) => data );
  }

  render() {
    return !this.state.loading ? (
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <FlatList
            data={this.state.data.pages}
            renderItem={({ item }) => (<LoadPage page={item} headerHeight={headerHeight} /> )}
            keyExtractor={item => item.number}
            ListHeaderComponent={this.header}
            horizontal={this.isManga}
            snapToAlignment={"start"}
            snapToInterval={(this.isManga) ? objectWidth : (Dimensions.get('window').height - headerHeight)}
            decelerationRate={"fast"}
            pagingEnabled
            />
        )}
      </HeaderHeightContext.Consumer>

    ) : (
      <Loading />
    )
  }
}

const objectWidth = Dimensions.get('window').width;

export default LoadChapter
