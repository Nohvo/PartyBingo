import { AsyncStorage } from 'react-native';
import { GridContainer } from '../features/grid';

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

  export const retrieveData = async () =>  {
    try {
      const value = await AsyncStorage.getItem('@Grids');
      if (value !== null) {
        // We have data!!
        var data:GridContainer
        return JSON.parse(value).grids;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  export const getLatestId = async () => {
    try {
      const value = await AsyncStorage.getItem('@Grids');
      if (value !== null) {
       let items = JSON.parse(value);
       console.log("IDITEMS",items)
       let latest = Math.max(...items.grids.id)
       console.log("LATEST", latest);
      }
    } catch (error) {
      // Error retrieving data
    }
  }