import AsyncStorage from '@react-native-community/async-storage';

export const getAll = async () => {
  return await AsyncStorage.getAllKeys();
}

export const add = async (source, item) => {
  try{
    const items = await AsyncStorage.getItem(source);
    const itemsObj = JSON.parse(items);
    const itemsSave = itemsObj.push(JSON.stringify(item));
    await AsyncStorage.setItem(source, JSON.stringify(itemsSave));
    return await AsyncStorage.getItem(source);
  }catch{
    await AsyncStorage.setItem(source, '[]');
    return await AsyncStorage.getItem(source);
  }
};

export const remove = async (source, item) => {
  try{
    const items = await AsyncStorage.getItem(source);
    const itemsObj = JSON.parse(items);
    const itemsSave = itemsObj.push(item);
    await AsyncStorage.setItem(source, itemsSave);
    return await AsyncStorage.getItem(source);
  }catch{
    await AsyncStorage.setItem(source, '[]');
    return await AsyncStorage.getItem(source);
  }
}
