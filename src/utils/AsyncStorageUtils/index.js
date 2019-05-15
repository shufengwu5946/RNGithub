import AsyncStorage from "@react-native-community/async-storage";

export const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const retrieveData = keyArrays => {
  const asyncStorages = keyArrays.map(value => AsyncStorage.getItem(value));
  return Promise.all([...asyncStorages]);
};
