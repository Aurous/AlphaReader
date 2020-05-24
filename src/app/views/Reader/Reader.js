import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadChapter from '../../components/LoadChapter';

export default function Reader({navigation, route}) {
  navigation.setOptions({ headerTitle:  route.params.chapter.title});
  return (
    <View style={styles.container}>
      <LoadChapter chapter={route.params.chapter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
