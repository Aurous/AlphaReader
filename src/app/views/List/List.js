import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListManga from '../../components/ListManga';

export default function List({ navigation }) {
  return (
    <View style={styles.container}>
        <ListManga navigation={navigation} />
    </View>
  );
}
//  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//  </ScrollView>
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
