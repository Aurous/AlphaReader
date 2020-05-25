import React, { Component } from 'react'
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import LoadPage from '../../components/LoadPage';
import * as mangaAPI from '../../../service/manga/api';
import { HeaderHeightContext } from '@react-navigation/stack';

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

  navbarHeight = () => {
    return useHeaderHeight();
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
            horizontal={true}
            snapToAlignment={"start"}
            snapToInterval={objectWidth}
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
