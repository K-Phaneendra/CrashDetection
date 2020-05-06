import {AsyncStorage} from 'react-native';

export const _storeData = async (dataObj) => {
  const { key, value } = dataObj
  try {
    await AsyncStorage.setItem(key, value);
    return true
  } catch (error) {
    // Error saving data
    return false
  }
};

export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
    }
    return { isError: false, value }
  } catch (error) {
    // Error retrieving data
    return { isError: true, value: error }
  }
};