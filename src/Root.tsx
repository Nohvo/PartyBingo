import React, { useEffect, useState } from 'react'
import { View, Button, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { setInitialState, GridContainer } from './features/grid'
import gridReducer from './features/grid'
import { useDispatch } from 'react-redux'
import { add_grid } from './features/grid'
import { createStackNavigator, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native'
import CreateForm from './screens/CreateForm'
import Home from './screens/Home'
import BingoGrid from './screens/BingoGrid'
import { retrieveData } from './store/store'
import MyGrids from './screens/MyGrids'
import ImportGrid from './screens/ImportGrid'

const Stack = createStackNavigator();
const Root = () => {
    const [screen, setScreen] = useState<string>("Home")
    const grids = useSelector((state: any) => state.grid.grids)
    const dispatch = useDispatch();

    useEffect(() => {
        retrieveData().then((result) => { dispatch(setInitialState(result)) })
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="BingoGrid" component={BingoGrid} />
                <Stack.Screen name="CreateForm" component={CreateForm} />
                <Stack.Screen name="MyGrids" component={MyGrids} />
                <Stack.Screen name="ImportGrid" component={ImportGrid} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Root