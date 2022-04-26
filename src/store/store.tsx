import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { GridContainer, setClearState } from '../features/grid';

export const storeData = async (state: any) => {
  try {
    await AsyncStorage.setItem(
      '@Grids',
      JSON.stringify(state)
    );

  } catch (error) {
    // Error saving data
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.setItem(
      '@Grids',
      ""
    );
  } catch (error) {
    // Error saving data
  }
};

export const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@Grids');
    if (value !== null) {
      var data: GridContainer
      return JSON.parse(value).grids ?? { grids: [] };
    }
  } catch (error) {

  }
};

export const getLatestId = async () => {
  try {
    const value = await AsyncStorage.getItem('@Grids');
    if (value !== null) {
      let items = JSON.parse(value);
      let latest = 0;
      items.grids.map((grid) => grid.id > latest ? latest = grid.id : 0)
      if(!latest) latest = 0;
      return latest + 1
    }
  } catch (error) {
    // Error retrieving data
    return 0
  }
}