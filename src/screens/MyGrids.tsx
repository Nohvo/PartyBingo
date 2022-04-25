import React, { useState } from 'react'
import { Text, Button } from 'react-native'
import { GridContainer, setReduxGrid } from '../features/grid'
import { StackScreenProps } from '@react-navigation/stack'
import { DataTable } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import base64 from 'react-native-base64'
import Clipboard from '@react-native-community/clipboard'

const MyGrids = (props: StackScreenProps<any>) => {
    const [copied, setCopied] = useState<boolean>(false);
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

    const encryptString = (text:string) => {
        return base64.encode(text)
    }


    const encryptToClipboard = (text:string) => {
        Clipboard.setString(encryptString(text))
        setCopied(true)
    }

    return (
        <>
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
                    <DataTable.Cell style={{flex:2}}>
                        <Text>{grid.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Button title={"Remove"} onPress={() => { console.log(handleRemove(grid.id)) } }></Button>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Button title={"Export"} onPress={() => { encryptToClipboard(JSON.stringify(grid)) } }></Button>
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
        {copied ? <Text style={{textAlign:"center"}}>Copied to clipboard! Paste it to your friends in chat!</Text> : <></>}
        </>
        
    )
}

export default MyGrids