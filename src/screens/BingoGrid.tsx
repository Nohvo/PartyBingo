import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { GridContainer } from '../features/grid'
import { Picker } from '@react-native-picker/picker'
import { ScrollView } from 'react-native-gesture-handler'

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
    const gridSize = Math.ceil(Math.sqrt(items.grid.length))
    console.log("GRID SIZE", gridSize)
    useEffect(() => {
        props.navigation.setOptions({
            header: () => <>

            </>
        }
        )
    })


    const renderGrid = () => {
        var boxes: any = []
        for (let i = 0; i < Math.sqrt(selectedGrid.grid.length); i++) {
            boxes.push(
                <View style={{ flexDirection: "column", flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                        {renderRow(i)}
                    </View>
                </View>
            )
        }
        return boxes
    }
    const renderRow = (index) => {
        var boxes = []
        for (let i = 0; i < Math.sqrt(selectedGrid.grid.length); i++) {
           boxes.push( <View style={{ flex: 1 }}>
                <Text>{selectedGrid.grid[i + (Math.sqrt(selectedGrid.grid.length) * index)].text}</Text>
            </View>)
        }
        return boxes;
    }

    return (<>

        {/*@ts-ignore*/}
        <Picker selectedValue={selectedGrid} onValueChange={(value: GridContainer) => setSelectedGrid(value)} >
            {props.route.params.grids.map((grid) => {
                return (
                    <Picker.Item label={grid.name} value={grid} />
                )
            })}
        </Picker>
        {renderGrid()}
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