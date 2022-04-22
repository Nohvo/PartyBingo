import { AsyncStorage } from 'react-native';

export const storeData = async (state:any) => {
    try {
      await AsyncStorage.setItem(
        '@Grids',
        JSON.stringify(state)
      );
    } catch (error) {
      // Error saving data
    }
  };

  export const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Grids');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };