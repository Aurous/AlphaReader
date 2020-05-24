import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MangaDetails from '../../components/MangaDetails';

export default function Manga({navigation, route}) {
  navigation.setOptions({ headerTitle:  route.params.manga.name});
  return (
    <View style={styles.container}>
      <MangaDetails manga={route.params.manga} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
