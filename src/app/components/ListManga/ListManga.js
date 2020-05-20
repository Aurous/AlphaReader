import React, { Component } from 'react';
import { Text } from 'react-native';
import * as mangaAPI from '../../../service/manga/api';


class ListManga extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:[]
    }
  }

  componentDidMount() {
    mangaAPI.search("mangareader").then(
      ({ data }) => console.log(data)
      // ({ data }) => this.setState({ data })
    );
    console.log(this.state.data);
  }

  render() {
    return (
      <Text>Test</Text>
    )
  }
}

export default ListManga;
