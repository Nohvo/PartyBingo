import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { GridContainer } from './features/grid'
import gridReducer from './features/grid'
import { useDispatch } from 'react-redux'
import { add_grid } from './features/grid'
import { createStackNavigator, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native'
import CreateForm from './screens/CreateForm'
import Home from './screens/Home'
import BingoGrid from './screens/BingoGrid'

const Stack = createStackNavigator();
const Root = () => {
    const [screen, setScreen] = useState<string>("Home")
    const grids = useSelector((state:any) => state.grid.grids)
    const dispatch = useDispatch();
    console.log(grids)
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'> 
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="BingoGrid" component={BingoGrid} />
                <Stack.Screen name="CreateForm" component={CreateForm} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Root