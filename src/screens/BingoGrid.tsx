import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { GridContainer } from '../features/grid'
import { Picker } from '@react-native-picker/picker'

type Props = {
    grids: GridContainer[]
}

const BingoGrid = (props: Props & StackScreenProps<any>) => {
    const items = props.route.params.grids[0]
    const [visible, setVisible] = React.useState(true);
    const [selectedGrid, setSelectedGrid] = React.useState<GridContainer>(props.route.params.grids[0])
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    // For example a grid of 9 will lead to 3x3 grid
    const gridSize = Math.ceil(Math.sqrt(items.length))
    useEffect(() => {
        props.navigation.setOptions({
            header: () => <>
                <Picker selectedValue={selectedGrid} onValueChange={(value:GridContainer) => setSelectedGrid(value)}>
                    {props.route.params.grids.map((grid) => {
                        return (
                            <Picker.Item label={grid.name} value={grid} />
                        )
                    })}
                </Picker>
            </>
        }
        )
    })


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