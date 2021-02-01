import AsyncStorage from '@react-native-community/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    return value;
  } catch (error) {
    console.log(error);
  }
};

export const clearStorage = async (key) => {
  try {
    const value = await AsyncStorage.clear(key);
  } catch (error) {
    console.log(error);
  }
};
