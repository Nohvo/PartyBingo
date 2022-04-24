import React, { useState } from 'react'
import { Text, Button } from 'react-native'
import { GridContainer, setReduxGrid } from '../features/grid'
import { StackScreenProps } from '@react-navigation/stack'
import { DataTable } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const MyGrids = (props: StackScreenProps<any>) => {
    console.log("MYGRIDS", props.route.params)
    const [grids, setGrids] = useState<GridContainer[]>(props.route.params.grids)
    const dispatch = useDispatch();

    const handleRemove = (id:number) => {
        var temp = [...grids]
        temp = temp.filter((item) => {
            return item.id !== id
        })
        setGrids(temp);
        dispatch(setReduxGrid(temp))
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>
                    Name
                </DataTable.Title>
                <DataTable.Title>
                    Actions
                </DataTable.Title>
            </DataTable.Header>
            
            {grids.map((grid, index) => (
                //@ts-ignore
                <DataTable.Row key={index}>
                    <DataTable.Cell>
                        <Text>{grid.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Button title={"Remove"} onPress={() => { console.log(handleRemove(grid.id)) } }></Button>
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    )
}

export default MyGrids