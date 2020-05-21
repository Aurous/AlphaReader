import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MangaDetails from '../../components/MangaDetails';

export default function Manga({navigation, route}) {
  return (
    <View style={styles.container}>
        <MangaDetails manga={route.params.manga} navigation={navigation} />
    </View>
  );
}
//      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//      </ScrollView>
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
