import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        List: 'list',
        Settings: 'settings',
      },
    },
    Manga:{
      path: 'Manga',
    },
    Reader:{
      path: 'Reader',
    }
  },
};
