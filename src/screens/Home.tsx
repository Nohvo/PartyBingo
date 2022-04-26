import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from "../components/CustomButton";
import { Colors } from '../style/Colors';
import _ from "lodash"

type Props = {

}

const Home = (props: Props & StackScreenProps<any>) => {
    const grids = useSelector((state: any) => state.grid.grids)
    useEffect(() => {
        props.navigation.setOptions({
            header: () => <></>,
            headerStyle: { backgroundColor: Colors.BACKGROUND }

        })
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to party bingo!</Text>
            <View style={styles.buttons}>
                <CustomButton title={"Create new"} onPress={() => props.navigation.navigate("CreateForm")} />
                <CustomButton title={"Play"} disabled={grids.length <= 0} onPress={() => props.navigation.navigate("BingoGrid", { grids: grids })} />
                <CustomButton title={"My grids"} onPress={() => { props.navigation.navigate("MyGrids", { grids: grids }) }} />
                <CustomButton title={"Import grid"} onPress={() => { props.navigation.navigate("ImportGrid") }} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "auto",
        backgroundColor: Colors.BACKGROUND,
    },
    buttons: {
        marginHorizontal: 80,
    },
    text: {
        color: "#000",
        fontSize: 32,
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 30
    }
})

export default Home;