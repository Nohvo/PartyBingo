import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, StyleSheet, Text, BackHandler } from 'react-native'
import { useSelector } from 'react-redux'

type Props = {
    items: Item[]
}

type Item = {
    text: string
    value: boolean
}

const BingoGrid = (props: Props & StackScreenProps<any>) => {
    const items = props.route.params
    // For example a grid of 9 will lead to 3x3 grid
    const gridSize = Math.ceil(Math.sqrt(items.length))
    
   const renderGrid = () => {
        var boxes: any = []
        for (let i = 0; i < gridSize; i++) {
            boxes.push(<View style={styles.square}><Text>{items[i].text}</Text></View>)
        }
        return boxes
    }
    const renderRow = () => {
        for (let i = 0; i < gridSize; i++) {

        }
    } 

    return (<>
         <View style={{ flexDirection: "row", height: `${100 / gridSize}%` }}>
                <View style={styles.square}><Text>Hello</Text></View>
                <View style={styles.square}><Text>Hello</Text></View>
                <View style={styles.square}><Text>Hello</Text></View>
        </View>
        <View style={{ flexDirection: "row", height: `${100 / gridSize}%` }}>
                <View style={styles.square}><Text>Hello</Text></View>
                <View style={styles.square}><Text>Hello</Text></View>
                <View style={styles.square}><Text>Hello</Text></View>
        </View>
        <View style={{ flexDirection: "row", height: `${100 / gridSize}%` }}>
                <View style={styles.square}><Text>Hello</Text></View>
                <View style={styles.square}><Text>Hello</Text></View>
                <View style={styles.square}><Text>Hello</Text></View>
        </View> 
    </>)
}

const styles = StyleSheet.create({
    square: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        height: "auto",
        width: "auto"
    }
})

export default BingoGrid