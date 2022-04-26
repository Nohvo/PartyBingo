import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { GridContainer } from '../features/grid'
import { Picker } from '@react-native-picker/picker'
import { ScrollView } from 'react-native-gesture-handler'
import _ from 'lodash'
import { Colors } from '../style/Colors'

type Props = {
    grids: GridContainer[]
}

const BingoGrid = (props: Props & StackScreenProps<any>) => {
    const [items, setItems] = useState(props.route.params.grids);
    const [selectedGrid, setSelectedGrid] = React.useState<GridContainer>(props.route.params.grids[0])
    const [updateValue, setUpdateValue] = useState<number>(0)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        props.navigation.setOptions({
            header: () => <></>
        })
    })

    const forceUpdate = () => {
        setUpdateValue(updateValue + 1)
    }

    const renderGrid = () => {
        var boxes: any = []
        for (let i = 0; i < Math.sqrt(selectedGrid.grid.length); i++) {
            boxes.push(
                <View style={{ flexDirection: "column", flex: 1, height: "100%" }} key={i}>
                    <View style={{ flexDirection: "row", height: "100%" }} key={selectedGrid.toString()}>
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
            boxes.push(
                <View key={i} style={[styles.box, {backgroundColor: selectedGrid.grid[i + (Math.sqrt(selectedGrid.grid.length) * index)].value ? Colors.OPENED : Colors.UNOPENED}]} onTouchEnd={() => {
                    // ALL HAIL THE LORD LODASH, CLONER OF DEEP
                    var temp = _.cloneDeep(selectedGrid)
                    temp.grid[i + (Math.sqrt(selectedGrid.grid.length) * index)].value = true
                    console.log("ITEMS", items)
                    var tempItems = _.cloneDeep(items)
                    tempItems.find((grid) => grid.id === temp.id).grid = temp.grid;
                    setItems(tempItems)
                    setSelectedGrid(temp);
                }}>
                    <Text style={styles.boxText}>
                        {selectedGrid.grid[i + (Math.sqrt(selectedGrid.grid.length) * index)].value ? selectedGrid.grid[i + (Math.sqrt(selectedGrid.grid.length) * index)].text : ""}
                    </Text>
                </View>)
        }
        return boxes;
    }

    console.log("ITEMS", items)

    return (<>

        <Picker style={{backgroundColor:Colors.BACKGROUND}} selectedValue={currentIndex} mode={'dropdown'} onValueChange={(value: number) => {
            setSelectedGrid(items.find((item) => { return item.id === value })); setCurrentIndex(value)
        }} >
            {items.map((grid) => {
                return (
                    <Picker.Item label={grid.name} value={grid.id} key={grid.toString()} />
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
        width: "auto",
    },
    boxText: {
        color: "#000",
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
    },
    box:
    {
        flex: 1,
        height: "100%",
        flexGrow: 1,
        justifyContent: "center",
        alignContent: "center",
        borderWidth: 1
    }

})

export default BingoGrid