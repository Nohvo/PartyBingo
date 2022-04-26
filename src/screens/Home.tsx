import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from "../components/CustomButton";
import { ContainerView } from "../components/ContainerView";
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
        <ContainerView style={styles.container}>
            <View style={styles.contentWrapper}>
                <Text style={styles.text}>Welcome to party bingo!</Text>
                <View style={styles.buttons}>
                    <CustomButton style={styles.button} title={"Create new"} onPress={() => props.navigation.navigate("CreateForm")} />
                    <CustomButton style={styles.button} title={"Play"} disabled={grids.length <= 0} onPress={() => props.navigation.navigate("BingoGrid", { grids: grids })} />
                    <CustomButton style={styles.button} title={"My grids"} onPress={() => { props.navigation.navigate("MyGrids", { grids: grids }) }} />
                    <CustomButton style={styles.button} title={"Import grid"} onPress={() => { props.navigation.navigate("ImportGrid") }} />
                    <Text style={{alignSelf:"center"}}>© Niko Ohvo</Text>
                </View>
            </View>
        </ContainerView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "auto",
        paddingVertical: 50
    },
    contentWrapper: {
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: 30,
        margin: 30,
        borderRadius: 5
    },
    buttons: {
        marginHorizontal: "auto",
    },
    button: {
        marginTop: 3,
    },
    divider: {
        marginBottom: 15
    },
    text: {
        color: "#000",
        fontSize: 32,
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Cairo-Bold",
        lineHeight: 42,
        marginBottom: 30
    }
})

export default Home;