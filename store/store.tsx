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

  export const clearData = async (state:any) => {
    try {
      await AsyncStorage.setItem(
        '@Grids',
        ""
      );
    } catch (error) {
      // Error saving data
    }
  };

  export const retrieveData = async () =>  {
    try {
      const value = await AsyncStorage.getItem('@Grids');
      if (value !== null) {
        var data:GridContainer
        return JSON.parse(value).grids;
      }
    } catch (error) {

    }
  };

  export const getLatestId = async () => {
    try {
      const value = await AsyncStorage.getItem('@Grids');
      if (value !== null) {
       let items = JSON.parse(value);
       console.log("IDITEMS",items)
       let latest = 0;
       items.grids.map((grid) => grid.id > latest ? latest = grid.id : null)
       console.log("LATEST", latest);
       return latest+1
      }
    } catch (error) {
      // Error retrieving data
      console.log("ID ERROR", error)
      return 0
    }
  }