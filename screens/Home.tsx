import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { ScreenProps } from 'react-native-screens'
import { useDispatch, useSelector } from 'react-redux'
import { setClearState } from '../features/grid'
import { clearData } from '../store/store'

type Props = {
    
}

const Home = (props: Props & StackScreenProps<any>) => {
    const grids = useSelector((state:any) => state.grid.grids)
    console.log("GRIDS", grids)
    const dispatch = useDispatch();
    return(
        <View>
            <Text style={styles.text}>Welcome to party bingo!</Text>

            <Button title={"Create new"} onPress={() => props.navigation.navigate("CreateForm")}></Button>
            <Button title={"Play"} disabled={grids.length <= 0} onPress={() => props.navigation.navigate("BingoGrid", grids[0].grid)}></Button>
            <Button title={"Clear grids"} onPress={() => {clearData(); dispatch(setClearState())}}></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        color:"#000",
        fontSize:32,
        justifyContent:"center",
        alignSelf:"center"
    }
})

export default Home;