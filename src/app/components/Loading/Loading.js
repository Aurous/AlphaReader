import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Loading extends Component {
  constructor(props){
    super(props);
    this.height = this.props.height || undefined;
    this.width = this.props.width || undefined;
  }
  render() {
    return (
      <ScrollView>
        <View style={[styles.container, styles.horizontal, {height:this.height, width:this.width}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loading;
