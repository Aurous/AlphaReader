import React, { Component } from 'react'
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';
import * as mangaAPI from '../../../service/manga/api';

class LoadChapter extends Component {
  constructor(props){
    super(props);
    this.chapter = this.props.chapter;
    this.state = {
    }
  }

  componentDidMount = async () => {
    const data = await this.execute();
    this.setState({ loading: false, data });
  }

  execute = async () => {
    this.setState({ loading: true, data: { chapters: [] } });
    await mangaAPI.execute(this.chapter.url).then(
      ({ data }) => this.setState({ loading: false, data })
    );
    console.log(this.state);
  }

  render() {
    return (
      <Text>{this.chapter.title}</Text>
    )
  }
}

export default LoadChapter
